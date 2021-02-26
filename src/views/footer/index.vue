<template>
  <div class="footer">
      <div class="mainWidth">
        <div><a href="https://lanhuapp.com">友情链接：https://lanhuapp.com/</a></div>
        <div class="mt20"> Copyright@2018.hsjdhasjhdasjh</div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {},
  mounted(){}
}
</script>
<style lang='scss' scoped>
.footer{
  height:150px;
  background:#F5F7FA;
}
  .mainWidth{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    color:#666;
    font-size: 18px;
    a{
      color:#666;
    }
  }
</style>