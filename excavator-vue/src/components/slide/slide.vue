<template>
	<div class="carousel-wrap mt13">
		<transition-group class='slide-ul' tag="ul" name="list" mode="out-in">
			<li v-for="(item,index) of slideList" :key="index" v-show="index===slideIndex" @mouseenter="stop" @mouseleave="go">
				<a :src="item.clickUrl">
					<img :src="item.image" :alt="item.desc">
				</a>
			</li>
		</transition-group>
		<div class="carousel-items">
			<span v-for="(item,index) of slideList.length" :key="index" :class="{'active':index===slideIndex}" @click="change(index)"></span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'rotation',
	props: ['slideList','model'],
	data() {
		return {
			slideIndex: 0,
			timer: null
		}
	},
	created(){
		require(`./${this.model}.css`)
	},
	mounted() {
		this.$nextTick(() => {
			this.timer = setInterval(() => {
				this.auto()
			}, 3000)
		})
	},
	methods: {
		change(index) {
			this.slideIndex = index
		},
		auto() {
			this.slideIndex++
			if (this.slideIndex > this.slideList.length - 1) {
				this.slideIndex = 0
			}
		},
		go() {
			clearInterval(this.timer)
			this.timer = setInterval(() => {
				this.auto()
			}, 3000)
		},
		stop() {
			clearInterval(this.timer)
			this.timer = null
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../modules/sass/variables.scss";
.carousel-wrap {
	position: relative;
	height: 453px;
	width: 100%;
	overflow: hidden;
	background-color: #fff;
}

.slide-ul {
	width: 100%;
	height: 100%;
	li {
		position: absolute;
		width: 100%;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
		}
	}
}

.carousel-items {
	position: absolute;
	z-index: 10;
	top: 380px;
	width: 100%;
	margin: 0 auto;
	text-align: center;
	font-size: 0;
	span {
		display: inline-block;
		height: 6px;
		width: 30px;
		margin: 0 3px;
		background-color: #b2b2b2;
		cursor: pointer;
	}
	.active {
		background-color: $btn-color;
	}
}
</style>
