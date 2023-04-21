import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import MyEducation from "../views/my-education.vue";
import WorkExpriences from "../views/WorkExp.vue";
import ProjectDemo from "../views/Demo.vue";

const routes = [
	{
		path: "/",
		name: "About",
		component: About,
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/education",
		name: "Education",
		component: MyEducation,
	},
	{
		path: "/WorkExpriences",
		name: "WorkExpriences",
		component: WorkExpriences,
	},
	{
		path: "/Demo",
		name: "Demo",
		component: ProjectDemo,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
