/* 
* @Author: shenyoujian
* @Date:   2019-02-25 05:53:10
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-27 02:03:03
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide                 = require('page/common/nav-side/index.js');
var _youxiangou             = require('util/youxiangou.js');
var _user                   = require('service/user-service.js');
var templateIndex           = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _youxiangou.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _youxiangou.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});