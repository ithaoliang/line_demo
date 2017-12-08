<template>
  <div class="hello box">
    <div class="one">
      <div class="timer">
          <div class="rule">
            <img src="../../../../assets/images/active/rule.png" width="100%" alt="" />
          </div>
          <div class="chance">
            <img src="../../../../assets/images/active/chance.png" width="100%" alt="" />
            <span class="chanceNum">11</span>
          </div>
          <timer @time-end="message = '倒计时结束'" :endTime='endTime'></timer>
      </div>
      <div class="count-style"> 
          <div class="count-width">
            <div class="count-sel">
              <img src="../../../../assets/images/active/line@2x.png" class="line line-2" />
              <img v-drag="register(isShowMSG)" style="z-index:3" src="../../../../assets/images/active/2@2x.png" class="count-2 count" alt="" />
            </div>
          </div>
          <div class="count-width count-width-paws">
            <div class="count-box-paws">
              <img src="../../../../assets/images/active/line@2x.png" class="line-paws" />
              <img v-drag="register(isShowMSG)" style="z-index:3" src="../../../../assets/images/active/paws@2x.png" class="count-paws" alt="" />
            </div>
          </div>
          <div class="count-width count-width-1">
            <div class="count-box-1">
              <img src="../../../../assets/images/active/line@2x.png" class="line-1" />
              <img v-drag="register(isShowMSG)" style="z-index:3" src="../../../../assets/images/active/1@2x.png" class="count-1" alt="" />
            </div>
          </div>
          <div class="count-width count-width-8">
            <div class="count-box-8">
              <img src="../../../../assets/images/active/line@2x.png" style="height:.8rem" class="line-8" />
              <img v-drag="register(isShowMSG)" style="z-index:3" src="../../../../assets/images/active/8@2x.png" class="count-8" alt="" />
            </div>
          </div>
          <div class="count-width count-width-dog">
            <div class="count-box-dog">
              <img src="../../../../assets/images/active/line@2x.png" class="line-dog" />
                <img  v-drag="register(isShowMSG)" style="z-index:3" src="../../../../assets/images/active/dog@2x.png" class="count-dog"  @click="text" alt="" />
            </div>
          </div>
      </div>
      <div class='bill'></div>
      <div class="reward" @click="text">
        <div class="scroll-wrap">
          <ul class="scroll-content" :style="{top}">
              <li v-for = "item in prizeList" :key="item.name">{{item.name}}</li >  
          </ul>
        </div>
      </div>
      
    </div>
    <div v-if="isShowMSG">
      <div class="msk"></div>
      <div class="hongbao">
        <img  src="../../../../assets/images/active/hongbao.png" class="hongbao-img" alt="">
        <span class="hongbaoMSG">恭喜你获得2元红包</span>
        <button class="hongbaoBTN" @click="clickFlase"></button>
      </div>
    </div>
   
  </div>
</template>

