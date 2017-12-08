<template>
  <div class="app">
    <page :currentPage="currentPage">
      <div class="animate">
        <div class="first-page">
          <div>
            <span class="day count-font">100</span>
            <span class="country count-font">100</span>
            <span class="home count-font">100</span>
          </div>
          <div class="peo-title">
            <img src="../../../../assets/logo.png" style="width:100%" alt="" />
          </div>
          <div class="img_list">
            <ul>
              <li>
                <div>
                  <img src="../../../../assets/images/active/xsdk@2x.png"  class="img" alt="" />
                </div>
              </li>
              <li>
                <div>
                  <img src="../../../../assets/images/active/kbdr@2x.png"  class="img" alt="" />
                  <img src="../../../../assets/images/active/hlss@2x.png" class="img" alt="" />
                </div>
              </li>
              <li>
                <div>
                  <img src="../../../../assets/images/active/zzsf@2x.png"  class="img" alt="" />
                  <img src="../../../../assets/images/active/smgl@2x.png" class="img" alt="" />
                  <img src="../../../../assets/images/active/cswz@2x.png" class="img" alt="" />
                </div>
              </li>
              <li>
                <div>
                  <img src="../../../../assets/images/active/yldk@2x.png"  class="img" alt="" />
                  <img src="../../../../assets/images/active/yldk@2x.png"  class="img" alt="" />
                </div>
              </li>
              <li>
                <div>
                  <img src="../../../../assets/images/active/ywdk@2x.png"  class="img" alt="" />
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </page>
    <page :currentPage="currentPage">
      <div class="animate">
        <div class="one"> 
          <div>
            <div class="count-record count-font">
                <span>100000.00</span>
            </div>
            <div class="img-record">
                <img v-if="false" src="../../../../assets/images/active/record-1@2x.png" class="record-img-1" alt="" /> 
                <img v-if="" src="../../../../assets/images/active/record-2@2x.png" class="record-img-2" alt="" /> 
            </div>
          </div>
        <div>
          <div class="count-income count-font">
             <span>100000.00</span>
          </div> 
          <div class="img-income">
            <img v-if="false" src="../../../../assets/images/active/income-1@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-2@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-3@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-4@2x.png" class="income-img-1" alt="" /> 
            <img v-if="" src="../../../../assets/images/active/income-5@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-6@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-7@2x.png" class="income-img-1" alt="" /> 
            <img v-if="false" src="../../../../assets/images/active/income-8@2x.png" class="income-img-1" alt="" /> 
          </div>         
        </div>
        <div class="count-team count-font">
            <span>10</span>
        </div>
      </div>

      <!--  <div class="two">
          <div class="money-count count-font">
            <span>1000000.00</span>
          </div>
          <div class="team-count count-font">
            <span>100</span>
          </div>
        </div> -->

      </div>
    </page>
    <page :currentPage="currentPage">
      <div class="animate move-left">
        <div class="three">
          <div class="union">
            <img src="../../../../assets/images/active/bj4-title.png" class="union-title" alt="" />
            <!-- <img src="../../../../assets/images/active/bj4-title-2.png" class="union-title" alt="" /> -->
          </div>
          <div class="union-btn">
            <img src="../../../../assets/images/active/btn.png" class="union-btn" alt="" />
          </div>
        </div>
      </div>
    </page>
   <!--  <page :currentPage="currentPage">
      <div class="animate move-left">
       
      </div>
    </page> -->
    <page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption"></page-controller>
  </div>
</template>

