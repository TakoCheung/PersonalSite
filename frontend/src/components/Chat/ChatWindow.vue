<template>
  <div>
    <beautiful-chat :participants="participants" :titleImageUrl="titleImageUrl" :onMessageWasSent="onMessageWasSent"
      :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat"
      :open="openChat" :showEmoji="true" :showFile="true" :showEdition="true" :showDeletion="true"
      :deletionConfirmation="true" :showTypingIndicator="showTypingIndicator" :showLauncher="true"
      :showCloseButton="true" :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false" :messageStyling="messageStyling" @onType="handleOnType" @edit="editMessage" />
  </div>
</template>
<script>
import axios from 'axios';
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
          id: 'boardcast',
          name: 'Boardcast',
          imageUrl: '../../assets/megaphone.svg'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
        { type: 'text', author: `tako`, data: { text: `Welcome to my personal page.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
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
    // getClientId() {
    //   let clientId = localStorage.getItem('clientId');
    //   if (!clientId) {
    //     clientId = '_' + Math.random().toString(36).substr(2, 9);
    //     localStorage.setItem('clientId', clientId);
    //   }
    //   return clientId;
    // },
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
      const storedMessages = localStorage.getItem('chatMessages');
      return storedMessages ? JSON.parse(storedMessages) : [];
    },
    saveMessagesToStorage() {
      localStorage.setItem('chatMessages', JSON.stringify(this.messageList));
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message]
      message.sender = localStorage.getItem('username');
      this.$store.commit('sendMessage', message);
      this.saveMessagesToStorage();
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
      this.username = this.getUsername();
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log('Emit typing event')
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    messageFromTelgram(update, author) {
      const message = { type: 'text', author: author, data: { text: update.text } }
      this.messageList = [...this.messageList, message]
      this.saveMessagesToStorage()
    },
    longPoll() {
      axios.get(`https://api.telegram.org/${this.$store.state.botToken}/getUpdates`, {
        params: {
          offset: this.$store.state.lastUpdateId,
          timeout: 60 // Wait for up to 60 seconds for new updates
        }
      })
        .then(response => {
          this.updates = response.data.result;
          if (this.updates.length > 0) {
            const update = this.updates[0].channel_post;
            this.$store.commit('setLastUpdateId', this.updates[this.updates.length - 1].update_id + 1);
            if (Object.prototype.hasOwnProperty.call(update, "reply_to_message")) {
              const userName = this.getUsername();
              const senderJson = JSON.parse(this.updates[0].channel_post.reply_to_message.text);
              if (senderJson.sender == userName) {
                this.messageFromTelgram(update, 'tako')
              }
            }
            else {
              this.messageFromTelgram(update, 'boardcast')
            }
          }
          this.longPoll();
        })
        .catch(error => {
          if (error.status != 409) console.error(error);

          // If an error occurred, start a new poll after a delay
          setTimeout(() => this.longPoll(), 5000);
        });
    }
  },
  created() {
    // Start polling when the component is created
    this.messageList = this.loadMessagesFromStorage();
    this.longPoll();
  }
}
</script>