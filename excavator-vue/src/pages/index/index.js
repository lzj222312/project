import 'normalize.css'
import './index.scss'

import {
  rap,
  fetch
} from 'js/fetch.js'

let url = {
  list: '/merchandiseHot/list.do',
  slides: '/rotation/homeRotation'
}

url = rap(url)
new Vue({
  el: '.main-content-w',
  data: {
    excavatorList: '',
    partsList: '',
		slides: '',
		slideIndex: 0,
		timer: null
  },
  created() {
    this.getList(3)
    this.getList()
    this.getSlides()
  },
  methods: {
    getList(type = undefined) {
      fetch("post", url.list, {
        businessType: type
      }).then((res) => {
        if (type) {
          this.partsList = res.data.merchandiseHotVOList
        } else {
          this.excavatorList = res.data.merchandiseHotVOList
        }
      })
    },
    getSlides() {
      fetch("post", url.slides).then((res) => {
				this.slides = res.data.slideList
				this.$nextTick(() => {
					this.timer = setInterval(() => {
						this.auto()
					},3000)
				})
      })
		},
		change(index){
			this.slideIndex = index
		},
		auto(){
			this.slideIndex++
			if(this.slideIndex > this.slides.length-1){
				this.slideIndex = 0
			}
			
		},
		go(){
			clearInterval(this.timer)
			this.timer = setInterval(() => {
						this.auto()
					},3000)
		},
		stop(){
			clearInterval(this.timer)
			this.timer = null
		},
    addNum(type, item) {
      type === 'buyNum' ? item.buyNum++ : item.month++
    },
    reduceNum(type, item) {
      switch (type) {
        case 'buyNum':
          if (item.buyNum <= 1) {
            return
          }
          item.buyNum--
            break
        case 'month':
          if (item.month <= 3) {
            return
          }
          item.month--
            break
      }
    }
  }
})

