<template>
    <div>
        <Header/>
        <!-- <div>
            <div class="mainWidth">
                <div class="superTop">
                    <div><img src="@/assets/logo.png" alt=""></div>
                    <div class="homePageSearch supSearch">
                        <el-input  v-model="search" class="input-with-select">
                            <el-button slot="append">搜索</el-button>
                        </el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="supBg"></div> -->
        <div class="supMain supMains">
            <div class="mainWidth">
                <div>
                    <div class="suptop"><h2>{{dataInfor.dataname}}</h2></div>
                    <div class="supbottom" v-html="dataInfor.desc"></div>
                    <div class="supcenter">
                        <div class="disPlay">
                            <div>购买方式：</div>
                            <div>
                                <el-radio-group v-model="params.trade_class" @change="change()">
                                    <el-radio label="wx">微信支付</el-radio>
                                    <el-radio label="zfb">支付宝支付</el-radio>
                                </el-radio-group>
                            </div>
                            <!-- <div class="shopPro">
                                <el-button type="primary" @click="payMoney">立即购买</el-button>
                            </div> -->
                            
                        </div>
                        <div>
                            <div class="qrcodeImg">
                                <div id="qrcode"></div>
                                <!-- <div class="logoImg"><img src="@/assets/images/logo.jpg" alt=""></div> -->
                            </div>
                            <div class="payContent" v-show="contnet">
                                百度网盘：{{contnet}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header from "../header"
import Footer from "../footer"
import QRCode from "qrcodejs2"
import {getSuperDetail,getUrCode,supPaySuccess,getDownLoad} from '@/api/homePage'
export default {
    components:{Header,Footer},
    data(){
        return{
            search:'',
            dataInfor:{},
            timer:null,
            params:{
                id:'',
                trade_class:'wx'
            },
            contnet:''
        }
    },
    mounted(){
        let id = this.$route.params.id
        this.params.id = id
        getSuperDetail(id).then(res=>{
            if(res.code===0){
                this.dataInfor = res.data||{}
            }
        })
        this.payMoney()
    },
    methods:{
        //切换
        change(val){
            clearInterval(this.timer)
            this.timer = null
            this.contnet = ''
            this.payMoney()
        },
        //获取二维码地址
        payMoney(){
            getUrCode({trade_info:this.params}).then(res=>{
                if(res.code==0){
                    this.qrcode(res.trade_url)
                    this.timer = setInterval(() => {
                        this.paySuccess(res.trade_no)
                    }, 3000)
                }
            })
        },
        //成功获取链接
        paySuccess(trade_no){
            supPaySuccess({order_no:trade_no}).then(res=>{
                if(res.code===0){
                    clearInterval(this.timer)
                    this.timer = null
                    this.getDownLoad(this.params.id)
                }
            })
        },
        // 生成二维码
        qrcode(url){
            document.getElementById("qrcode").innerHTML = ""
            let qrcode = new QRCode("qrcode", {
                width: 300,
                height: 300, // 高度
                colorLight: "#ffffff",
                text:url // 二维码内容
            })
        },
        // 成功的链接
        getDownLoad(id){
            getDownLoad(id).then(res=>{
                this.contnet = res.download_url.downloads || ''
            })
        }
    },
    destroyed(){
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
<style lang="scss" scoped>
   .superTop{
       padding:30px 0;
       position: relative;
       .supSearch{
           position: absolute;
           top:50%;
           left:50%;
           transform: translate(-50%,-50%);
       }
   } 
   .supBg{
    //    background:url("../../assets/images/supBg.png");
    //    background-repeat: no-repeat;
    //    background-size: 100% 100%;
       height:235px;
   }
   .supMain{
       background:#eff6fc;
       padding:10px 0 50px;
       .supbottom,.supcenter{
           margin-top:30px;
           padding:20px 170px;
           background:#fff
       }
       .disPlay{
           display: flex;
           align-items: center;
           margin-bottom: 15px;
       }
       .suptop{
           text-align: center;
           line-height: 100px;
           font-size: 20px;
       }
       .shopPro{
           margin-left: 50px;
       }
   }
   .qrcodeImg{
       position: relative;
       .logoImg{
           position: absolute;
           top:110px;
           left:110px;
           width:80px;
           height:80px;
           border-radius: 5px;
           overflow: hidden;
           img{
               width:100%;
               height:100%;
           }
       }
   }
   .payContent{
       margin-top:20px;
       color: red;
   }
</style>