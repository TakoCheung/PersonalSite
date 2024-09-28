import { firestoreDb } from "@/database";

import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	deleteField,
	doc,
	endAt,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	// setDoc,
	startAfter,
	startAt,
	updateDoc,
	// where,
} from "firebase/firestore";

const MESSAGES_PATH = "messages";
const MESSAGE_PATH = (roomId) => {
	return `${MESSAGES_PATH}/${roomId}`;
};

const TIMESTAMP_FIELD = "timestamp";
const MESSAGE_REACTIONS_FIELD = "reactions";

export const firestoreListener = onSnapshot;
export const deleteDbField = deleteField();

const getDocuments = (query) => {
	return getDocs(query).then((docs) => {
		return { data: formatQueryDataArray(docs), docs: docs.docs };
	});
};

// const getDocument = (ref) => {
// 	return getDoc(ref).then((doc) => formatQueryDataObject(doc));
// };

const addDocument = (ref, data) => {
	return addDoc(ref, data);
};

const updateDocument = (ref, data) => {
	return updateDoc(ref, data);
};

const deleteDocument = (ref, docId) => {
	return deleteDoc(doc(firestoreDb, ref, docId));
};

// MESSAGES

const messagesRef = () => {
	return collection(firestoreDb, MESSAGES_PATH);
};

export const messageRef = (clientId) => {
	return doc(firestoreDb, MESSAGES_PATH, clientId);
};

export const getMessage = (roomId) => {
	return getDoc(messageRef(roomId));
};

export const getMessages = (roomId, messagesPerPage, lastLoadedMessage) => {
	if (lastLoadedMessage) {
		return getDocuments(
			query(
				messagesRef(roomId),
				orderBy(TIMESTAMP_FIELD, "desc"),
				limit(messagesPerPage),
				startAfter(lastLoadedMessage)
			)
		);
	} else if (messagesPerPage) {
		return getDocuments(
			query(
				messagesRef(roomId),
				orderBy(TIMESTAMP_FIELD, "desc"),
				limit(messagesPerPage)
			)
		);
	} else {
		return getDocuments(messagesRef(roomId));
	}
};

export const addMessageList = async (data) => {
	return addDocument(collection(firestoreDb, MESSAGES_PATH), data);
};

export const updateMessageList = (clientId, data) => {
	return updateDocument(messageRef(clientId), data);
};

export const updateMessage = (roomId, messageId, data) => {
	return updateDocument(messageRef(roomId, messageId), data);
};

export const deleteMessage = (roomId, messageId) => {
	return deleteDocument(MESSAGE_PATH(roomId), messageId);
};

export const listenRooms = (query, callback) => {
	return firestoreListener(query, (rooms) => {
		callback(formatQueryDataArray(rooms));
	});
};

export const paginatedMessagesQuery = (
	roomId,
	lastLoadedMessage,
	previousLastLoadedMessage
) => {
	if (lastLoadedMessage && previousLastLoadedMessage) {
		return query(
			messagesRef(roomId),
			orderBy(TIMESTAMP_FIELD),
			startAt(lastLoadedMessage),
			endAt(previousLastLoadedMessage)
		);
	} else if (lastLoadedMessage) {
		return query(
			messagesRef(roomId),
			orderBy(TIMESTAMP_FIELD),
			startAt(lastLoadedMessage)
		);
	} else if (previousLastLoadedMessage) {
		return query(
			messagesRef(roomId),
			orderBy(TIMESTAMP_FIELD),
			endAt(previousLastLoadedMessage)
		);
	} else {
		return query(messagesRef(roomId), orderBy(TIMESTAMP_FIELD));
	}
};

export const listenMessages = (
	roomId,
	lastLoadedMessage,
	previousLastLoadedMessage,
	callback
) => {
	return firestoreListener(
		paginatedMessagesQuery(
			roomId,
			lastLoadedMessage,
			previousLastLoadedMessage
		),
		(messages) => {
			callback(formatQueryDataArray(messages));
		}
	);
};

const formatQueryDataObject = (queryData) => {
	return { ...queryData.data(), id: queryData.id };
};

const formatQueryDataArray = (queryDataArray) => {
	const formattedData = [];

	queryDataArray.forEach((data) => {
		formattedData.push(formatQueryDataObject(data));
	});
	return formattedData;
};

const lastMessageQuery = (roomId) => {
	return query(messagesRef(roomId), limit(1));
};

export const listenLastMessage = (roomId, callback) => {
	return firestoreListener(query(lastMessageQuery(roomId)), () => {
		callback();
	});
};

export const updateMessageReactions = (
	roomId,
	messageId,
	currentUserId,
	reactionUnicode,
	action
) => {
	const arrayUpdate =
		action === "add" ? arrayUnion(currentUserId) : arrayRemove(currentUserId);

	return updateMessage(roomId, messageId, {
		[`${MESSAGE_REACTIONS_FIELD}.${reactionUnicode}`]: arrayUpdate,
	});
};
