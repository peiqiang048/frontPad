import axios from '@/js_sdk/gangdiedao-uni-axios';

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}

// 创建自定义接口服务实例
const http = axios.create({
	// 不可超过 manifest.json 中配置 networkTimeout的超时时间
	timeout: 20000,
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers: {
		'Content-Type': 'application/json'
		//'X-Requested-With': 'XMLHttpRequest',
	},
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// 获取token
	const token = uni.getStorageSync('authenticationToken');
	if (token) {
		if (!config.headers) {
			config.headers = {};
		}
		config.headers.Authorization = `Bearer ${token}`;
	}
	// 请求地址
	 // config.url = `http://192.168.10.7:8082/${config.url}`;
	
	// 131
	config.url = `https://qrdev.cncsys.co.jp/${config.url}`;
	// AWS
	// config.url = `https://qrsvc01.quickrestaurant.jp/${config.url}`;
	_reqlog(config)
	return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {

	_reslog(response)
	if (response.data.resultCode === '1000') {
	    // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
		uni.removeStorageSync('authenticationToken');
		uni.redirectTo({
			url: '/pages/login/login?unauthorized=1'
		});
	}
	return response;
}, err => {
	return Promise.reject(err);
})

export default http
