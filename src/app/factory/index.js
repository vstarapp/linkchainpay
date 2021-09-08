module.exports = {
  /**
   * 异步请求
   * **/
  factoryHttp: require("./main/http"),
  /**
   * 異步請求攔截器
   * **/
  factoryInterceptor: require("./main/interceptor"),
  /**
   * 改變大小
   * **/
  factoryResize: require("./main/resize"),
  /**
   * 时间格式化
   * **/
  factoryDate: require("./main/date")
};
