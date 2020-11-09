<script>
export default {
	globalData: {  
		storeId: ''  
	},  
	onLaunch: function() {
		console.log('App Launch');
		plus.screen.lockOrientation("landscape-primary")
		// plus.screen.lockOrientation("landscape-secondary")
		plus.navigator.setFullscreen(true);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	@import './common/sweetAlert.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
