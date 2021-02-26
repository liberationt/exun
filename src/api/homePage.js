import request from '@/utils/request'
//获取验证码
export function getCaption(data) {
    return request({
        url: '/codes/',
        method: 'post',
        data
    })
}
//注册
export function getRegister(data) {
return request({
    url: '/user_register/',
    method: 'post',
    data
})
}
//登录
export function toLogin(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  }
//退出
export function tologout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data
    })
}
//微信登录
export function wxLogin(params) {
    return request({
      url: '/wxpc_login/',
      method: 'get',
      params
    })
}
//列表图片
export function getBannerList(params) {
    return request({
        url: '/adv/banner',
        method: 'get',
        params
    })
}
// 数据导航
export function getCategory(params) {
    return request({
        url: '/adv/category/',
        method: 'get',
        params
    })
}
//数据超市
export function getSuperMark(params) {
return request({
    url: '/data_market/market_list',
    method: 'get',
    params
})
}
// 详情
export function getSuperDetail(id) {
    return request({
      url: `/data_market/market_list/${id}`,
      method: 'get',
    })
  }
  //数据超市详情支付
export function getUrCode(params) {
    return request({
      url: '/data_market/orders/',
      method: 'get',
      params
    })
  }
// 校验是否失败
export function supPaySuccess(params) {
return request({
    url: '/fil_order/',
    method: 'get',
    params
})
}
//付款成功返回链接
export function getDownLoad(id) {
return request({
    url: `/data_market/download/${id}/`,
    method: 'get',
})
}
//分类
export function getSuperCategory(params) {
return request({
    url: '/data_market/market_category/',
    method: 'get',
    params
})
}
// 个人信息
export function userIfor(data) {
    return request({
        url: '/user/userinfo/',
        method: 'post',
        data
    })
}
