/**
 * [getters description]
 * 动态往全局state中塞值
 * store计算属性，getters的返回值回根据他的依赖改变，重新计算
 * @type {Object}
 */
import api from '@/api'

var getters = {
	// 判断是否登录
  isLogin:state=>{
    if (state.isAppOpen) {
    	// app打开
    	if (state.userId) {
    		return true
    	}else{
    		return false
    	}
    }else{
    	// h5单独页面
    	let pageRandom = localStorage.getItem("random");
    	if (pageRandom == state.random && state.userId) {
    		return true;
    	}else{
    		return false;
    	}
    }
  }
}

export default getters
