import Pagination from 'components/pagination/pagination.vue'
import order from 'js/orderServer.js'

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

    },
    methods: {
      getLists() {

      },
      cancel(id,index) {

      },
      change(page) {

      }
    },
    watch: {

    },
    components: {
      Pagination
    }
}
