import { createStore } from "vuex";

const cst = {
	cstTimeLineShown: false,
	cstDetailsShown: false,
};

const cstToggle = {
	toggleCstDetails() {
		cst.cstDetailsShown = !cst.cstDetailsShown;
	},
	toggleCstTimeLine() {
		cst.cstTimeLineShown = !cst.cstTimeLineShown;
	},
};

export default createStore({
	cst,
	cstToggle,
});
