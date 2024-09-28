const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.saveData = functions.https.onRequest(async (req, res) => {
  try {
    // Check for POST method
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const msg = req.body;
    console.debug("req.body", req.body);

    if (msg && msg.channel_post) {
      // Check if it's a new message, not a reply to another message
      if (!msg.channel_post.reply_to_message) {
        const replyMessage = msg.channel_post.text;
        console.debug("replyMessage (broadcast):", replyMessage);

        const collectionRef = db.collection("messages");
        const querySnapshot = await collectionRef.get();

        // Array to hold all update promises
        const updatePromises = [];

        querySnapshot.forEach((doc) => {
          const updatePromise = doc.ref.update({
            list: admin.firestore.FieldValue.arrayUnion({
              type: "text",
              author: "broadcast",
              data: {text: replyMessage},
            }),
          });
          updatePromises.push(updatePromise);
          console.debug("Added update promise for doc:", doc.id);
        });

        // Wait for all promises to resolve
        await Promise.all(updatePromises);
        console.debug("All documents updated successfully");
      } else {
        // Handling replies to existing messages
        const oriMessageText = msg.channel_post.reply_to_message.text;
        let oriMessage;
        let clientId;

        try {
          // Parse the original message text as JSON
          oriMessage = JSON.parse(oriMessageText);
          console.debug("Parsed oriMessage:", oriMessage);
          clientId = oriMessage.clientId;
        } catch (parseError) {
          throw new Error(
              "Failed to parse original message as JSON: " + oriMessageText,
          );
        }

        const replyMessage = msg.channel_post.text;
        console.debug("replyMessage (reply to original):", replyMessage);

        // Fetch the document for the original clientId and update it
        const collectionRef = db.collection("messages");
        const docRef = await collectionRef.doc(clientId).get();

        if (docRef.exists) {
          await docRef.ref.update({
            list: admin.firestore.FieldValue.arrayUnion({
              type: "text",
              author: "tako",
              data: {text: replyMessage},
            }),
          });
          console.debug(
              "Document updated successfully for clientId:",
              clientId,
          );
        } else {
          throw new Error("Document not found for clientId: " + clientId);
        }
      }
    }

    // Send success response
    res.status(200).send({message: "Data saved successfully"});
  } catch (error) {
    console.error("Error saving data:", error);
    res
        .status(500)
        .send({error: "Internal Server Error", details: error.message});
  }
});
