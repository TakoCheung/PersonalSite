import { createApp } from "vue";
import { createStore } from "vuex";
import App from "@/App.vue";
import router from "@/router/index";
import Header from "v-header";
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
		toggleTimeline(state, id){
			if (id === "hw") {
        state.hwTimeLineShown = !state.hwTimeLineShown;
      }
      else if (id === "cst") {
				state.cstTimeLineShown = !state.cstTimeLineShown;
      }
      else if (id === "fs") {
        state.fsTimeLineShown = !state.fsTimeLineShown;
      }
			else{
				state.hwTimeLineShown = !state.hwTimeLineShown;
				state.cstTimeLineShown = !state.cstTimeLineShown;
				state.fsTimeLineShown = !state.fsTimeLineShown;
			}
		},
		toggleDetails(state, id){
			if (id === "hw") {
        state.hwDetailsShown = !state.hwDetailsShown;
      }
      else if (id === "cst") {
				state.cstDetailsShown = !state.cstDetailsShown;
      }
      else if (id === "fs") {
        state.fsDetailsShown = !state.fsDetailsShown;
      }
			else{
				state.hwDetailsShown = !state.hwDetailsShown;
				state.cstDetailsShown = !state.cstDetailsShown;
				state.fsDetailsShown = !state.fsDetailsShown;
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
app.use(Header);

app.use(router);
app.use(vuetify);
app.use(store);

app.config.compilerOptions.isCustomElement = (tagName) => {
	return tagName === "vue-advanced-chat" || tagName === "emoji-picker";
};

app.mount("#app");
