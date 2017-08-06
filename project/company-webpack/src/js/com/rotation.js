var $ = require('../lib/jquery/jquery-1.11.3.min')

var rotation = (function(){
	function Rotation($ct){
		this.$ct = $ct;
		this.pageIndex = 0;
		this.isOpen = true;
		this.time;
		this.init();
		this.bind();
	}

	Rotation.prototype = {
		
		init: function(){
			// this.$nextBtn = this.$ct.find('.next-btn');
			// this.$preBtn = this.$ct.find('.pre-btn');
			this.$imgCt = this.$ct.find('.rotation-header');
			this.$imgChildren = this.$imgCt.children();
			// this.$dotsChildren = this.$ct.find('.dots').children();
				 
			// var firstImg = this.$imgChildren.first().clone(),
			// 	lastImg = this.$imgChildren.last().clone();
			// console.log(lastImg)

			// this.$imgCt.append(firstImg);
			// this.$imgCt.prepend(lastImg);

			// this.$img_Children_len = this.$imgCt.children().length;
			// // console.log(this.$imgChildren.length)

			// this.$imgCt.width(this.$img_Children_len * this.$imgChildren.width())

			// this.$imgCt.css('left',-this.$ct.width());

			this.time && clearInterval(this.time);
		},

		bind: function(){
			var _this = this;
			var $nextBtn = this.$nextBtn,
				$preBtn = this.$preBtn,
				$dotsChildren = this.$dotsChildren;
				// console.log($dotsChildren)


			// $nextBtn.on('click',function(){
			// 	if(_this.isOpen){
			// 		_this.playNext(1);
			// 	}
			// })
			// $preBtn.on('click',function(){
			// 	if(_this.isOpen){
			// 		_this.playPre(1);
			// 	}
			// })
			// $dotsChildren.on('click',function(e){
			// 	var $target = $(e.target),
			// 		index = $target.index();

			// 	if(index > _this.pageIndex){
			// 		_this.playNext(index - _this.pageIndex);
			// 	}else if(index < _this.pageIndex)
			// 		_this.playPre(_this.pageIndex - index);
			// })
			this.time = setInterval(function(){
				_this.playNext(1);
			},4000)

		},

		playNext: function(len){
			var imgLen = this.$imgChildren.length - 1,
				_this = this
			this.isOpen = false;

			this.$imgCt.animate({
				'left': '+=' + len * -this.$ct.width()
			},500,function(){
				_this.pageIndex += len;
				if(_this.pageIndex >= imgLen){
					_this.pageIndex = 0;
					_this.$imgCt.css({
						'left': _this.pageIndex * _this.$ct.width()
					})
				}
				_this.isOpen = true;
				// _this.isDots();
			})
		},

		playPre: function(len){
			var lastImg = (this.$img_Children_len-2) * this.$imgChildren.width(),
			    imgLen = this.$imgChildren.length,
			    _this = this;
			// console.log(this.$imgCt.css('left'));
			
			this.isOpen = false;

			this.$imgCt.animate({
				'left': '+=' + len * this.$ct.width()
			},500,function(){
				_this.pageIndex -= len;
				if(_this.pageIndex < 0){
					_this.pageIndex = imgLen - 1;
					_this.$imgCt.css({
						'left': -lastImg
					})
				}
				_this.isOpen = true;
				// _this.isDots();
			})
			
		},

		isDots: function(){
			var $dotsChildren = this.$dotsChildren,
				_this = this;

			$dotsChildren.each(function(idx,node){
				$(node).removeClass('hover');	
			})
			$dotsChildren.eq(_this.pageIndex).addClass('hover');
		}

	}
	
	return {
		init: function($ct){
			$ct.each(function(idx,node){
				new Rotation($(node));
			})
		}
	}

})()

module.exports = rotation;

