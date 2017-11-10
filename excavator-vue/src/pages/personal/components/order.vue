<template>
	<div>
		<div class="cart-common mt13" v-if="lists&&lists.length">
			<ul class="intention-thead">
				<li>缩略图</li>
				<li>配件名</li>
				<li>适配叉车</li>
				<li>单价（元）</li>
				<li>数量（件）</li>
				<li>金额（元）</li>
				<li class="pay-money">支付金额（元）</li>
			</ul>

			<div class="intention-order-common mt13" v-for="(item,index) in lists" :key="index">
				<div class="intention-title">
					<p class="float-l">订单编号：{{item.orderNumber}}
						<i class="fbtn-color">({{item.stateStr}})</i>
					</p>
					<p class="float-r">下单时间：{{item.timeStr}}</p>
				</div>
				<div class="cart-detail intention-content clearfix">
					<!--左边-->
					<div class="intention-content-left float-l">
						<table>
							<tr v-for="(list,index) in item.orderItemList" :key="index">
								<td>
									<div class="cart-detail-img">
										<img :src="list.image" alt="">
									</div>
								</td>
								<!-- <td class="list-name">{{list.name}}</td> -->
								<td>
									<p>{{list.adapterForkliftType}}</p>
								</td>
								<td>¥{{list.discount}}</td>
								<td>{{list.number}}</td>
								<td class="fbtn-color">¥{{list.countDiscount}}</td>
							</tr>
						</table>
					</div>
					<!--右边-->
					<div class="intention-content-right float-r">
						<div class="total-price">
							<p>(总金额：¥{{item.sum}},运费¥{{item.postage}})</p>
							<span class="fbtn-color">合计：
								<i>¥{{item.countSum}}</i>
							</span>
						</div>
						<div class="total-btns">
							<!-- 待付款 -->
							<template v-if='item.state === 1'>
								<button>立即支付</button>
								<button class="bgc-white" @click='cancel(item.orderId)'>取消订单</button>
							</template>

							<!-- 待签收 -->
							<template v-if='item.state === 3'>
								<button @click='sign(item.orderId)'>确认收货</button>
							</template>
							<!-- 订单关闭、订单取消 -->
							<template v-if='item.state === 4'>
								<button class="bgc-white" @click='remove(item.orderId)'>删除订单</button>
							</template>
						</div>
					</div>
				</div>
			</div>
			<pagination v-if="lists&&lists.length" :total="total" :page-size="pageSize" :page-num="pageNum" @change="pageChange"></pagination>
		</div>
		<div class="cart-empty" v-else>
			<h2>
				<i class="icon-IconCart"></i>您的意向单为空!</h2>
			<button @click='goIndex'>返回首页</button>
		</div>
	</div>
</template>

<script>
import vm from './js/order.js'
export default vm
</script>

