var $ = require('../lib/jquery/jquery-1.11.3.min')

var goTop = (function(){
		function GoTop($ct){
			this.$ct = $ct;
			// console.log('$===jQuery:',$===jQuery)
			this.isScroll = true;
			this.init();
			this.bind();
		}

	GoTop.prototype = {

		init: function(){
			this.$nav = this.$ct.find('.nav');

			var $goTop = this.$goTop = $('<span>回到顶部</span>');
			$goTop.addClass('go-top');
			this.$ct.find('body').append($goTop);
		},

		bind: function(){
			var _this = this;

			this.$goTop.on('click',function(){
				_this.gotop();
			})

			this.$ct.on('scroll',function(){
				if(_this.isScroll){
					_this.isScroll = false;

					setTimeout(function(){
							_this.scroll()
					},500)
				}

				//	可利用延时+条件判断达成scroll只要滚动就触发方法的问题
				//	只要是利用了setTimerout和setInterval,会在代码执行完成后
				//	才执行的特性
				//		setTimeout(function(){
				//			_this.scroll()
				//		},300) 
	
			})
		},

		gotop: function(){
			$('html,body').stop().animate({
				scrollTop: 0
			},500)

		},

		scroll: function(){
			var $scroll = this.$ct.scrollTop();
			var _this = this;

			_this.isScroll = true;

			if($scroll > 500){
				this.$goTop.stop().animate({
					right: 0
				},500);
				this.$nav.stop().fadeOut(300);
			}else if($scroll < 500){
				this.$goTop.stop().animate({
					right: '-110px'
				},500);
				this.$nav.stop().fadeIn(300);
			}
		}
	}

		return {
			init: function($ct){
				new GoTop($ct);
			}
		}

})()

module.exports = goTop;