<template>
<div>
   <!--    已登录    -->
   <div class="personal-session-logged clearfix" v-if='isLogin'>
    <div class="personal-face">
      <img :src="headImage" />
    </div>
    <div class="personal-info">
      <p>{{name}}</p>
      <p>{{username}}</p>
    </div>
    <button>进入个人中心</button>
  </div>
  <!--     未登录    -->
  <div class="personal-session-notloged" v-if="!isLogin">
    <div class="login-box-msg">
      <div class="login-box-msg-common login-box-msg-tel">
        <i class="icon-id"></i>
        <input type="tel" placeholder="请输入已验证手机号" v-model.trim='username'>
      </div>
      <div class="login-box-msg-common login-box-msg-pwd">
        <i class="icon-key"></i>
        <input type="password" placeholder="请输入密码" v-model.trim='pwd'>
      </div>
    </div>
    <button @click='login'>登&nbsp;&nbsp;&nbsp;录</button>
  </div>
</div>
</template>

<script>
  import vm from './logstate.js'
  export default vm
</script>
