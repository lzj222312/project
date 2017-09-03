<template>
	<div class="header-nav">
		<ul>
			<router-link to="/" tag="li" class="logo">
				<img src="../assets/miaov.png" alt="">
			</router-link>
			<router-link :to="{path:'/project'}" tag="li">
				<i class="icon-wodexiangmu"></i>
				<span>我的项目</span>
			</router-link>
			<router-link :to="{path:'/work'}" tag="li">
				<i class="icon-gongzuotai"></i>
				<span>工作台</span>
			</router-link>
			<router-link :to="{path:'/doc'}" tag="li">
				<i class="icon-wendang"></i>
				<span>文档</span>
			</router-link>
		</ul>
		<div class="login-info" v-show="islogin">
			<div class="avatar">
				<img src="../assets/portrait.png" alt="">
				<span>{{ name }}</span>
			</div>
			<div class="sign-out" @click="signOut">
				<span>登出</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				name: '456',
				islogin: false
			}
		},
		created () {
			let info = this.$local.fetch('miaoV')
			this.name = info.userName
			this.islogin = info.islogin
		},
		methods: {
			signOut(){
				this.$local.save('miaoV',null)
				this.$router.push('/')
			}
		}
	}
</script>
