
import Vue from "vue";
import axios from "axios";
import vueRouter from "vue-router";
import vueResource from "vue-resource";
import router from "../router/router.js";
import store from "../store/store.js";


Vue.use(vueRouter);
Vue.use(vueResource);


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

