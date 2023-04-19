<!-- <template>
  <div id="burger" :class="{ 'active': isBurgerActive }" @click.prevent="toggle">
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
import { store, mutations } from '@/state/store.js'

export default {
  computed: {
    isBurgerActive() {
      return store.isNavOpen
    }
  },
  methods: {
    toggle() {
      mutations.toggleNav()
    }
  }
}
</script> -->
<template>
  <div id="burger" :class="{ 'active': isBurgerActive }" @click.prevent="toggle">
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
    const isBurgerActive = computed(() => store.state.isNavOpen);
    const toggleNav = () => store.commit('toggleNav');

    return {
      isBurgerActive,
      toggleNav,
    };
  },
};
</script>

