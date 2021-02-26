<template>
  <div>
      <Header :active="active"/>
      <div class="mainWidth display">
        <div class="menuInfor">
          <el-menu
            default-active="2"
            background-color="#323E9F"
            class="menuContent"
            text-color="#fff"
            @open="handleOpen"
            >
            <template>
               <sidebar-item v-for="(item,i) in dataList" :key="i" :item="item"/> 
            </template>
          </el-menu>
        </div>
        <div>
            <div class="topTitle">月度数据</div>
            <div></div>
        </div>
      </div>
      <Footer />
  </div>
</template>
<script>
import Header from "../header";
import Footer from "../footer"
import SidebarItem from "./SidebarItem"
import {getCategory} from "@/api/homePage"
export default {
  components: {
    Header,
    Footer,
    SidebarItem
  },
  data () {
    return {
        active:1,
        dataList:[]
    }
  },
  methods: {
      getData(){
          getCategory().then(res=>{
              this.dataList = res.data
          })
      },
      handleOpen(){

      },
  },
  mounted() {
      this.getData()
  }
}
</script>
<style lang='scss' scoped>
.menuInfor{
    width:204px;
    height:calc(100vh - 100px);
    overflow: auto;
    .menuContent{
        height:100%;
    }
}
.topTitle{
    height:45px;
    background:red;
}
</style>