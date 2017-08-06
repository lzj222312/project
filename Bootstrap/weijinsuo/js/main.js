$(function(){

    /**
     * 轮播JS
     */

    function resize(){
        var $windowWidth = $(window).width(),
            isSmallWindow = $windowWidth < 768;

        $('#main-ad > .carousel-inner > .item').each(function(idx,ele){
            var $ele = $(ele);

            // 获取元素中的data属性
            var imgSrc = $ele.attr(isSmallWindow?'data-img-sm':'data-img-lg');
            
            // 设置背景图
            $ele.css('backgroundImage','url("' + imgSrc + '")');

            if(isSmallWindow){
                $ele.css('backgroundImage','').html('<img src="'+ imgSrc +'" alt="">');
            }else{
                $ele.empty();
            }
        }) 
    }

    // trigger()用于在每个匹配元素上直接触发指定类型的事件。
    $(window).on('resize',function(){
        resize();
        moveWapper();
    }).trigger('resize');

    // 初始化tooltips工具提示
    $('[data-toggle="tooltip"]').tooltip()


    /**
     * 产品推荐tan栏响应JS
     */ 

    // 遍历li元素，获取宽度，动态生成ul宽度
    function moveWapper(){
        var $ulEle = $('.move-wapper > .nav-tabs'),
        $lis = $ulEle.children(),
        sumWidth = 40;

        $lis.each(function(idx,ele){
            sumWidth += $(ele).outerWidth(true);
        })

        // 判断只有在屏幕小于ul宽度的时候才进行动态生成ul宽度

        if(sumWidth > $(window).width()){
            $ulEle.css('width',sumWidth)
                  .parent().css('overflow-x','scroll');

        }else{
            $ulEle.css('width','100%')
                  .parent().css('overflow-x','');
        }
    }
    
    /**
     * 切换tab列表转换title标题
     */

    // 所有a元素添加点击事件
    // 获取a元素上的data值
    // 将data值放置在title中

    function switchTitle(){
        var $baseTab = $('#news .nav-pills .base-tab'),
            $newsTitle = $('#news .news-title');

        $baseTab.on('click',function(){
            var $this = $(this),
                title = $this.data('news-title');

            $newsTitle.text(title)
        })
    }

    switchTitle()

    /**
     * 移动端滑动翻页轮播图
     */

    // 1.获取手指滑动方向（左右）
    // 2.根据滑动方向使用bootstrap轮播图.carousel()方法进行翻页
    touchCarousel()

    function touchCarousel(){
        // 获取需要滑动的轮播图元素
        var $carousel = $('.carousel'),
            offset = 50,
            startX,
            endX;

        // 获取手指按下的坐标
        $carousel.on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
            // console.log(startX);
        })

        // 获取手指移动的坐标
        $carousel.on('touchmove',function(e){
            endX = e.originalEvent.touches[0].clientX;
        })

        // 获取放开手指时最后坐标
        $carousel.on('touchend',function(e){
            // console.log(endX)
            var diff = Math.abs(startX - endX),
                $this = $(this);

            if(diff > offset){
                $this.carousel(startX > endX ? 'next':'prev');             
            }
        })
    }
})


