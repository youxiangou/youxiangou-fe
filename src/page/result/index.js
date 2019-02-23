/* 
* @Author: shenyoujian
* @Date:   2019-02-23 05:27:30
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-24 04:21:57
*/


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/footer/index.css');
var _youxiangou = require('util/youxiangou.js');

$(function(){
    var type        = _youxiangou.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})