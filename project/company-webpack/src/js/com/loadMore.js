var $ = require('../lib/jquery/jquery-1.11.3.min')

var loadMore = (function(){

		function LoadMore($ct){
			this.$ct = $ct;
			this.curPage = 1;
			this.reqCount = 5;
			this.arr = [];
			this.init();
	}

	LoadMore.prototype = {

		init: function(){
			this.$ul = this.$ct.find('.relative');
			console.log(this.$ul)
			this.$load = this.$ct.find('.load');

			this.bind();
		},

		bind: function(){
			var _this = this,
				$ul = this.$ul;

			this.$load.on('click',function(){
				_this.reqContent(function(dataList){
					// console.log(dataList)
					$.each(dataList,function(idx,data){
						var $node = _this.doHtml(data)
						$node.find('img').load(function(){
							$ul.append($node);
							_this.waterFull($node);
						})
					})
				})
			})
		},

		doHtml: function(data){
			var html = '';
				html += '<li class="item"><a href="'+ data.url +'" class="link">';
				html += '<img src="' + data.img_url + '" alt=""></a>';
				html += '<h4 class="title">' + data.short_name + '</h4>';
				html += '<p class="desp">' + data.short_intro +'</p></li>';

			return $(html);
		},

		reqContent: function(callback){
			$.ajax({
				url: 'https://platform.sina.com.cn/slide/album_tech',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				data: {
					app_key: '1271687855',
					page: this.curPage,
					num: this.reqCount
				}
			}).done(function(ret){
				if(ret && ret.status && ret.status.code === '0'){
					callback(ret.data);
					this.curPage++;
				}else{
					console.log('错误')
				}
			}).fail(function(){
				console.log('加载错误，请重新加载！')
			})
		},

		waterFull: function($node){
			var _this = this,
				$ulWidth = this.$ul.width(),
				$nodeWidth = $node.outerWidth(true),
				widthNum = this.$ul.width() / $node.outerWidth(true);

			if(this.arr.length === 0){
				for(var i = 0; i < widthNum; i++){
					this.arr.push(0);
				}
			}

			console.log($node)
			$node.each(function(){
				var $this = $(this),
					minHeight = Math.min.apply(null,_this.arr),
					minIdx = _this.arr.indexOf(minHeight);

				$this.css({
					'top': minHeight,
					'left': $(this).outerWidth(true) * minIdx
				})

				_this.arr[minIdx] += $this.outerHeight(true);

				var maxHeight = Math.max.apply(null,_this.arr)
				_this.$ul.height(maxHeight)
			})	
		}
	}

	return {
		init: function($ct){
			new LoadMore($ct)
		}
	}
})()


module.exports = loadMore;