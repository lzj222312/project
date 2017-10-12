class Utils {
	/**
	 * 获取url参数值
	 */
	static getQuery(key=undefined){
		let arr = location.search.substr(1).split('&')
		return this.arrToObj(key,arr)
	}

	static arrToObj(key,arr){
		let data = {}
		arr.forEach((item) => {
			let cur = item.split('=')
			data[cur[0].trim()] = cur[1].trim()
		})
		return key ? data[key]:data
	}
}

export default Utils