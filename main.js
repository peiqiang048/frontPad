import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 多语言
import VueI18n from 'vue-i18n.js'
import LangEn from './static/lang/en.js'
import Langja from './static/lang/ja.js'
import LangCh from './static/lang/ch.js'
import LangKo from './static/lang/ko.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'ja_JP',
	messages: {'en_US': LangEn, 'ja_JP' : Langja, 'zh_CN' : LangCh, 'ko_KN' : LangKo}
})
Vue.prototype._i18n = i18n

// 加载动画
import store from './store'
Vue.prototype.$store = store

//请求加载组件
import requestLoading from './common/loading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);
//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
//全局显示动画可以 this.$showLoading();
Vue.prototype.$showLoading = showLoading;
//全局隐藏动画可以 this.$hideLoading();
Vue.prototype.$hideLoading = hideLoading;

// 组件：左侧menu
import leftMenu from './components/leftMenu.vue'
Vue.component('leftMenu', leftMenu)


// 组件：左侧menu
import digitKeyboard from './components/keybord/digitKeyboard.vue'
Vue.component('digitKeyboard', digitKeyboard)


// 扫码返回值
Vue.prototype.$eventHub = new Vue();

const app = new Vue({ i18n, ...App })
app.$mount()
