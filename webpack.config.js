/* 
* @Author: shenyoujian
* @Date:   2019-02-23 04:12:36
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-24 04:14:12
*/

'use strict';
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
//针对webpack浏览器重复打包进行node环境变量配置, dev/online
// process属于Node中的一个属性,为了怕出错,我们做一个容错的兼容
// webpack_env 这个变量在外面启动服务器的时候定义一个参数出来
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config  = {
    //多入口
    entry : {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'login'             : ['./src/page/login/index.js'],
        'result'            : ['./src/page/result/index.js'],
    },
    //输出
    output : {
        //目标输出目录,path的绝对路径
        path : './dist',
        // 访问的路径
        publicPath : '/dist',
        // 用于输出文件的文件名
        filename : 'js/[name].js',
    },

    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    //路径解析
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register')),
    ]
};

if('dev' === WEBPACK_ENV){
    //这种情况在开发环境下就会加上这个client,在线上就不会.
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;