import { fetch,rap } from './fetch'

let url = {
	commit: '/order/commit.do',
	preorder:	'/order/preorder.do',
	intentionlists: '/intention/lists.do',
  orderLists: '/order/lists.do',
  delete: '/order/delete.do',
  cancel: '/order/cancel.do',
  sign: '/order/sign.do'
}

url = rap(url)

class	Order{
	static commit(moted="get",data){
		return fetch(moted,url.commit,data)
	}

	static preorder(moted="get",data){
		return fetch(moted,url.preorder,data)
	}

	static intentionlists(moted="get",data){
		return fetch(moted,url.intentionlists,data)
	}

	static orderLists(moted="get",data){
		return fetch(moted,url.orderLists,data)
	}

	static delete(moted="get",data){
		return fetch(moted,url.delete,data)
	}

	static cancel(moted="get",data){
		return fetch(moted,url.cancel,data)
	}

	static sign(moted="get",data){
		return fetch(moted,url.sign,data)
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