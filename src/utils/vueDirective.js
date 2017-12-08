import Vue from 'vue'

//v-scrollfix 主要解决iOS下，popup scroll 与body冲突导致部分情况下无法滚动
Vue.directive('scrollfix', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    let scrollView = el
    let currentY = 0
    let beginScrollTop = 0
    // let isFirstTouchStart = true

    scrollView.addEventListener("scroll", function(event){
      if(scrollView.scrollTop==0){
        scrollView.scrollTop = 1
      }
    }, false);

    scrollView.addEventListener("touchstart", function(event){
      // if(isFirstTouchStart){
      //   scrollView.scrollTop = 1
      //   isFirstTouchStart = false
      // }
      if (!event.touches.length) return;
      var touch = event.touches[0];
      currentY = touch.pageY;
      beginScrollTop = scrollView.scrollTop
      console.log('----touchstart scrollTop='+beginScrollTop)
    }, false);
    scrollView.addEventListener("touchmove", function(event){


      if (scrollView.scrollTop+50 > scrollView.clientHeight) {
        event.preventDefault();
      }
      // event.preventDefault();
      if (!event.touches.length) return;
      var touch = event.touches[0];
      let startY = touch.pageY;
      if(currentY!=startY){
        //这里判断scrollTop
        let length = currentY-startY
        //如果当前的scrollTop值没有变化的话，则自动设置
        if(beginScrollTop==scrollView.scrollTop){
          // console.log('如果当前的scrollTop值没有变化的话，则自动设置','beginScrollTop='+beginScrollTop," scrollView.scrollTop="+scrollView.scrollTop)
          scrollView.scrollTop+=length
          beginScrollTop = scrollView.scrollTop
        }
        // console.log('scrollView.scrollTop=',scrollView.scrollTop,length)
        currentY = startY
      }
      //做处理
    }, false);
  }
})
Vue.directive('drag', {
  inserted (el, binding) {
    let oDiv = el
    let pDiv=el.parentElement.clientHeight - el.clientHeight
    var disY=0;
    var moveY=0;
    var endY=0;
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
      if(moveY>0&& moveY < pDiv){
        el.style.top=`${moveY}px`;
        // el.parentElement.firstChild.style.height=el.parentElement.firstChild.style.height+(moveY/100)+'rem'
        el.parentNode.firstChild.style.height=(parseFloat(el.parentNode.firstChild.style.height)*100+moveY)
        console.log(parseFloat(el.parentNode.firstChild.style.height)*100+'~~~~~~~~~~')
        console.log(moveY)
      }
     
    },false)

    oDiv.addEventListener('touchend',function(event){
      event.preventDefault();
      el.style.top=`0px`;
      let _this=this;
      this.greet();
  }, false);
 
   } 
})