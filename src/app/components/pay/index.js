module.exports = {
    template: require('./index.html'),
    controller: ['$scope','$stateParams','$location','$window','$interval','factoryHttp','factoryDate',
        function PayController($scope,$stateParams,$location,$window,$interval,factoryHttp,factoryDate) {
            var self = this;
            let protocol = $location.protocol();
            let localhost = $location.host();
            //let url = protocol+'://'+localhost;
            let id = 0;    //后台返回的ID
            //路径参数
            self.platform = $location.search().platform;
            self.order = $location.search().order;
            self.amount = $location.search().amount;
            self.remark = $location.search().remark;

            //点击图片时放大显示图片
            self.changePic = function(event){
                var img = event.srcElement || event.target;
                angular.element(document.querySelector("#bigimage"))[0].src = angular.element(img).attr('data-qrcode');
                angular.element(document.querySelector("#js-imgview"))[0].style.display = "block";
                angular.element(document.querySelector("#js-imgview-mask"))[0].style.display = "block";
            };
            //点击图片时放小显示图片
            self.closePic =function() {
                angular.element(document.querySelector("#js-imgview"))[0].style.display = "none";
                angular.element(document.querySelector("#js-imgview-mask"))[0].style.display = "none";
            };

            self.btn_text = '我已支付完成';
            self.className = true;
            self.btnDisabled = false;
            self.submitPay = function () {
                self.btnDisabled = true;
                self.className = false;
                self.btn_text = '已通知对方正在放币，请稍后';
                factoryHttp.post('/api/v1/paySave.html',{id:id,type:'submit'})
                    .then(function (result) {
                        console.log(result)
                    });
            };
            //取消订单
            self.cancelPay = function(){
                self.btnDisabled = true;
                self.className = false;
                factoryHttp.post('/api/v1/paySave.html',{id:id,type:'cancel'})
                    .then(function (result) {
                        $window.history.back(-1);
                    });
            };
            //提交订单信息到后台
            self.list = [];
            self.unit_price = 1;
            this.save = function(){
                let postData ={
                    platform: self.platform,
                    order: self.order,
                    amount: self.amount,
                    remark: self.remark
                };
                factoryHttp.post('/api/v1/paylist.html',postData)
                    .then(function (result) {
                        if(result.data.err_code == 0){
                            self.list = result.data.data.list;
                            self.unit_price = result.data.data.unit_price;
                            id = result.data.data.id;
                        }else{
                            $window.alert(result.data.err_msg);
                        }
                    })
            };
            this.save();

            let createTime = factoryDate.localTime();//订单创建时间
            var curTime;//当前时间
            var totalSecond;//设置计时总时间（分钟）
            if(createTime !== 'undefined' && createTime !== null){
                //为了支持safari浏览器
                createTime = new Date(createTime.replace(/\-/g, "/")).getTime();
                curTime = new Date().getTime();
                totalSecond=Math.round((createTime+30*60*1000-curTime)/1000);
            }else{
                totalSecond = 30 * 60;
            }
            /**
             * 支付倒计时
             */
            let timePromise = $interval(function() {
                if (totalSecond >= 0) {
                    var t1 = Math.floor(totalSecond / 60);
                    var m = t1 < 10 ? "0" + t1 : t1;
                    var t2 = totalSecond - t1 * 60;
                    var s = t2 < 10 ? "0" + t2 : t2;
                    totalSecond = totalSecond - 1;
                    self.payCountDown = m + "分" + s + "秒"
                } else {
                    self.payCountDown = "支付超时，请重新下单！";
                    $interval.cancel(timePromise);//终止倒计时
                }
            },1000);
        }
    ]
};