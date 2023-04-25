import { createApp } from "vue";
import { createStore } from "vuex";
import App from "@/App.vue";
import router from "@/router/index";
import Header from "v-header";
import { GChart } from "vue-google-charts";
import { BootstrapVueNext } from "bootstrap-vue-next";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const store = createStore({
	state: {
		isNavOpen: false,
		isChatOpen: false,
		hwTimeLineShown: false,
		hwDetailsShown: false,
		fsTimeLineShown: false,
		fsDetailsShown: false,
		cstTimeLineShown: false,
		cstDetailsShown: false,
	},
	mutations: {
		toggleNav(state) {
			state.isNavOpen = !state.isNavOpen;
		},
		toggleChat(state) {
			state.isChatOpen = !state.isChatOpen;
		},
		offChat(state) {
			state.isChatOpen = false;
		},
		toggleHwDetails(state) {
			state.hwDetailsShown = !state.hwDetailsShown;
		},
		toggleHwTimeLine(state) {
			state.hwTimeLineShown = !state.hwTimeLineShown;
		},
		toggleFsDetails(state) {
			state.fsDetailsShown = !state.fsDetailsShown;
		},
		toggleFsTimeLine(state) {
			state.fsTimeLineShown = !state.fsTimeLineShown;
		},
		toggleCstDetails(state) {
			state.cstDetailsShown = !state.cstDetailsShown;
		},
		toggleCstTimeLine(state) {
			state.cstTimeLineShown = !state.cstTimeLineShown;
		},
	},
});

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(BootstrapVueNext);
app.use(GChart);
app.use(Header);

app.use(router);
app.use(vuetify);
app.use(store);

app.config.compilerOptions.isCustomElement = (tagName) => {
	return tagName === "vue-advanced-chat" || tagName === "emoji-picker";
};

app.mount("#app");
