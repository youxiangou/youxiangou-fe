/* 
* @Author: shenyoujian
* @Date:   2019-02-24 00:18:26
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-26 10:13:40
*/

'use strict';
var hogan = require('hogan');
var conf = {
    serverHost : ''
};

var _youxiangou = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    // 获取服务器地址
    getServerUrl        : function(path){
        return conf.serverHost  + path;
    },
    // 获取url的参数
    getUrlParam         : function(name){
        //happymmall.com/product/list?keyword=xxx&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml          : function(htmlTemplate, data){
        var template     = hogan.compile(htmlTemplate);
        var result       = template.render(data);
        return result;
    },
    // 成功提示
    successTips         : function(msg){
        alert(msg || '操作成功！ ');
    },
    // 错误提示
    errorTips           : function(msg){
        alert(msg || '哪里不对了~ ');
    },
    // 字段的验证， 支持是非空， 手机， 邮箱的判断
    validate            : function(value, type){
        var value   = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //跳到登陆页,后面加的参数是登录之后调回回来的页面而不是首页
    doLogin             : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳到首页
    goHome              : function(){
        window.location.href = './index.html';
    }

};


module.exports = _youxiangou;