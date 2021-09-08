import angular from 'angular';

import uiRouter from '@uirouter/angularjs';

import '../public/js/lib-flexible/lib-flexible_0.3.4___flexible_css.js,flexible';

import '../style/app.css';

const router = require("./router/router"); // 路由器

const component = require("./components");  //组件

import factory from './factory';  // 工廠


const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter])
  .component(component) //组件
  .factory(factory) // 工廠
  .config(router); // 路由器

export default MODULE_NAME;