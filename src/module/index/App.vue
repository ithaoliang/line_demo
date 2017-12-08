<template>
  <div id="app">
  	<kbHeader v-if="isShowHeader" :title="headerTitle"/>
    <router-view></router-view>
  </div>
</template>

<script>
import kbHeader from "@/common/kbHeader"
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
  	kbHeader
  },
  computed:{
    ...mapState(['isShowHeader','headerTitle']),
  },
}
</script>

<style>

#app {
	height: 100%;
}
</style>
