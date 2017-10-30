 import cart from 'js/cartServer.js'
 import Pagination from 'components/pagination/pagination.vue'
 import {
   Message
 } from 'element-ui'

 export default {
   name: 'cart',
   data() {
     return {
       listsData: [],
       lists: [],
       allSelected: false,
       total: 0,
       pageNum: 1,
       pageSize: 6,
       total: 0,
       pageSize: 8,
       pageNum: 1,
       timer: null
     }
   },
   computed: {
     selectIndex() {
       return this.$route.query.index
     },
     sum() {
       let sum = 0
       this.lists.forEach((item) => {
         if (item.isSelected) {
           sum += item.sum
         }

       })
       return sum
     }
   },
   created() {
     this.getLists()
   },

   methods: {
     goIndex() {
       location.href = 'index.html'
     },
     getLists() {
       cart.list("post", {
         pageNum: this.pageNum,
         pageSize: this.pageSize,
         type: this.selectIndex
       }).then(res => {
         let data = res.data

         data.list.forEach(item => {
           item.isSelected = false
         })

         this.listsData = data
				 this.lists = data.list
				 this.total = data.total
       })
     },
     add(data) {
       let item = data.item
       if (data.type === "number") {
         if (item.number >= item.stock) {
           return
         }
         item.number++
       } else {
         item.month++
       }

       item.sum = item.discount * item.number * (this.selectIndex == 1 ? item.month : 1)

       if (this.timer) {
         clearTimeout(this.timer)
         this.timer = null
       }
       this.timer = setTimeout(() => {
         cart.add("post", {
           month: item.month,
           number: item.number,
           type: this.selectIndex,
           unifiedMerchandiseId: item.unifiedMerchandiseId
         }).then(res => {
           Message(res.message)
         })
       }, 1000)
     },

     reduce(data) {
       let item = data.item
       if (data.type === "number") {
         if (item.number <= 1) {
           return
         }
         item.number--
       } else {
         if (item.month <= 3) {
           return
         }
         item.month--
       }

       item.sum = item.discount * item.number * (this.selectIndex == 1 ? item.month : 1)

       if (this.timer) {
         clearTimeout(this.timer)
         this.timer = null
       }
       this.timer = setTimeout(() => {
         cart.add("post", {
           month: item.month,
           number: item.number,
           type: this.selectIndex,
           unifiedMerchandiseId: item.unifiedMerchandiseId
         }).then(res => {
           Message(res.message)
         })
       }, 1000)
     },
     update(data) {
       data.sum = data.discount * data.number * (this.selectIndex == 1 ? data.month : 1)
     },
     toggle(item) {
       if (item.isSelected) {
         this.allSelected = this.checkAll()
       } else {
         this.allSelected = false
       }
     },
     checkAll() {
       return this.lists.every(item => {
         return item.isSelected
       })
     },
     toggleAll() {
       this.lists.forEach(item => {
         item.isSelected = this.allSelected
       })
     },
     remove() {
       let remove = []

       this.lists = this.lists.filter(item => {
         if (item.isSelected) {
           remove.push(item.unifiedMerchandiseId)
         }
         return !item.isSelected
       })

       remove = remove.join(',')
       cart.remove("post", {
         longList: remove,
         type: this.selectIndex
       }).then(res => {
         Message(res.message)
       })
     },
     pageChange(pageNum) {
			 this.pageNum = pageNum
			 this.getLists()
     },
     changeNum(page) {

     },
     goApply() {

     },
   },
   watch: {
     $route() {
       this.getLists()
       this.allSelected = false
     }
   },
   components: {
     Pagination
   }
 }
