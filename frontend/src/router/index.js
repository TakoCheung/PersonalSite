import { createRouter, createWebHistory } from "vue-router";
import About from "../views/AboutMe.vue";
import MyEducation from "../views/MyEducation.vue";
import WorkExpriences from "../views/WorkExp.vue";
import ProjectDemo from "../views/Demo.vue";
import Certs from "@/views/Certs.vue";
import Resume from "@/views/Resume.vue";
import QrCode from "@/views/QrCode.vue";
import Converter from "@/views/Converter.vue";
import SolarSystem from "@/views/SolarSystem.vue";

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
	},
	{
		path: "/Resume",
		name: "Resume",
		component: Resume,
	},
	{
		path: "/QrCode",
		name: "QrCode",
		component: QrCode,
	},
	{
		path: "/Converter",
		name: "Converter",
		component: Converter,
	},
	{
		path: "/SolarSystem",
		name: "SolarSystem",
		component: SolarSystem,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
