import './submitOrder.scss'

import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
import Search from 'components/search/search.vue'
import utils from 'js/utils.js'
import { Message } from 'element-ui'
import Address from 'js/addressServer.js'
import Order from 'js/orderServer.js'

let preData = JSON.parse(sessionStorage.getItem('preData'))

new Vue({
    el: '#app',
    data: {
      type: utils.getQuery("type"),
      typestr: '',
      state: '',
      add: '',
      preData: preData,
      lists: '',
      mode: '',
      head: '',
			content: '',
			
    },
    created() {
      this.addLists()
      this.preLists()
      this.init()
    },
    methods: {
      addLists() {
				Address.list("post").then(res => {
					this.add = res.data.list[0]
				})
      },
      preLists() {
				Order.preorder("post",this.preData).then(res => {
							 let data = res.data
							 this.lists = data.list
						 })
      },
      init() {
        switch (this.type) {
          case '1':
            this.typestr = "申请租赁"
            this.state = "填写意向单"
            break;
          case '2':
            this.typestr = "申请购买"
            this.state = "填写意向单"
            break;
          case '3':
            this.typestr = "购买配件"
            this.state = "填写订单"
            break;
        }
      },
      submit() {
        // 非空校验,留给大家处理
				if(!this.add){
					Message("请填写收货地址！")
					return
				}
				if(!this.lists){
					Message("没有商品，不能提交订单！")
					return
				}

				let commitData = Object.assign({},this.preData,{
					consigneeId: this.add.id,
					content: this.content,
					head: this.head,
					mode: this.mode,
					type: this.type
				})

				Order.commit("post",commitData).then(res => {
					Message(res.message)
				})
      }
    },
    components: {
      Top,
      Foot,
      Search
    }
  }

)
