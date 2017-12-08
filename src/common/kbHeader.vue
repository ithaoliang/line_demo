<template lang="html">
	<header class="header-block ">
		<div @click="backAct" v-if="isAppOpen">
			<i class="kb-back"></i>
		</div>
		<div>
			<span :class='[isAppOpen?"":"h5Active","kb-title"]'>{{title}}</span>
			<i @click="toRefresh" class="refresh" v-if="!isAppOpen"></i>
		</div>
		<div  v-if="isAppOpen">
			<i @click="toRefresh" class="refresh"></i>
			<i class="kb-menu" @click="showMenu"></i>
			
		</div>
		<menuBlock :sliders="sliders"/>
	</header>
	
</template>

<script>
import menuBlock from './menuBlock'
import {mapState} from 'vuex'
import appJs from '@/service/appAccess.js'
export default{
	props:['title'],
	data(){
		return{
			sliders: {
		        show:false,
		        isNeedMask:true
		    }
		}
	},
	methods:{
		showMenu(){
			this.sliders.show = true
		},
		backAct(){
			if (this.isAppOpen) {
				appJs.appAccessJs.kbBackAction(3);
			}
		},
		toRefresh(){
			this.$store.commit('setIsRefresh', true);
		}
	},
	computed:{
    	...mapState({
	       isAppOpen: 'isAppOpen',
	    }),
	},
	components:{menuBlock}
}
</script>

<style  lang="scss" scoped>
.h5Active{padding-left:.7rem}
.header-block{
	text-align: center;
	display: flex;
	border-bottom:1px solid #c6c6c6;
	background: #f5f5f5;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 99;
	div{
		flex:1;
		line-height:.48rem;
		margin: .2rem 0;
	}
	div.slider-block{margin:0}
	.kb-back{
		width: .48rem;
	    height: .48rem;
		background: url('../assets/images/common/back.png');
		background-size: cover;
	    float: left;
	    margin-left: .3rem;
	}
	.kb-menu{
		margin-top: .06rem;
		width: .4rem;
	    height: .36rem;
		background: url('../assets/images/common/menu.png');
		background-size: cover;
		float: right;
		margin-right: .3rem;
	}
	.kb-title{
	    font-size: .34rem;
    	font-weight: bold;
	}
	.refresh{
		margin-top: .06rem;
		width: .4rem;
	    height: .36rem;
		background: url('../assets/images/common/refresh.png');
		background-size: cover;
		float: right;
		margin-right: .3rem;
	}
}
</style>