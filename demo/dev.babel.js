// Filename: dev.babel.js  
// Timestamp: 2016.02.10-11:40:02 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import w from 'webpack';
import path from 'path';

export default {
	devtool: 'eval',
	entry: [
		'webpack-hot-middleware/client',
		'./src/js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/lib/'
	},
	plugins: [
		new w.HotModuleReplacementPlugin(),
		new w.optimize.DedupePlugin(),
		new w.optimize.OccurenceOrderPlugin()
	],
	module: {
	  loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
//          },{
//            test: /\.less$/,
//            loader: 'style!css!less',
//            test: /\.css$/,
//            loader: 'style!css'
          }]
	}
};
