import './personal.scss'

import Top from 'components/top/top.vue'
import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import App from './App.vue'
import router from './router/index.js'

new Vue({
	el: '#app',
	router,
  components: {
    Top,
    Foot,
    Search,
		App
  }
})
