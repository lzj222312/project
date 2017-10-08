import 'normalize.css'
import 'pages/register/register.scss'

import { Button,Message } from 'element-ui'
import { checkphone } from 'js/validate.js'
import { rap,fetch } from 'js/fetch.js'

Vue.use(Button)

let ss = 10,
		url = {
			code: '/user/code.do'
		}

url = rap(url)

new Vue({
	el: '.register',
	data: {
		phone: '',
		phoneMsg: '',
		passwd: '',
		passwdMsg: '',
		verifyPasswd: '',
		verifyPasswdMsg: '',
		verification: '',
		verificationMsg: '',
		obtainSecond:	ss,
		registerFlag: false,
		isBtn: false,
		time: null
	},
	methods: {
		isPhone(){
			if(!this.phone){
				this.phoneMsg = '请填写手机号码！'
				return false
			}
			if(!checkphone(this.phone)){
				this.phoneMsg = '请输入正确的手机号码！'
				return false
			}
			this.phoneMsg = ''
			return true
		},
		isPassWd(){
			if(!this.passwd){
				this.passwdMsg = '请填写密码！'
				return false
			}
			this.passwdMsg = ''
			return true
		},
		verifyPwd(){
			if(!this.verifyPasswd){
				this.verifyPasswdMsg = '请填写确认密码！'
				return false
			}
			if(this.verifyPasswd != this.passwd){
				this.verifyPasswdMsg = '必须与登录密码保持一致！'
				return false
			}
			this.verifyPasswdMsg = ''
			return true
		},
		isObtain(){
			if(this.isPhone()){
				this.isBtn = true
				if(this.obtainSecond != ss){
					return false
				}

			fetch("post",url.code,{
				mobile: this.phone
			}).then((data) => {
				Message({
					message: data.data.code,
					type: 'success'
				})
			})

			this.time = setInterval(this.countDown,1000)
			}
		},
		countDown(){
			this.obtainSecond--

			if(this.obtainSecond <= 0){
				clearInterval(this.time)
				this.time = null
				this.obtainSecond = ss
				this.isBtn = false
			}
		},
		registered(){
			if(this.verifyPwd() && this.isPassWd() && this.isPhone()){
				if(!this.verification){
					this.verificationMsg = '请填写接收到的验证码！'
					return false
				}
				this.verificationMsg = ''
				this.registerFlag = true

				setTimeout(() => {
					location.href = 'http://localhost:8080/login.html'
				},5000)
			}
		}
	},
	watch: {
		"passwd": function(val,oldVal){
			if(val == this.verifyPasswd){
				this.verifyPasswdMsg = ''
			}
		}
	}
})