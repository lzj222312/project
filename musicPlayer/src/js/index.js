$(function(){
    var viewWidth = $(window).width(),
        viewHeight = $(window).height(),
        desWidth = 640,
        musicId = 0,
        index = 0,
        $main = $('#main'),
        $contentUl = $('.music-content .content-ul'),
        $musicTitle = $('#music-list .music-title'),
        $detailsLyric = $('.details-lyric')
        $detailsLyricUl = $('#detailsLyricUl'),
        $musicdetails = $('#musicdetails'),
        $detailsAudioAll = $('.details-audioAll')
        $detailsAllTime = $('#detailsAllTime'),
        $detailsNowTime = $('#detailsNowTime'),
        $detaols_tip = $('.detaols-tip'),
        $detailsBtnLis = $('.details-btn').children(),
        $detailsAudioProUp = $('#detailsAudioProUp'),
        $detailsAudioProBar = $('#detailsAudioProBar'),
        $detailsAudioPro = $musicdetails.find('.details-audioPro'),
        $detailsNext = $('#detailsNext'),
        $detailsPrev = $('#detailsPrev'),
        $detailsMessage = $('#detailsMessage'),
        $detailsMessageTextarea = $('#detailsMessageTextarea'),
        $detailsMessageBtn = $('#detailsMessageBtn'),
        $detailsMessageUl = $('#detailsMessageUl'),
        $audio = $('.audio'),
        $audioBtn = $audio.find('.audio-btn'),
        $detailsPlay = $musicdetails.find('.details-play'),
        $loading = $('#loading'),
        oAudio = $('#loadAudio').get(0),
        touchstart = 'touchstart',
        touchmove = 'touchmove',
        touchend = 'touchend';
    
    /**
     * 初始化播放器
     */
    function init(){
        loading();
        device();
        musicList.init();
        musicDetails.init();
        musicAudio.init();
    }

    function loading(){ //加载动画
        var arr = ['bg.jpg','detailsBg.jpg','details_pause.png','details_play.png','details_next.png','details_prev.png','list_audioBg.png','miaov.jpg'];
        var count = 0;

        $.each(arr,function(idx,img){
            var objImg = new Image();
            objImg.onload = function(){
                count++;
                if(count === arr.length){
                    $loading.animate({
                        opacity: 0
                    },1000,function(){
                        $(this).remove();
                    })
                }
            };
            objImg.onerror = function(){ //jQ出错事件
                $loading.animate({
                        opacity: 0
                    },1000,function(){
                        $(this).remove();
                    })
            }
            objImg.src = '../../img/' + img;
        })
    }

    /**
     * 兼容移动端和PC端
     */
    function device(){
        // navigator.userAgent获取用户代理值（PC还是移动端）
        var isMobile = /Mobile/i.test(navigator.userAgent);

        if(viewWidth > desWidth){
            $main.css('width',desWidth + 'px');
        }

        if(!isMobile){
            touchstart = 'mousedown';
            touchmove = 'mousemove';
            touchend = 'mouseup';
        }

        $(window).resize(function(){
            viewWidth = $(window).width();
			viewHeight = $(window).height();
            musicDetails.init();
            musicDetails.sildeDown();
        })
    }

    /**
     * js操作音乐列表页
     */
    var musicList = (function(){
        var musicListUrl = '../../musicList.php',
            bbsUrl = 'http://bbs.miaov.com/forum.php?mod=viewthread&tid=14670s',
            parentH = $('.music-content').height(),
            childH = 0,
            count = 0,
            downY = 0,
            //  downT获取当前UL定位top值
            downT = 0,
            prevY = 0,
            speed = 0,
            onoff1 = true,
            onoff2 = true,
            onoff3 = true,
            isReq = true,
            timer = null,
            $loadingLi = null,
            page = 0;
           

        function init(){ //初始化
            // for(var i = 0; i < 20; i++){
                start();
            // }   
            
            bin();
            moveScroll()
        };

        function bin(){
            $musicTitle.on(touchstart,function(){   //点击title跳转页面
                window.location = bbsUrl;
            });

            $contentUl.on(touchend,'li',function(){
                if(onoff3){
                    $(this).attr('class','content-ul-list active').siblings().attr('class','content-ul-list');
                    
                    // 获取元素中保存的歌曲ID，通过ajax获取点击后该歌曲的所有信息
                    musicId = $(this).attr('musicid');
                    musicAudio.id(musicId);
                    index = $(this).index();
                    musicDetails.loadMessage();
                }
            });
    
            $audio.on(touchstart,function(){
                if(musicId){
                    musicDetails.sildeUp();
                }
            });
        };

        function start(){
            isReq = false;

            data(function(data){
                isReq = true;
                $.each(data,function(idx,obj){
                    var $node = createDom(obj);
                    // console.log($node)
                    $contentUl.append($node);
                    childH += $node.outerHeight(true);                   
                });
                // console.log(childH)
                if(childH < parentH && isReq) {
                    start();
                }             
            });  
        }

        function data(callback){    //获取音乐数据
            $.ajax({
                url: musicListUrl,
                type: 'GET',
                dataType: 'json'
                // jsonp:'callback',
                // jsonpCallback: "callbackName"
            }).done(function(data){
                callback(data);
            }).fail(function(){
                console.log('请求失败，请重新刷新页面！')
            })          
        };

        function createDom(data){
            // var li = '<li class="content-ul-list"><h3 class="title">' + data[0].title + '</h3><p class="name">' + data[0].artist + '</p></li>'
            var li = '<li musicid="'+ data.id +'" class="content-ul-list"><h3 class="title">'+(data.musicName)+'</h3><p class="name">'+(data.name)+'</p></li>';            
            return $(li)
        };

        function moveScroll(){  //滑动列表
            // $(document).on(touchmove,function(eve){ //阻止页面的默认事件
            //     eve.preventDefault();
            // })

            $contentUl.on(touchstart,function(eve){
                // 如何请求数据后，Ul小于列表页，不做任何滑动
                // if(parentH > childH){ return false };

                // eve.originalEvent -> 将jQ的event转为js的event
                // 移动端获取eve事件需要eve.originalEvent.changedTouches可以获取点击的坐标
                var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                // console.log(touch)

                var This = this,
                    onoff1 = true,
                    onoff2 = true;
                
                onoff3 = true;
                downY1 = touch.pageY;
                downT = $(this).position().top; //jQ的position()方法获取当前元素定位值
                
                timer && clearInterval(timer);  //判断定时器是否开启，有则清除

                // $(this).before('<div class="loading"></div>')
                
                $(document).on(touchmove + '.move',function(eve){
                    onoff3 = false;

                    var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve,
                        iTop = $(This).position().top;

                    // 获取鼠标或者手指滑动速度
                    speed = touch.pageY - prevY;
                    prevY = touch.pageY;

                    if(iTop >= 0){  //控制列表头部下拉时的距离
                        if(onoff1){
                            onoff1 = false;
                            downY = touch.pageY
                        }                 
                        $(This).css('transform','translate3d(0,'+ ((touch.pageY - downY) / 5) + 'px,0)')    //除于3是为了降低滑动的距离
                    }else if(iTop <= (parentH - childH)){   //控制列表尾部下拉时的距离
                        if(onoff2){
                            onoff2 = false;
                            downY = touch.pageY;

                            //懒加载歌曲数据
                            // $loadingLi = '<li>loading....</li>';
                            // $(This).append($loadingLi);
                        }   
                        $(This).css('transform','translate3d(0,'+ ((touch.pageY - downY) / 3 + (parentH - childH)) + 'px,0)')                        
                    }else{
                        $(This).css('transform','translate3d(0,'+ (touch.pageY - downY + downT) + 'px,0)')
                    }
                });

                $(document).on(touchend + '.move',function(){
                    //  当鼠标放开下按的时候，取消命名空间为.move的事件
                    $(this).off('.move');

                    // if($loadingLi){  //懒加载歌曲数据
                    //     $loadingLi.remove();
                    //     $loadingLi = null;

                    //     $.ajax({
                    //         url : 'pageMusic.php',
					// 		type : 'GET',
					// 		dataType : 'json',
					// 		data : { page : page }
                    //     }).done(function(data){
                    //         $.each(data,function(i,obj){
					// 				var $li = '<li musicId="'+(obj.id)+'"><h3 class="title">'+(obj.musicName)+'</h3><p class="name">'+(obj.name)+'</p></li>';
					// 				$listContentUl.append($li);
					// 			});
					// 			childH = $listContentUl.height();
					// 			page++;
                    //     }).fail(function(){
                    //         console.log('请求失败！')
                    //     })
                    // }

                    timer && clearInterval(timer);

                    if(!onoff3){
                        timer = setInterval(function(){ //通过定时器去做恢复列表动画
                            var iTop = $(This).position().top;
                            if(Math.abs(speed) <= 1 || iTop > 50 || iTop < parentH - childH){
                                timer && clearInterval(timer);
                                if(iTop >= 0){
                                    $(This).css({transition:'.2s'});
                                    $(This).css('transform','translate3d(0,0,0)');                        
                                }else if(iTop <= parentH - childH){
                                    $(This).css({transition:'.2s'})
                                    $(This).css('transform','translate3d(0,'+ (parentH - childH) +'px,0)')
                                }
                            }else{
                                speed *= 0.7;   //将速度减慢
                                $(This).css('transform','translate3d(0,'+ (iTop + speed) +'px,0)')
                            }
                        },13)
                    }
                    
                })

                return false;   //阻止事件冒泡
            });

            // transition在webkit和firefox无法使用removeProperty去掉transition的效果
            // transition一旦定义将会永久执行，所以会导致出现滑动列表的卡顿现象
            // 所以使用transitonend事件，让过度动画结束后，将transition清空
            $contentUl.on('transitonend webkitTransitionEnd',function(){
				$(this).css('transition','');
			});
        };


        function show(sName,sMusicName,sImg){
            $audio.find('img').attr('src','./img/' + sImg);
            $audio.find('h3').html(sMusicName);
            $audio.find('p').html(sName);
            $audio.find('.audio-btn').show();        
        }

        return {
            init: init,
            show: show
        }

    })();

    var musicDetails = (function(){ //音乐详情页操作
        var re = /\[[^[]+/g
            arr = [],
            $li = null,
            downX = 0,
            range = 20,
            timer = null;

        function init(){
            $musicdetails.css('transform','translate3d(0,' + viewHeight + 'px,0)');
            $detailsMessage.css('transform','translate3d('+ viewWidth +'px,0,0)');
            bin();
        };

        function sildeUp(){
            // $musicdetails.css('z-index','10');
            $musicdetails.css('transition','0.5s');
            $musicdetails.css('transform','translate3d(0,0,0)');
        };

        function sildeDown(){
            $musicdetails.css('transform','translate3d(0,' + viewHeight + 'px,0)');
        };

        function bin(){
            $detaols_tip.on(touchstart,function(){
                sildeDown();
                $detailsLyric.add($detailsAudioAll).css('transform','translate3d(0,0,0)');
                $detailsMessage.css('transform','translate3d('+ (viewWidth) +'px,0,0)');
                $detailsLyric.add($detailsAudioAll).add($detailsMessage).css('transition','0s');
                timer && clearInterval(timer);
            })

            $musicdetails.on(touchstart,function(eve){
                var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;

                downX = touch.pageX;

                $(document).on(touchend + '.move',function(eve){
                    var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                    $(this).off('.move');
            
                    if(touch.pageX - downX < -range){
                        $detailsLyric.add($detailsAudioAll).css('transform','translate3d('+ (-viewWidth) +'px,0,0)');
                        $detailsMessage.css('transform','translate3d(0,0,0)');
                        $detailsLyric.add($detailsAudioAll).add($detailsMessage).css('transition','.5s');
                        $detailsBtnLis.eq(1).addClass('active').siblings().removeClass('active');
                        loadMessage();
                        timer && clearInterval(timer);
                        timer = setInterval(scrollMessage,3500);
                    }else if(touch.pageX - downX > range){
                        $detailsLyric.add($detailsAudioAll).css('transform','translate3d(0,0,0)');
                        $detailsMessage.css('transform','translate3d('+ (viewWidth) +'px,0,0)');
                        $detailsBtnLis.eq(0).addClass('active').siblings().removeClass('active');
                        timer && clearInterval(timer);
                    }
                });
            });

            $detailsMessageBtn.on(touchstart,function(){
                addMessage();
            });
        }

        function show(sName,sMusicName,sLyric){
            $musicdetails.find('.details-name').html(sMusicName + '<span>' + sName + '</span>');
            $detailsLyricUl.empty().css('transition','.5s').css('transform','translate3d(0,0,0)');

            arr = sLyric.match(re); //  通过正则将每段歌词分离

            for(var i = 0; i < arr.length; i++){ //将歌词和时间分离
                arr[i] = [formatTime(arr[i].substring(0,10)),arr[i].substring(10)]; 
            }

            for(var i = 0; i < arr.length; i++){
                $detailsLyricUl.append('<li>' + arr[i][1] + '</li>');
            }
            
            $li = $detailsLyricUl.find('li');
            $li.first().attr('class','hover');
            $iLiH = $li.first().outerHeight(true);

        }

        function formatTime(num){   //时间格式化
            num = num.substring(1,num.length-1);
            var arr = num.split(':');
            return (parseFloat(arr[0] * 60) + parseFloat(arr[1])).toFixed(2);
            // toFixed(),该方法表示保留多少位小数
        }

        function scrollLyric(time){
            for(var i = 0; i < arr.length; i++){
                if(i != arr.length -1 && time > arr[i][0] && time < arr[i+1][0]){
                    $li.eq(i).attr('class','hover').siblings().removeClass('hover');
                    if(i > 5){
                        $detailsLyricUl.css('transform','translate3d(0,'+ (-$iLiH * (i - 5)) +'px,0)');
                    }else{
                        $detailsLyricUl.css('transform','translate3d(0,0,0)');
                    }
                }else if(i == arr.length -1 && time > arr[i][0]){
                    $li.eq(i).attr('class','hover').siblings().removeClass('hover');
                }
            }
        }

        function loadMessage(){
            $detailsMessageUl.empty();

            $.ajax({
                url: 'loadMessage.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    mid: musicId
                }
            }).done(function(data){
                $.each(data,function(idx,obj){
                    var $li = '<li>'+ obj.text +'</li>';
                    $detailsMessageUl.prepend($li);
                })
            }).fail(function(){
                console.log('请求失败，请重新请求！')
            })
        }

        function addMessage(){  //添加留言
            var text = $detailsMessageTextarea.val();
            $detailsMessageTextarea.val('');

            $.ajax({
                url: 'addMessage.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    mid: musicId,
                    text: text
                }
            }).done(function(data){
                if(data.code){
                    var $li = '<li>'+ data.message +'</li>';
                    $detailsMessageUl.prepend($li);
                }
            }).fail(function(){
                console.log('请求失败，请重新发送请求！')
            })
        }

        function scrollMessage(){
            var $lis = $detailsMessageUl.children(),
                lastLi = $lis.last();
            
            setTimeout(function(){
                $detailsMessageUl.prepend(lastLi);
                console.log(11111)
            },1000);
        }

        return {
            init: init,
            sildeUp: sildeUp,
            show: show,
            scrollLyric: scrollLyric,
            loadMessage: loadMessage,
            scrollMessage: scrollMessage,
            sildeDown: sildeDown
        };
    })();

    var musicAudio = (function(){   //音乐播放操作
        var onoff = true,
            timer = null,
            scale = 0,
            disX = 0,
            parenW = $detailsAudioPro.width();

        function init(){
            bin();
        };

        function id(id){
            $.ajax({
                url: '../../musicAudio.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(data){
                show(data)
            }).fail(function(){
                console.log('请求失败，请重新请求！')
            })
        };

        function bin(){
            $audioBtn.add($detailsPlay).on(touchstart,function(eve){
                eve.stopPropagation();

                if(onoff){
                    play();
                }else{
                    pause();
                }
            });

            $detailsAudioProBar.on(touchstart,function(eve){
                var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                var This = this;

                disX = touch.pageX - $(this).position().left;
                timer && clearInterval(timer);

                $(document).on(touchmove + '.move',function(eve){
                    var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                    var L = touch.pageX - disX;

                    if(L <= 0){
                        L = 0;
                    }else if(L >= parenW){
                        L = parenW;
                    }

                    $(This).css('left',L);

                    scale = L / parenW

                });
                $(document).on(touchend + '.move',function(){
                    $(this).off('.move');

                    oAudio.currentTime = scale * oAudio.duration;
                    playing();
                    timer && clearInterval(timer);
                    timer = setInterval(playing,1000);                
                })
                return false;
            });

            $detailsPrev.on(touchstart,function(){
                prev();
            })

            $detailsNext.on(touchstart,function(){
                next();
            });
        }

        // 保存通过id获取当前歌曲的所有信息，并触发对应列表页的dom修改
        function show(obj){
            var sName = obj.name,
                sMusicName = obj.musicName,
                sLyric = obj.lyric,
                sImg = obj.img,
                sAudio = obj.audio;             

            musicList.show(sName,sMusicName,sImg);
            musicDetails.show(sName,sMusicName,sLyric);
            oAudio.src = '../../img/' + sAudio;
            $(oAudio).one('canplaythrough',function(){
                play();
                $detailsAllTime.html(formatTime(oAudio.duration));
            });
            $(oAudio).one('ended',function(){
                next();
            })
        };

        function play(){    //播放
            onoff = false;

            $audio.find('img').addClass('Imgrotate');
            $audioBtn.css('backgroundImage',"url('../img/list_audioPause.png')");
            $detailsPlay.css('backgroundImage',"url('../img/details_pause.png')");
            oAudio.play();
            playing();
            timer && clearInterval(timer);
            timer = setInterval(playing,1000);
        };

        function pause(){   //暂停
            onoff = true;

            $audio.find('img').removeClass('Imgrotate');
            $audioBtn.css('backgroundImage',"url('../img/list_audioPlay.png')");
            $detailsPlay.css('backgroundImage',"url('../img/details_play.png')");
            oAudio.pause();
            timer && clearInterval(timer);
        };

        function formatTime(num){   //转换获取的音频时长
            var iM = Math.floor(num % 3600 / 60),
                iS = Math.floor(num % 60)

            return toZero(iM) + ':' + toZero(iS);
        };

        function toZero(num){
            if(num < 10){
                return '0' + num;
            }else{
                return '' + num;
            }
        };

        function playing(){ //播放进行中
            $detailsNowTime.html(formatTime(oAudio.currentTime));
            scale = oAudio.currentTime / oAudio.duration;
            $detailsAudioProUp.css('width',scale * 100 + '%');
            $detailsAudioProBar.css('left',scale * 100 + '%');
            musicDetails.scrollLyric(oAudio.currentTime);
        };

        function next(){    //下一首
            var $li = $contentUl.find('li');
            index = index == $li.length - 1 ? 0:index + 1;
            musicId = $li.eq(index).attr('musicid');
            $li.eq(index).addClass('active').siblings().removeClass('active');
            id(musicId);
        };

        function prev(){    //上一首
            var $li = $contentUl.find('li');
            index = index == 0 ? $li.length - 1:index - 1;
            musicId = $li.eq(index).attr('musicid');
            $li.eq(index).addClass('active').siblings().removeClass('active');
            id(musicId);
        };

        return {
            init: init,
            id: id
        };
    })();

    init();
});