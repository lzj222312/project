import { fetch,rap } from './fetch'

let url = {
	commit: '/order/commit.do',
	preorder:	'/order/preorder.do'
}

url = rap(url)

class	Order{
	static commit(moted="get",data){
		return fetch(moted,url.commit,data)
	}

	static preorder(moted="get",data){
		return fetch(moted,url.preorder,data)
	}

	static toOrder(lists,type,sum){
		let preData = {
			ids: [],
			months: [],
			numbers: [],
			sum: sum
		}
		lists.forEach(item => {
			preData.ids.push(item.unifiedMerchandiseId)
			preData.numbers.push(item.number)
			if(type === 1){
				preData.months.push(item.month)
			}
		})
		Object.keys(preData).forEach(key => {
			preData[key] = preData[key].toString()
		})
		
		sessionStorage.setItem("preData",JSON.stringify(preData))
		location.href = `submitOrder.html?type=${type}`
	}
}

export default Order