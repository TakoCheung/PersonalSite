<template>
<div class="sidebar">
  <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
  <transition name="slide">
    <div v-if="isPanelOpen" class="sidebar-panel">
      <slot></slot>
    </div>
  </transition>
</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    // Map mutations as needed
    const isPanelOpen = computed(() => store.state.isNavOpen);
    const closeSidebarPanel = () => store.commit('toggleNav');

    return {
      isPanelOpen,
      closeSidebarPanel,
    };
  },
};
// import {
//   store,
//   mutations
// } from '@/state/store.js'

// export default {
//   methods: {
//     closeSidebarPanel: mutations.toggleNav
//   },
//   computed: {
//     isPanelOpen() {
//       return store.isNavOpen
//     }
//   }
// }
</script>
