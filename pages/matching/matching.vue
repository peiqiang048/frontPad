<template>
	<view class="container">
		<!-- 引入组件：左侧menu -->
		<leftMenu :current="currentTabIndex" @click="tabClick" :style="{ height: windowHeight + 'px' }"></leftMenu>
		<view class="tableModuleStyle" :style="{ height: windowHeight + 'px' }">
			<!-- 请安排座位 -->
			<view class="messageLabel">{{i18n.pleaseArrangeSeats}}</view>
			<!-- 配席一览标题 -->
			<view v-if="isMatchingFalg" class="matchingList">
				<view class="transferSecondTop">
					<!-- 序号 -->
					<view class="transferLine" style="width: 5%;border-left: 0.5px solid #fff;">{{i18n.no}}</view>
					<!-- 受付时间 -->
					<view class="transferLine" style="width: 22%;border-left: 0.5px solid #fff;">{{i18n.receptionTime}}</view>
					<!-- 受付番号 -->
					<view class="transferLine" style="width: 18%;border-left: 0.5px solid #fff;">{{i18n.orderNumber}}</view>
					<!-- 人数 -->
					<view class="transferLine" style="width: 15%;border-left: 0.5px solid #fff;">{{i18n.numberPeople}}</view>
					<!-- 滞在時間 -->
					<view class="transferLine" style="width: 15%;border-left: 0.5px solid #fff;">{{i18n.lagTime}}</view>
					<!-- 操作 -->
					<view class="transferLine" style="width: 24%;border-left: 0.5px solid #fff;">{{i18n.operate}}</view>
				</view>
				<!-- 配席一览数据信息 -->
				<view class="transferSecondBottom">
					<block v-for="(item ,index) in withTableList" :key="index">
						<view class="transferSecondLine">
							<!-- 序号 -->
							<view class="transferLine" style="width: 5%;border-left: 0.5px solid rgb(255, 255, 255);">{{index + 1}}</view>
							<!-- 受付时间 -->
							<view class="transferLine" style="width: 22%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.receptionTime}}</view>
							<!-- 受付番号 -->
							<view class="moreLine" style="width: 18%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.receptionNo}}</view>
							<!-- 人数 -->
							<view class="transferLine" style="width: 15%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.customerCount}}</view>
							<!-- 滞在時間 -->
							<view class="transferLine" style="width: 15%;border-left: 0.5px solid rgb(255, 255, 255);">{{item.stayTime}}</view>
							<!-- 操作 -->
							<view class="transferLine" style="width: 25%;border-left: 0.5px solid rgb(255, 255, 255);">
								<!-- 配席按钮 -->
								<view class="matchingAbandonment" @click="matchingBotton(index)">{{i18n.allocationOfSeats}}</view>
								<!-- 废弃按钮 -->
								<view class="matchingAbandonment" @click="abandonmentBotton(index)">{{i18n.abandonment}}</view>
							</view>
						</view>
					</block>
					<!-- 暂无数据 -->
					<view class="noData" v-if="withTableList.length === 0">
						{{i18n.payListNoData}}
					</view>
				</view>
			</view>
			<!-- 桌子一览信息 -->
			<view v-else class="tableBottom">
				<block v-for="(item ,index) in tableList" :key="index">
					<view :class="item.selectTableSelf === '1' ? 'indexTableOther' : 'indexTable'" @click="selectTable(index)" v-if="tableUpdateStatus">
						<!-- 桌子名 -->
						<view :class="item.selectTableSelf === '1' ? 'indexTableLeftOther' : 'indexTableLeft'">{{item.tableName}}</view>
						<view :class="item.selectTableSelf === '1' ? 'indexTableRightOther' : 'indexTableRight'">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberPeople}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 订单数-->
							<view class="indexTableRight_Middle">{{i18n.orderQuantity}}：{{item.orderCount}}</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="!isMatchingFalg" class="backOrConfirm">
				<!-- 返回按钮 -->
				<view class="backOrConfirmButton" @click="backButton">{{i18n.returns}}</view>
				<!-- 确定按钮 -->
				<view class="backOrConfirmButton" @click="sureButton">{{i18n.confirm}}</view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<!-- 警告图标 -->
				<view v-if="alertFlag === 0 || alertFlag === 3" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 成功图标 -->
				<view v-else class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
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
	var printModule = uni.requireNativePlugin("PrintService");

	export default {
		// 引入多语言文件
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				// 当前选择的menu（0：订单，1：受付，2：配席）
				currentTabIndex: 2,
				// 配席信息
				withTableList: [],
				// 弹框
				showalert: '',
				// 弹框提示信息
				tipMessage: '',
				// 记录选择的receivablesId
				receivablesId: '',
				// 判断显不显示弹框取消按钮
				alertFlag: 0,
				// 判断是不是配席画面
				isMatchingFalg: true,
				// 空座信息
				tableList: [],
				// 记录当前选择的桌子
				selectTableSelf: '',
				// 屏幕高度
				windowHeight: 0,
				// 更新状态
				tableUpdateStatus: true,
				// 印刷結果
				printSuccessResult: ''
			}
		},
		onLoad: function(option) {
			// 计算屏幕高度
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
				}
			})
			// 隐藏弹框
			this.showalert = false;
			// 获取配席信息
			this.matchingDate();
		},
		methods: {
			// 获取配席信息
			matchingDate() {
				const data = {
					storeId: getApp().globalData.storeId
				};
				// 获取配席信息
				http
					.post('api/stpd/assignationTable', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 配席信息
							this.withTableList = result.data.assignationTableList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.alertFlag = 3;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 跳转menu
			tabClick(index) {
				this.currentTabIndex = index
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
						url: '/pages/tableList/tableList'
					});
					// 跳转席解除画面
				} else if (this.currentTabIndex === 3) {
					uni.reLaunch({
						url: '/pages/removeTable/removeTable'
					});
				}
			},
			// 废弃
			abandonmentBotton: function(e) {
				// 显示弹框
				this.alertFlag = 0;
				this.tipMessage = this.i18n.cancelSetTable;
				this.showalert = true;
				// 记录选择的receivablesId
				this.receivablesId = this.withTableList[e].receivablesId;
			},
			// 配席
			matchingBotton: function(e) {
				// 记录选择的receivablesId
				this.receivablesId = this.withTableList[e].receivablesId;
				this.isMatchingFalg = false;
				// 清空选择桌子的状态
				this.selectTableSelf = '';
				// 获取受付桌子信息
				this.tableDate(e);
			},
			// 获取受付桌子信息
			tableDate(e) {
				const data = {
					storeId: getApp().globalData.storeId,
					customerCount: this.withTableList[e].customerCount
				};
				// 获取桌子信息
				http
					.post('api/stpd/getReceptionInit', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 桌子信息
							this.tableList = result.data.tableList;
							//for (let i = 0; i < this.tableList.length; i++) {
							//this.tableList[i].selectTableSelf = '0';
							//}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.alertFlag = 3;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 弹框确认按钮
			confirmButton() {
				const data = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.receivablesId
				};
				// 获取配席信息
				http
					.post('api/stpd/receptionDisposal', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							this.alertFlag = 1;
							this.tipMessage = this.i18n.abandonedSuccessfully;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.alertFlag = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.alertFlag = 3;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 选择桌子
			selectTable: function(e) {
				// 判断桌子是不是已经是选中状态，是的话取消，不是则选择其他桌子 chen   
				if (this.tableList[e].selectTableSelf === '1') {
					this.tableList[e].selectTableSelf = '0';
				} else {
					this.tableList[e].selectTableSelf = '1';
				}
				this.tableUpdateStatus = false;
				this.tableUpdateStatus = true;
			},
			// 弹框取消按钮
			cancleButton() {
				this.showalert = false;
			},
			// 弹框确认按钮
			confirmButtonOther() {
				this.showalert = false;
				if (this.alertFlag !== 3) {
					// 获取配席信息
					this.isMatchingFalg = true;
					this.matchingDate();
				}

			},
			// 返回配席一览画面
			backButton() {
				this.isMatchingFalg = true;
			},
			// 确定配席
			sureButton() {

				// 追加
				const tableIdList = [];
				for (let i = 0; i < this.tableList.length; i++) {
					if (this.tableList[i].selectTableSelf === '1') {
						tableIdList.push({
							tableId: this.tableList[i].tableId
						})
					}
				}

				if (tableIdList.length === 0) {
					this.alertFlag = 3;
					// 参数校验失败
					this.showalert = true;
					this.tipMessage = this.i18n.pleaseChooseTable;
					return;
				}

				// 显示加载画面
				this.$showLoading()

				const data = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.receivablesId,
					tableId: tableIdList
				};
				// 确定配席
				http
					.post('api/stpd/setTable', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							this.alertFlag = 1;
							this.tipMessage = this.i18n.seatingSuccess;
							this.showalert = true;
							if (result.data.printInfo !== undefined && result.data.printInfo !== null) {
								this.printSuccessResult = "";
								printModule.printSlip(
									result.data.printInfo,
									(ret) => {
										this.printSuccessResult = ret.code;
										if (this.printSuccessResult != "00") {
											// 参数校验失败
											this.showalert = true;
											this.alertFlag = 1;
											if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
												this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
											} else {
												this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
											}
											// 隐藏加载画面
											this.$hideLoading();
										} 
									})
							} else {
								this.alertFlag = 1;
								this.tipMessage = this.i18n.seatingSuccess;
								this.showalert = true;
							}
						} else if (result.data.resultCode === '9001') {
							this.alertFlag = 3;
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3009') {
							this.alertFlag = 3;
							// 配席异常
							this.showalert = true;
							this.tipMessage = this.i18n.arrangedEmergency;
						} else {
							this.alertFlag = 3;
							// 系统未知错误
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
						// 隐藏加载画面
						this.$hideLoading();
					}).catch(() => {
						// 网络异常，请求失败
						this.alertFlag = 3;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
						// 隐藏加载画面
						this.$hideLoading();
					});
			}
		},
	}
