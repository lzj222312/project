import './detail.scss'

import Top from 'components/top/top.vue'
import Search from 'components/search/search.vue'
import Foot from 'components/foot/foot.vue'
import Logstate from 'components/logstate/logstate.vue'
import Minicart from 'components/minicart/minicart.vue'
import { Message } from 'element-ui'
import Utils from 'js/utils.js'
import bus from 'js/bus.js'
import Order from 'js/orderServer.js'

import { fetch, rap } from 'js/fetch.js'
let url = {
  detail: '/product/detail.do'
}
url = rap(url)

new Vue({
  el: '#app',
  data: {
    state: parseInt(Utils.getQuery('state')),
    attrList: '',
    merchandise: '',
    id:	parseInt(Utils.getQuery('merchandiseId')),
    number: 1,
    month: 3,
    imgs: '',
    imgIndex: 0,
    showIndex: 0,
		isCollect: false,
		outerWidth: 0,
		ulWidth: 0 
  },
  computed: {
    countMoney() {
			let cm = this.merchandise.discount * this.number
			if(this.state == 1){
				cm *= this.month
			}

			return cm
		},
		trans(){
			return -this.imgIndex * this.outerWidth
		}
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
			fetch("post",url.detail,{
				unifiedMerchandiseId: this.id,
			}).then((res) => {
				let data = res.data
				this.attrList = data.attrList
				this.merchandise = data.merchandise
				this.imgs = data.merchandise.imageList
				this.isCollect = data.merchandise.collect
				this.$nextTick(() => {
					let $liWidth = document.querySelectorAll('#imageList li')[0].offsetWidth
					let $limargin = document.querySelectorAll('#imageList li')[0].offsetLeft

					this.outerWidth = $liWidth + $limargin * 2
					this.ulWidth = this.outerWidth * this.imgs.length
				})
			})
    },
    change(number) {
			if(this.imgIndex >= this.imgs.length-4 &&	number > 0){
				return
			}
			if(this.imgIndex <= 0 && number < 0){
				return
			}
			this.imgIndex += number
    },
    collect() {

    },
    reduceNumber() {
			if(this.number <= 1){
				return
			}
			this.number--
    },
    addNumber() {
			if(this.number >= this.merchandise.stcok){
				return
			}
			this.number++
    },
    reduceMonth() {
			if(this.number <= 3){
				return
			}
			this.month--
    },
    addMonth() {
			this.month++
    },
    addCart() {
			bus.$emit('detail',{from:'detail',number:this.number,id:this.id,state:this.state})
		},
		goApply(){
			let preData = {unifiedMerchandiseId: this.id,number: this.number,month: this.month}
			Order.toOrder([preData],this.state,this.countMoney)
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
