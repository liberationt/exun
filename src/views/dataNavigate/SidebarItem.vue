<template>
  <div>
    <el-submenu :index="item.title" v-if="item.data&&item.data.length>0">
        <template slot="title">
            <span slot="title">{{item.title}}</span>
        </template>
        <span v-for="(childMenu, childIndex) in item.data" :key="childIndex">
            <el-menu-item :index="childMenu.title" v-if="!childMenu.data" @click="showItem(childMenu)">
                <span >{{childMenu.title}}</span>
            </el-menu-item>
            <sidebar-item :key="childIndex" :item="childMenu" v-if="childMenu.data"/>
        </span>
    </el-submenu>
    <el-menu-item :index="item.title" v-if="!item.data||item.data.length===0" @click="showItem(item)">
        <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props:['item'],
  data () {
    return {
    }
  },
  methods: {
      showItem(item){
          console.log(item,5)
      }
  },
  mounted() {
  }
}
</script>
<style lang='scss' scoped>
</style>