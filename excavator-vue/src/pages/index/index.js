import 'normalize.css'
import './index.scss'

import {rap,fetch} from 'js/fetch.js'
import Rotation from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
import Search from 'components/search/search.vue'

let url = {
  list: '/merchandiseHot/list.do',
  slides: '/rotation/homeRotation'
}

url = rap(url)
new Vue({
  el: '#body',
  data: {
    excavatorList: '',
    partsList: '',
		slides: ''
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
			})
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
	},
	components: {
		Rotation,
		Top,
		Foot,
		Search
	}
})

