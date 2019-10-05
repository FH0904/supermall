import axios from 'axios'

export default function require(config){
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  });
  //配置请求拦截
  instance.interceptors.request.use(config=> {
    // console.log('来到了request拦截success中');
    // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

    // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

    // 3.对请求的参数进行序列化(看服务器是否需要序列化)
    // config.data = qs.stringify(config.data)
    // console.log(config);

    return config
  },error => {
    return error
  });

  //配置响应拦截
  instance.interceptors.response.use(response=> {
    return response.data
  },error => {
    return error
  })



  //发送真正的网络请求
  return instance(config)
}
