// Filename: pro.babel.js  
// Timestamp: 2016.02.05-15:23:08 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import { optimize as oz } from 'webpack';
import path from 'path';

module.exports = {
  entry: './src/js',
  output: {
    path: path.join(__dirname, 'public/lib'),
    filename: 'bundle.js',
    publicPath: '/lib/'
  },
  plugins: [
    new oz.DedupePlugin(),
    new oz.OccurenceOrderPlugin(),
    new oz.UglifyJsPlugin({
      compressor: { screw_ie8: true, warnings: false }
    }),
    new oz.AggressiveMergingPlugin()
  ],

  /*
        {
        test: /\.less$/,
        loader: "style!css!less"
      }
   */
  
  module: {
    loaders : [{
      test: /\.js$/,
      loader: 'babel-loader'
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  }
};
