<template>
	<div class="main-content-w clearfix">
		<!--left-->
		<section id="leftNav">
			<!--登录信息-->
			<div class="left-fault-query">
				<img :src="user.headlmage">
				<p>{{ user.name }}</p>
				<p>{{ user.mobile }}</p>
			</div>
			<!--导航-->
			<ul class="left-nav">
				<li v-for="(item,index) in tabs" :key="index" @click="changeTab(index)">
					<a href="javascript:;">
						<i :class="'icon-'+item.tabClass"></i>{{ item.tabName }}</a>
					<ul class="left-subnav" v-show="index === tabIndex">
						<li :class="{'select': index === selectIndex}" v-for="(item,index) in item.lists" :key="index" @click="changeSelect(index)">
							<a href="javascript:;">{{ item }}
								<i class="icon-fanye"></i>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</section>
		<!--right-->
		<div class="mt13 right-content">
			<!-- 路由切换 -->
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import tabs from './tabConfig.js'
import bus from 'js/bus.js'

export default {
	data() {
		return {
			tabs,
			tabIndex: 0,
			selectIndex: -1,
			user: ''
		}
	},
	created() {
		bus.$on('topLogin', (data) => {
			this.user = data.data.user
		})
	},
	methods: {
		changeTab(index){
			this.tabIndex = index
		},
		changeSelect(index){
			this.selectIndex = index
			this.$router.push({
				path: this.tabs[this.tabIndex].path,
				query: {index: this.selectIndex + 1}
			})
		}
	}
}
</script>
