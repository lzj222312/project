<template>
	<div>

		<!--购物车为空-->
		<div class="cart-empty" v-if='listsData&&lists.length==0'>
			<h2>
				<i class="icon-IconCart"></i>您的购物车为空!</h2>
			<button @click='goIndex'>返回首页</button>
		</div>

		<template v-if="listsData&&lists.length">
			<!--配件购物车-->
			<div class="cart-common cart-accessory mt13" v-if="selectIndex === 3">
				<ul class="cart-title">
					<li>选项</li>
					<li>缩略图</li>
					<li>配件名</li>
					<li>适配叉车</li>
					<li>单价（元）</li>
					<li>数量（件）</li>
					<li>金额（元）</li>
				</ul>
				<div class="cart-detail mt13">
					<table>
						<tr v-for="(item,index) in lists" :key="index">
							<td>
								<input type="checkbox" class="cart-checkbox" v-model="item.isSelected" name="cart-checked" @change="toggle(item)">
							</td>
							<td>
								<div class="cart-detail-img">
									<img :src="item.image" alt="">
								</div>
							</td>
							<td>{{item.name}}</td>
							<td class="adapter-name">
								 <span v-for='(adapter,index) in item.adapterForkliftType' :key="index">{{adapter}}</span> 
							</td>
							<td>¥{{item.discount}}</td>
							<td class="num">
								<a class="icon-jian" href="javascript:;" @click='reduce({
			                          type: "number",
			                          item
			                          })'></a>
								<input type="text" v-model.number="item.number" @change="update(item)">
								<a class="icon-jia" href="javascript:;" @click='add({
			                          type: "number",
			                          item
			                          })'></a>
							</td>
							<td class="fbtn-color">¥{{item.sum}}</td>
						</tr>
					</table>
					<div class="cart-bottom">
						<div class="float-l">
							<span><input type="checkbox" class="cart-checkbox" name="cart-checked" v-model='allSelected' @change="toggleAll">全选</span>
							<a href="javascript:;" @click='remove()'>
								<i class="icon-delete"></i>删除</a>
						</div>
						<div class="float-r">
							<span class="fbtn-color">合计：
								<i>¥{{sum}}</i>
							</span>
							<!--售购物车的按钮是“提交意向单”-->
							<button @click='goApply()'>去结算</button>
						</div>
					</div>
				</div>
			</div>
			<!--售，租购物车-->
			<div class="cart-common cart-rent mt13" v-if='selectIndex < 3'>
				<ul class="cart-title">
					<li>选项</li>
					<li>缩略图</li>
					<li>叉车名</li>
					<li>型号</li>
					<template v-if='selectIndex === 1'>
						<li>月租价（元）</li>
						<li>数量（辆）</li>
						<li>租赁月数</li>
					</template>
					<template v-if='selectIndex === 2'>
						<li>单价（元）</li>
						<li>数量（辆）</li>
					</template>
					<li>金额（元）</li>5
				</ul>
				<div class="cart-detail mt13">
					<table>
						<tr v-for="(item,index) in lists" :key="index">
							<td>
								<input type="checkbox" class="cart-checkbox" name="cart-checked" v-model="item.isSelected" @change="toggle(item)">
							</td>
							<td>
								<div class="cart-detail-img">
									<img :src="item.image" alt="">
								</div>
							</td>
							<td>{{item.name}}</td>
							<td>{{item.model}}</td>
							<td>¥{{item.discount}}</td>
							<td class="num">
								<a class="icon-jian" href="javascript:;" @click='reduce({
			                          type: "number",
			                          item
			                          })'></a>
								<input type="text" v-model.number="item.number" @change="update(item)">
								<a class="icon-jia" href="javascript:;" @click='add({
																type: "number",
			                          item
			                          })'></a>
							</td>
							<td class="num" v-if="selectIndex === 1">
								<a class="icon-jian" href="javascript:;" @click='reduce({
			                          type: "month",
			                          item
			                          })'></a>
								<input type="text" v-model.number="item.month" @change="update(item)">
								<a class="icon-jia" href="javascript:;" @click='add({
			                          type: "month",
			                          item
			                          })'></a>
							</td>
							<td class="fbtn-color">¥{{item.sum}}</td>

						</tr>
					</table>
					<div class="cart-bottom">
						<div class="float-l">
							<span><input type="checkbox" class="cart-checkbox" name="cart-checked" v-model="allSelected" @change="toggleAll">全选</span>
							<a href="javascript:;" @click='remove()'>
								<i class="icon-delete"></i>删除</a>
						</div>
						<div class="float-r">
							<span class="fbtn-color">合计：
								<i>¥{{sum}}</i>
							</span>
							<button @click='goApply()'>提交意向单</button>
						</div>
					</div>
				</div>
			</div>
		</template>

		<pagination v-if="listsData&&lists.length" :total="total" :page-size="pageSize" :page-num="pageNum" @change="pageChange"></pagination>
	</div>
</template>

<script>
import vm from './js/cart.js'
export default vm
</script>

<style scoped lang='scss'>
@import "../../../modules/sass/variables.scss";


/*购物车为空*/

.cart-empty {
	margin-top: 120px;
	h2 {
		font-size: 35px;
		color: #7a7a7a;
		font-weight: 400;
		line-height: 250px;
		text-align: center;
		i {
			display: inline-block;
			padding: 0 30px;
			font-size: 74px;
			line-height: 250px;
			vertical-align: middle;
			color: #b7b7b7;
		}
	}
	button {
		display: block;
		width: 176px;
		margin: 0 auto;
		font-size: 14px;
		height: 36px;
		line-height: 36px;
		color: #fff;
		background: $btn-color;
		text-align: center;
		border-radius: 3px;
		letter-spacing: 10px;
	}
}



/*购物车公用的样式cart-common*/

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
		.adapter-name {
			padding: 0 15px;
			text-align: left;
		}
	}
	.num {
		font-size: 0;
		height: 16px;
		input {
			font-size: 14px;
			height: 16px;
			width: 34px;
			line-height: 16px;
			vertical-align: middle;
			border: none;
			text-align: center;
			color: #303030;
		}
		a {
			font-size: 16px;
			color: $theme-color;
			line-height: 16px;
			vertical-align: middle;
		}
	}
	.cart-checkbox {
		-webkit-appearance: initial;
		-moz-appearance: initial;
		-ms-appearance: initial;
		-o-appearance: initial;
		display: inline-block;
		width: 17px;
		height: 17px;
		z-index: 1;
		background: url(./imgs/Icon-circle.png) no-repeat center;
	}
	input[name="cart-checked"]:checked {
		background: url(./imgs/Icon-circle-dot.png) no-repeat center;
	}
}

.cart-bottom {
	height: 48px;
	line-height: 48px;
	font-size: 14px;
	span {
		position: relative;
		padding: 0 20px 0 90px;
		i {
			height: 48px;
			font-size: 24px;
			padding-right: 20px;
			vertical-align: middle;
		}
		input {
			position: absolute;
			left: 40px;
			top: 0;
			margin-right: 10px;
		}
	}
	a {
		display: inline-block;
		color: #303030;
		i {
			display: inline-block;
			padding: 0 8px;
			color: #c4c4c4;
			font-size: 16px;
			vertical-align: middle;
		}
	}
	button {
		display: inline-block;
		height: 30px;
		width: 80px;
		font-size: 14px;
		line-height: 30px;
		border-radius: 3px;
		background: $btn-color;
		color: #fff;
		margin-right: 30px;
	}
}
</style>
