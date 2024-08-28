import { createRouter, createWebHistory } from "vue-router";
import About from "../views/AboutMe.vue";
import MyEducation from "../views/MyEducation.vue";
import WorkExpriences from "../views/WorkExp.vue";
import ProjectDemo from "../views/Demo.vue";
import Certs from "@/views/Certs.vue";

const routes = [
	{
		path: "/",
		redirect: "/About"
	},
	{
		path: "/About",
		name: "About",
		component: About,
	},
	{
		path: "/Education",
		name: "MyEducation",
		component: MyEducation,
	},
	{
		path: "/Exprience",
		name: "WorkExpriences",
		component: WorkExpriences,
	},
	{
		path: "/Demo",
		name: "Demo",
		component: ProjectDemo,
	},
	{
		path: "/Certs",
		name: "Certs",
		component: Certs,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
