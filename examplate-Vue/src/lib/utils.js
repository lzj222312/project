/**
 *	封装账号存储组件
 */
let local = {
	save: function(key,value) {
		localStorage.setItem(key,JSON.stringify(value))
	},
	fetch: function(key) {
		return JSON.parse(localStorage.getItem(key)) || {}
	}
}

export default {
	install: function(vm) {
		vm.prototype.$local = local
	}
}