import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home'
// import Login from '@/components/login'
// import Layout from '@/views/layout'
// import Project from '@/views/project'
// import Work from '@/views/work'
// import Doc from '@/views/doc'


// webpack提供的代码分隔功能，实现按需加载；有两种方法

// 1.import
let Home = (resolve) => {
	return import('@/components/home')
}

let Login = (resolve) => {
	return import('@/components/login')
}

let Layout = (resolve) => {
	return import('@/views/layout')
}

// 2.require.ensure 这方法接收3个参数（依赖，回调，chunk名称）
// 		依赖为字符串数组，当没有依赖时可以为空数组；chunkName可以使得相同name的模块同时加载
let Project = (resolve) => {
	return require.ensure([],() => {
		resolve(require('@/views/project'))
	})
}

let Work = (resolve) => {
	return require.ensure([],() => {
		resolve(require('@/views/work'))
	},'abc')
}

let Doc  = (resolve) => {
	return require.ensure([],() => {
		resolve(require('@/views/doc'))
	},'abc')
}


Vue.use(Router)

let router = new Router({
	// mode: 'history',
	linkActiveClass: 'router-link-exact-active',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
			path: '/management',
			name: 'Management',
			component: Layout,
			children: [
				{
					path: '/project',
					name: 'Project',
					component: Project,
					meta: {
						login: true
					},
				},
				{
					path: '/work',
					name: 'Work',
					component: Work,
					meta: {
						login: true
					},
				},{
					path: '/doc',
					name: 'Doc',
					component: Doc,
					meta: {
						login: false
					}
				}
			]
		}
  ]
})

// 当在router路由主件中，使用beforeEach钩子时，由于实例$router还没有生成，所以无法通过实例去获取绑定在主APP的组件，要使用router.app去获取
router.beforeEach((to,from,next) => {
	if(to.matched.some((item) => item.meta.login)){
		let $login = router.app.$local.fetch('miaoV')

		// 通过登录信息islogin判断账号是否登录
		if($login.islogin){
			next()
		}else{
			router.push({
				path: '/login',
				query: {
					redirect: to.path.slice(1)
				}
			})
		}
	}else{
		next()
	}
})

export default router