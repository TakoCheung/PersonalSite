<template>
  <div id="burger" :class="{ active: isBurgerActive }" @click.prevent="toggle">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="hidden">Toggle menu</span>
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>
<script>

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    // Map mutations as needed
    const isBurgerActive = computed(() => store.state.isNavOpen);
    const toggle = () => store.commit('toggleNav');

    return {
      isBurgerActive,
      toggle,
    };
  },
};
</script>