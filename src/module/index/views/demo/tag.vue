<template>
 
<!--   <div class="hello box" 
  v-tap="{fn:vuetap,name:'点击'}" 
  v-longtap="{fn:vuetap,name:'长按'}" 
  v-swipeleft="{fn:vuetap,name:'左滑'}"
  v-swiperight="{fn:vuetap,name:'右滑'}"
  v-swipeup="{fn:vuetop,name:'上滑'}"
  v-swipedown="{fn:vuebottom,name:'下滑'}"  style="height:100%"
> -->
<div class="hello box">
    <div class="one" v-if="top">
      <p>meg:{{msg}}</p>
      <button @click="toGet">点击查看GET事件</button>
      <button></button>
      剩余时间<timer @time-end="message = '倒计时结束'" :endTime='endTime'></timer>
    </div>
    <div class="self" v-if="bottom">
        <img src="../../../../assets/images/text/3333.jpg" height="184" width="330" alt="" />
    </div>
    <span style="color:red">{{name}}</span>

    <div style="width:300px;height:300px;background-color:green">
     <div v-drag="greet" style="width:100px;height:100px;background-color:red;position:relative;top:0"></div>
    </div>

  </div>
</template>

<script>
import api from '@/api'
import {mapGetters,mapState} from 'vuex'
import dtlogin from '@/service/dtLogin.js'
import dtShare from '@/service/dtShare/index.js'
import timer from '@/common/timer/timer'
import  '@/utils/vueDirective.js'
// import vuetouch from '@/service/touch/vue-touch.js'
export default { 
  components : {
        timer
  },
  data () {
    return {
      msg: '原始测试数据',
      message : '正在倒计时',
      endTime : '2017-12-30 15:07:00',
      name:'开始',
      top:true,
      bottom:false
    }
  },
  created(){
    let str="1213"
    // let linkUrl = `${this.host.OP_UCENTER}?test=${str}`;
    console.log( `${this.host.OP_UCENTER}?test=${str}`)
    // window.location.href = linkUrl;
    // 显示分享按钮
    // dtShare.showAppShareButton(1,1);

    // app分享传参数
    dtShare.transformData("share_tile", "share_desc", window.location.href, "https://f12.baidu.com/it/u=2754208607,630952272&fm=72", " ",false)
    // H5二次分享传参数
    dtShare.h5ShareJs("share_tile", "share_desc", window.location.href, "https://f12.baidu.com/it/u=2754208607,630952272&fm=72")

    // kbShareBtnShow('1','0');
    // 登录+认证判断
    // if (this.isLogin) {    
    //   if (this.isAppOpen) {
    //     dtlogin.goAuthorization();
    //   }
    // }else{
    //   dtlogin.toLogin();
    // }
    
  },
  methods: {
    toGet: function(){
      var _this = this;
      api.getDemo(function(isSuccess,data,err){
        console.log('get==========',isSuccess,data,err)
      })
    },
    vuetap:function(s){
        this.name=s.name;
      },
      vuetop:function(){
        this.bottom=true
         this.top=false
      },
      vuebottom:function(){
        this.bottom=false
         this.top=true
      },
      greet(obj){
        console.log(2222222)
      }
  },
  computed:{
    ...mapGetters(['isLogin']),
    ...mapState({
        appOs:'appOs',
        isAppOpen: 'isAppOpen',
        host:'host'
      }),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.self{
  animation:mymation 1s;
}
@keyframes mymation
  {
    from {
      opacity: 0;
       transform-origin:center;
      transform:scale(0)
    }
    to {
    opacity: 1;
    -moz-transform:rotate(0deg) scale(1.00,1.00) translate(0px,0px) skew(0deg,0deg);
    -moz-transform-origin:50% 50%;
    -webkit-transform:rotate(0deg) scale(1.00,1.00) translate(0px,0px) skew(0deg,0deg);
    -webkit-transform-origin:50% 50%;
    -o-transform:rotate(0deg) scale(1.00,1.00) translate(0px,0px) skew(0deg,0deg);
    -o-transform-origin:50% 50%;
    transform:rotate(0deg) scale(1.00,1.00) translate(0px,0px) skew(0deg,0deg);
    transform-origin:50% 50%

    }
  }
</style>
