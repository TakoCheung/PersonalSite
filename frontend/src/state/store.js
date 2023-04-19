import { createStore } from 'vuex';

const state = {
  isNavOpen: false
};

const mutations = {
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  }
};

export default createStore({
  state,
  mutations,
});
