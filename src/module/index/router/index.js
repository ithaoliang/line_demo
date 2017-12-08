import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

var routes = [
	{
	    path: '/',
	    component: () => import('../views/demo/tag'),
	    meta:{headerTitle: "产品库"}
	},
	{
	    path: '/app',
	    component: () => import('../views/active/App'),
	    meta:{headerTitle: "我的2017"}
	},
	{
	    path: '/game',
	    component: () => import('../views/active/activeGame'),
	    meta:{headerTitle: "我的2017"}
	}
]

const router = new Router({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

export default router