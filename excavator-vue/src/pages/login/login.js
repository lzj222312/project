import 'normalize.css'
import './login.scss'

import { Button,Message } from 'element-ui'
import { rap,fetch } from 'js/fetch.js'
import { checkphone } from 'js/validate.js'

Vue.use(Button)

let url = {
  login: '/user/login.do'
}

url = rap(url)

new Vue({
  el: '#loginBoxMsg',
  data: {
    phone: '',
    passwd: '',
    phoneMsg: '',
    passwdMsg: '',
		loginFlag: false
  },
  methods: {
    isPhone() {
      if (!this.phone) {
        this.phoneMsg = '手机不能为空！'
        return false
      }
      if (!checkphone(this.phone)) {
        this.phoneMsg = '请输入正确的手机号码！'
        return false
      }

      this.phoneMsg = ''
      return true
    },
    isPasswd() {
      if (!this.passwd) {
        this.passwdMsg = '请输入密码！'
        return false
      }

      this.passwdMsg = ''
      return true
    },
    isLogin() {
			let _this = this
      if (this.isPhone() && this.isPasswd()) {
				this.loginFlag = true
        fetch("post",url.login,{
					mobile: this.phone,
					pwd: this.passwd
				}).then((data) => {
					this.loginFlag = false
          Message({
						message:	data.message,
						type: 'success'
          })
				})
				return false
			}
			Message({
						message:	'请填写对应的手机号码和密码',
						type: 'warning',
						onClose: function(){
							_this.phoneMsg = ''
						}
          })
    }
  }
})
