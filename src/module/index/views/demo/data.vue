<template>
  <div class="hello">

    <div class="menu-block">
      <!-- <div class="search-box">
        <p class="f-border-radius-gray p-search">
              <span @click="searchAct()"></span>
              <input type="text" placeholder="请输入姓名或者手机号" v-model="keyword">
        </p>
      </div> -->

      <filterWord :filterWordData='filterWordData' @getBackWordName="getBackWordName" @searchAct='searchAct' :wordSlders="wordSlders"/>
    </div>


  </div>
</template>

<script>
import filterWord from '@/common/filterWord'
import api from '@/api'
export default {
  name: 'hello',
  data () {
    return {
      wordSlders:{
        show:false,
      },
        filterWordData:"",
        keyword:"",
        chooseNameData:"",      //选中的人信息
        allData:""
    }
  },
  created(){
    this.getNameData()
  },
  methods: {
    getNameData(){
      let _this = this;
      let dataArray = [];
      let sendCondition = _this.keyword;
      let param = {userId:'3d6de2be238b455d82cc5090767008ba',searchKey:_this.keyword}
      api.getCustomSortList(param, function(isSuccess,data,err){
        if (isSuccess == true) {
          if (data.status == 200) {

            _this.allData = data.body; 
            // 数据转换格式[{word:A,name:'张三',id:123}]
            data.body.forEach(function(e,v){
              for(var i in e){
                let eNode = e[i]
                for(var j=0; j< eNode.length; j++){
                  let s = {"word":i,"name":eNode[j].name,"id":eNode[j]._id}
                  dataArray.push(s)
                } 
              }
            })

            if (_this.filterWordData) {
              let newLength = _this.filterWordData.length;
              _this.filterWordData = _this.filterWordData.splice(newLength)
              _this.filterWordData = dataArray;
            }else{
              _this.filterWordData = dataArray;
            }

          }
          console.log('0000000000000',_this.filterWordData)
          _this.wordSlders.show = true;
        }
      })    
    },
    /*获取任命搜索框的内容*/
    searchAct(val){
      this.keyword = val;
      this.getNameData()
    },
    // 点击姓名回传,通过id来拿相应点击的人的信息
    getBackWordName(id){
      let _this = this;

        this.allData.forEach(function(e,v){
          for(var i in e){
            let eNode = e[i]
            for(var j=0; j< eNode.length; j++){
              if (eNode[j]._id == id) {
                _this.chooseNameData = eNode[j];
                return;
              }
            } 
          }
        })
      console.log(_this.chooseNameData)
    },
    // goBack(){
    //   this.$router.go(-1)
    // }
  },
  components:{filterWord}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-box{
  text-align: center;
  height: 1.3rem;
  line-height: 1.3rem;
  position: absolute;
  width: 100%;
  z-index: 999999999;
  p{
    height: .7rem;
    line-height: .7rem;
    width: 75%;
    padding: 0 .2rem;
    margin: 0 auto;
    display: inline-block;
    background-color: #fff;
    border-radius: 5px;

    input{
      width: 92%;
      height: 100%;
      display: block;
      border: none;
      outline: none;
      font-size: medium;
    }
  }
  span{
      position: absolute;
      display: inline-block;
      background: url('../../../../assets/images/common/search.png') no-repeat;
      background-size: contain;
        width: .3rem;
        height: .4rem;
        right: .2rem;
        background-position: center;
        top:.15rem;
    }
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
