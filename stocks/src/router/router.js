import Vue from 'vue';
import vueRouter from 'vue-router';
import App from "@/page/App.vue";
import store from "../store/store.js";

const Detail = r => require.ensure([], () => r(require('@/page/detail.vue')), 'detail');
const Lists = r => require.ensure([], () => r(require('@/page/Lists.vue')), 'Lists');
const Zixuan = r => require.ensure([], () => r(require('@/page/Zixuan.vue')), 'Zixuan');
const Login = r => require.ensure([], () => r(require('@/page/Login.vue')), 'Login');
const Register = r => require.ensure([], () => r(require('@/page/Register.vue')), 'Register');

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
        name:"login",
        path:"/login",
        component:Login
    },
    {
        name:"register",
        path:"/register",
        component:Register
    },
    {
        name:"lists",
        path:"/lists/:type",
        component:Lists
    },
	{
		name:"detail",
		path:"/detail/:code",
		component:Detail
	},
    {
        name:"zixuan",
        path:"/zixuan",
		meta:{
            requireAuth: true,
        },
        component:Zixuan
    },
];
const router=new vueRouter({routes,mode:"hash"});

// 全局导航钩子
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        if(store.state.user) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

export default router;