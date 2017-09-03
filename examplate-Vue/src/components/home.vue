<template>
	<div class="main">
		<div class="home-header">
			<img src="../assets/miaov.png" alt="">
			<div class="portrait">
				<router-link v-if="!isLogin" :to="{path:'/login'}" tag="span" class="login">登录</router-link>
				<img v-if="isLogin" src="../assets/portrait.png" alt=""> 
			</div>
		</div>
		<div class="phrase">
			一起学习Vue-router
		</div>
		<div class="project-btn">
			<router-link :to="{path:'/project'}" tag="span" class="trans">我的项目</router-link>
			<router-link :to="{path:'/doc'}" tag="span" class="trans">我的文档</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return {
				isLogin: false
			}
		},
		created(){
			let $login = this.$local.fetch('miaoV')

			this.isLogin = $login.islogin
		}
	}
</script>
