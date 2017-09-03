import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import Layout from '@/views/layout'
import Project from '@/views/project'
import Work from '@/views/work'
import Doc from '@/views/doc'

Vue.use(Router)

let router = new Router({
	mode: 'history',
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