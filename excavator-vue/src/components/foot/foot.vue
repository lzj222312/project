<template>
	<div id="foot" class="ft wrapper-width">
		<div class="main-content-w">
			<ul class="ft-resourceCenter">
				<li>
					<i class="ft-guide"></i>
					<h5>购物指南</h5>
					<a href="helpCenter.html">购物流程</a>
					<a href="helpCenter.html">会员介绍</a>
					<a href="helpCenter.html">常见问题</a>
				</li>
				<li>
					<i class="ft-service"></i>
					<h5>售后服务</h5>
					<a href="helpCenter.html">售后政策</a>
					<a href="helpCenter.html">价格保护</a>
					<a href="helpCenter.html">退款说明</a>
				</li>
				<li>
					<i class="ft-payment"></i>
					<h5>支付方式</h5>
					<a href="helpCenter.html">货到付款</a>
					<a href="helpCenter.html">在线支付</a>
					<a href="helpCenter.html">分期付款</a>
				</li>
				<li>
					<i class="ft-delivery"></i>
					<h5>送货方式</h5>
					<a href="helpCenter.html">配送服务查询</a>
					<a href="helpCenter.html">配送费收取标准</a>
					<a href="helpCenter.html">上门自提</a>
				</li>
			</ul>
			<div class="ft-info">
				<div class="ft-info-logo">
					<i class="logo-white"></i>
					<p>挖掘机服务平台</p>
				</div>
				<div class="ft-info-content">
					<p>挖掘机服务热线：13800138000 电子邮箱：13800138000@163.com</p>
					<p>挖掘机设备有限公司版权所有2012-2016 京ICP 备12345</p>
				</div>
				<div class="ft-info-qr">
					<img src="./imgs/download-qr-img.jpg" />
					<p>扫一扫下载APP</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fecth,rap } from 'js/fetch.js'

let url = {

}
url = rap(url)

export default {
	data(){
		return {

		}
	}
}
</script>

<style scoped lang="scss">
@import './foot.scss'
</style>
