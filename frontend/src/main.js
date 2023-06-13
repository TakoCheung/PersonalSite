import { createApp } from "vue";
import { createStore } from "vuex";
import App from "@/App.vue";
import router from "@/router/index";
import { GChart } from "vue-google-charts";
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
		wmtTimeLineShown: false,
		wmtDetailsShown: false,
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
		toggleDetails(state, id){
			switch (id){
				case "hw":
					state.hwDetailsShown = !state.hwDetailsShown;
					break
				case "cst":
					state.cstDetailsShown = !state.cstDetailsShown;
					break
				case "fs":
					state.fsDetailsShown = !state.fsDetailsShown;
					break
				case "wmt":
					state.wmtDetailsShown = !state.wmtDetailsShown;
					break
			}
		},
		toggleTimeline(state, id){
			switch (id){
				case "hw":
					state.hwTimeLineShown = !state.hwTimeLineShown;
					break
				case "cst":
					state.cstTimeLineShown = !state.cstTimeLineShown;
					break
				case "fs":
					state.fsTimeLineShown = !state.fsTimeLineShown;
					break
				case "wmt":
					state.wmtTimeLineShown = !state.wmtTimeLineShown;
					break
			}
		}
	},
});

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(GChart);
app.use(router);
app.use(vuetify);
app.use(store);

app.config.compilerOptions.isCustomElement = (tagName) => {
	return tagName === "vue-advanced-chat" || tagName === "emoji-picker";
};

app.mount("#app");
