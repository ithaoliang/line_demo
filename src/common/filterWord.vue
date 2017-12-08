<template lang="html">
  <kbSlider :slider="wordSlders" animationDirect="rightToLeft" >
    <div class="menu-block" @click.stop>
    	<div class="search-box">
	        <p class="f-border-radius-gray p-search">
	              <span @click="searchAct()"></span>
	              <input type="text" placeholder="请输入姓名或者手机号" v-model="keyword" @keyup.13='closeKeyPress'>
	        </p>
	      </div>
    	<div id="item-container" v-scrollfix>
			<ul ref="elItemList" v-html="html" @click="getBackWordName"></ul>
		</div>   
    </div>
  </kbSlider>
</template>

<script>
import kbSlider from '@/common/kbSlider/index'
import miniRefresh from '@/utils/filterWord.js'
import miniRefreshCss from '@/assets/css/filterWord.scss'
export default{
	props:["filterWordData","wordSlders"],			//数据格式[{word:A,name:'张三',id:123}]
	data(){
		return{
			keyword:'',
			html:"",
			IndexSidebarBlock:"",
			triggerGetData :false,
		}
	},

	watch:{
		['wordSlders.show'](val){
        	if (val == true) {
        		if (this.IndexSidebarBlock) {
        			this.IndexSidebarBlock.destroy()
        		}
        		let _this = this;
    //     		let itemList = this.ItemList(this.filterWordData);
    //     		this.IndexSidebarBlock = new IndexSidebar();
				// this.IndexSidebarBlock.on('charChange', itemList.gotoChar);
				_this.getData();
				window.iOSBackAction = function(){
					_this.wordSlders.show = false
					return 1
				}

				window.kbAndroid.myCustomerBack('11');
				window.andCloseTips = function(){
					_this.wordSlders.show = false;
				}
        	}else{
        		if (this.IndexSidebarBlock) {
        			this.IndexSidebarBlock.destroy()
        		}
        		window.iOSBackAction = function(){
					return ""
				}
				window.kbAndroid.myCustomerBack('');
        	}
        },
        filterWordData:{
        	handler:function(val){  
                if (this.triggerGetData) {
                	this.triggerGetData = false;
                	this.getData();
                }
            },
            deep:true
        }
	},

	methods:{
		closeKeyPress(e){
			e.target.blur();
			this.searchAct();
		},
		getData(){
			let _this = this;
    		let itemList = this.ItemList(this.filterWordData);
    		this.IndexSidebarBlock = new IndexSidebar();
			this.IndexSidebarBlock.on('charChange', itemList.gotoChar);
		},
		ItemList(data){
			var list = []
			var map = {}
			var html

			this.html = data.map(function (item) {
				var cid = item.id;
				var cn = item.name		//名字
				var ch = item.word			//字母
				// 只给每个字母下面的第一个名字加上"data-ch"索引
				if (map[ch]) {
					return '<li data-name='+cn+' data-id='+cid+'>' + cn + '</li>'
				} else {
					map[ch] = true
					return '<li data-ch="' + ch + '" data-name='+cn+' data-id='+cid+'>' + cn + '</li>'
				}
			}).join('')

			let elItemList = ""
			this.$nextTick(function () {
				elItemList = this.$refs.elItemList
			})
			let _this = this;

			return {
				gotoChar: function (ch) {
					if (ch === '*') {
						elItemList.scrollTop = 0
					} else if (ch === '#') {
						elItemList.scrollTop = 1000
					} else {
						var target = elItemList.querySelector('[data-ch="' + ch + '"]')
						if (target) {
							target.scrollIntoView()
						}
					}
				}
			}
		},
	    searchAct(){
	      if (this.keyword) {
	      	if (this.IndexSidebarBlock) {
	      		this.IndexSidebarBlock.destroy();
	      	}
	      	this.triggerGetData = true;
	        this.$emit('searchAct',this.keyword);
	      }else{
	      	this.triggerGetData = true;
	      	this.$emit('searchAct'," ");
	        this.$tips("请输入姓名或者手机号");

	      }
	      
	    },
		getBackWordName(e){
			let id = e.target.dataset.id;
			this.$emit('getBackWordName',id);
			this.IndexSidebarBlock.destroy()
			this.wordSlders.show = false
		}
	},
	components:{kbSlider}
}
</script>
<style  lang="scss" scoped>
.menu-block{
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f5f5f5;
    position:absolute;
    left: 0;
    top: 0;
   //      -webkit-overflow-scrolling: touch;
  	// overflow-scrolling: touch;
}
.search-box{
  text-align: center;
  height: 1.3rem;
  line-height: 1.3rem;
  position: fixed;
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
      background: url('../assets/images/common/search.png') no-repeat;
      background-size: contain;
        width: .3rem;
        height: .4rem;
        right: .2rem;
        background-position: center;
        top:.15rem;
    }
}
</style>