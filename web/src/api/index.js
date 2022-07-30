import axios from "../utils/request"

/**
 * 网络请求访问路径
 */
const base = {
    baseUrl:"/api",
    register:"/api/v1/users/register",
    // repeatusername:"/api/repeat/username",
    login:"/api/v1/users/login",
    list:"/api/v1/goods/list"
}

/**
 * 网络请求方法
 */
const api = {
    /**
     * 注册
     * 
     * params = {
     *  username:"iwen",
     *  password:"213"
     *  ...
     * }
     */
    register(params){
        return axios.post(base.baseUrl + base.register,params);
    },
    /**
     * 用户名重复验证
     */
    repeatUserName(params){
        return axios.get(base.baseUrl+base.repeatusername,{
            params
        })
    },
    /**
     * 登陆接口
     */
    login (params) {
        console.log(base.baseUrl,base.login,params)
        axios.post("http://localhost:5000/auth/login", params)
        .then((result) => {
          console.log(result.data);
        }).catch((error) => {
          console.error(error);
        });
        console.log("tttttttttttttttt", base.baseUrl + base.login)

        return axios.post(base.baseUrl + base.login,params)
    },
    /**
     * 首页列表数据
     */
    list(){
        return axios.get(base.baseUrl + base.list)
    }
}

export default api;