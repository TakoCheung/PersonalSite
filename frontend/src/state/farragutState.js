import { createStore } from "vuex";

const fs = {
	fsTimeLineShown: false,
	fsDetailsShown: false,
};

const fsToggle = {
	toggleHwDetails() {
		fs.fsDetailsShown = !fs.fsDetailsShown;
	},
	toggleHwTimeLine() {
		fs.fsTimeLineShown = !fs.fsTimeLineShown;
	},
};

export default createStore({
	fs,
	fsToggle,
});
