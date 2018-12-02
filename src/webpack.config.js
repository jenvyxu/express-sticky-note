var webpack=require('webpack')
var path = require('path');

module.exports = {
  entry: path.join(__dirname, "js/app/index.js"),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../public/js')
	},
	devtool: 'source-map',
	watch:'true',
	watchOptions: {
    aggregateTimeout: 300,
		ignored: '../node_modules/',
  },
  resolve:{
  	alias:{
  		jquery: path.join(__dirname,"js/lib/jquery-3.3.1.min.js"),
  		mod: path.join(__dirname,"js/mod"),
  		less: path.join(__dirname,"less")
  	}
  },
  plugins:[
   		new webpack.ProvidePlugin({
   			$:"jquery"
   		})
  ],
  module:{
  	rules:[
  	{
  		test:/\.less$/,
  		use:["style-loader","css-loader","less-loader"]
  	}]
  }
};