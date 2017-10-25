import './minicart.scss'
import {
  Message
} from 'element-ui'

import cart from 'js/cartServer.js'
import bus from 'js/bus.js'

export default {
  props: ['state'],
  data() {
    return {
      saleData: '',
      rentData: '',
      partsData: '',
      curIndex: this.state < 3? 0:1,
      timer1: null
    }
  },
  created() {
		this.getLists(1)
		this.getLists(2)
		this.getLists(3)
		
		bus.$on('add',({id,state}) => {
			this.addNumber(id,state)
		})
		bus.$on('detail',({from,id,state,number}) => {
			this.addNumber(id,state,number,from)
		})
  },
  methods: {
    addNumber(id,state,number,from) {
      let productData
      switch(state) {
				case 1:
					productData = this.rentData
					break
				case 2:
					productData = this.saleData
					break
				case 3:
					productData = this.partsData
					break
			}
			productData.list.forEach((item) => {
				if(item.unifiedMerchandiseId === id){
					if(from == 'detail'){
						item.number += number
						item.sum += number*item.discount
						productData.sum += number*item.discount
						return
					}
					item.number++
					item.sum += item.discount
					productData.sum += item.discount
				}
			})
    },
    add(params) {
      let item = params.item
      let data = params.data
      let type = params.type

      if (type === "number") {
        item.number++
      } else if (type === "month") {
        item.month++
      }

      data.sum += item.discount
      item.sum += item.discount

      this.cartAjax(item)
    },
    reduce(params) {
      let item = params.item
      let data = params.data
      let type = params.type

      if (type === "number") {
        if (item.number <= 1) {
          item.number = 1
          return
        }
        item.number--
      } else if (type === "month") {
        if (item.month <= 3) {
          item.month = 3
          return
        }
        item.month--
      }

      data.sum -= item.discount
      item.sum -= item.discount

      this.cartAjax(item)
    },
    getLists(type) {
      cart.list("post", {
        type: this.state,
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        let data = res.data
        switch (type) {
          case 1:
            this.saleData = data
            break
          case 2:
            this.rentData = data
            break
          case 3:
            this.partsData = data
        }
      })
    },
    cartAjax(item) {
      if (this.timer1) {
        clearTimeout(this.timer1)
        this.timer1 = null
      }
      this.timer1 = setTimeout(() => {
        // console.log(item)
        cart.add("post", {
          type: this.state,
          number: item.number,
          month: item.month
        }).then((res) => {
          Message(res.message)
        })
      }, 1000)
    }
  }
}
