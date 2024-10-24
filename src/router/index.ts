import { RouteRecordRaw } from "vue-router";
import TestList from "../components/TestList.vue";
import QuestionsList from "../components/QuestionsList.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: TestList },
  { path: "/questions", component: QuestionsList, name: "questions" },
];

export default routes;
