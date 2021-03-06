var config = require('./webpack.base.config'),
  webpack = require('webpack');
var merge = require('webpack-merge')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var uglifyjs = require('uglifyjs-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 去除重复的css
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ParallelUglifyPlugin =  require('webpack-parallel-uglify-plugin')
// ...
config = merge(config, {
  entry: {
    app: './src/app.js'
  },
  externals: {
    knockout: {
      root: 'ko',
      commonjs: 'knockout',
      commonjs2: 'knockout',
      amd: 'knockout'
    },
    jquery: {
      root: '$',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery'
    }
  },
  output: {
    publicPath: "./",
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['./dist'],
      {
        root: __dirname ,       　　　　　　　　　　//根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false        　　　　　　　　　　//启用删除文件
      }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
    // new BundleAnalyzerPlugin()
  ]
})
module.exports = config

