import 'normalize.css'

import { Pagination,Card } from 'element-ui'
import { fetch,rap } from 'js/fetch.js'

Vue.use(Pagination)
Vue.use(Card)

let url = {
	list: '/lists/lists.do'
}
url = rap(url)

new Vue({
	el: '#app',
	data: {
		curPage: 1,
		items: ''
	},
	created () {
		this.getList()
	},
	computed: {
		curragePage: function(){
			return this.curPage
		}
	},
	methods: {
		change(page){
			this.curPage = page
			this.getList()		
		},
		getList(){
			fetch('post',url.list,{
				pageNumber: this.curPage
			}).then((res) => {
				this.items = res.data.list
			}).catch((res) => {
				console.log(res)
			})
		}
	}
})