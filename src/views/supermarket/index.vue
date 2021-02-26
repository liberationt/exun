<template>
  <div class="super">
    <Header :active="active"/>
    <div class="banner">
        <div class="mainWidth">
            <div class="topTitle">海量数据及时更新</div>
            <div class="search">
                <el-input class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </div>
        </div>
        <div class="mainWidth optionData">
            <div class="optionTitle">数据分类：</div>
            <div class="supCheckBox">
                <Options :options="cities" v-model='value' :isMultiply='isMultiply'></Options>
            </div>
        </div>
    </div>
    <div class="dataInfor">
        <div class="mainWidth dataList">
            <div class="item-list displayFlex" v-for="(item,i) in dataList" :key="i">
                <div>
                    <div class="font24 title">{{item.dataname}}</div>
                    <div class="labelInfor">
                        <span v-for="(items,k) in item.label.split(',')" :key="k">{{items}}</span>
                    </div>
                </div>
                <div>
                    <div style="color:#222750">
                        <div class="mb5" style="font-weight:bold">
                            <span class="font24">￥{{item.vip_price}}</span>
                            <span class="font14">元(会员)</span>
                        </div>
                        <div style="text-align:right;color:#333;text-decoration:line-through;">
                            <span class="font14">￥{{item.price}}</span>
                            <span class="font14">元(原价)</span>
                        </div>
                        <div class="todetails" @click="toDetails(item.id)">详情</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "../header";
import Footer from "../footer"
import Options from "@/components/options"
import { getSuperMark,getSuperCategory } from '@/api/homePage'
export default {
  components:{Header,Footer,Options},
  data () {
    return {
        active:2,
        cities:[],
        value:[],
        isMultiply:false,
        dataList:[]
    }
  },
  methods:{
      getData(){
            getSuperMark().then(res=>{
                if(res.code===0){
                   this.dataList = res.data
                }
            })
            getSuperCategory().then(res=>{
                if(res.code==0){
                    if(res.data){
                        res.data.forEach(item=>{
                            this.cities.push(item.industry_category)
                        })
                    }
                }
            })
        },
        toDetails(id){
            this.$router.push(`/supermarketDetail/${id}`)
        }
  },
  mounted(){
      this.getData()
  }
}
</script>
<style lang='scss' scoped>
.super{
    background: #F8F8F8;
}
.topTitle{
    text-align: center;
    padding-top: 40px;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 31px;
    color: #222750;
}
.search{
    width:772px;
    margin:50px auto;
    .el-input__inner{
        border:none;
        border-radius: 50px;
    }
}
.optionData{
    margin: 50px auto;
    display: flex;
    background:#fff;
    padding: 35px 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border-top:3px solid #323E9F;
    .optionTitle{
        flex-shrink:0;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 23px;
        color: #222750;
    }
    .supCheckBox{
        display: flex;
    }
}
.dataInfor{
    margin-bottom: 90px;
    .dataList{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item-list{
            border-radius: 10px;
            height:147px;width:580px;
            margin-top:30px;
            box-shadow: 0px 0px 10px 6px rgba(220, 220, 220, 40);
            padding: 0 20px 0 40px;
            .title{
                color: #222750;
                font-size: 24px;
                font-weight: bold;
            }
            .labelInfor{
                display: flex;
                margin-top: 10px;
                span{
                    padding:3px 15px;
                    background-color:#222750;
                    font-size: 14px;
                    border-radius: 100px;
                    color: #fff;
                    margin-right: 20px;
                }
            }
        }
    }
}
.todetails{
    color:red;
    text-align: right;
    cursor: pointer;
    margin-top: 8px;
    color:#2d6de6;
    font-size: 14px;
}
</style>