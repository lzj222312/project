// 验证手机
function checkphone(phone) {
  let rule = /^1[3,4,5,7,8,9]\d{9}$/
  return rule.test(phone) ? true : false
}

export {
  checkphone
}
