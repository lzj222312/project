import Pagination from 'components/pagination/pagination.vue'
import Order from 'js/orderServer.js'
import {
  Message
} from 'element-ui'

export default {
  data() {
    return {
      index: 0,
      lists: '',
      pageSize: 2,
      pageNum: 1,
      total: ''
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
      Order.intentionlists("post").then(res => {
        let data = res.data
        this.lists = data.list
        this.total = data.total
      })
    },
    cancel(id, index) {
      Order.cancel("post", {
        orderid: id
      }).then(res => {
        this.lists.splice(index, 1)
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
