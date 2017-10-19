import './logstate.scss'
import {
  Message
} from 'element-ui'
import {
  checkphone
} from 'js/validate.js'

import user from 'js/userServer.js'
import bus from 'js/bus.js'

export default {
  data() {
    return {
      name: '',
      username: '13428710659',
      headImage: '',
      isLogin: false,
      pwd: '11111'
    }
  },
  created() {
    bus.$on('dropOut', (data) => {
      this.username = ''
      this.headImage = ''
      this.isLogin = false
      this.name = ''
      this.pwd = ''
    }),
    bus.$on('topLogin', (data) => {
      this.userInfo(data)
    })
  },
  methods: {
    getUserInfo() {
      user.getUser("post", {
        mobile: this.username,
        passwd: this.pwd
      }).then((res) => {
        this.userInfo(res)
      })
    },
    login() {
      if (!this.username) {
        Message('请输入手机号')
        return
      }
      if (!checkphone(this.username)) {
        Message('请输入正确的手机号')
        return
      }
      if (!this.pwd) {
        Message('请输入密码')
        return
      }
      this.getUserInfo()
    },
    userInfo(res) {
      this.isLogin = true
      let userInfo = res.data.user
      this.name = userInfo.name
			this.headImage = userInfo.headlmage || require('./imgs/face-img2.jpg')
			
			bus.$emit('login', userInfo)
    }
  }
}
