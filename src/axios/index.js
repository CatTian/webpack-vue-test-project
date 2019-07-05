import base from './base' // 导入接口域名列表
import axios from 'axios'
import qs from 'qs'; // 根据需求是否导入qs模块

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
})
export default {
  // get数据
  get(name, params) {
    return instance.get(`${base.api_live}/${name}`, {
      params: params
    });
  },
  // post提交
  post(name, params) {
    return instance.post(`${base.api_live}/${name}`, qs.stringify(params));
  }
}