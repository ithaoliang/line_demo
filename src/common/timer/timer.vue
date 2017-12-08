<template>
      <div class="timer-font">
          <span class="list-timer">{{d}}</span>
          <span class="list-timer">{{h}}</span>
          <span class="list-timer">{{m}}</span>
          <span class="list-timer">{{s}}</span>
      </div>
</template>

<script>
   export default{
       data () {
           return {
               time : '',
               flag : false,
               d:'',
               h:'',
               m:'',
               s:''
           }

       },
       mounted () {
           let time = setInterval(()=>{
               if(this.flag == true){
                   clearInterval(time)
               }
               this.timeDown()
           },500)
       },
       props : {
           endTime : {
               type : String
           }
       },
       methods : {
           timeDown () {
               var endTime = new Date((this.endTime).replace(/-/g,"/"))
               var nowTime = new Date();
               var leftTime = Math.floor((endTime.getTime()-nowTime.getTime())/1000)
               var d =  this.formate(Math.floor(leftTime/(24*60*60)))
               var h =  this.formate(Math.floor(leftTime/(60*60)%24))
               var m =  this.formate(Math.floor(leftTime/60%60))
               var s =  this.formate(Math.floor(leftTime%60))
               this.d=d
               this.h=h
               this.m=m
               this.s=s
               this.time = `${d}天${h}时${m}分${s}秒`
                
               if(leftTime <= 0){
                   this.flag = true
                   this.$emit('time-end')
               }
              
           },
           formate (time) {
               if(time>=10){
                   return time
               }else{
                   return `0${time}`
               }
           }
       }
   }
</script>
<style lang="scss" scoped>
.timer-font{
  color: #ffcd00;
  font-size: .33rem;
  position: absolute;
  top: 40.5%;
  left: 40%;
}
.list-timer{
    letter-spacing: .12rem;
    margin-right: .14rem;
}
</style>