<script>
  import Page from './Page.vue';
  import PageController from './PageController.vue';

  // 页面进出动画
  function afterEnterAnimate($child) {
    $child.$el.querySelector('.animate')
  }
  function beforeLeaveAnimate($child) {
    $child.$el.querySelector('.animate')
  }

  export default {
    data() {
      return {
        currentPage: 1,
        options: [{
          color: '#fff',
          // 内容居中
          isCenter: true,
          // 上一个页面展示
          afterEnter: afterEnterAnimate,
          // 下一个页面展示
          beforeLeave: beforeLeaveAnimate
        }, {
          color: '#fff',
          isCenter: true,
          afterEnter: afterEnterAnimate,
          beforeLeave: beforeLeaveAnimate
        }, {
          color: '#fff',
          isCenter: true,
          afterEnter: afterEnterAnimate,
          beforeLeave: beforeLeaveAnimate
        }],
        controllerOption: {
          arrowsType: false,
          navbar: true,
          highlight: true,
          loop: false
        }
      }
    },
    computed: {
      // 总page数
      pageNum() {
        return this.options.length;
      }
    },
    methods: {
      changePage(index) {
        let beforeIndex = this.currentPage - 1;
        let leaveFunction = this.options[beforeIndex].beforeLeave;
        typeof leaveFunction === 'function' && leaveFunction.call(this, this.$children[beforeIndex]);
        this.currentPage = index;
        let nextIndex = index - 1;
        let enterFunction = this.options[nextIndex].afterEnter;
        this.$nextTick(function() {
          typeof enterFunction === 'function' && enterFunction.call(this, this.$children[nextIndex]);
        })
      }
    },
    components: {
      Page, PageController
    },
    mounted() {
      this.$children.forEach((child, index) => {
        // 动态设置各个page内的options
        if (child.option === null) {
          let childOption = this.options[index];
          this.$set(childOption, 'index', index + 1);
          child.option = childOption;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
*{
  touch-action:none;
}
.box{
  width: 100%;
  height: 100%;
}
 .first-page{
      background: url('../../../../assets/images/active/1.png') no-repeat;
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
 .one{
    background: url('../../../../assets/images/active/2.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 100%;
    position: absolute;

 }
 .two{
    background: url('../../../../assets/images/active/3.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
 }
 .three{
    background: url('../../../../assets/images/active/bj4.png') no-repeat;
    background-size: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
 }
 
 .img{
    width:2.1rem;
 }
 
 .money-count{
    position: absolute;
    top: 35.2%;
    left: 34%;
    width: 35%;

 }
 .count-font{
    font-size: .4rem;
    color: #ffe430;
    font-weight: bold;
    text-align: center;
 }
 .team-count{
    position: absolute;
    top: 59%;
    left: 34%;
    width: 13%;

 }
.count-record{
    position: absolute;
    top: 35.2%;
    left: 35%;
    width: 34%;
}
.img-record{
    
}
.record-img-1{
    width: 4.4rem;
    top: 42%;
    left: 22%;
    position: absolute;
}
.record-img-2{
    width: 3.6rem;
    top: 41.4%;
    left: 27%;
    position: absolute;

}
.count-income{
    position: absolute;
    top: 58.4%;
    left: 32%;
}
.income-img-1{
    position: absolute;
    top: 64%;
    width: 5rem;
    left: 17%;
}
.count-team{
    position: absolute;
    left: 32%;
    bottom: 17%;
    width: 14%;
}
.union-title{
    width: 5.8rem;
    position: absolute;
    top: 4%;
    left: 10%;
}
.union-btn{
    width: 3.2rem;
    bottom: 5%;
    position: absolute;
    left: 20%;
}
ul{
      position: absolute;
    bottom: 0;
    left: 7%;
    width: 6.5rem;
}
ul li{
  list-style: none;
}
.day{
    position: absolute;
    top: 28%;
    left: 47%;
    width: 14%;
}
.country{
    position: absolute;
    left: 57%;
    top: 33%;
    width: 10%;
}
.home{
  position: absolute;
  left: 25%;
  top: 37%;
  width: 16%;
}
.peo-title{
  border-radius: 14px;
    position: absolute;
    top: 44.6%;
    left: 40%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: red;
    overflow: hidden;
    }
  
</style>
