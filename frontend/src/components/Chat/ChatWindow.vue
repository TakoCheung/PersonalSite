<template>
  <div>
    <beautiful-chat :participants="participants" :titleImageUrl="titleImageUrl" :onMessageWasSent="onMessageWasSent"
      :messageList="messages.list" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat"
      :open="openChat" :showEmoji="true" :showFile="true" :showEdition="true" :showDeletion="true"
      :deletionConfirmation="true" :showTypingIndicator="showTypingIndicator" :showLauncher="true"
      :showCloseButton="true" :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false" :messageStyling="messageStyling" />
  </div>
</template>
<script>
import * as firestoreService from '@/database/firestore'
export default {
  name: 'ChatWindow',
  data() {
    return {
      participants: [
        {
          id: 'tako',
          name: 'Tako',
          imageUrl: '../../assets/self.png'
        },
        {
          id: 'broadcast',
          name: 'Broadcast',
          imageUrl: '../../assets/megaphone.svg'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messages: {
        list:
          [{ type: 'text', author: `tako`, data: { text: `Welcome to my personal page.` } }]
      }, // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    async getClientId() {
      if (!localStorage.getItem('clientId')) {
        await firestoreService.addMessageList(this.messages).then((doc) => {
          localStorage.setItem('clientId', doc.id);
        })
      }
    },
    getUsername() {
      let username = localStorage.getItem('username');
      if (!username) {
        username = prompt("Please enter your name:", "Anonymous");
        if (username) {
          localStorage.setItem('username', username);
        } else {
          username = 'Anonymous';
        }
      }
      return username;
    },
    loadMessagesFromStorage() {
      firestoreService.getMessage(localStorage.getItem('clientId'))
        .then((doc) => this.messages.list = doc.data().list);
    },
    saveMessagesToStorage() {
      firestoreService.updateMessageList(localStorage.getItem('clientId'), this.messages)
    },
    onMessageWasSent(message) {
      this.messages.list = [...this.messages.list, message]
      message.sender = localStorage.getItem('username');
      message.clientId = localStorage.getItem('clientId');
      this.$store.commit('sendMessage', message);
      this.saveMessagesToStorage();
    },
    openChat() {
      this.isChatOpen = true
      this.newMessagesCount = 0
      this.username = this.getUsername();
    },
    closeChat() {
      this.isChatOpen = false
    },
    messageFromTelgram(update, author) {
      const message = { type: 'text', author: author, data: { text: update.text } }
      this.messages.list = [...this.messages.list, message]
      this.saveMessagesToStorage()
    },
    listenForDbUpdates() {
      const clientId = localStorage.getItem('clientId');
      if (!clientId) {
        console.error("No clientId found in localStorage");
        return;
      }

      firestoreService.listenLastMessage(clientId, (messages) => {
        if (messages && messages.list) {
          this.messages.list = messages.list;
          console.debug("Updated message list from Firestore:", this.messages.list);
        } else {
          console.error("No messages found for clientId:", clientId);
        }
      });
    }
  },
  async created() {
    await this.getClientId();
    this.listenForDbUpdates();
  }
}
</script>∏