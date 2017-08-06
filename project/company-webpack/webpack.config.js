var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/js/app/index.js',
  output: {
    filename: "merge.js",
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
		new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
		})
	]
};