/* 
* @Author: shenyoujian
* @Date:   2019-02-23 04:01:21
* @Last Modified by:   shenyoujian
* @Last Modified time: 2019-02-24 03:57:56
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
require('page/common/footer/index.css');

navSide.init({
    name : 'user-center'
});