<template>
	<div class="search wrapper-width">
		<div class="main-content-w">
			<div class="content-title">
				<i class="logo-red"></i>
				<p>挖掘机叉车服务平台</p>
			</div>
			<div class="search-box">
				<div class="search-type-btn clearfix" @click="toggle" @mouseleave="isShow=false">
					{{ curList.name }}
					<!--arrow-down箭头向下-->
					<!--arrow-up 箭头向上-->
					<i :class="{'arrow-down':isShow,'arrow-up':!isShow}"></i>
					<div class="search-ul-wrap">
						<ul v-if="isShow">
							<li v-for="(item,index) of lists" :key="index">
								<a href="javascript:;" @click.stop="change(index)">{{ item.name }}</a>
							</li>
						</ul>
					</div>
				</div>
				<input type="text" v-model.trim="keyWord" :placeholder="'请输入您想搜索的' + curList.msg">
				<button @click="search">
					<i class="icon-search"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import {Message} from 'element-ui'

export default {
	data() {
		return {
			lists: [
				{name: '租挖掘机',state: 1,msg: '挖掘机'},
				{name: '买挖掘机',state: 2,msg: '挖掘机'},
				{name: '配件',state: 3,msg: '配件'},
				{name: '文章',state: 4,msg: '文章'},
			],
			keyWord: '',
			isShow: false,
			curIdex: 1
		}
	},
	computed: {
		curList(){
			return this.lists[this.curIdex]
		}
	},
	methods: {
		change(index){
			this.curIdex = index
			this.isShow = false
		},
		toggle(){
			if(!this.isShow){
				this.isShow = true
			}else{
				this.isShow = false
			}
			
		},
		search(){
			if(!this.keyWord){
				Message('请输入需要查找的信息！')
				return
			}

			location.href = `productLists.html?state=${this.curList.state}&keyword=${this.keyWord}`
		}
	}
}
</script>

<style scoped lang='scss'>
@import './search.scss'
</style>
