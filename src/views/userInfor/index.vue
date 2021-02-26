<template>
    <div>
        <Header />
        <div class="mainWidth display mt30 mb30">
            <div>
                <div class="leftInfor" :class="index===1?'bgColor':''" @click="changeTab(1)">
                    <div class="font36"><i class="el-icon-document"></i></div>
                    <div class="font14">基本资料</div>
                </div>
                <div class="leftInfor" :class="index===2?'bgColor':''" @click="changeTab(2)">
                    <div class="font36"><i class="el-icon-bottom"></i></div>
                    <div class="font14">下载内容</div>
                </div>
            </div>
            <div class="userContent">
                <div v-show="index===1">
                  <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item :label="edit?'用户名':'用户名：'">
                        <el-input v-model="form.name" v-if="edit"></el-input>
                        <span v-else>{{form.name}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'会员类型':'会员类型：'">
                        <span>{{form.vip===0?'会员':'非会员'}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'性别':'性别：'">
                        <el-radio-group v-model="form.gender" v-if="edit">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                        <span v-else>{{form.gender}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'出生日期':'出生日期：'">
                        <el-date-picker v-if="edit" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                        <span v-else>{{form.birthday}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'所在城市':'所在城市：'">
                        <el-input v-model="form.area" v-if="edit"></el-input>
                        <span v-else>{{form.area}}</span>
                    </el-form-item>
                   <el-form-item :label="edit?'电子邮箱':'电子邮箱：'">
                        <el-input v-model="form.email" v-if="edit"></el-input>
                        <span v-else>{{form.email}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'毕业学校':'毕业学校：'">
                        <el-input v-model="form.school" v-if="edit"></el-input>
                        <span v-else>{{form.school}}</span>
                    </el-form-item>
                    <el-form-item :label="edit?'当前职业':'当前职业：'">
                        <el-input v-model="form.job" v-if="edit"></el-input>
                        <span v-else>{{form.job}}</span>
                    </el-form-item>
                    <el-form-item>
                        <div class="btn">
                            <el-button type="primary" class="edit" @click="editInfor" v-if="!edit">编辑</el-button>
                            <el-button type="primary" class="submit" @click="submit" v-else>保存</el-button>
                        </div>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-show="index===2">
                    <div class="downTitle">下载记录</div>
                    <div class="table">
                        <el-table
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="时间"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="订单号"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="商品名称">
                            </el-table-column>
                        </el-table>
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
import { userIfor } from "@/api/homePage"
export default {
    components:{Header,Footer},
    data(){
        return{
            form: {
                name: '',
                gender: '',
                birthday: '',
                area: '',
                email: '',
                school:'',
                job: '',
            },
            edit:false,
            index:1,
            tableData:[]
        }
    },
    mounted(){
        userIfor().then(res=>{
            if(res.code===0){
                this.form = res.data
            }
        })
    },
    methods:{
        editInfor(){
            this.edit = !this.edit
        },
        submit(){
            userIfor(this.form).then(res=>{
                if(res.code===0){
                    this.$message.success('修改成功')
                    this.edit = !this.edit
                }
            })
        },
        changeTab(num){
            this.index=num
        }
    }
}
</script>
<style lang="scss" scoped>
.leftInfor{
    width:190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:50px 0;
}
.bgColor{
    background: #F8F8F8;;
}
.userContent{
    border-top:5px solid #0415A1;
    flex: 1;
    padding-top: 10px;
}  
.btn{
    width:100%;
    text-align: right;
}
.downTitle{
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
}
.table{
    padding:0 20px;
}
</style>