<template>
	<div>
		<div class="cart-common mt13" v-if="lists && lists.length">
			<ul class="intention-thead">
				<li>缩略图</li>
				<li>叉车名</li>
				<li>型号</li>
				<template v-if='index == 0'>
					<li>月租价（元）</li>
					<li>数量（辆）</li>
					<li>租赁月数</li>
				</template>
				<template v-if='index == 1'>
					<li>单价（元）</li>
					<li>数量（辆）</li>
				</template>
				<li>金额（元）</li>
				<li class="pay-money">支付金额（元）</li>
			</ul>
			<div class="intention-order-common mt13" v-for="(list,index) in lists" :key="index">
				<div class="intention-title">
					<p class="float-l">意向单号：{{list.orderNumber}}</p>
					<p class="float-r">下单时间：{{list.timeStr}}</p>
				</div>
				<div class="cart-detail intention-content clearfix">
					<!--左边-->
					<div class="intention-content-left float-l">
						<table>
							<tr v-for="(item,index) in list.explicitlyIntentions" :key="index">
								<td>
									<div class="cart-detail-img">
										<img :src="item.image" alt="">
									</div>
								</td>
								<!-- <td>{{item.name}}</td> -->
								<td>{{item.modelNumber}}</td>
								<td>¥{{item.price}}</td>
								<td>{{item.number}}</td>
								<td>{{item.length}}</td>
								<td class="fbtn-color">¥{{item.countDiscount}}</td>
							</tr>
						</table>
					</div>
					<!--右边-->
					<div class="intention-content-right float-r">
						<div class="total-price">
							<p></p>
							<span class="fbtn-color">合计：
								<i>¥{{list.countNum}}</i>
							</span>
						</div>
						<div class="total-btns">
							<button @click='cancel(list.id,index)'>取消意向单</button>
						</div>
					</div>
				</div>
			</div>
			<pagination v-if="lists&&lists.length" :total="total" :page-size="pageSize" :page-num="pageNum" @change="pageChange"></pagination>
		</div>
		<div class="cart-empty" v-else>
			<h2><i class="icon-IconCart"></i>您的意向单为空!</h2>
			<button @click='goIndex'>返回首页</button>
		</div>
	</div>
</template>

<script>
import vm from './js/intention.js'
export default vm
</script>

<style lang="scss">
@import "../../../modules/sass/variables.scss";

.cart-common {
	color: #303030;
	margin-bottom: 20px;
	.cart-title {
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
			height: 120px;
			line-height: 120px;
			border-bottom: 1px solid #e9e9e9;
			text-align: center;
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
		height: 34px;
		line-height: 34px;
		border-bottom: 1px solid #e9e9e9;
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
	left: 20%;
	button {
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
	.bgc-white {
		background-color: #fff;
		border: 1px solid #e9e9e9;
		color: #303030;
	}
}


/*意向单--查看修改记录*/

.check-modify-record {
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
	.check-modify-record-detail {
		padding: 40px;
		li {
			position: relative;
			min-height: 100px;
			padding-left: 30px;
			line-height: 1.5;
			.bg {
				display: block;
				position: absolute;
				left: 0;
				top: 10px;
				height: 97%;
				width: 2px;
				background: url(imgs/dot-repeat.png) repeat-y left 5px;
			}
			em {
				position: absolute;
				left: -5px;
				top: 5px;
				display: block;
				height: 12px;
				width: 12px;
				border-radius: 50%;
				background: #c4c4c4;
			}
			.check-modify-record-time {
				display: inline-block;
				width: 85px;
				font-size: 14px;
				text-align: left;
				color: #3b3b3b;
				text-align: center;
			}
			.check-modify-record-msg {
				display: inline-block;
				width: 65%;
				vertical-align: top;
			}
			p {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 14px;
				color: #3b3b3b;
				padding-left: 10px;
				vertical-align: middle;
			}
			.tracking {
				color: #c4c4c4;
				line-height: 50px;
			}
			&:before {
				position: absolute;
				left: 6.5px;
				top: 8px;
				display: block;
				width: 10px;
				font-size: 20px;
				transform: rotate(90deg);
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
</style>
