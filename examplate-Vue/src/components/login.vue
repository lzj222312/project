<template>
	<div class="login">
		<div class="login-box">
			<h2>登录</h2>
			<form autocomplete="off">
				<div>
					<input type="text" placeholder="请输入用户名" name="user" ref="userName">
				</div>
				<div>
					<input type="password" placeholder="请输入密码" name="passwd" ref="passWd">
				</div>
				<div>
					<input type="button" value="一键登入" @click="loginHandle">
				</div>
			</form>
			<div class="back-home">
					<router-link to="/" tag="span">首页>>></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			loginHandle(){
				let user = this.$refs.userName.value
				let pwd = this.$refs.passWd.value
				this.$local.save('miaoV',{
					userName: user,
					passWd: pwd,
					islogin: true
				})
				
				let redirect = this.$route.query.redirect

				// 登录完后跳转到主页
				if(!redirect){
					redirect = 'project'
				}

				this.$router.push({
					path: '/' + redirect
				})
			}
		}
	}
</script>

