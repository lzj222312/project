import Pagination from 'components/pagination/pagination.vue'
import Order from 'js/orderServer.js'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      index: 0,
      pageNum:  1,
      pageSize: 2,
      total: '',
      lists: ''
    }
  },
  created() {
		this.index = this.$route.query.index
		this.getLists()
  },
  methods: {
		goIndex() {
      location.href = 'index.html'
    },
    getLists() {
			Order.orderLists("post",{
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				state: this.index
			}).then(res => {
				let data = res.data
				this.total = data.total
				this.lists = data.list
			})
    },
    cancel(orderId) {
			Order.cancel("post",{
				orderid: orderId
			}).then(res => {
				let index = this.lists.findIndex(item => {
					return item.orderId == orderId
				})
				this.lists.splice(index,1)
				Message(res.message)
			})
    },
    remove(orderId) {
			Order.delete("post",{
				orderid: orderId
			}).then(res => {
				let index = this.lists.findIndex(item => {
					return item.orderId == orderId
				})
				this.lists.splice(index,1)
				Message(res.message)
			})
    },
    sign(orderId) {
			Order.sign("post",{
				orderid: orderId
			}).then(res => {
				let index = this.lists.findIndex(item => {
					console.log("item.orderId:",item.orderId)
					console.log("orderId:",orderId)
					return item.orderId == orderId
				})
				console.log(index)
				this.lists[index].state = 5
				this.lists[index].stateStr = "交易成功"
				Message(res.message)
			})
    },
    pageChange(pageNum) {
      this.pageNum = pageNum
      this.getLists()
    },
	},
	watch: {
		'$route'(){
			this.getLists()
		}
	},
  components: {
    Pagination
  }
}
