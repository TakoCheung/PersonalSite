import { firestoreDb } from "@/database";
import {
	addDoc,
	collection,
	deleteField,
	doc,
	getDoc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";

const MESSAGES_PATH = "messages";

export const firestoreListener = onSnapshot;
export const deleteDbField = deleteField();


const addDocument = (ref, data) => {
	return addDoc(ref, data);
};

const updateDocument = (ref, data) => {
	return updateDoc(ref, data);
};

// MESSAGES

const messageRef = (clientId) =>
	doc(firestoreDb, MESSAGES_PATH, clientId);

export const getMessage = (roomId) => getDoc(messageRef(roomId));

export const addMessageList = async (data) => {
	return addDocument(collection(firestoreDb, MESSAGES_PATH), data);
};

export const updateMessageList = (clientId, data) => {
	return updateDocument(messageRef(clientId), data);
};

export const updateMessage = (roomId, messageId, data) => {
	return updateDocument(messageRef(roomId, messageId), data);
};

export const listenLastMessage = (roomId, callback) => {
	return firestoreListener(messageRef(roomId), (snapshot) => {
		if (snapshot.exists()) {
			callback(snapshot.data())
		}
	},(err)=>{
		console.log(err);
	});
};

