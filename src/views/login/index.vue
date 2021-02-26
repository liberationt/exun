<template>
  <div class="bgImg">
      <div class="loginMain">
          <div class="swiper">
            <el-carousel trigger="click" :interval='interval' height="476px">
                <el-carousel-item v-for="(item,i) in imgList" :key="i">
                   <div class="imgInfor"><img :src="item.url" alt=""></div>
                </el-carousel-item>
            </el-carousel>
          </div>
          <div class="login">
            <div class="loginImg"><img src="@/assets/login.png" alt=""></div>
            <div class="loginStyle">使用以下方式登录</div>
            <div class="choose">
                <div class="wx" @click="getUrl"><img class="ml15" src="@/assets/wxicon.png" alt=""></div>
                <div class="qq"><img class="ml15" src="@/assets/qqicon.png" alt=""></div>
            </div>
            <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号或手机号">
                        <template slot="prepend"><img src="@/assets/user.png" alt=""></template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码">
                        <template slot="prepend"><img src="@/assets/pass.png" alt=""></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="displayFlex">
                        <span><el-checkbox v-model="checked" label="记住用户名" name="type"></el-checkbox></span>
                        <span class="cursorPointer" style="color:#A8ABB0;font-size:12px">忘记密码</span>
                    </div>
                    <div @click="toRegister"><span class="cursorPointer" style="color:#A8ABB0;font-size:12px;">还没账号 立即注册</span></div>
                </el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;height:40px;line-height:0;font-size:18px;letter-spacing:20px;">登录</el-button>
            </el-form>
          </div>
      </div>
  </div>
</template>
<script>

import {wxLogin} from "@/api/homePage"
import { setUserName } from "@/utils/auth"
import _ from "lodash"
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入账号或手机号'));
        } else {
            // if (this.ruleForm.username !== '') {
            //     userNameCaption({username:this.ruleForm.username}).then(res=>{
            //         if(res.code=="200"){
            //             callback();
            //         }else{
            //             callback(new Error(res.msg));
            //         }
            //     }).catch(err=>{
            //         callback(new Error(err));
            //     })  
            // } 
            callback();
        }
    };
    return {
        interval:5000,
        imgList:[
            {
                url:require('../../assets/1.png')
            },
            {
                url:require('../../assets/2.png')
            },
        ],
        checked:false,
        ruleForm: {
            username: '',
            password: '',
        },
        rules:{
            username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
    }
  },
  methods:{
      toRegister(){
          this.$router.push("/register")
      },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$store.dispatch("user/login", this.ruleForm).then((res) => {
                sessionStorage.setItem('username',this.ruleForm.username)
                if (localStorage.getItem('LoginSelf') && this.checked == true) {
                    localStorage.removeItem('LoginSelf')
                    localStorage.setItem('LoginSelf', JSON.stringify(this.ruleForm))
                } else if (!localStorage.getItem('LoginSelf') && this.checked == true) {
                    localStorage.setItem('LoginSelf', JSON.stringify(this.ruleForm))
                } else if (localStorage.getItem('LoginSelf') && this.checked == false) {
                    localStorage.removeItem('LoginSelf')
                }
                if(res.code===0){
                    this.$message({
                        message:'登录成功',
                        type: 'success'
                    });
                    if(this.$route.query.Rurl){
                        this.$router.push(this.$route.query.Rurl)
                    }else{
                        this.$router.push("/homePage")
                    }
                }else if(res.code===2){
                    this.$confirm(res.msg, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.ruleForm.login_status = 1
                            this.submitForm('ruleForm')
                        })        
                }else{
                    this.$message({
                        message:res.msg,
                        type: 'error'
                    });
                }
            })
        } else {
            return false;
        }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    toRegister(){
        this.$router.push("/register")
    },
    getUrl(){
        let url = this.$route.query.Rurl?this.$route.query.Rurl:'/homePage'
        wxLogin({url:`http://www.exundt.com/#${url}`}).then(res=>{
            window.location.href= res.redirect_uri
        })
        
    }
    },
    mounted(){
        if (localStorage.getItem('LoginSelf')) {
            this.ruleForm.username = JSON.parse(localStorage.getItem('LoginSelf')).username
            this.ruleForm.password = JSON.parse(localStorage.getItem('LoginSelf')).password
            this.checked=true
        }
    } 
}
</script>
<style lang='scss' scoped>
.bgImg{
    width:100vw;
    height:100vh;
    background:url("../../assets/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .loginMain{
        width:680px;
        height:460px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        display: flex;
        .swiper{
            flex-shrink: 0;
            width:340px;
            height:100%;
            border-radius: 10px 0 0 10px;
            overflow: hidden;
            .imgInfor{
                height:460px;
                width:340px;
                img{
                    height:100%;
                    width:100%;
                }
            }
            .el-carousel__indicators--horizontal{
                display: none !important;
            }
        }
        .login{
            border-radius: 0px 10px 10px 0px;
            padding:20px 40px 0;
            width:260px;
            background:#F8F8F8;
            .loginImg{
                text-align: center;
            }
            .loginStyle{
                text-align: center;
                font-size: 12px;
                color:#999;
                margin-bottom: 10px;
            }
            .choose{
                display: flex;
                margin-bottom: 50px;
                justify-content: space-between;
                .wx,.qq{
                    width:99px;
                    height:50px;
                    background:url("../../assets/wx.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    line-height: 50px;
                    cursor: pointer;
                }
                .qq{
                    background:url("../../assets/qq.png");
                }
            }
        }
        .register{
            margin:0 auto;
            width: 72px;
            height: 32px;
            background: #1409BD;
            border-radius: 5px;
            box-shadow: 0px 5px 10px rgba(8, 55, 134, 0.2);
            opacity: 1;
            color:#fff;
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            cursor: pointer;
        }
        .getCode{
            background:#fff;
            font-size: 12px;
            text-align: center;
            line-height: 31px;
            height:31px;
            cursor: pointer;
            margin-top:3px;;
            border: 1px solid #DCDFE6;
            color: #7E7E7E;
        }
    }
}
</style>