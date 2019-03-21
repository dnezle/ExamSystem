// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Posts from "./components/posts/PostsContainer";
import About from "./components/About";
import ExamKey from "./components/examKey/ExamKey";
import Examinees from "./components/examinees/examineeContainer";
import Exam from "./components/exams/exam";
import Login from "./components/login";

import { store } from "./stores/store";

import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";

import { WindowInstaller } from "@progress/kendo-window-vue-wrapper";
import { DialogInstaller } from "@progress/kendo-dialog-vue-wrapper";
import { KendoPopupsInstaller } from "@progress/kendo-popups-vue-wrapper";
import { Dialog } from "@progress/kendo-dialog-vue-wrapper";
import { KendoNotification } from "@progress/kendo-popups-vue-wrapper";

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(WindowInstaller);
Vue.use(DialogInstaller);
Vue.use(KendoPopupsInstaller);
Vue.use(Dialog);
Vue.use(KendoNotification);

Vue.config.productionTip = false;

const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/home", name: "home", component: Posts },
  { path: "/examinees", component: Examinees },
  { path: "/exam-key", component: ExamKey },
  { path: "/exam", component: Exam },
  { path: "/about", component: About }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.mixin({
  data() {
    return { isAdmin: false };
  },
  computed: {
    isLoginPage() {
      return this.$route.name === "login" ? true : false;
    }
  },
  created() {
    this.isAdmin = JSON.parse(localStorage.getItem("user"));
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
