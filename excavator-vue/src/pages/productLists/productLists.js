import './productLists.scss'
require('normalize.css')

import { Message } from 'element-ui'
import { fetch,rap } from 'js/fetch.js'
import utils from 'js/utils.js'
import bus from 'js/bus.js'

import Top from 'components/top/top.vue'
import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Logstate from 'components/logstate/logstate.vue'
import Minicart from 'components/minicart/minicart.vue'

let url = {
	classify: '/lists/classify.do',
  lists: '/lists/lists.do',
  articles: '/article/articles.do'
}
url = rap(url)

new Vue({
  el: '#app',
  data: {
		state:	parseInt(utils.getQuery('state') || 1),
		keyword: utils.getQuery('keyword'),
		positionMsg: '',
		classifyList: '',
		typeList: '',
		bandIndex: 0,
		typeIndex: 0,
		list: '',
		bandId: -1,
		typeId: -1
	},
	created() {
		this.getPositionMsg()
		this.query()
		if(!this.keyword){
			this.getClassify()
		}
	},
	methods: {
		getPositionMsg(){
			if(this.keyword){
				this.positionMsg = '搜索'
			}else{
				switch (this.state){
					case 1:
						this.positionMsg = '挖掘机租赁'
						break;
					case 2:
						this.positionMsg = '挖掘机销售'
						break;
					case 3:
						this.positionMsg = '配件商城'
				}
			}
		},
		getClassify(){
			fetch('post',url.classify,{
				type: this.state
			}).then(res => {
				this.classifyList = res.data.classifyList
				this.typeList = res.data.classifyList[this.bandIndex].childrenList
			})
		},
		selectBand(index){
			this.bandIndex = index
			this.typeList = this.classifyList[index].childrenList
			this.bandId = this.classifyList[index].id
			this.query()
		},
		selectType(item,index){
			this.typeIndex = index
			this.typeId = item.id
			this.query()
		},
		query(){
			let reqUrl = ''
			if(this.state === 4){
				reqUrl = url.articles
			}else{
				reqUrl = url.lists
			}

			fetch('post',reqUrl,{
				bandId: this.bandId,
				typeId: this.typeId,
				keyword: this.keyword,
				type: this.state
			}).then(res => {
				this.list = res.data.list
			})
		},
		add(id){
			// console.log(id)
			bus.$emit('add',id)
		}
	},
  components: {
    Top,
    Foot,
		Search,
		Logstate,
		Minicart
  }
})
