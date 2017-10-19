<template>
	<div id="head" class="hd wrapper-width">
		<div class="main-content-w">
			<ul class="hd-left">
				<li>您好，欢迎来到饥人谷挖掘机服务平台!</li>
				<li v-if="!isLogin">
					<a href="login.html">请登录</a>
					<a href="register.html">注册</a>
				</li>
				<li v-else>
					<a href="javascript:;">{{ mobile }}，您好！</a>
					<a href="javascript:;" @click="dropOut">退出</a>
				</li>
			</ul>
			<ul class="hd-right">
				<li>
					<a href="index.html">
						<i class="icon-Home"></i>首页</a> | </li>
				<li>
					<a href="javascript:;">
						<i class="icon-geren"></i>个人中心</a> | </li>
				<li>
					<a href="javascript:;">
						<i class="icon-aboutus"></i>关于我们</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { fetch, rap } from 'js/fetch.js'
import bus from 'js/bus.js'

let url = {
	getUrl: '/user/getUser.do',
	dropOut: '/user/logout.do'
}
url = rap(url)

export default {
	data() {
		return {
			mobile: '',
			isLogin: false
		}
	},
	created() {
		this.getUser()

		bus.$on('login', (data) => {
			this.mobile = data.mobile
			this.isLogin = true
		})
	},
	methods: {
		getUser() {
			fetch('post', url.getUrl)
				.then((res) => {
					// console.log(res)
					this.isLogin = true
					let userInfo = res.data.user
					this.name = userInfo.name
					this.headImage = userInfo.headlmage
					this.mobile = userInfo.mobile
					bus.$emit('topLogin', res)
				})
		},
		dropOut() {
			fetch('post', url.dropOut)
				.then((res) => {
					// console.log(res)
					this.isLogin = false
					this.mobile = ''
					bus.$emit('dropOut')
				})
		}
	}
}
</script>

<style scoped lang="scss">
@import './top.scss'
</style>
