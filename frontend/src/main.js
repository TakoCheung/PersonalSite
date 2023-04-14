import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueScrollProgress from 'vue-scroll-progress'
import Header from 'v-header'
import VueGoogleCharts from 'vue-google-charts'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin }  from 'bootstrap-vue'
import VVisible from 'v-visible'

Vue.use(VVisible)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleCharts)
Vue.use(VueScrollProgress)
Vue.use(Header)

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import vuetify from './plugins/vuetify';

// // You need to update these libraries to their Vue 3 compatible versions if available
// // and follow the individual libraries' migration guides
// import VueScrollProgress from 'vue-scroll-progress';
// import Header from 'v-header';
// import VueGoogleCharts from 'vue-google-charts';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import VVisible from 'v-visible';

// const app = createApp(App);

// app.use(VVisible);
// app.use(BootstrapVue);
// app.use(IconsPlugin);
// app.use(VueGoogleCharts);
// app.use(VueScrollProgress);
// app.use(Header);

// app.use(router);
// app.use(vuetify);

// app.mount('#app');
