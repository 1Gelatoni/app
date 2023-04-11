<template>
  <div>
    <!-- 三级联动全局组件 （不需要再引入） -->
    <typeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for=" floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand/>
  </div>
</template>

<script>
// 引入静态组件
import ListContainer from "./ListContainer/index.vue"
import Recommend from "./Recommend/index.vue"
import Rank from "./Rank/index.vue"
import Like from "./Like/index.vue"
import Floor from "./Floor/index.vue"
import Brand from "./Brand/index.vue"
import { mapState } from "vuex"
export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      this.$store.dispatch("getFloorList")
      // 获取用户信息在首页展示
      this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
}
</script>

<style>

</style>