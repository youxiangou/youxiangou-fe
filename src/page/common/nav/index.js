/* 
* @Author: shenyoujian
* @Date:   2019-02-24 02:25:25
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-24 02:46:00
*/
require('./index.css');
var _youxiangou     = require('util/youxiangou.js');
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _youxiangou.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
           
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
       
    },
    // 加载购物车数量
    loadCartCount : function(){
       
    }
};

module.exports = nav.init();