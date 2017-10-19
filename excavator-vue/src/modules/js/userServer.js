import { fetch,rap } from 'js/fetch.js'

let url = {
	login: '/user/login.do',
	code: '/user/code.do',
	getUrl: '/user/getUser.do',
	dropOut: '/user/logout.do'
}
url = rap(url)

class User {
	static login(method='get',data){
		return fetch(method,url.login,data)
	}

	static code(method='get',data){
		return fetch(method,url.code,data)
	}

	static getUser(method='get',data){
		return fetch(method,url.getUrl,data)
	}

	static dropOut(method='get',data){
		return fetch(method,url.dropOut,data)
	}
}

export default User