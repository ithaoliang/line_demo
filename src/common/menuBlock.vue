<template lang="html">
  <kbSlider :slider="sliders" animationDirect="bottomToTop" :isModalToClose="true" >
    <div class="menu-block" @click.stop>
    	<div>
    	   <p class="f-border-bottom-line-gray" v-for="item in pages" @click="goToAppPages(item.type)">{{item.name}}</p>
	       <p @click="shareAll()">分享全部</p>
    	</div>
       
    </div>
  </kbSlider>
</template>

<script>
import kbSlider from '@/common/kbSlider/index'
import {mapGetters,mapState} from 'vuex'
import appJs from '@/service/appAccess.js'
// import dtShare from '@/service/dtShare/index.js'
// import urlHelper from '@/utils/urlHelper.js'
import dtlogin from '@/service/dtLogin.js'
export default{
	props:['sliders'],
	data(){
		return{
			pages:[
				{type:1,name:"首页"},
				{type:2,name:"订单"},
				{type:5,name:"个人中心"},
			],
			sendUrl:""
		}
	},
	mounted:function(){
		// let queryData = '&brand='+this.proShareQuery.brand+"&classify="+this.proShareQuery.classify+"&crowd="+this.proShareQuery.crowd+'&identity='+this.proShareQuery.identity+"&keyword="+this.proShareQuery.keyword+"&other="+this.proShareQuery.other+"&pageCountNum="+this.proShareQuery.pageCountNum+"&pageStartIndex="+this.proShareQuery.pageStartIndex+"&province="+this.proShareQuery.province+"&sort="+this.proShareQuery.sort;
		
	},
	// watch:{
	// 	sliders:{
	// 		handler:function(val){  
 //            	if (val.show == true) {
 //            		let aimUrlNoUserid = urlHelper.changeURLArg(window.location.href,'userId','');
 //            		this.sendUrl = aimUrlNoUserid+'&data='+encodeURIComponent(this.proShareQuery);
 //            		// dtShare.h5ShareJs("产品库测试", "产品库测试share_desc", this.sendUrl, "https://f12.baidu.com/it/u=2754208607,630952272&fm=72")
 //            	}
 //            },  
 //            deep:true//对象内部的属性监听，也叫深度监听 
	// 	}
	// },
	methods:{
		goToAppPages(type){
			if (this.isAppOpen) {
				appJs.appAccessJs.backkbActionFromProLib(type)
			}
		},
		shareAll(){
			if (this.isLogin) {
				this.sliders.show = false;
				// 页面对setIsHeaderShare进行监控，如果为true就去调用分享，分享功能再业务模块做
				this.$store.commit('setIsHeaderShare', true);
			}else{
				this.sliders.show = false;
				dtlogin.toLogin('',1)
			}
			
		}
	},
	components:{kbSlider},
	computed:{
		...mapGetters(['isLogin']),
    	...mapState({
        	isAppOpen: 'isAppOpen',
    	}),
	},
}
</script>
<style  lang="scss" scoped>
.menu-block{
	position: absolute;
    width: 100%;
    bottom: 0;
    border-radius: 5px;
    div{
    	background: #fff;
	    margin: .3rem .16rem;
	    border-radius: 5px;
	    padding: 0 .2rem;
	    p{
	    	line-height: 1.04rem;
	    }
    }
}
</style>