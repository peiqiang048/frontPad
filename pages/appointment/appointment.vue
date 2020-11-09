<template>
	<view class="container">
		<!-- 引入组件: 左侧menu -->
		<leftMenu :current="currentTabIndex" @click="tabClick" :style="{ height: windowHeight + 'px' }"></leftMenu>
		<view class="tableModuleStyle" :style="{ height: windowHeight + 'px' }">
			<!-- 受付 -->
			<view class="messageLabel">{{i18n.qrPrint}}</view>
			<view class="searchTop">
				<view class="peopleNumber">
					<!-- 人数 -->
					<view class="peopleNumberLabel">{{i18n.numberPeople}}：</view>
					<!-- 增加就餐人数 -->
					<view class="jianButton" @click="minNumberNew">
						<image class="minusSignpic" :src="minusSignpic"></image>
					</view>
					<!-- 人数 （可录入）-->
					<input @input="inputChange" type="number" :value="customerCount" class="middleButton" />
					<!-- 减少就餐人数 -->
					<view class="jiaButton" @click="addNumberNew">
						<image class="addSignpic" :src="addSignpic"></image>
					</view>
				</view>
				<view class="peopleNumber">
					<!-- 检索 -->
					<view class="searchAndPrint" style="display: flex;" @click="searchButton">
						<view class="peopleNumberButton">{{i18n.search}}</view>
					</view>
					<!-- 打印 -->
					<view class="searchAndPrint" @click="printConfirmButton" style="display: flex;">
						<view class="peopleNumberButton">{{i18n.printing}}</view>
					</view>
				</view>
			</view>
			<!-- 桌子信息 -->
			<view class="tableBottom">
				<block v-for="(item ,index) in tableList" :key="index">
					<view :class="item.selectionStatus === '1' ? 'indexTableOther' : 'indexTable'" @click="selectTable(index)" v-if="tableUpdateStatus">
						<!-- 桌子名 -->
						<view :class="item.selectionStatus === '1' ? 'indexTableLeftOther' : 'indexTableLeft'">{{item.tableName}}</view>
						<view :class="item.selectionStatus === '1' ? 'indexTableRightOther' : 'indexTableRight'">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberPeople}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 订单数-->
							<view class="indexTableRight_Middle">{{i18n.orderQuantity}}：{{item.orderCount}}</view>
						</view>
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<!-- 警告图标 -->
				<view v-if="printFlag === 0" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 成功图标 -->
				<view v-else class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
				<!-- 提示信息 -->
				<h2>{{tipMessage}}</h2>
				<view class="sa-button-container">
					<!-- 确认按钮 -->
					<view class="sa-confirm-button-container">
						<button style="display: inline-block; background-color: #3987e4" @click="confirmButton">{{i18n.confirm}}</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 预约选择弹框-->
		<view v-show="showReservateAlert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<!-- 提示信息 -->
				<h2>{{i18n.orderisHasReservate}}</h2>
				<view class="sa-button-container">
					<!-- 取消按钮 -->
					<button style="display: inline-block; background-color: #adadad;" @click="cancelButton">{{i18n.cancel}}</button>
					<!-- 确认按钮 -->
					<button style="display: inline-block; background-color: #3987e4;" @click="okButton">{{i18n.confirm}}</button>
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
				currentTabIndex: 1,
				// 图片路径
				minusSignpic: '../../static/minus.png',
				addSignpic: '../../static/add.png',
				// 桌子信息
				tableList: [],
				// 人数
				customerCount: 1,
				// 弹框
				showalert: false,
				// 弹框提示信息
				tipMessage: '',
				// 记录当前选择的桌子
				selectTableSelf: '',
				// 判断是不是打印按钮
				printFlag: 0,
				// 屏幕高度
				windowHeight: 0,
				// 放题选择弹框
				showReservateAlert: '',
				// 记录当前选择的桌子
				selectTableList: [],
				// 更新状态
				tableUpdateStatus: true,
				// 印刷結果
				printSuccessResult: ''
			}
		},
		onLoad: function(option) {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
				}
			})
			// 隐藏弹框
			this.showalert = false;
			// 获取受付桌子信息
			this.tableDate();
		},
		methods: {
			// 获取受付桌子信息
			tableDate() {
				const data = {
					storeId: getApp().globalData.storeId,
					customerCount: this.customerCount
				};
				// 获取桌子信息
				http
					.post('api/stpd/getReceptionInit', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 桌子信息
							this.tableList = result.data.tableList;
							for (let i = 0; i < this.tableList.length; i++) {
								this.tableList[i].selectionStatus = '0';
							}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.printFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.printFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.printFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 改变人数文本框
			inputChange(e) {
				this.customerCount = e.detail.value;
			},
			// 减少人数
			minNumberNew: function(e) {
				if (this.customerCount !== 1) {
					this.customerCount = this.customerCount - 1;
				}
			},
			// 增加人数
			addNumberNew: function(e) {
				if (this.customerCount === '') {
					this.customerCount = 0;
				}
				this.customerCount = this.customerCount + 1;
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
						url: '/pages/tableList/tableList'
					});
					// 跳转配席画面	
				} else if (this.currentTabIndex === 2) {
					uni.reLaunch({
						url: '/pages/matching/matching'
					});
					// 跳转席解除画面
				} else if (this.currentTabIndex === 3) {
					uni.reLaunch({
						url: '/pages/removeTable/removeTable'
					});
				}
			},
			// 检索
			searchButton() {
				if (this.customerCount !== '') {
					// 获取受付桌子信息
					this.tableDate();
				} else {
					// 弹框提示
					this.tipMessage = this.i18n.pleaseEnterTheNumberOfPeople;
					this.showalert = true;
				}
			},
			// 弹框确认按钮
			confirmButton() {
				this.showalert = false;
				this.printFlag = 0;
			},
			// 选择桌子
			selectTable: function(e) {
				// 判断桌子是不是已经是选中状态，是的话取消，不是则选择其他桌子
				if (this.tableList[e].selectionStatus === '1') {
					this.tableList[e].selectionStatus = '0';
				} else {
					// 状态变为选择状态
					this.tableList[e].selectionStatus = '1';
				}
				this.tableUpdateStatus = false;
				this.tableUpdateStatus = true;
			},
			// 打印
			printConfirmButton() {
				for (let i = 0; i < this.tableList.length; i++) {
					if (this.tableList[i].selectionStatus === '1' && 0 < this.tableList[i].reservateCount) {
						this.showReservateAlert = true;
						return;
					}
				}
				this.printButton();
			},
			// 打印
			printButton() {
				// 显示加载画面
				this.$showLoading()
				// 选择桌子取得
				const tableIdList = [];
				for (let i = 0; i < this.tableList.length; i++) {
					if (this.tableList[i].selectionStatus === '1') {
						tableIdList.push({
							tableId: this.tableList[i].tableId
						})
					}
				}
				// 参数
				const data = {
					storeId: getApp().globalData.storeId,
					customerCount: this.customerCount,
					tableId: tableIdList
				};
				// 获取桌子信息
				http
					.post('api/stpd/qrCodeIssue', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 隐藏加载画面
							this.$hideLoading();
							this.selectTableSelf = '';
							// 刷新受付桌子信息1
							this.tableDate();
							// 隐藏加载画面
							this.$hideLoading();
							this.printSuccessResult = "";
							printModule.printSlip(
								result.data.printInfo,
								(ret) => {
									this.printSuccessResult = ret.code;
									if (this.printSuccessResult != "00") {
										this.printFlag = 1;
										// 参数校验失败
										this.showalert = true;
										if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
											this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
										} else {
											this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
										}
										
									// 隐藏加载画面
										this.$hideLoading();
									} else {
										// 弹框提示
										this.printFlag = 1;
										this.tipMessage = this.i18n.printingSuccessful;
										this.showalert = true;
										// 隐藏加载画面
										this.$hideLoading();
									}
								})

						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.printFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.printFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}

					}).catch(() => {
						// 网络异常，请求失败
						this.printFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
						// 隐藏加载画面
						this.$hideLoading();
					});
			},
			// 提示框取消按钮
			cancelButton: function() {
				this.showReservateAlert = false;
			},
			// 提示框按钮
			okButton: function() {
				this.showReservateAlert = false;
				this.printButton();
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
		width: 100%;
		height: 100%;
		float: left;
		overflow: hidden;
	}

	.messageLabel {
		width: 97%;
		height: 10%;
		font-size: 2.5vw;
		display: -webkit-flex;
		-webkit-align-items: center;
		margin-left: 1.5%;
		border-bottom: 1px solid #4e759b;

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

	.searchTop {
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tableBottom {
		width: 100%;
		height: 80%;
		margin-bottom: 5%;
		overflow-y: auto;
		max-height: 80%;
	}

	.peopleNumber {
		width: 50%;
		float: left;
		height: 4.5vw;
		display: flex;
	}

	.peopleNumberLabel {
		float: left;
		font-size: 2.7vw;
		margin: auto;
	}

	.jianButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		width: 20%;
		height: 4.5vw;
		border: 1px solid #3987e4;
		border-radius: 2vw 0vw 0vw 2vw;
	}

	.jiaButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		width: 20%;
		height: 4.5vw;
		border: 1px solid #3987e4;
		border-radius: 0vw 2vw 2vw 0vw;
	}

	.middleButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		width: 25%;
		height: 4.5vw;
		border: 1.5px solid #3987e4;
		background-color: #3987e4;
		font-size: 2vw;
		text-align: center;
		color: #fff;
	}

	.minusSignpic {
		height: 2.5vw;
		width: 3vw;
	}

	.addSignpic {
		height: 4vw;
		width: 4vw;
	}

	.searchAndPrint {
		margin: auto;
		float: left;
		width: 30.5%;
		text-align: center;
		height: 4.5vw;
		font-size: 2vw;
		line-height: 4vw;
		color: #fff;
		font-weight: 600;
		background-color: #3987e4;
		background-size: 100% 100%;
		border: none;
		border-radius: 1vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		/* padding-left: 4%; */
		height: 100%;
	}

	.indexTableRightOther {
		width: 61%;
		color: #fff;
		/* padding-left: 4%; */
		height: 100%;
	}

	.indexTableRight_Top {
		font-size: 1.5vw;
		font-weight: 500;
		width: 100%;
		height: 50%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.indexTableRight_Middle {
		font-size: 1.5vw;
		font-weight: 500;
		margin: auto;
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.peopleNumberButton {
		margin: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-left-row2 {
		width: 100%;
		background-color: white;
		overflow-y: auto;
		max-height: 400px;
	}

	.buffetlabelName {
		float: left;
		width: 80%;
		margin-right: 10%;
		margin-left: 10%;
		margin-bottom: 2%;
		height: 5vw;
		line-height: 5vw;
		font-size: 1.5vw;
		text-align: center;
		color: #333;
		border-radius: 0.2em;
		cursor: pointer;
		border: 1px solid #3987e4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.buffetlabelNameOther {
		float: left;
		width: 80%;
		margin-right: 10%;
		margin-left: 10%;
		margin-bottom: 2%;
		height: 5vw;
		line-height: 5vw;
		font-size: 1.5vw;
		text-align: center;
		color: #333;
		border-radius: 0.2em;
		cursor: pointer;
		border: 1px solid #3987e4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background-color: #6db5f7;
		color: white;
	}

	.searchAndPrintAndbuffet {
		margin: auto 0% auto 20%;
		float: left;
		width: 30.5%;
		text-align: center;
		height: 4.5vw;
		font-size: 2vw;
		line-height: 4vw;
		color: #fff;
		font-weight: 600;
		background-color: #3987e4;
		background-size: 100% 100%;
		border: none;
		border-radius: 1vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.indexTable_Top_left {
		position: absolute;
		left: -0.5vw;
		top: -0.5vw;
		width: 2vw;
		height: 2vw;
		background-color: lightpink;
		border-radius: 1vw;
		text-align: center;
		line-height: 2vw;
		color: white;
		font-size: 1.5vw
	}
</style>
