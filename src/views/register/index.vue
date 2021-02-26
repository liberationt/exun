<template>
  <div class="bgImg">
      <div class="loginMain">
          <div class="swiper">
            <el-carousel trigger="click" height="476px">
                <el-carousel-item v-for="(item,i) in imgList" :key="i">
                   <div class="imgInfor"><img :src="item.url" alt=""></div>
                </el-carousel-item>
            </el-carousel>
          </div>
          <div class="login">
              <div class="loginImg"><img src="@/assets/login.png" alt=""></div>
              <div>
                  <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item  prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                            <template slot="prepend"><img src="@/assets/user.png" alt=""></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input v-model="ruleForm.mobile" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入您的手机号">
                            <template slot="prepend"><img src="@/assets/phone.png" alt=""></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <div style="display:flex">
                            <el-input v-model="ruleForm.codes" placeholder="请输入验证码" style="width:140px;margin-right:15px">
                                <template slot="prepend"><img src="@/assets/code.png" alt=""></template>
                            </el-input>
                            <div class="getCode" @click="flag && getObtain()" style="width:150px;">{{content}}</div>
                        </div>
                        <!-- <el-input type="Button" v-model="ruleForm.userName" style="width:170px;">获取验证码</el-input> -->
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input :type="passwordType" v-model="ruleForm.password" placeholder="6位以上，字母、数字或符号">
                            <template slot="prepend"><img src="@/assets/pass.png" alt=""></template>
                        </el-input>
                        <!-- <span class="show-pwd" @click="showPwd">
                            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                        </span> -->
                    </el-form-item>
                     <el-form-item prop="twoPassWord">
                        <el-input :type="passwordType1" v-model="ruleForm.twoPassWord" placeholder="请再次输入密码">
                            <template slot="prepend"><img src="@/assets/pass.png" alt=""></template>
                        </el-input>
                        <!-- <span class="show-pwd" @click="showPwd1">
                            <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"/>
                        </span> -->
                    </el-form-item>
                    <el-form-item  prop="agency_code">
                        <el-input v-model="ruleForm.agency_code" placeholder="请输入您的邀请码">
                            <template slot="prepend"><img src="@/assets/init.png" alt=""></template>
                        </el-input>
                    </el-form-item>
                    <!-- <div @click="toRegister"><span class="cursorPointer" style="color:#A8ABB0;font-size:12px;">还没账号 立即注册</span></div> -->
                    <!-- <div @click="submitForm('ruleForm')" class="register">注册</div> -->
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;height:40px;line-height:0;font-size:18px;letter-spacing:20px;">注册</el-button>
                </el-form>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import {userNameCaption,getCaption,getRegister} from "@/api/homePage"
import _ from "lodash"
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入请输入用户名'));
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
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !==this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };
    var validateImg = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入图片验证码'));
        } else if (value !==this.identifyCode) {
            this.refreshCode()
            callback(new Error('请输入正确的图片验证码'));
        } else {
            callback();
        }
    };
    return {
        imgList:[
            {
                url:require('../../assets/1.png')
            },
            {
                url:require('../../assets/2.png')
            },
        ],
        identifyCode: "",
        identifyCodes: "0123456789abcdefghijklmnopqrstuvwsyz",
        passwordType:'password',
        passwordType1:'password',
        ruleForm: {
            username: '',
            password: '',
            mobile:'',
            codes:'',
            imgCaptcha:'',
            twoPassWord:'',
            agency_code:'',
            agree:''
        },
        rules:{
            username:[
                { required: true, trigger: 'blur',validator: validateUserName},
                
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            mobile:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
            codes:[
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ],
            twoPassWord:[
                { validator: validatePass2, trigger: 'blur' }
            ],
            imgCaptcha:[
                { validator: validateImg, trigger: 'blur' }
            ],
            agree:[{required: true, message: '请勾选用户协议', trigger: 'blur'}]
        },
        flag:true,
        count:'',
        content:'获取验证码',
        timer:null
    }
  },
  methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = _.cloneDeep(this.ruleForm)
                    // delete data.imgCaptcha
                    delete data.twoPassWord
                    // delete data.agency_code
                    delete data.agree
                    getRegister(data).then(res=>{
                        if(res.code=='0'){
                            this.$message.success(res.msg);
                            this.$router.push("/login")
                        }else{
                            this.$message.error(res.msg);
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
        showPwd(){
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
        },
        showPwd1(){
            if (this.passwordType1 === "password") {
                this.passwordType1 = "";
            } else {
                this.passwordType1 = "password";
            }
        },
        refreshCode() {
            this.identifyCode = ""
            this.makeCode(this.identifyCodes,4)
        },
        randomNum (min, max) {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        },
        makeCode (data, len) {
            for (let i = 0; i< len;i++) {
                this.identifyCode += data[this.randomNum(0, data.length - 1)]
            }
        },
        //短信验证码
        getObtain(){
            if(!this.ruleForm.username){
                this.$message.error('请输入用户名');
            }else if(!this.ruleForm.mobile){
                this.$message.error('请输入手机号');
            }else{
                this.setTimeout()
                getCaption({mobile:this.ruleForm.mobile}).then(res=>{
                    if(res.code=='0'){
                        this.$message.success(res.msg);
                    }else{
                        this.$message.error(res.msg);
                        this.flag=true
                        clearInterval(this.timer)
                    }
                }).catch(err=>{
                    this.flag=true
                    clearInterval(this.timer)
                })
            }
            
        },  
        setTimeout(){
            const TIME_COUNT = 60;
            this.flag = false
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                        this.content = this.count+' s后获取';
                    } else {
                        this.content = '获取验证码';
                        this.flag = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        }
    },
    mounted(){
        this.refreshCode()
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
        height:476px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        display: flex;
        .swiper{
            border-radius: 10px 0 0 10px;
            flex-shrink: 0;
            width:340px;
            height:100%;
            overflow: hidden;
            .imgInfor{
                height:476px;
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
            padding:20px 40px 0;
            border-radius: 0px 10px 10px 0px;
            width:260px;
            background:#F8F8F8;
            .loginImg{
                text-align: center;
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
            border: 1px solid #DCDFE6;
            color: #7E7E7E;
            border-radius: 3px;;
        }
    }
}
</style>