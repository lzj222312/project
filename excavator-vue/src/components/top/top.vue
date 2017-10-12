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
import { fetch,rap } from 'js/fetch.js'

let url = {
	getUrl: '/user/getUser.do',
	dropOut: '/user/logout.do'
}
url = rap(url)

export default {
	data(){
		return {
			mobile: '',
			isLogin: false
		}
	},
	created(){
		this.getUser()
	},
	methods: {
		getUser(){
			fetch('post',url.getUrl)
					.then((res) => {
						// console.log(res)
						this.isLogin = true
						this.mobile = res.data.user.mobile
					})
		},
		dropOut(){
			fetch('post',url.dropOut)
					.then((res) => {
						// console.log(res)
						this.isLogin = false
						this.mobile = ''
					})
		}
	}
}
</script>

<style scoped lang="scss">
	@import './top.scss'
</style>
