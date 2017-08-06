
// lib.js

(function(){

	var cache = {};
	
	window.define = function(){
		if(arguments.length === 2){
			var name = arguments[0];
			var moduleFunc = arguments[1];
		}else if(arguments.length === 3){
			var name = arguments[0];
			var deps = arguments[1];
			var moduleFunc = arguments[2];
		}

		// 作判断，如果deps没传，则直接传空数组
		var modules = deps ? findModules(deps) : []

		//	直接在define中将moduleFunc函数执行，得出的值放在对象中
		cache[name] = moduleFunc.apply(null,modules)
	}

	// 由于define和require都需要遍历deps，所以将方法提取出来封装，然后调用
	function findModules(deps){
		var modules = []
		for(var i = 0; i < deps.length; i++){
			var name = deps[i];
			var module = cache[name];
			if(module){
				modules.push(module)
			}
		}
		return modules
	}

	window.require = function(deps,func){
		var moudles = findModules(deps);
		func.apply(null,modules);
	}

})()


// main.js 

define('qq',function(){
	return {name: 'qq'}
})

define('baidu',function(){
	return {name: 'baidu'}
})

define('qq-qun',['qq'],function(qqMoudle){
	var qun = {
		name: 'qq-qun'
	}

	//	证明被调用了qq这个模块
	qqMoudle.qun = qun
	
	debugger
	return qun
})


require(['qq','baidu','qq-qun'],function(qqMoudle,baiduMoudle,qunMoudle){
	console.log(qqMoudle)
	console.log(baiduMoudle)
	console.log(qunMoudle)
})
