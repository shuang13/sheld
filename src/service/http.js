/**
 * axios 请求封装
 * 响应拦截 错误处理
 */
import axios from 'axios'
import vue from 'vue'
import { Message } from 'view-design'
import 'view-design/dist/styles/iview.css'
vue.prototype.$message = Message
let vm = new vue()
axios.defaults.baseURL = '' 
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.timeout = 15000


export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(
                    res => resolve(res.data)
            )
                .catch(
                    err => reject(err)
            )
        })
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(
                    res => resolve(res.data)
            )
                .catch(
                    err => reject(err)
            )
        })
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params: params
            })
                .then(
                    res => resolve(res.data)
            )
                .catch(
                    err => reject(err)
            )
        })
    }
}