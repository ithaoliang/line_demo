<template>
        <transition name="scale">
          <div ref="ctips" v-if="visible" class="ui-tips" v-on:click.stop.prevent>
            <p class="ui-tips-desc">
              {{tips}}
            </p>
          </div>
        </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      timeout: 1500,
      timer: null,
      closed: false,
      tips: ''
    };
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        if (typeof this.onHide === 'function') this.onHide(this);
        this.$el.addEventListener('webkitAnimationEnd', () => {
          this.$destroy(true);
          this.$el.parentNode.removeChild(this.$el);
        });
      };
    }
  },

  methods: {
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.timeout > 0) {
        this.timer = setTimeout(() => {
          this.closed = !this.closed;
        }, this.timeout);
      }
  },
  },
  mounted() {
    this.startTimer();
  }
};
</script>
<style scoped>
.ui-tips{
    width:100%;
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
    text-align:center;
    background: transparent;
}
.ui-tips>.ui-tips-desc{
    display:block;
    border-radius:4px;
    font-size:13px;
    padding:10px 12px;
    line-height:1.5em;
    width:85%;
    text-align: center;
    box-shadow:0 0 .2rem rgba(0, 0, 0,.3);
    background-color:rgba(0, 0, 0,.75);
    color:#fff;
    word-break:break-all;
}
.scale-enter-active{animation:scaleIn .2s ease;}
.scale-leave-active{animation: scaleOut .3s ease;}
@keyframes scaleIn{
    0% {transform:scale(.5);opacity:0;},
    100% {transform:scale(1);opacity:1;}
}
@keyframes scaleOut{
  0% {transform:scale(1);opacity:1;}
  100% {transform:scale(.8);opacity:0;}
}
</style>
