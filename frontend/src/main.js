import { createApp } from "vue";
import { createStore } from "vuex";
import App from "@/App.vue";
import router from "@/router/index";
import { createVuetify } from "vuetify";
import {
	VContainer,
	VCardActions,
	VBtn,
	VAvatar,
	VListItem,
	VExpandTransition,
	VCard,
	VCardText,
	VRow,
	VCol,
	VCombobox,
	VTooltip,
} from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { GChart } from "vue-google-charts";
import VueBeatifulChat from "vue3-beautiful-chat";

const store = createStore({
	state: {
		isNavOpen: false,
		hwTimeLineShown: false,
		hwDetailsShown: false,
		cstTimeLineShown: false,
		cstDetailsShown: false,
		wmtTimeLineShown: false,
		wmtDetailsShown: false,
		botToken: 'bot315993652:AAER_pkBxCaLUvHnGhJLrXLR0oHQ0fHBEfM',
		lastUpdateId: 0
	},
	mutations: {
		toggleNav(state) {
			state.isNavOpen = !state.isNavOpen;
		},
		toggleDetails(state, id) {
			switch (id) {
				case "hw":
					state.hwDetailsShown = !state.hwDetailsShown;
					break;
				case "cst":
					state.cstDetailsShown = !state.cstDetailsShown;
					break;
				case "fs":
					state.fsDetailsShown = !state.fsDetailsShown;
					break;
				case "wmt":
					state.wmtDetailsShown = !state.wmtDetailsShown;
					break;
			}
		},
		toggleTimeline(state, id) {
			switch (id) {
				case "hw":
					state.hwTimeLineShown = !state.hwTimeLineShown;
					break;
				case "cst":
					state.cstTimeLineShown = !state.cstTimeLineShown;
					break;
				case "fs":
					state.fsTimeLineShown = !state.fsTimeLineShown;
					break;
				case "wmt":
					state.wmtTimeLineShown = !state.wmtTimeLineShown;
					break;
			}
		},
		sendMessage(state, data) {
			fetch(
				`https://api.telegram.org/${state.botToken}/sendMessage`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat_id: "@personalPageTako",
						text: data,
					}),
				}
			);
		},
	},
});

const vuetify = createVuetify({
	components: {
		VContainer,
		VCardActions,
		VBtn,
		VAvatar,
		VListItem,
		VExpandTransition,
		VCard,
		VCardText,
		VRow,
		VCol,
		VCombobox,
		VTooltip,
	},
	directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(VueBeatifulChat);
app.use(GChart);
app.use(router);
app.use(store);

app.mount("#app");
