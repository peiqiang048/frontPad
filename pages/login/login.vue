<template>
	<view v-if="storeId === ''" class="loginContainer">
		<view class="loginView">
			<form class="login-center" @submit="bindLogin">
				<view class="login-logo">
					<image class="login-logo-img" :src="logoImage"></image>
				</view>
				<view class="input-view">
					<view class="label-view login-store"></view>
					<input class="input" type="text" :placeholder="i18n.storeIdPlaceholder" name="nameValue" />
				</view>
				<view class="input-view">
					<view class="label-view login-password"></view>
					<input class="input" password :placeholder="i18n.passwordPlaceholder" name="passwordValue" />
				</view>
				<view class="button-view">
					<button type="primary" :loading="loading" class="login" formType="submit">{{i18n.login}}</button>
				</view>
			</form>
		</view>
		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<view class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 提示信息 -->
				<h2>{{tipMessage}}</h2>
				<view class="sa-button-container">
					<!-- 确认按钮 -->
					<view class="sa-confirm-button-container">
						<button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view v-else class="container">
		<view class="longinLeft">
			<!-- 登录人账号 -->
			<view class="loginAdminInfo">
				<view class="loginUsername">{{username}}</view>
			</view>
			<!-- 门店下所有人账号 -->
			<view class="longinpeople">
				<view class="scrollTopLogin" @click="upScroll">▲</view>
				<view class="scrollCenterLogin" :style="{ height: leftCenterHeight + 'px' }">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="loginScroll" @scroll="scroll">
						<view class="loginDiv"></view>
						<view class="loginDiv"></view>
						<view class="loginDiv" v-for="(item ,index) in userList" :key="index">
							<image class="loginDivImg" :src="logincircle"></image>
						</view>
						<view class="loginDiv"></view>
						<view class="loginDiv"></view>
					</scroll-view>
				</view>
				<!-- 向下滚动 -->
				<view class="scrollBottomLogin" @click="downScroll">▼</view>
			</view>
		</view>
		<view class="longinRight" :style="{ height: windowHeight + 'px' }">
			<!-- 多语言 -->
			<view class="nationalFlag">
				<block v-for="(item ,index) in languageList" :key="index">
					<image v-if="item.code === 'ja_JP'" class="nationalDivImg" @click="changeLanguage(item.code)" :src="nationalja"></image>
					<image v-if="item.code === 'zh_CN'" class="nationalDivImg" @click="changeLanguage(item.code)" :src="nationalch"></image>
					<image v-if="item.code === 'en_US'" class="nationalDivImg" @click="changeLanguage(item.code)" :src="nationalen"></image>
					<image v-if="item.code === 'ko_KN'" class="nationalDivImg" @click="changeLanguage(item.code)" :src="nationalko"></image>
				</block>
			</view>
			<view class="passwordFlag">
				<!-- 密码提示 -->
				<view class="msg">{{passwordTips}}</view>
				<!-- 密码显示 -->
				<view class="loginRightCircle">
					<view v-if="passwordOne === ''" class="loginCircle">{{passwordOne}}</view>
					<view v-else class="loginCircleBlue"></view>
					<view v-if="passwordTwo === ''" class="loginCircle">{{passwordTwo}}</view>
					<view v-else class="loginCircleBlue"></view>
					<view v-if="passwordThree === ''" class="loginCircle">{{passwordThree}}</view>
					<view v-else class="loginCircleBlue"></view>
					<view v-if="passwordFour === ''" class="loginCircle">{{passwordFour}}</view>
					<view v-else class="loginCircleBlue"></view>
					<view v-if="passwordFive === ''" class="loginCircle">{{passwordFive}}</view>
					<view v-else class="loginCircleBlue"></view>
					<view v-if="passwordSix === ''" class="loginCircle">{{passwordSix}}</view>
					<view v-else class="loginCircleBlue"></view>
				</view>
				<!-- 数字按键 -->
				<view class="loginRightModuleStyle">
					<view class="loginNumber">
						<view class="loginRightModuleStyleImg" @click="add('1')">1</view>
						<view class="loginRightModuleStyleImg" @click="add('4')">4</view>
						<view class="loginRightModuleStyleImg" @click="add('7')">7</view>
						<view class="loginRightModuleStyleImg" @click="empty">{{i18n.empty}}</view>
					</view>
					<view class="loginNumber">
						<view class="loginRightModuleStyleImg" @click="add('2')">2</view>
						<view class="loginRightModuleStyleImg" @click="add('5')">5</view>
						<view class="loginRightModuleStyleImg" @click="add('8')">8</view>
						<view class="loginRightModuleStyleImg" @click="add('0')">0</view>
					</view>
					<view class="loginNumber">
						<view class="loginRightModuleStyleImg" @click="add('3')">3</view>
						<view class="loginRightModuleStyleImg" @click="add('6')">6</view>
						<view class="loginRightModuleStyleImg" @click="add('9')">9</view>
						<view class="loginRightModuleStyleImg" @click="backspace">{{i18n.backspace}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<view class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 提示信息 -->
				<h2>{{tipMessage}}</h2>
				<view class="sa-button-container">
					<!-- 确认按钮 -->
					<view class="sa-confirm-button-container">
						<button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/http.js';
	import logOut from '../../static/js/logout.js';

	var fCMPush = uni.requireNativePlugin("FCMPush");

	export default {
		// 引入多语言文件
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				// 登录人账号
				username: '',
				// 登录人Id
				userId: '',
				// 滚动条高度
				scrollTop: 0,
				// 国旗路径
				nationalch: '../../static/mobileCh.png',
				nationalja: '../../static/mobileJa.png',
				nationalen: '../../static/mobileEn.png',
				nationalko: '../../static/mobileKo.png',
				logoImage: '../../static/logo.png',
				// 门店下所有人员
				userList: [],
				logincircle: '../../static/logincircle.png',
				// 密码数字
				passwordOne: '',
				passwordTwo: '',
				passwordThree: '',
				passwordFour: '',
				passwordFive: '',
				passwordSix: '',
				passwordTips: '',
				// 屏幕高度
				windowHeight: 0,
				// 中间登录人view高度
				leftCenterHeight: 0,
				// 弹框
				showalert: false,
				// 弹框提示
				tipMessage: '',
				// 语言
				languageList: [],
				// 门店id
				storeId: '',
				// 加载
				loading: false,
				//安装的APP的token
				token: '',
				//安装的APP的model
				model: ''
			}
		},
		onLoad: function(option) {
			// 计算屏幕高度
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
					that.leftCenterHeight = that.windowHeight - 95 * 2;
				}
			})
			const value = uni.getStorageSync('storeId');
			if (value) {
				this.storeId = value;
				getApp().globalData.storeId = value;
			}
			if (this.storeId !== '' && this.storeId !== null && this.storeId !== undefined) {
				this.getUserAndLanguageList();
			}
			if (option.unauthorized === 1 || option.unauthorized === '1') {
				// 删除已经失效或过期的token
				this.showalert = true;
				this.tipMessage = this.i18n.tokenTimeout;
			}
		},
		methods: {
			// 获取门店id取得
			bindLogin(e) {
				this.loading = true;
				let name = e.detail.value.nameValue,
					password = e.detail.value.passwordValue;

				if (!/^[0-9a-zA-Z]*$/.test(name)) {
					// 请输入正确门店id
					this.loading = false;
					this.showalert = true;
					this.tipMessage = this.i18n.storeIdInputError;
					return;
				}

				if (password.length < 6) {
					// 密码大于5位
					this.loading = false;
					this.showalert = true;
					this.tipMessage = this.i18n.storePasswordInputError;
					return;
				}

				const data = {
					storeId: name,
					password: password
				};

				// 获取门店id
				http
					.post('api/stpd/storeIdVerification', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 将门店id放入缓存
							uni.setStorageSync('storeId', name);
							this.storeId = name;
							getApp().globalData.storeId = name;
							this.getUserAndLanguageList();
						} else {
							// 系统未知错误
							this.showalert = true;
							this.tipMessage = this.i18n.passwordInputError;
						}
						this.loading = false;
					}).catch(() => {
						// 密码错误
						this.loading = false;
						this.showalert = true;
						this.tipMessage = this.i18n.passwordInputError;
					});
			},
			// 获取人员信息
			getUserAndLanguageList: function() {
				// 门店id
				const data = {
					storeId: this.storeId
				};
				// 密码提示
				this.passwordTips = this.i18n.inputPassword;
				// 获取人员信息
				http
					.post('api/stpd/getUserAndLanguageList', data)
					.then(result => {

						if (result.data.resultCode === '0000') {
							// 人员信息
							this.userList = result.data.userList;
							// 第一个人员账号
							this.username = result.data.userList[0].userName;
							// 第一个人员ID
							this.userId = result.data.userList[0].userId;
							// 语言信息
							this.languageList = result.data.languageList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;

					});
			},
			// 点击数字按钮
			add: function(e) {
				if (this.passwordOne === null || this.passwordOne === '') {
					this.passwordOne = e;
				} else if (this.passwordTwo === null || this.passwordTwo === '') {
					this.passwordTwo = e;
				} else if (this.passwordThree === null || this.passwordThree === '') {
					this.passwordThree = e;
				} else if (this.passwordFour === null || this.passwordFour === '') {
					this.passwordFour = e;
				} else if (this.passwordFive === null || this.passwordFive === '') {
					this.passwordFive = e;
				} else if (this.passwordSix === null || this.passwordSix === '') {
					this.passwordSix = e;
					// 密码
					const password = this.passwordOne + this.passwordTwo + this.passwordThree + this.passwordFour + this.passwordFive +
						this.passwordSix;

					const data = {
						storeId: getApp().globalData.storeId,
						userId: this.userId,
						password: password
					};
					// 获取token
					http
						.post('api/stpd/login', data)
						.then(result => {
							if (result.data.resultCode === '0000') {
								const bearerToken = result.headers.Authorization || result.headers.authorization;
								if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
									const jwt = bearerToken.slice(7, bearerToken.length);
									// 将token放入缓存
									uni.setStorageSync('authenticationToken', jwt);
									// 登录人信息放入缓存
									uni.setStorageSync('userId', this.userId);
									uni.setStorageSync('userName', this.username);
									// 予約機能表示標識、1:有、0：無
									uni.setStorageSync('reservationDisplayFlag', result.data.reservationDisplayFlag);
									// 出前機能表示標識、1:有、0：無
									uni.setStorageSync('deliveryDisplayFlag', result.data.deliveryDisplayFlag);
									// 前後支払標識、
									uni.setStorageSync('beforeAfterPaymentFlag', result.data.beforeAfterPaymentFlag);
									// 客用スマホ使用可能標識、1:可、0：不可
									uni.setStorageSync('smartPhonesAvailableFlag', result.data.smartPhonesAvailableFlag);
									// 音声注文使用可能標識
									uni.setStorageSync('voiceOrderAvailableFlag', result.data.voiceOrderAvailableFlag);									
									// 跳转主页
									uni.reLaunch({
										url: '/pages/homePage/homePage'
									});

									fCMPush.fcmInit(this.storeId,result.data.loopInterval,
										(ret) => {
											this.token = ret.token;
											this.model = ret.model;
											this.addToken();
										})

									
								} else {
									// 密码错误
									this.passwordTips = this.i18n.passwordInputError;
								}
							} else if (result.data.resultCode === '3001') {
								// 密码错误
								this.passwordTips = this.i18n.passwordInputError;
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
							} else {
								// 系统未知错误
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
							}
						}).catch((e) => {
							if (e.response.status === 401) {
								// 密码错误
								this.passwordTips = this.i18n.passwordInputError;
								this.passwordOne = '';
								this.passwordTwo = '';
								this.passwordThree = '';
								this.passwordFour = '';
								this.passwordFive = '';
								this.passwordSix = '';
							} else {
								// 网络异常，请求失败
								this.tipMessage = this.i18n.networkExceptionRequestFailed;
								this.showalert = true;
							}
						});
				}
			},
			addToken: function() {
				const data = {
					storeId: getApp().globalData.storeId,
					token: this.token,
					model: this.model
				};
				// 获取token
				http
					.post('api/stpd/storeDeviceRegist', data)
					.then(result => {

					}).catch(() => {

					});

			},

			// 清空按钮
			empty: function(e) {
				this.passwordOne = '';
				this.passwordTwo = '';
				this.passwordThree = '';
				this.passwordFour = '';
				this.passwordFive = '';
				this.passwordSix = '';
				this.passwordTips = this.i18n.inputPassword;
			},
			// 退格按钮
			backspace: function(e) {
				if (this.passwordSix !== '' && this.passwordSix !== null) {
					this.passwordSix = '';
				} else if (this.passwordFive !== '' && this.passwordFive !== null) {
					this.passwordFive = '';
				} else if (this.passwordFour !== '' && this.passwordFour !== null) {
					this.passwordFour = '';
				} else if (this.passwordThree !== '' && this.passwordThree !== null) {
					this.passwordThree = '';
				} else if (this.passwordTwo !== '' && this.passwordTwo !== null) {
					this.passwordTwo = '';
				} else if (this.passwordOne !== '' && this.passwordOne !== null) {
					this.passwordOne = '';
				}
				this.passwordTips = this.i18n.inputPassword;
			},
			// 滚动触发
			scroll: function(e) {
				const i = Math.round(e.detail.scrollTop / (e.detail.scrollHeight / (this.userList.length + 4)));
				this.username = this.userList[i].userName;
				this.userId = this.userList[i].userId;
			},
			// 切换语言
			changeLanguage(e) {
				this._i18n.locale = e;
				// 密码提示
				this.passwordTips = this.i18n.inputPassword;
			},
			// 点击上面三角形
			upScroll: function(e) {
				this.scrollTop = this.scrollTop + 100;
			},
			// 点击下面三角形
			downScroll: function(e) {
				if (this.scrollTop > 0) {
					this.scrollTop = this.scrollTop - 100;
				}
			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			},
		}
	}
