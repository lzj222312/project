import { fetch,rap } from './fetch.js'

let url = {
	list: '/cart/list.do',
  add: '/cart/add.do',
  reduce: '/cart/reduce.do',
  remove: '/cart/remove.do'
}
url = rap(url)

class Cart{
	static list(mothed="get",data){
		return fetch(mothed,url.list,data)
	}

	static add(mothed="get",data){
		return fetch(mothed,url.add,data)
	}

	static reduce(mothed="get",data){
		return fetch(mothed,url.reduce,data)
	}

	static remove(mothed="get",data){
		return fetch(mothed,url.remove,data)
	}	
}

export default Cart