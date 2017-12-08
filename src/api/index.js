/*
* 访问接口存放位置
*/
import KBRequest from './kbRequest.js';
import HttpRequest  from '@/utils/request.js'

let operate = h5config;
console.log('9999999999999999',operate)

/*
*  /tm:https://tm.kbao123.com/4.0/
*  /postData:https://tm.kbao123.com/3.8/
*  /local/mock: http://localhost:8080
*/
let apiData = {
	demo: '/api/openapi/BaikeLemmaCardApi??scope=103&format=json&appid=379020&bk_key=关键字&bk_length=600',
	isAuth: operate.OP_CUR_VERSION +'/coupon/isauth',			// 认证
	shareAppid: operate.OP_CUR_VERSION+'/tencent/share',		//微信分享获取appid
}

//http是重写过的规则；
//原始规则在httpRequest中
let http = new KBRequest()
let httpRequest = new HttpRequest()

function getDemo(callback){
	httpRequest.getRequest(apiData.demo, null, callback)
}

function getIsAuth(params, callback){
	httpRequest.postRequest(apiData.isAuth, params, callback,{'avgx':'csbt34.ydhl12s','zrt':'1dcypsz1/2jss1/2j#f00'})
}

function getShareAppid(params, callback){
	httpRequest.postRequest(apiData.shareAppid, params, callback,{'avgx':'csbt34.ydhl12s','zrt':'1dcypsz1/2jss1/2j#f00'})
}



export default {
	getDemo,
	getIsAuth,
	getShareAppid,
}
