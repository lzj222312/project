<template>
	<div class="doc">
		<div class="doc-left-nav">
			<ul class="nav">
				<li class="basis">
					<router-link :to="{path:'#bas'}">基础</router-link>
					<ul class="secondary-nav">
						<li class="bassis-content">
							<router-link :to="{path:'#start'}">开始</router-link>
						</li>
						<li>
							<router-link :to="{path:'#dongtai'}">动态路由</router-link>
						</li>
						<li>
							<router-link :to="{path:'#qiantao'}">嵌套路由</router-link>
						</li>
					</ul>
				</li>
				<li class="advanced">
					<router-link :to="{path:'#adv'}">进阶</router-link>
					<ul class="secondary-nav">
						<li class="advanced-content">
							<router-link :to="{path:'#daohang'}">导航钩子</router-link>
						</li>
						<li>
							<router-link :to="{path:'#luyou'}">路由元信息</router-link>
						</li>
						<li>
							<router-link :to="{path:'#guodu'}">过度动效</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="doc-content">
			<doc-right></doc-right>
		</div>
	</div>
</template>

<script>
	import docRight from './doc-view'

	// js动画插件库，详细了解看简书
	import TWEEN from 'tween.js'

	export default {
		components: {
			docRight: docRight
		},
		beforeRouteEnter(to,from,next){
			next((vm) => {
				vm.animite(to)
				next()
			})
		},
		beforeRouteUpdate(to,from,next){
			this.animite(to)
			next()
		},
		methods: {
			animite(to){
				function animiteFunc(time){
					requestAnimationFrame(animiteFunc)
					TWEEN.update(time)
				}

				if(to.hash){
					var el = document.querySelector('#' + to.hash.slice(1)),
							doc = document.querySelector('.doc')

					if(el){
						animiteFunc()
						new TWEEN.Tween({
							position: doc.scrollTop
						})
						.to({
							position: el.offsetTop
						},500)
						.onUpdate(function(){
								doc.scrollTop = this.position.toFixed(0)
						})
						.start()
					}
				}
			}
		}
	}
</script>