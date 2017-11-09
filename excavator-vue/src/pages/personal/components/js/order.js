import Pagination from 'components/pagination/pagination.vue'
import order from 'js/orderServer.js'

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

  },
  methods: {
    getLists() {

    },
    cancel(orderId) {

    },
    remove(orderId) {

    },
    sign(orderId) {

    },
    change(page) {

    }
  },
  components: {
    Pagination
  }
}
