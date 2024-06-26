import axios from 'axios';

// 创建一个axios对象出来
const request = axios.create({
    baseURL: 'http://localhost:8090/api',
    timeout: 5000
})

// request拦截器
// 可以在请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 设置请求头
    //config.headers['token'] = user.token;
    const user = localStorage.getItem("user")
    if(user){
        config.headers['token'] = JSON.parse(user).token;
        console.log(config.headers['token']);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// response拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        // response.data即为后端返回的Result
        let res = response.data;
        // 兼容服务器返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        // for debug
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default request