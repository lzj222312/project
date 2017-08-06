// require.js配置加载模块地址
requirejs.config({
	baseUrl: "./src/js",
	paths: {
		'jquery': 'lib/jquery/jquery-1.11.3.min'
	}
});

// 加载入口模块
requirejs(['app/index']);