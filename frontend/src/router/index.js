import { createRouter, createWebHistory } from "vue-router";
import About from "../views/AboutMe.vue";
import MyEducation from "../views/MyEducation.vue";
import WorkExpriences from "../views/WorkExp.vue";
import ProjectDemo from "../views/Demo.vue";

const routes = [
	{
		path: "/",
		redirect: "/about"
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/education",
		name: "MyEducation",
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
