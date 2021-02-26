<!--  -->
<template>
  <div>
    <Header :active="active"/>
    <div style="height:907px">
      <el-carousel trigger="click" style="height:907px;">
        <el-carousel-item v-for="(item, i) in bannerListSwiper" :key="i" style="height:907px;min-width:1300px;">
          <img :src="item.img" alt="" style="width: 100%; height: 907px" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <div class="mainWidth reason">
        <div class="titleInfor">选择我们的理由</div>
        <div class="displayFlex mt100 pl30 pr30">
          <img src="@/assets/one.png" alt="">
          <img src="@/assets/xian.png" alt="">
          <img src="@/assets/two.png" alt="">
          <img src="@/assets/xian.png" alt="">
          <img src="@/assets/three.png" alt="">
        </div>
        <div class="displayFlex pr50">
          <div class="reasonConten">
            <div class="title">数据交互</div>
            <div class="mb10">点击即可整理响应数据, 根据需要的数据 </div>
            <div>进行下载, 省时省力</div>
          </div>
          <div class="reasonConten">
            <div class="title">数据定制</div>
            <div class="mb10">如果没看到需要的数据资源, 可联系我们</div>
            <div> 定制数据, 更多元化</div>
          </div>
          <div class="reasonConten">
            <div class="title">个性定制</div>
            <div class="mb10">更具自身需求,进行定制专属页面</div>
            <div>使用方便</div>
          </div>
        </div>
      </div>
    </div>
    <div class="contnet">
      <div class="mainWidth">
        <div><img src="@/assets/top.png" alt=""></div>
        <div class="displayFlex">
          <div><img src="@/assets/map.png" alt=""></div>
          <div>
            <div class="display mb80">
              <div class="number">1</div>
              <div class="numberTitle">全球宏观数据</div>
            </div>
            <div class="contentText">
              <div>来源各国官方网站，世界银行等国际组织；</div>
              <div>包含国民经济核算，人口与就业，价格，金融，贸易，房地产等领域数据。</div>
            </div>
            <div class="mt50"><img src="@/assets/kown.png" alt=""></div>
          </div>
        </div>
        <div class="displayFlex">
          <div class="ml50">
            <div class="display mb120">
              <div class="number">2</div>
              <div class="numberTitle">行业经济数据</div>
            </div>
            <div class="contentText">
              <div>包含多个类别行业数据，价格，产销量，进出口，财务指标等数据， </div>
              <div>数据来源国家统计局，海关总督，发改委等官方网站。</div>
            </div>
            <div class="mt50" style="text-align:right"><img src="@/assets/kown.png" alt=""></div>
          </div>
          <div><img src="@/assets/lq.png" alt=""></div>
        </div>
      </div>
    </div>
    <div>
      <div class="mainWidth">
        <div class="displayFlex">
          <div><img src="@/assets/cup.png" alt=""></div>
          <div>
            <div class="display mb80">
              <div class="number number1">3</div>
              <div class="numberTitle numberTitle1">全球宏观数据</div>
            </div>
            <div class="contentText">
              <div>全国工商基本信息, 司法信息数据, 全维度查询</div>
            </div>
            <div class="mt50"><img src="@/assets/kown.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <div class="contnet content">
      <div class="mainWidth">
        <div class="displayFlex pt90">
          <div class="ml50">
            <div class="display mb120">
              <div class="number">4</div>
              <div class="numberTitle">行业经济数据</div>
            </div>
            <div class="contentText">
              <div>国内专利，全维度查询，支持批量下载，参考引文，深度查询</div>
            </div>
            <div class="mt50" style="text-align:right"><img src="@/assets/kown.png" alt=""></div>
          </div>
          <div><img src="@/assets/last.png" alt=""></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {
  getSwiperList,
  getHomeList,
  getBannerList,
  getFriurl,
} from "@/api/homePage";
import Header from "../header";
import Footer from "../footer"
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      bannerListSwiper: [],
      active:0
    };
  },
  methods: {},
  mounted() {
    getBannerList().then((res) => {
      if (res.code === 0) {
        this.bannerListSwiper = res.data;
      }
    });
  },
};
</script>
<style lang='scss' scoped>
.reason{
  height:877px;
  .titleInfor{
    text-align: center;
    height: 87px;
    font-size: 59px;
    font-family: Source Han Sans HW TC;
    font-weight: 400;
    line-height: 34px;
    color: #222750;
    letter-spacing: 5px;
    opacity: 1;
    padding-top: 155px;
  }
  .reasonConten{
    text-align: center;
    div{
      font-size: 14px;
      color:#666666;
    }
    .title{
      font-size:26px;
      color:#083786;
      font-weight: 600;
      margin-bottom:40px;;
    }
  }
}
.contnet{
    background:url("../../assets/contentBg.png") center no-repeat;
    background-size: 100% 100%;
    height:1755px;
  }
  .number{
    font-size: 120px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 34px;
    color: #FFFFFF;
    text-shadow: 3px 3px 10px #1A6BF5;
    letter-spacing: 30px;
    opacity: 0.81;
  }
  .number1{
    color:#0415A1;
  }
  .numberTitle{
    font-size: 58px;
    font-family: PingFang SC;
    font-weight: 300;
    line-height: 33px;
    color: #FFFFFF;
    letter-spacing: 5px;
    opacity: 1;
  }
  .numberTitle1{
    color:#222222;
  }
  .contentText{
    color:#BBBBBB;
    div{
      margin-bottom:10px;
      padding-left:20px;
    }
  }
  .content{
    height:851px;
  }
</style>