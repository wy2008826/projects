import Vue from 'vue';
import vueRouter from 'vue-router';
import App from "@/page/App.vue";
import Detail from "@/page/detail.vue";

// const Detail = r => require.ensure([], () => r(require('@/page/detail.vue')), 'detail');



//会导致一个问题，有些路由已经用不到了，但是依然会被保留，导致该文件越来越臃肿

var routes=[
	{
		path:"/",
		component:App,
		children:[
			{
				path:"",
				redirect:"index"
			},
			{
				path:"index",
				component:App
			},
			
			// {
			// 	path:"router",
			// 	component:Router,
			// 	children:[
			// 		{
			// 			path:"",
			// 			redirect:"routerA"
			// 		},
			// 		{
			// 			path:"routerA",
			// 			component:function(resolve,reject){
			// 				require(['components/RouterA'],resolve);
			// 			},
			// 		},
			// 	]
			// },
		]
	},
	{
		name:"detail",
		path:"/detail/:code",
		component:Detail
	},
];

export default routes;