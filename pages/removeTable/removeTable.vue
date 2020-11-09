<template>
	<view class="container">
		<!-- 引入组件：左侧menu -->
		<leftMenu :current="currentTabIndex"  @click="tabClick" :style="{ height: windowHeight + 'px' }"></leftMenu>
		<view class ="tableModuleStyle" :style="{ height: windowHeight + 'px' }">
			<!-- 解除対象席一覧 -->
			<view class="messageLabel">{{i18n.removeOneSeat}}</view>
			<!-- 席一覧 标题 -->
			<view class="matchingList">
				<view class="transferSecondTop">
					<!-- 序号 -->
					<view class="transferLine" style="width: 5%;border-left: 0.5px solid #fff;">{{i18n.no}}</view>
					<!-- 受付時間 -->
					<view class="transferLine" style="width: 25%;border-left: 0.5px solid #fff;">{{i18n.timeOfPayment}}</view>
					<!-- 受付番号 -->
					<view class="transferLine" style="width: 20%;border-left: 0.5px solid #fff;">{{i18n.orderNumber}}</view>
					<!-- 支払金額 -->
					<view class="transferLine" style="width: 20%;border-left: 0.5px solid #fff;">{{i18n.expenditureAmount}} </view>
					<!-- テーブル -->
					<view class="transferLine" style="width: 20%;border-left: 0.5px solid #fff;">{{i18n.tableName}}</view>
					<!-- 操作 -->
					<view class="transferLine" style="width: 10%;border-left: 0.5px solid #fff;">{{i18n.operate}}</view>
				</view>
				<!-- 席一覧 数据信息 -->
				<view class="transferSecondBottom">
					<block v-for="(item ,index) in seatReleaseList" :key="index">
						<view class="transferSecondLine">
							<!-- 序号 -->
							<view class="transferLine" style="width: 5%;border-left: 0.5px solid rgb(255, 255, 255);">{{index + 1}}</view>
							<!-- 受付時間 -->
							<view class="transferLine" style="width: 25%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.receptionTime}}</view>
							<!-- 受付番号 -->
							<view class="moreLine" style="width: 20%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.receptionNo}}</view>
							<!-- 支払金額 -->
							<view class="transferLine" style="width: 20%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.orderAmount}}</view>
							<!-- テーブル -->
							<view class="transferLine" style="width: 20%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.tableName}}</view>
							<!-- 操作 -->
							<view class="transferLine" style="width: 10%;border-left: 0.5px solid rgb(255, 255, 255);">
								<!-- 解除按钮 -->
								<view class="matchingAbandonment" @click="remove(index)">{{i18n.relieve}}</view>
							</view>
						</view>
					</block>
					<!-- 暂无数据 -->
					<view class="noData" v-if="seatReleaseList.length === 0">
						{{i18n.payListNoData}}
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show = "showalert">
			<view class ="sweet-overlay"></view>
			<view class="sweet-alert" >
				<!-- 警告图标 -->
			    <view v-if="alertFlag === 0 || alertFlag === 1" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 成功图标 -->
				<view v-if="alertFlag === 3" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
			    <!-- 提示信息 -->
			    <h2>{{tipMessage}}</h2>
			    <view class="sa-button-container">
			        <!-- 取消按钮 -->
			        <view v-if="alertFlag === 0" class="sa-confirm-button-container">
			            <button style="display: inline-block; background-color: #adadad;" @click="cancleButton">{{i18n.cancell}}</button>
			        </view>
			        <!-- 确认按钮 -->
			        <view v-if="alertFlag === 0" class="sa-confirm-button-container">
			            <button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
			        </view>
					<!-- 确认按钮 -->
					<view v-if="alertFlag === 1 || alertFlag === 3" class="sa-confirm-button-container">
					    <button style="display: inline-block; background-color: #3987e4;" @click="confirmButtonOther">{{i18n.confirm}}</button>
					</view>
			    </view>
			</view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import http from '@/common/http.js';
	export default {
		// 引入多语言文件
		computed: {
			i18n () {
				return this.$t('message')  
			}
		}, 
		data() {
			return {
				// 当前选择的menu（0：订单，1：受付，2：配席，3：席解除）
				currentTabIndex: 3,
				// 弹框
				showalert: false,
				// 弹框提示信息
				tipMessage: '',
				// 屏幕高度
				windowHeight: 0,
				// 席解除リスト
				seatReleaseList: [],
				// 判断弹框类别
				alertFlag: '',
				// 选择的解除对象的受付ID
				selectReceivablesId: '',
				// 选择的解除对象的テーブルID
				selectTableId: ''
			}
		},
		onLoad: function(option) {
			// 计算屏幕高度
			const that = this;
			uni.getSystemInfo({
				success:function(res){
					that.windowHeight = res.windowHeight;
				}
			});
			// 获取席解除信息
			this.removeTableDate();
			
		},
		methods: {
			// 跳转menu
			tabClick(index){
			    this.currentTabIndex = index;
				// 跳转订单画面
				if (this.currentTabIndex === 0) {
					uni.reLaunch({
					    url: '/pages/orderList/orderList'
					});
				// 跳转受付画面
				} else if (this.currentTabIndex === 1) {
					uni.reLaunch({
					    url: '/pages/appointment/appointment'
					});
				// 跳转配席画面
				} else if (this.currentTabIndex === 2) {
					uni.reLaunch({
					    url: '/pages/matching/matching'
					});
				// 跳转席解除画面
				} else if (this.currentTabIndex === 3) {
					uni.reLaunch({
					    url: '/pages/tableList/tableList'
					});
				}
			},
			// 获取席解除信息
			removeTableDate() {
				const data = {
				 	storeId: getApp().globalData.storeId
				};
				// 获取席解除信息
				http
				 	.post('api/stpd/seatReleaseList', data)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 席解除信息
							this.seatReleaseList = result.data.seatReleaseList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.alertFlag = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						}  else {
							// 系统未知错误
							this.alertFlag = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
						
				 }).catch(() => {
					// 网络异常，请求失败
					this.alertFlag = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 解除
			remove: function(e) {
				// 显示弹框
				this.alertFlag = 0;
				this.tipMessage = this.i18n.sureToCancelSeat;
				this.showalert = true;
				// 记录解除对象的受付ID
				this.selectReceivablesId = this.seatReleaseList[e].receivablesId;
				// 选择的解除对象的テーブルID
				this.selectTableId = this.seatReleaseList[e].tableId;
			},
			// 点击弹框的确定按钮
			confirmButtonOther() {
				// 隐藏弹框
				this.showalert = false;
			},
			// 弹框取消按钮
			cancleButton() {
				this.showalert = false;
			},
			// 点击弹框的确定按钮
			confirmButton() {
				// 显示加载画面
				this.$showLoading();
				const data = {
					storeId: getApp().globalData.storeId,
				 	receivablesId: this.selectReceivablesId,
					tableId: this.selectTableId
				};
				// 获取配席信息
				http
				 	.post('api/stpd/seatRelease', data)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 重新获取席解除信息
							this.removeTableDate();
							// 取消座位成功！
							this.alertFlag = 3;
							this.tipMessage = this.i18n.seatCancellationSucceeded;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.alertFlag = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.alertFlag = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
						// 隐藏加载画面
						this.$hideLoading();
				 }).catch(() => {
					// 网络异常，请求失败
					this.alertFlag = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
					// 隐藏加载画面
					this.$hideLoading();
				});
			},
		},
	}
