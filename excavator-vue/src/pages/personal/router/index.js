import Router from 'vue-router'
import tabs from '../tabConfig'

Vue.use(Router)

let routes = []
tabs.forEach((item) => {
	let path = item.path
  routes.push({
    path: `/${path}`,
    component: (resolve) => {
      return import (`../components/${path}.vue`)
    }
  })
})

let router = new Router({
	// mode: 'history',
  routes
})

export default router
