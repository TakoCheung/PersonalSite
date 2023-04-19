import { createStore } from 'vuex';

const chatPanelOpen = {
  isChatOpen: false
};

const toggle = {
  toggleChat() {
    chatPanelOpen.isChatOpen = !chatPanelOpen.isChatOpen
  },
  offChat(){
    chatPanelOpen.isChatOpen = false
  }
};

export default createStore({
  chatPanelOpen,
  toggle,
});