</script>

<style>
	uni-page-body,#app {height: 100%;}
	.container {
		width: 100%;
	    height: 100%;
	    float: left;
	    overflow: hidden;
	}
	.tableModuleStyle {
		float: left;
		height: 100%;
		padding-left: 3%;
		padding-right: 3%;
		width: 85.67%;
		min-height: 100%;
		max-height: 100%;
	}
	.messageLabel {
		width: 100%;
		height: 13%;
		font-size: 2.5vw;
		display: -webkit-flex;
		-webkit-align-items: center;
	}
	.matchingList {
		width: 100%;
		height: 77%;
		margin-bottom: 10%;
	}
	.transferSecondTop {
	    background-color: #4e759b;
	    color: #fff;
	    float: left;
	    font-size: 1.5vw;
		width: 100%;
		display: flex;
	}
	.transferSecondBottom {
		height: 93%;
		width: 100%;
		overflow-y: auto;
	}
	.transferLine {
		height: 100%;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 1%;
		text-align: center;
		margin: auto;
	}
	.transferSecondLine {
		width: 100%;
		color: #333;
		float: left;
		font-size: 1.6vw;
		display: flex;
	}
	.matchingAbandonment {
		background-color: #3987e4;
	    color: #fff;
	    height: 3.5vw;
	    width: 88%;
	    margin: 3% 6% 3% 6%;
	    border-radius: 0.5vw;
	    display: flex;
	    align-items: center;
	    justify-content: center;
		float: left;
	}
	.moreLine {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    word-break: break-all;
		height: 100%;
		float: left;
		padding: 0.5%;
		text-align: center;
		margin: auto;
	}
	.noData {
		text-align: center;
		color: #333;
		font-size: 1.8vw;
		font-weight: 700;
		padding-top: 3%;
		float: left;
		width: 100%;
	}
</style>	