</script>

<style>
	uni-page-body,
	#app {
		height: 100%;
	}

	.container {
		width: 96%;
		height: 100%;
		float: left;
		margin-left: 2%;
		overflow: hidden;
	}

	.longinLeft {
		float: left;
		padding-left: 1%;
		padding-right: 1%;
		height: 100%;
		width: 33%;
		position: relative;
	}

	.longinRight {
		float: left;
		padding: 0;
		margin: 0;
		height: 100%;
		width: 64%;
		position: relative;
	}

	.longinpeople {
		float: left;
		margin-right: 3%;
		padding: 0;
		z-index: 10;
		position: relative;
		height: 100%;
		color: white;
		font-weight: 700;
		width: 58%;
	}

	.scrollTopLogin {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 95px;
		color: #3987e4;
		font-size: 6vw;
		text-align: center;
	}

	.scrollCenterLogin {
		width: 100%;
		border-radius: 3vw;
		background-color: #61a3f1;
		overflow: hidden;
	}

	.scrollBottomLogin {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 95px;
		color: #3987e4;
		font-size: 6vw;
		text-align: center;
	}

	.loginScroll {
		height: 90%;
		max-height: 100%;
		margin-top: 18%;
		float: left;
		width: 100%;
		overflow: hidden;
		outline: none;
		cursor: grab;
	}

	.loginDiv {
		display: flex;
		width: 100%;
		text-align: center;
		height: 20%;
		vertical-align: middle;
		color: white;
		font-size: 2vw;
	}

	.loginDivImg {
		margin: auto;
		width: 45%;
		height: 80%;
	}

	.loginAdminInfo {
		display: flex;
		position: absolute;
		top: 43.8%;
		left: 2%;
		width: 100%;
		height: 14%;
		background-color: #214665;
		opacity: 0.8;
		z-index: 11;
		border-radius: 0 2vw 2vw 0;
	}

	.loginUsername {
		width: 43%;
		margin-left: 57%;
		text-align: center;
		font-size: 2.7vw;
		color: white;
		font-weight: 700;
		margin: auto 0 auto 57%;
	}

	.nationalFlag {
		position: absolute;
		float: right;
		right: 9.5%;
		width: 55%;
		margin-top: 5%;
	}

	.nationalDivImg {
		float: left;
		width: 22%;
		height: 6vw;
		padding-right: 3%;
	}

	.passwordFlag {
		position: relative;
		padding-left: 4%;
		height: 88%;
		width: 100%;
		margin-top: 15%;
	}

	.msg {
		font-size: 3.5vw;
		font-weight: 600;
		color: #333;
		text-align: center;
		width: 97%;
		height: 8%;
		padding-top: 5%;
	}

	.loginRightCircle {
		text-align: center;
		width: 80%;
		height: 7%;
		padding-left: 33%;
		padding-top: 5%;
	}

	.loginCircle {
		background-image: url(../../static/circles.png);
		background-size: 100% 100%;
		width: 2vw;
		height: 2vw;
		float: left;
		margin-left: 1vw;
	}

	.loginCircleBlue {
		background-image: url(../../static/circlesBlue.png);
		background-size: 100% 100%;
		width: 2vw;
		height: 2vw;
		float: left;
		margin-left: 1vw;
	}

	.loginRightModuleStyle {
		height: 56%;
		border-radius: 2vw;
		font-weight: 700;
		padding-left: 15%;
		padding-right: 15%;
		padding-top: 6%;
		padding-bottom: 14%;
	}

	.loginNumber {
		float: left;
		height: 100%;
		padding: 0;
		margin: 0;
		width: 33.33%;
	}

	.loginRightModuleStyleImg {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 25%;
		text-align: center;
		background-image: url(../../static/loginButton.png);
		background-size: 100% 105%;
		position: relative;
		color: #fff;
		font-size: 4vw;
	}

	.loginView {
		background-color: #fff;
		margin: auto;
		box-shadow: 16px 18px 8px -3px rgba(140, 137, 137, .5);
		position: relative;
		display: flex;
		float: left;
		width: 80%;
	}

	.input-view {
		box-shadow: -2px 1px 8px -3px rgba(140, 137, 137, .5);
		width: 100%;
		margin-bottom: 25px;
		position: relative;
		display: inline-block;
		font-size: 19px !important;
		margin-top: -.6rem !important;
	}

	.label-view {
		position: absolute;
		top: 35%;
		left: .3rem;
	}

	.input {
		padding-left: 1.0rem !important;
		border: 1px solid #e2e2e2;
		height: 60px;
		font-size: 19px !important;
	}

	.button-view {
		margin-top: 20upx;
		padding: 0 20upx;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 16upx;
		margin-bottom: 30upx;
	}

	button.register {
		margin-top: 30upx;
		color: #ff80ab;
		background-color: #fff;
		border-color: #ff80ab;
		border-width: 2upx;
	}

	.loginContainer {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		float: left;
		background-image: url(../../static/login-background.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.login-logo {
		width: 100%;
		display: flex;
		margin-bottom: 50px;
	}

	.login-logo-img {
		float: left;
		margin-left: auto;
		margin-right: auto;
		width: 156px;
		height: 86px;
	}

	.login-center {
		width: 40%;
		margin: 50px auto;
		display: block;
		float: left;
	}

	.login-store {
		background-image: url(../../static/shop.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 20px;
		height: 20px;
	}

	.login-password {
		background-image: url(../../static/padlock.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 20px;
		height: 20px;
	}
</style>
