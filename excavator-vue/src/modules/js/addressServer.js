import { fetch,rap } from './fetch'

let url = {
	lists:	'/address/lists.do'
}

url = rap(url)

class Address{
	static list(mothed="get",data){
		return fetch(mothed,url.lists,data)
	}
}

export default Address