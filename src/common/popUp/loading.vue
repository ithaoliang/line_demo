<template>
  <transition name='fade'>
  <div id="tj-loading-popup" v-if="visible" class="tj-loading-layout" @click.stop>
    <div class="tj-loading">
      <span></span>
      <p>正在加载中...</p>
    </div>
  </div>
</transition>
</template>
<style lang="scss">
.tj-loading-layout{
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  .tj-loading{
    display: inline-block;
    padding: 20px;
    border-radius: 3px;
    font-size: 12px;
    color:#fff;
    text-align: center;
    background: rgba(0,0,0,.6);
    span{
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 2px solid #fff;
      border-color:#fff #fff transparent transparent;
      border-radius: 100%;
      transform-origin: 50% 50%;
      animation: tuloading 1.25s linear infinite;
    }
    p{
      margin-top: 10px;
      margin-bottom: -10px;
      font-size: 10px;
      white-space: nowrap;
    }
  }
}

@keyframes tuloading{
  0%{transform:rotate(0deg)}
  100%{transform:rotate(360deg)}
}
</style>
