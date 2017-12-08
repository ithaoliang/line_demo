// 调用app的方法都在这里写
import api from '@/api'
import store from '@/module/index/store'

window.certificationSuccess = function(){
	store.commit('setIsAuth',true)
}
window.loginSuccess = function(key){
	store.commit('setUserId',key)
}
window.showhide = function(data){
	store.commit('setIsShowHide', data)
}
let userAgent = navigator.userAgent;
let appOs = userAgent.toLowerCase().indexOf("android") !== -1 ? "android":"ios";

var appAccessJs = {
	appOs : appOs
}

appAccessJs.kbBackAction = function(key){
	key = key?key:'';
	this.appOs == "android" ? kbAndroid.toFinish() : kbBackAction(key);
}
// 产品库得佣金状态传到定期寿得详情页面，选中传1，非选中传0
appAccessJs.jscallAppCommissionHide = function(key){
	this.appOs == "android" ? kbAndroid.jscallAppCommissionHide(key) : jscallAppCommissionHide(key);
}
// 吊起来app登录
appAccessJs.appLogin = function(param){
	this.appOs == "android" ? window.kbLogin.toLogin(param) : kbLogin(param);
}
// 吊起app认证
appAccessJs.goAuth = function(){
	this.appOs == "android" ? kbAndroid.toCertification('&authfrom=fromGroup') : toCertification('&authfrom=fromGroup');
}
// 显示分享，佣金按钮
appAccessJs.showShareBtn = function(share,pay){
	this.appOs == "android" ? window.kbLoaded.kbShareBtnShow(share,pay) : kbShareBtnShow(share,pay)
}
//根据类型跳转到相应险种的页面（ 2 车险 3 计划书 4 卡单 5 赠险 6 高端医疗 1 普通产品）
appAccessJs.gotoControlFromProLib = function(type, url){
	this.appOs == "android" ? kbAndroid.gotoControlFromProLib(type,url) : gotoControlFromProLib(type,url)
}
// 吊起app中0元支付方法
appAccessJs.zorePayAct = function(num, param){

	this.appOs == "android" ? window.kbzeropay.toZeroPay(num,param) : kbZeroPay(num,param);
}
// 调起app正常支付方法
appAccessJs.payAct = function(num, param){

	this.appOs == "android" ? window.kbpay.topay(num,param) : kbpay(num,param);
}
// ios 方法 佣金按钮 showhide
appAccessJs.kbEnd = function(){
	this.appOs == "ios" ? kbEnd() : ''
}

// appAccessJs.gotoControlFromProLib = function(type,url){
// 	// 2:需要认证 3：登陆与否 4：直接掉用 5：和1一样 6：登陆与否
// 	let goUrl = "";
// 	if (type == 1) {
// 		goUrl = url
// 	}else if (type == 2) {
// 		if (this.isAuth) {
// 			api.getForCarInfor(function(isSuccess,data,err){
// 		        if (isSuccess) {
// 		        	alert(2)
// 		        }
// 	        })
// 		}else{
// 			this.jscheckAuth();
// 		}
// 	}else if (type == 3) {
// 		if (this.isLogin) {
// 			alert('通过医保接口确定加密串');
// 			// https://sales.kbao123.com/dt/index.html#home/lifeInsurance?encryptedUserData=
// 			// api.getYibaoUserInfo(function(isSuccess,data,err){
// 		 //        if (isSuccess) {
// 		 //        	alert(3)
// 		 //        }
// 	  //       })
// 		}else{
// 			goUrl = 'https://sales.kbao123.com/dt/index.html#home/lifeInsurance'
// 		}
// 	}else if(type == 4) {
// 		goUrl = ""
// 	}else if (type == 5) {
// 		alert("后台提供接口提供url")
// 	}else if (type == 6) {
// 		if (this.isLogin) {
// 			alert('通过医保接口确定加密串');
// 			// https://medical.kbao123.com/dthealth/index.html?encryptedUserData=
// 			// api.getYibaoUserInfo(function(isSuccess,data,err){
// 		 //        if (isSuccess) {
// 		 //        	alert(3)
// 		 //        }
// 	  //       })
// 		}else{
// 			goUrl = ' https://medical.kbao123.com/dthealth/index.html'
// 		}
// 	}

// 	// this.appOs == "android" ? kbAndroid.gotoControlFromProLib(type,url) : gotoControlFromProLib(type,url)
// }



// h5页面跳转到app的1 表示首页 2 订单 3 产品库 4好赔  5个人中心
appAccessJs.backkbActionFromProLib = function(type){
	this.appOs == "android" ? kbAndroid.backkbActionFromProLib(type) : backkbActionFromProLib(type)
}
// js调app检查认证
appAccessJs.jscheckAuth = function(){
	this.appOs == "android" ? kbAndroid.jscheckAuth("") : jscheckAuth()
}

export default {
	appAccessJs
}