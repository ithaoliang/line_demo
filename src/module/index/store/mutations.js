/**
 * [mutations description]
 * 更改store中状态的唯一方法就是提交mutation
 * @type {Object}
 */
var mutations = {
  setHeaderTitle(state,title){
    state.headerTitle = title
  },
  setIsAppOpen(state,data){
  	state.isAppOpen = data
  },
  setHost(state,data){
    state.host = data
  },
  setAppOs(state,data){
  	state.appOs = data
  },
  setUserId(state,data){
  	state.userId = data
  },
  setToken(state,data){
    state.token = data
  },
  setRandom(state,data){
  	state.random = data
  },
  setIsAuth(state,data){
    state.isAuth = data
  },
  setIsShowHeader(state,data){
    state.isShowHeader = data
  },
}

export default mutations