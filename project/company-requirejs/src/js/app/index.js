
define(['jquery','com/gotop','com/loadMore','com/rotation'],function($,goTop,loadMore,rotation){
	
	rotation.init($('.header'))

	goTop.init($(document))
	
	loadMore.init($('.wrap'))
})