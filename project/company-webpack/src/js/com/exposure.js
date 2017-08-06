var $ = require('../lib/jquery/jquery-1.11.3.min')

var exposure = (function(){
	function Exposure($target,callblack){
		this.$target = $target;
		this.callblack = callblack;

		this.bind();
		this.check();
	}

	Exposure.prototype = {

		bind: function(){
			var _this = this

			$(window).on('scroll',function(){
				_this.check();
			})
		},

		check: function(){
			if(this.show()){
				this.callblack(this.$target);
			}
		},

		show: function(){
			var $winHeight = $(window).height();
			var $scroll = $(window).scrollTop();
			var $targetOffset = this.$target.offset().top;
			var $targetHeight = this.$target.outerHeight(true);

			if($winHeight + $scroll > $targetOffset && $targetOffset + $targetHeight > $scroll){
				return true;
			}else{
				return false;
			}
		}
	}

	return {
		init: function($target,callblack){
			$target.each(function(idx,target){
				new Exposure($(target),callblack)
			})
		}
	}
})()

module.exports = exposure;