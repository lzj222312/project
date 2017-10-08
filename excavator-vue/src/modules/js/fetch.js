import axios from 'axios'


var host = "http://www.easy-mock.com/mock/59d3bea69cabc90bb5e5f8d7/mall"

// 开发环节，所有接口走rap数据
function rap(urlList) {
  let obj = {}
  Object.keys(urlList).forEach(key => {
    obj[key] = host + urlList[key]
  })
  return obj
}

function fetch(method, url, data = null) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: data
    }).then((response) => {
      let result = response.data
      if (typeof (result) === "string") {
        result = JSON.parse(result)
      }
      if (result.status === 200) {
        resolve(result)
      } else if (result.status === 300) {
				// 未登录处理
      }else{
				reject(result)
			}
		}).catch((response) => {
			reject({
				status: -1,
				message: '系统错误，请稍后重试！'
			})
		})
  })
}

export {
  rap,
  fetch
}
