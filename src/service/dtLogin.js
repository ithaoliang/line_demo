/*
* app登录或者h5跳转登录页面
* app登录后需要认证
*/

import store from '@/module/index/store'
import urlHelper from '@/utils/urlHelper.js'
import api from '@/api'
import appJs from './appAccess.js'


// 登陆参数，不传，或者传两个参数，h5需要callBackUrl，app登陆需要appParam,用来判断来源
function toLogin(callBackUrl,appParam){
	if (store.state.isAppOpen == true) {
		appParam = appParam?appParam:"";
		appJs.appAccessJs.appLogin(appParam);
	}else{
		let pageRandom = parseInt(90000 * Math.random() + 10000);
        localStorage.setItem("random", pageRandom);
        callBackUrl = callBackUrl ? callBackUrl : window.location.href;
        let returnUrl = urlHelper.delParam(callBackUrl,'userId')		//删除userId
        returnUrl = urlHelper.changeURLArg(callBackUrl,'random',pageRandom)	//动态修改random
        window.location.href = store.state.host.OP_TM_4+'/html5/loginNew/redLogToken.jsp?activityType=group&parentID='+store.state.userId+"&returnHref="+encodeURIComponent(returnUrl)
        // window.location.href = host.OP_TM+'/html5/loginNew/redLog.jsp?activityType=group&parentID='+userId+"&returnHref="+encodeURIComponent(returnUrl)
	}
}

//是否认证,针对app处理认证，h5认证和登录绑定在一起，不需要考虑
//flag = true时，需要跳转到认证
// *去认证这个方法需要更改一下
function goAuthorization(){
	api.getIsAuth({'userId':store.state.userId}, function(isSuccess,data,err){
		if (isSuccess == true) {
			if (data.status == 403) {
				appJs.appAccessJs.goAuth()
			}
		}else{
			console.log(err)
		}
	})
}

export default{
	toLogin,
	goAuthorization
}