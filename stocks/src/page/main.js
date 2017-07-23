
import Vue from "vue";
import axios from "axios";
import vueRouter from "vue-router";
import vueResource from "vue-resource";
import routes from "../router/router.js";

import vuex from "vuex";
import store from "../store/store.js";
// import "../assets/css/base.scss";


Vue.use(vueRouter);
Vue.use(vueResource);

const router=new vueRouter({routes:routes,mode:"hash"});


window.vm=new Vue({
	el:"#app",
	store,
	router,
	created(){
        let deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
	}
});

