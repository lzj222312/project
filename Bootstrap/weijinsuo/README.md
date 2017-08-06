    <head>
        <meta charset="utf-8">
        <!-- 设置浏览器兼容模式版本（让IE使用最新的渲染引擎工作） -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- 声明当前网页在移动端浏览器中展示的相关设置 -->
        <!-- 
            viewport视口
                作用：在移动端浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面，将页面的容器缩放到设备大小，然后展示。

                目前大多数手机浏览器的视口（承载页面的宽度）宽度是980。
                属性值：
                    width:视口宽度
                    initial-scale-scale:初始化缩放
                    user-scalable:是否允许用户自行缩放（值：yes/no; 1/0）
                    minimum-scale:最小缩放
                    maximum-scale:最大缩放
        
         -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->

        <!-- Bootstrap -->
        <link href="../lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        
        html5shiv：让浏览器可以识别H5的新标签
        respond：让低版本浏览器可以使用css3的媒体查询

        <!--[if lt IE 9]>
        让浏览器可以识别H5的新标签
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        //bootstarp的组件都是依赖jQuery
    </head>


*   .container bootstrap 固定宽度并支持响应式布局的容器
*   .container-fluid    100%宽度，占据全部视口的容器
