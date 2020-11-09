<template>
	<view class="context">
		<view id="menuHeight" class="menuHeight">
			<view class="menuLineOne">
				<!-- 返回登录页 -->
				<view class="headImg">
					<img src="static/pepolepic.png" style="margin: auto;width: 6vw;"></image>
				</view>
				<view class="menuReturn" id="return">
					<img src="static/10-17ai-34.png" style="margin: auto;width: 5vw;" @click="returnLogin()"></image>
				</view>
				<!-- 版本 -->
				<view class="version">
					<view>{{i18n.version}}</view>
				</view>
			</view>
			<!-- 机能一览 -->
			<view class="menuLineTwo" id="menudiv">
				<view class="menuWidth">
					<view v-for="(menu, index) in menuList" :key="menu.menuId" @click="selectMenu(menu.menuLink)" class="menuLi moHerf">
						<!-- 图标 -->
						<view class="menuLiImg">
							<img :src="menu.menuIcon" style="width: 80%"></image>
						</view>
						<!-- 机能名称 -->
						<view class="menuLiName">
							{{menu.menuName}}
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
	</view>
</template>
<script>
	import http from '@/common/http.js';
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
				// 机能信息一览
				menuList: [],
				// 弹框
				showalert: false,
				// 提示信息
				tipMessage: ''
			};
		},
		onLoad() {
			// 参数
			const data = {
				storeId: getApp().globalData.storeId,
				userId: uni.getStorageSync('userId'),
				languages: this._i18n.locale,
			};
			// 获取机能信息
			http.post('api/stpd/getMenuList', data)
				.then(result => {
					if (result.data.resultCode === '0000') {
						// 机能信息
						this.menuList = result.data.menuList
						// 予約表示標識　１の場合表示、以外の場合、表示しない
						if (uni.getStorageSync('reservationDisplayFlag') != "1") {
							this.menuList = this.menuList.filter(item => item.menuLink != "/pages/reserve/reserveList");
						}
					} else if (result.data.resultCode === '9001') {
						// 参数校验失败
						this.showalert = true;
						this.tipMessage = this.i18n.parameterVerificationFailed;
					} else {
						// 系统未知错误
						this.showalert = true;
						this.tipMessage = this.i18n.systemUnknownError;
					}
				})
				.catch(err => {
					// 网络异常，请求失败
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
		},
		methods: {
			// 点击返回按钮
			returnLogin: function() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
				fCMPush.fcmInit("", 0,
					(ret) => {
						this.token = ret.token;
						this.model = ret.model;
						this.addToken();
					})
			},
			// 选择机能
			selectMenu: function(menuLink) {
				uni.reLaunch({
					url: menuLink
				});
			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			}
		}
	};
</script>
<style>
	uni-page-body,
	#app {
		height: 100%;
	}

	.menuHeight {
		background-color: rgb(238, 238, 238);
		float: left;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		overflow: hidden;
	}

	.menuLineOne {
		background-color: #3987e4;
		float: left;
		width: 100%;
		height: 12%;
		display: flex;
		margin-bottom: 5%;
	}

	.menuReturn {
		float: left;
		height: 100%;
		margin: auto 0;
		display: flex;
	}

	.headImg {
		float: left;
		height: 100%;
		margin: auto 1% auto 3%;
		display: flex;
	}

	.version {
		float: right;
		color: #fff;
		font-size: 2vw;
		margin: auto 2% auto auto;
	}

	.menuLineTwo {
		float: left;
		width: 90%;
		margin-left: 4.5%;
		height: 70%;
		background-color: #ffffff;
		box-shadow: 5px 0 7px 3px #ddd;
		display: flex;
		margin-bottom: 10%;
		overflow-y: hidden;
	}

	.line {
		float: left;
		width: 100%;
		display: flex;
	}

	.menuLi {
		float: left;
		width: 18%;
		padding: 2% 1%;
		margin: auto;
		height: 42%;
	}

	.menuLiImg {
		float: left;
		width: 100%;
		text-align: center;
		height: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menuLiName {
		float: left;
		width: 100%;
		color: #333;
		font-size: 2vw;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 20%;
	}

	.menuWidth {
		width: 100%;
		height: 100%;
	}
</style>
