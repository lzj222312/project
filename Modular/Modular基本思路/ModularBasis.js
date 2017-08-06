
// lib.js

(function(){

	var cache = {};
	
	window.define = function(name,moduleFunc){
		//	通过对象key:value属性，保存对应的方法/函数
		cache[name] = moduleFunc
	}

	window.require = function(deps,func){
		var modules = []

		for(var i = 0; i < deps.length; i++){
			var name = deps[i];	// qq | baidu
			var moduleFunc = cache[name];	//	moduleFunc对应的define传过来的
			var module;

			//	这步是为了将define的函数执行
			if(moduleFunc){
				module = moduleFunc();
				//	将执行函数后的值保存在数组中，方面后面直接调用
				module.push(module);
			}
		}

		//	通过apply将数组中的值传进func的参数中
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


require(['qq','baidu'],function(qqMoudle,baiduMoudle){
	console.log(qqMoudle)
	console.log(baiduMoudle)
})

