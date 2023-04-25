<template>
<div id="chatIcon" :class="{ 'active' : isChatActive }" @click.prevent="toggle">
  <i class="chatButton" icon="chat-text" type="button" animation="Throb" font-scale="2"></i>
</div>
</template>
<script>
// import {
//   chatPanelOpen,
//   toggle
// } from '@/state/chatState.js'

// export default {
//   computed: {
//     isChatActive() {
//       return chatPanelOpen.isChatOpen
//     }
//   },
//   methods: {
//     toggle() {
//       toggle.toggleChat()
//     }
//   }
// }

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    // Map mutations as needed
    const isChatActive = computed(() => store.chatPanelOpen);
    const toggle = () => store.commit('toggleChat');

    return {
      isChatActive,
      toggle,
    };
  },
};
</script>
