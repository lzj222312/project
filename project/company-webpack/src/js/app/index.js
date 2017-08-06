var rotation = require('../com/rotation')
var goTop = require('../com/gotop.js')
var loadMore = require('../com/loadMore')
var $ = require('../lib/jquery/jquery-1.11.3.min')

rotation.init($('.header'))

goTop.init($(document))
	
loadMore.init($('.wrap'))


function html($node){
	var url = $node.attr('data-src');
	$node.attr('src',url);
}