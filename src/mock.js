// 使用 Mock
import base from './axios/base' // 导入接口域名列表
const Mock = require('mockjs')

Mock.mock(`${base.api_live}/abc.json?s=123`, 'get', function () {
  const Random = Mock.Random
  let List = []
  for (let i = 0; i < 10; i++) {
    let newListObject = {
      title: Random.csentence(5, 10),
      article: Random.csentence(30, 100),
      pic: Random.image('40x40', '#000', '#fff', 'png', '40x40'),
      name: Random.cname(),
      date: Random.date() + ' ' + Random.time()
    }
    List.push(newListObject)
  }
  return List
})