import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from './state/store';

// You need to update these libraries to their Vue 3 compatible versions if available
// and follow the individual libraries' migration guides
import VueScrollProgress from "vue-scroll-progress";
import Header from "v-header";
import VueGoogleCharts from "vue-google-charts";
import { BootstrapVueNext, IconsPlugin } from "bootstrap-vue-next";

const app = createApp(App);

app.use(BootstrapVueNext);
app.use(IconsPlugin);
app.use(VueGoogleCharts);
app.use(VueScrollProgress);
app.use(Header);

app.use(router);
app.use(vuetify);
app.use(store)

app.config.compilerOptions.isCustomElement = (tagName) => {
	return tagName === "vue-advanced-chat" || tagName === "emoji-picker";
};

app.mount("#app");
