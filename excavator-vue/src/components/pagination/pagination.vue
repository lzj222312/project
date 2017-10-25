<template>
	<div class="block">
		<el-pagination
			@current-change="handleCurrentChange"
			:page-size="pageSize" 
			layout="prev, pager, next" 
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
import { Pagination } from 'element-ui'
Vue.use(Pagination)

export default {
	props: {
		total: {
			type: Number,
			require: true
		},
		pageSize: {
			type: Number,
			default: 10
		}
	},
	data() {
		return {
			curPage: 0
		}
	},
	methods: {
		handleCurrentChange(curPage){
			this.curPage = curPage
		}
	},
	watch: {
		curPage(){
			this.$emit('change',this.curPage)
		}
	}
}
</script>

<style scoped lang='scss'>
@import './pagination.scss'
</style>