<style lang="scss">
@import "../../../modules/sass/variables.scss";
@import "../../../modules/icon/style.css";
.cart-common {
	color: #303030;
	margin-bottom: 20px;
	.cart-title {
		table-layout: fixed;
		width: 100%;
		height: 38px;
		border: 1px solid #e9e9e9;
		background: #f8f8f8;
		li {
			display: table-cell;
			font-size: 14px;
			color: #303030;
			text-align: center;
			line-height: 38px;
		}
	}
	.cart-detail {
		border: 1px solid #e9e9e9;
		table {
			width: 100%;
			table-layout: fixed;
		}
		td {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			border-bottom: 1px solid #e9e9e9;
			text-align: center;
			p {
				text-align: left;
				width: 100px;
				padding-left: 10px;
				line-height: 24px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.cart-detail-img {
			width: 98px;
			height: 98px;
			line-height: 98px;
			margin: 10px auto 10px;
			border: 1px solid #e9e9e9;
			img {
				display: block;
				width: 100%;
			}
		}
		.list-name {
			width: 130px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.cart-detail-img {
			width: 98px;
			height: 98px;
			line-height: 98px;
			margin: 10px auto 10px;
			border: 1px solid #e9e9e9;
			img {
				display: block;
				width: 100%;
			}
		}
	}
}

.cart-checkbox {
	-webkit-appearance: initial;
	-moz-appearance: initial;
	-ms-appearance: initial;
	-o-appearance: initial;
	display: inline-block;
	width: 12px;
	height: 12px;
	z-index: 1;
	border: 1px solid #808080;
	border-radius: 50%;
	background-color: #fff;
}

input[name="cart-checked"]:checked {
	background-color: $theme-color;
	border: 1px solid $theme-color;
}

.type-selection {
	overflow: hidden;
	border-bottom: 1px solid #e9e9e9;
	margin-bottom: 20px;
	li {
		float: left;
		padding: 0 10px;
		line-height: 60px;
	}
	.cart-checkbox {
		vertical-align: top;
		margin-top: 25px;
	}
}

.intention-thead {
	display: table;
	table-layout: fixed;
	width: 100%;
	height: 38px;
	border: 1px solid #e9e9e9;
	background: #f8f8f8;
	li {
		display: table-cell;
		font-size: 14px;
		color: #303030;
		text-align: center;
		line-height: 38px;
	}
	.pay-money {
		width: 22%;
	}
}

.intention-order-common {
	border: 1px solid #e9e9e9;
	overflow: hidden;
	.intention-title {
		p {
			padding: 0 20px;
			margin: 0;
		}
	}
	.cart-detail {
		border: none;
	}
	.intention-content-left {
		width: 80%;
		height: 362px;
		overflow-y: scroll;
		border-right: 1px solid #e9e9e9;
	}
}

.intention-title {
	height: 34px;
	line-height: 34px;
	overflow: hidden;
	border-bottom: 1px solid #e9e9e9;
}

.intention-content-right {
	position: relative;
	width: 19%;
	height: 362px;
	.total-price {
		text-align: center;
		p {
			margin-top: 130px;
			padding: 0 28px;
			line-height: 24px;
		}
		span {
			line-height: 34px;
		}
		i {
			font-size: 20px;
		}
	}
}

.total-btns {
	position: absolute;
	bottom: 20px;
	left: 25%;
	.bgc-white {
		background-color: #fff;
		border: 1px solid #e9e9e9;
		color: #303030;
	}
}

.intention-order-common button {
	display: block;
	height: 28px;
	width: 100px;
	margin: 12px auto 0;
	background: $btn-color;
	border: 1px solid $btn-color;
	line-height: 28px;
	border-radius: 3px;
	color: #fff;
}

.comfirm-btn {
	float: right;
	margin: 20px 0;
}

.order-detail {
	border: 1px solid #e9e9e9;
	.order-detail-state {
		height: 64px;
		font-size: 12px;
		line-height: 32px;
		background: #454545;
		color: #fff;
		padding: 0 20px;
	}
	.order-detail-content {
		padding: 0 20px;
		h2 {
			font-size: 14px;
			line-height: 50px;
		}
		em {
			display: inline-block;
			height: 14px;
			width: 4px;
			background: $btn-color;
			margin-right: 5px;
			vertical-align: top;
			margin-top: 17px;
		}
		p {
			line-height: 24px;
			padding: 10px;
		}
	}
}

.product-detail {
	border: 1px solid #e9e9e9;
	margin-bottom: 50px;
}

.product-detail-title {
	overflow: hidden;
	display: table;
	width: 100%;
	table-layout: fixed;
	border-bottom: 1px solid #e9e9e9;
	li {
		display: table-cell;
		font-size: 14px;
		text-align: center;
		line-height: 34px;
		color: #303030;
		background: #f8f8f8;
	}
	.pay-ment {
		width: 22%;
	}
}

.product-detail-content {
	overflow: hidden;
	.table-wrap {
		float: left;
		width: 80%;
		height: 362px;
		overflow-y: scroll;
	}
	table {
		width: 100%;
		table-layout: fixed;
	}
	td {
		height: 120px;
		font-size: 12px;
		text-align: center;
		border-bottom: 1px solid #e9e9e9;
		img {
			height: 98px;
			width: 98px;
			border: 1px solid #e9e9e9;
		}
	}
	.total-price {
		p {
			padding: 0 28px;
		}
	}
	.special {
		width: 90px;
		padding: 0 30px;
		text-align: left;
		line-height: 20px;
		height: 60px;
		overflow: hidden;
	}
}

.intention-content-right {
	position: relative;
	width: 19%;
	height: 362px;
	.total-price {
		text-align: center;
		p {
			margin-top: 130px;
			padding: 0 28px;
			line-height: 24px;
		}
		span {
			line-height: 34px;
		}
		i {
			font-size: 20px;
		}
	}
}





/*流程走向*/

.review-process {
	li {
		position: relative;
		float: left;
		width: 18%;
		padding: 50px 7% 50px 0;
		text-align: center;
		p {
			display: none;
			font-size: 12px;
			line-height: 20px;
		}
		h3 {
			font-size: 20px;
			line-height: 50px;
			color: #cacaca;
			font-weight: 400;
		}
		span {
			display: block;
			height: 30px;
			width: 30px;
			margin: 0 auto;
			font-size: 14px;
			border: 5px solid #cacaca;
			border-radius: 50%;
			color: #fff;
			line-height: 30px;
			font-weight: 700;
			background: #cacaca;
		}
		&:before {
			position: absolute;
			right: 70.5%;
			top: 68px;
			display: block;
			content: "";
			height: 4px;
			width: 87%;
			background: #cacaca;
		}
		&:first-child:before {
			display: none;
		}
	}
	.tips-pop {
		position: relative;
		position: absolute;
		left: -10px;
		top: 170px;
		width: 276px;
		height: auto;
		padding: 0 20px;
		font-size: 12px;
		border: 1px solid #e9e9e9;
		box-shadow: 0 0 5px #cdcdcd;
		background: #fff;
		text-align: left;
		z-index: 100;
		h6 {
			line-height: 36px;
			height: 36px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 100%;
		}
		i {
			line-height: 30px;
		}
		dl {
			line-height: 30px;
			overflow: hidden;
		}
		dt {
			float: left;
		}
		dd {
			float: left;
			width: 80%;
		}
		&:before {
			display: block;
			content: "";
			position: absolute;
			left: 35%;
			top: -16px;
			width: 0;
			height: 0;
			border-bottom: 16px solid #fff;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			z-index: 101;
			margin-left: 2px;
		}
		&:after {
			display: block;
			content: "";
			position: absolute;
			left: 35%;
			top: -20px;
			width: 0;
			height: 0;
			border-bottom: 20px solid #e9e9e9;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			z-index: 100;
		}
	}
	.current,
	.fail-process {
		h3 {
			color: #3b3b3b;
		}
		&:before {
			background: $theme-color;
		}
		p {
			display: block;
		}
	}
	.current {
		span {
			background: $theme-color;
		}
	}
	.fail-process {
		span {
			background: #ff0000;
		}
	}
}

.order-detail-content {
	.notice-tips {
		width: 100%;
		line-height: 30px;
		overflow: hidden;
		margin-bottom: 10px;
		dl {
			float: left;
			width: 23%;
			padding-right: 2%;
		}
		dt {
			float: left;
			text-align: left;
		}
		dd {
			float: left;
			width: 75%;
		}
	}
	.application-detail {
		padding: 50px 0;
		overflow: hidden;
		p {
			width: 25%;
			line-height: 30px;
			float: left;
		}
		.special {
			width: 60%;
		}
		dl {
			display: block;
			width: 100%;
			overflow: hidden;
			line-height: 30px;
		}
		dt {
			float: left;
			width: 60px;
		}
		dd {
			float: left;
		}
		img {
			display: block;
			float: left;
			width: 75px;
			height: 75px;
			padding-right: 10px;
			margin-top: 10px;
		}
	}
}

.order-title {
	position: relative;
	padding-left: 10px;
	font-size: 14px;
	color: #454545;
	line-height: 40px;
	&:before {
		position: absolute;
		left: 0;
		top: 13px;
		display: block;
		content: "";
		overflow: hidden;
		height: 14px;
		width: 4px;
		background: $btn-color;
	}
}





/*弹框*/


/* 我的订单--支付方式*/

.payment-way {
	width: 600px;
	margin-left: -300px;
	.pop-up-title {
		width: 600px;
		&:before {
			left: 160px;
		}
		&:after {
			right: 160px;
		}
	}
	.payment-way-detail {
		overflow: hidden;
		padding: 40px;
		li {
			overflow: hidden;
			color: #3b3b3b;
			height: 100px;
			input[type="radio"] {
				display: block;
				float: left;
				-webkit-appearance: initial;
				-moz-appearance: initial;
				-ms-appearance: initial;
				-o-appearance: initial;
				display: inline-block;
				width: 15px;
				height: 15px;
				border: 1px solid #7a7a7a;
				border-radius: 50%;
				margin: 40px 50px 0 0;
			}
			input[type="radio"]:checked {
				background: $theme-color;
				border: none;
			}
			img {
				display: block;
				float: left;
				height: 100px;
				width: 100px;
				margin-right: 30px;
			}
			span {
				float: left;
				font-size: 30px;
				line-height: 100px;
			}
		}
		.last-list {
			color: $btn-color;
			&:before {
				color: #c4c4c4;
			}
		}
	}
}

.btn-content {
	margin-top: 30px;
	text-align: center;
	button {
		display: inline-block!important;
		margin: 0 20px !important;
		font-size: 14px;
		letter-spacing: 0 !important;
		padding-left: 0 !important;
	}
	.cancel-btn {
		background-color: #fff!important;
		color: #404040!important;
		border: 1px solid #e9e9e9;
	}
}





/*退款售后--申请售后*/

.after-sale-info {
	width: 600px;
	margin-left: -300px;
	.pop-up-title {
		width: 600px;
		&:before {
			left: 160px;
		}
		&:after {
			right: 160px;
		}
	}
	dl {
		overflow: hidden;
		height: 30px;
		height: 30px;
	}
	dt {
		float: left;
	}
	.num {
		float: left;
		padding-left: 20px;
		font-size: 0;
		input {
			border: 0 none;
			width: 25px;
			height: 14px;
			font-size: 14px;
			line-height: 14px;
			padding: 0 5px;
			text-align: center;
			vertical-align: middle;
		}
		a {
			display: inline-block;
			vertical-align: middle;
			font-size: 14px;
			line-height: 14px;
			color: $theme-color;
		}
	}
	.after-sale-info-detail {
		padding: 28px;
		select {
			display: block;
			height: 38px;
			width: 100%;
			padding: 0 5px;
			font-size: 14px;
			line-height: 38px;
			border: 1px solid #e9e9e9;
			margin-bottom: 20px;
		}
		.default-select {
			display: none;
		}
		.refund-amount {
			display: block;
			width: 97.9%;
			height: 38px;
			padding: 0 5px;
			font-size: 14px;
			line-height: 38px;
			border: 1px solid #e9e9e9;
			margin: 10px 0;
		}
		p {
			padding-left: 10px;
			font-size: 14px;
			color: #000;
			line-height: 50px;
		}
		textarea {
			width: 97.9%;
			height: 138px;
			padding: 5px;
			border: 1px solid #e9e9e9;
			resize: none;
		}
		.add-pic-content {
			height: 101px;
			img {
				width: 100px;
				height: 100px;
				margin-right: 20px;
			}
			a {
				display: inline-block;
				height: 50px;
				width: 50px;
				vertical-align: top;
				margin-top: 25px;
				background: url(imgs/add-pic-btn.png) no-repeat center;
			}
			.add-img {
				position: relative;
				display: inline-block;
			}
			i {
				position: absolute;
				right: 15px;
				top: -10px;
				display: block;
				height: 22px;
				width: 22px;
				background: url(imgs/delete-btn.png) no-repeat center;
			}
		}
	}
}
</style>
