import axios from "axios";
import appConfig from "@/config";

const service = axios.create({
    baseURL:appConfig.baseApiUrl,
    timeout:15000
})

//请求拦截
service.interceptors.request.use(config=>{
    return config
})

//响应拦截
service.interceptors.response.use(resp=>{

},error => {

})

export default service