</script>

<style>
	uni-page-body,
	#app {
		height: 100%;
	}

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
		width: 37%;
		margin: 3% 6% 3% 6%;
		border-radius: 0.5vw;
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	}

	.tableBottom {
		width: 100%;
		height: 70%;
		margin-bottom: 3%;
		overflow-y: auto;
		max-height: 70%;
	}

	.indexTable {
		width: 23%;
		height: 8vw;
		float: left;
		margin-top: 2vw;
		margin-left: 1.5%;
		background-size: 100% 100%;
		position: relative;
		background-color: #dfedff;
		display: flex;
	}

	.indexTableOther {
		width: 23%;
		height: 8vw;
		float: left;
		margin-top: 2vw;
		margin-left: 1.5%;
		background-size: 100% 100%;
		position: relative;
		background-color: #376fb7;
		display: flex;
	}

	.indexTableLeft {
		width: 39%;
		float: left;
		font-size: 1.6vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: auto;
		text-align: center;
		color: #333;
		box-shadow: 0 0 10px #508cc7;
	}

	.indexTableLeftOther {
		width: 39%;
		float: left;
		font-size: 1.6vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: auto;
		text-align: center;
		color: #fff;
		box-shadow: 0 0 10px #fff;
	}

	.indexTableRight {
		width: 61%;
		color: black;
		height: 100%;
	}

	.indexTableRightOther {
		width: 61%;
		color: #fff;
		height: 100%;
	}

	.indexTableRight_Top {
		font-size: 1.5vw;
		font-weight: 500;
		width: 100%;
		height: 50%;
		margin: auto;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		text-align: center;
		-webkit-box-pack: center;
	}

	.indexTableRight_Middle {
		font-size: 1.5vw;
		font-weight: 500;
		margin: auto;
		width: 100%;
		height: 50%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		text-align: center;
		-webkit-box-pack: center;
	}

	.backOrConfirm {
		width: 100%;
		height: 6%;
		float: left;
		margin-bottom: 7%;
	}

	.backOrConfirmButton {
		float: left;
		width: 14%;
		height: 100%;
		font-size: 2.5vw;
		background-color: #3987e4;
		color: #fff;
		margin-left: 18%;
		margin-right: 18%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1vw;
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
		padding: 1%;
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
