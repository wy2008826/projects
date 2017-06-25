
import Vue from "vue";
import axios from "axios";
import vueRouter from "vue-router";
import vueResource from "vue-resource";
import routes from "../router/router.js";

import vuex from "vuex";
import store from "../store/store.js";

Vue.use(vueRouter);
Vue.use(vueResource);

const router=new vueRouter({routes:routes,mode:"hash"});


window.vm=new Vue({
	el:"#app",
	store,
	router
});

