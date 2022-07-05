import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import store from "../store/index";
import {  Modal } from 'antd';
import { message } from 'antd';
import { baseUrl} from '../config/event'

let index =0;

const service: AxiosInstance = axios.create({
    baseURL: baseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    // headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded"
    // },
    // transformRequest: [
    //     function(data) {
    //       //由于使用的 form-data传数据所以要格式化

    //       data = qs.stringify(data);
    //       return data;
    //     }
    // ]
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    if (store.getState().userReducer) {
        (config.headers as any)['session'] = store.getState().userReducer?.token
        
    }
    return config
}, (error: any) => {
    return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.status_code !== 200) {
        if (res.status_code == 400) {
            message.error({
                content: res.msg,
                className: 'custom-class',
            });
            
        }else if(res.status_code == 401) {
            // 表示用户已经session 过期需要重新登录
            if(index===0){
                Modal.warning({content:'Login has expired, please login again',onOk:()=>{
                    window.location.href = window.location.origin + window.location.pathname + "#/login";
                    index=0;
                }});
                index++;
            }
        }
        return Promise.reject('error')
    }
    return response.data;
}, (error) => {
    message.error(error.msg);
})

export default service