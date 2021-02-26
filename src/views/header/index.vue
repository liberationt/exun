<!--  -->
<template>
  <div>
    <div class="headerTop">
      <div class="mainWidth displayFlex">
        <div class="display">
          <div class="logo"><img src="@/assets/logo.png" alt=""></div>
          <div class="logoTit" @click="toHome">E寻，数据更易搜寻</div>
        </div>
          <div class="headerRight">
            <span @click="toLogin" v-if="userName?false:true">登录</span>
            <span @click="toRegister" v-if="userName?false:true">注册</span>
            <span class="colorInfor"  v-if="userName?true:false" @click="toInfor"><i class="el-icon-user-solid mr5" ></i>{{userName}}</span>
            <span v-if="userName?true:false" @click="layOut">退出</span>
          </div>
      </div>
    </div>
    <div style="background:#fff">
      <div class="nav mainWidth displayFlex">
        <div></div>
        <div class="navlist">
          <span v-for="(item,i) in navList" @click="linkUrl(item.path,i)" :class="active===i?'activeColor':''" :key="i">{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { getUserName } from "@/utils/auth" 
    export default {
    props:['active'],
    data () {
        return {
          userName:"",
          navList:[
            {
              label:'首页',
              path:'/'
            },
            {
              label:'数据导航',
              path:'/dataNavigate'
            },
            {
              label:'数据超市',
              path:'/supermarket'
            },
            {
              label:'api超市'
            },
            {
              label:'会员充值'
            },
            {
              label:'留言'
            },
          ],
        };
    },
    methods: {
      linkUrl(path,num){
        if(this.active===num) return 
        this.$router.push(path)
      },
      toLogin(){
        this.$router.push('/login')
      },
      toRegister(){
        this.$router.push('/register')
      },
      toInfor(){
        this.$router.push("/userInfor")
      },
      logout(){
          this.$store.dispatch("user/logout", this.username).then((res) => {
              this.$router.push(`/login`)
          })
      },
      layOut(){
        this.$confirm('确认退出登录？', '退出登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.logout()
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消退出登录'
            })
        })
      },
      toHome(){
        this.$router.push('/')
      }
    },
    mounted(){
      // this.isShow = 
      this.userName = sessionStorage.getItem('username')||''
    }
    }
</script>
<style lang="scss" scoped>
  .headerTop{
    height:54px;
    background: #131324;
    color: #fff;
    line-height: 42px;;
  }
  .headerRight{
    display: flex;
    span{
      margin-left:20px;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        color:red;
      }
    }
  }
  .logo{
    width:54px;height:54px;
    img{
      width:54px;
      height:54px;
    }
  }
  .logoTit{
    line-height: 54px;
    font-size: 14px;
    cursor: pointer;
  }
  .nav{
    height:52px;
    img{
      height:50px;width:50px;
    }
    .navlist{
      span{
        cursor: pointer;
        padding:0px 40px;
        border-right:1px solid #999;
        font-size: 16px;
        font-weight: 400;
        &:nth-last-child(1){
          border: none;
          padding-right:0;
        }
      }
      .activeColor{
        color:#043980;
      }
    }
  }
  .colorInfor{
    color:#0aa9f2
  }
</style>