<script>
import api from '@/api'
import {mapGetters,mapState} from 'vuex'
import dtlogin from '@/service/dtLogin.js'
import dtShare from '@/service/dtShare/index.js'
import timer from '@/common/timer/timer'
// import  '@/utils/vueDirective.js'
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
      bottom:false,
      isShowMSG:false,
      prizeList: [
        { name: 0 },
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 }
      ],
      activeIndex: 0
    
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
    } ,
    text:function(){
      console.log(222222)
      let obj={name:6}
      this.prizeList.push(obj)
    },
    register:function(flag){
      return (el)=>{
        this.isShowMSG =true
      }
    },
    clickFlase:function(){
       this.isShowMSG =false
    }
    
  },
  computed:{
    ...mapGetters(['isLogin']),
    ...mapState({
        appOs:'appOs',
        isAppOpen: 'isAppOpen',
        host:'host'
      }),
     top() {
      return - this.activeIndex * 0.9 + 'rem';
    }
  },
   mounted() {
    setInterval(()=> {
      if(this.activeIndex < this.prizeList.length-1) {
        this.activeIndex += 1;
        
      } else {
        this.activeIndex = 0;
      }
    }, 1000);
  },
  directives:{
    "drag":{
      inserted (el, binding) {
        let oDiv = el
        let pDiv=el.parentElement.clientHeight - el.clientHeight
        var disY=0
        var moveY=0
        var endY=0
        var startY=el.style.top;
        var lineStart=0;
        var line=el.parentElement.firstChild.clientHeight
        oDiv.addEventListener('touchstart', function (event) {
          event.preventDefault();
          let touch= event.targetTouches[0]
          disY = touch.pageY
        },false)

        oDiv.addEventListener('touchmove',function(event){
          event.preventDefault();
          var touch = event.targetTouches[0]; 
          endY = touch.pageY;
          moveY = parseInt((endY - disY));
          if(moveY > 0 && moveY < pDiv){
            el.style.top=`${moveY}px`;
            el.parentElement.firstChild.style.height=line+moveY+'px'
        
          }
        
        },false)

        oDiv.addEventListener('touchend',function(event){
          el.style.top=startY;
          el.parentNode.firstChild.style.height=line+'px'
          if(moveY>10){ 
             if(typeof binding.value == 'function'){
                binding.value(el);
             }
          }
          
        }, false);
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
.hongbaoMSG{
    position: absolute;
    bottom: 29%;
    left: 28%;
    right: 0;
    width: 3.2rem;
    height: 0.6rem;
    font-size: .36rem;
    color: #ffd03f;
    font-weight: bold;
}
.hongbaoBTN{
    position: absolute;
    bottom: 10%;
    left: 28%;
    right: 0;
    width: 3.2rem;
    height: 0.6rem;
    background-color: transparent;
    outline: none;
    border: none;
}
.hongbao-img{
      width: 6rem;
}
.hongbao{
      position: absolute;
    left: 0;
    right: 0;
    top: 25%;
    z-index: 10;
    text-align: center;
}
.msk{
position:absolute;
top:0;
bottom:0;
left:0;
right:0;
background:#000;
opacity:0.7;
z-index: 9;
}
.box{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
 .one{
      background: url('../../../../assets/images/active/bj5.png') no-repeat;
      background-size: 100%;
      height: 100%;
      width: 100%;
      position: relative;

 }
  .rule{
    width: 35%;
    position: absolute;
    top: 30%;
    left: 51%;

 }
  .chance{
    width: 35%;
    position: absolute;
    top: 30%;
    left: 16%;

 }
 .chanceNum{
    position: absolute;
    left: 17%;
    top: 0;
    line-height: 0.5rem;
    color: #fff;
    -webkit-text-stroke: 2px #47238e;
    font-size: 3rem;
    transform: scale(.1);
 }
 .timer{
   background: url('../../../../assets/images/active/timer.png') no-repeat;
      background-size: 100%;
      height: 100%;
      width: 100%;
      position: absolute;
 }
 .img_list{
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4%;
 }
 .img{
   width:2.1rem;
 }
 li{
      padding-bottom: 4px;
 }
 .count-style{
    position: relative;
    width: 74%;
    top: 45%;
    left: 12%;
    height: 4.5rem;
 }
 .count-width{
    width: 20%;
    position: absolute;
    top: 1.3rem;
 }
 .count-2{
    width: 90%;
    /* height: 100%; */
    position: absolute;
    top: 0;
    left: .1rem;
    z-index: 3;
 }
 .line-2{
    width: 16%;
    height: 1rem;
    position: absolute;
    top: -43%;
    left: 0.54rem;
    z-index: 2;
 }
  .count-dog{
    width: 80%;
    position: absolute;
    right: 20%;

 }
 .line-dog{
    width: 16%;
    position: absolute;
    left: .4rem;
    height: 1.8rem;
    top: -1.6rem;
 }
 .count-width-dog{
  left: 80%;
 }
 .count-width-8{
      left: 64%;
 }
 .count-8{
    width: 56%;
    position: absolute;
    left: 20%;

 }
 .line-8{
    width: 16%;
    position: absolute;
    left: .45rem;
    height: .8rem;
    top: -.65rem;
 }
 .count-width-1{
  left: 44%;
 }
  .count-1{
    width: 65%;
    /* height: 100%; */
    position: absolute;
    left: 6%;

 }
 .line-1{
width: 16%;
    position: absolute;
    left: .3rem;
    height: 1rem;
    top: -.8rem;
 }
 .count-width-paws{
  left: 20%;
 }
 .count-paws{
    width: 71%;
    /* height: 100%; */
    position: absolute;
    left: 25%;
    top: 0;

 }
 .line-paws{
    width: 16%;
    position: absolute;
    left: 0.61rem;
    height: 2.4rem;
    top: -2.2rem;
 }
  .bill{
    background: url('../../../../assets/images/active/bill.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 71%;
    position: absolute;
    top: 72%;
    left: 19%;
    z-index: 2;
 }
   .bill-next{
     background: url('../../../../assets/images/active/bill-next.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 57%;
    position: absolute;
    top: 76%;
    left: 28%;
    z-index: 2;
 }
 .count-bj{
    background: url('../../../../assets/images/active/rain.png') no-repeat;
    background-size: 100%;
    height: 100%;
 }
 .reward{
     background: url('../../../../assets/images/active/reward.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 94%;
    position: absolute;
    left: 5%;
    top: 90%;
    z-index: 1;
 }
 .red-paws{
    width: 1.5rem;
    /* height: 100%; */
    position: relative;
    left: 0.04rem;
    top: -1.3rem;
 }
 .red-count-1{
  width: 1rem;
    /* height: 100%; */
    position: relative;
    left: -.1rem;
    top: -1.3rem;
 }
 .red-count-8{
      width: 90%;
    height: 100%;
    position: relative;
    top: -.84rem;
    /*left: .1rem;*/
 }
 .red-count-dog{
      width: 80%;
    height: 100%;
    position: relative;
    top: -.9rem;
    left: .1rem;
 }
.scroll-wrap{
    width: 3.4rem;
    height: .8rem;
    /* border: 1px solid blue; */
    overflow: hidden;
    left: 46%;
    position: relative;
}

.scroll-content{
  position: relative;
  transition: top 0.5s;

  li{
    text-align: center;
    height: .8rem;
    line-height: .8rem;
  }
}
.count-sel{
  position: relative;
    height: 2rem;
    top: 0.6rem;
}
.count-box-paws{
  position: relative;
  height: 2rem;
  top: 1.3rem;
}
.count-box-1{
  position: relative;
    height: 2rem;
    top: .16rem;
}
.count-box-8{
  height: 2rem;
    position: relative;
}
.count-box-dog{
  position: relative;
    height: 2rem;
    top: 1rem;
}
</style>
