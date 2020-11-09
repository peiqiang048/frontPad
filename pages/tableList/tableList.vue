<template>
	<view class="container">
		<!-- 左侧图标 -->
		<view class="tableLeft" :style="{ height: windowHeight + 'px' }">
			<view style="width: 100%;height: 80%;overflow-y: scroll;">
			<!-- 订单列表 -->
			<view class="commonModuleStyleTop"></view>
			<view class="leftViewImgStyle" @click="toOrderList">
				<image class="leftTop" :src="leftTop"></image>
				<view class="leftWord" style="">{{i18n.order}}</view>
			</view>
			<!-- 受付 -->
			<view v-if="this.smartPhonesAvailableFlag === '1'" class="commonModuleStyleTop"></view>
			<view v-if="this.smartPhonesAvailableFlag === '1'" class="leftViewImgStyle" @click="toAppointmentList">
				<image class="leftTop" :src="leftAppointment"></image>
				<view class="leftWord" style="">{{i18n.reception}}</view>
			</view>
			<!-- 配席 -->
			<view v-if="this.smartPhonesAvailableFlag === '1'" class="commonModuleStyleTop"></view>
			<view v-if="this.smartPhonesAvailableFlag === '1'" class="leftViewImgStyle" @click="toMatchingList">
				<image class="leftTop" :src="leftMatching"></image>
				<view class="leftWord" style="">{{i18n.arrangement}}</view>
			</view>
			<!-- 席解除 -->
			<view v-if="this.beforeAfterPaymentFlag === '01'" class="commonModuleStyleTop"></view>
			<view v-if="this.beforeAfterPaymentFlag === '01'" class="leftViewImgStyle" @click="toRemoveList">
				<image class="leftTop" :src="leftRemove"></image>
				<view class="leftWord" style="">{{i18n.seatRemoval}}</view>
			</view>
			</view>
			<!-- 返回机能画面 -->
			<view class="leftViewImgStyleBottom" @click="backToHome">
				<image class="pepolepic" :src="pepolepic"></image>
				<!-- <view class="leftViewFrontSize">{{userName}}</view> -->
			</view>
		</view>
		<view class="tableModuleStyle" :style="{ height: windowHeight + 'px' }">
			<view class="tableInfosTop">
				<!-- 店名 -->
				<view class="storeName">
					<view class="storeNameInfo">{{storeName}}</view>
				</view>
				<view class="tableStatus">
					<!-- 桌台颜色 -->
					<view class="tableStatusRight">
						<!-- 空台 -->
						<view class="geryCircle"></view>
						<view class="emptyPlatform" style="width: 8%;">{{i18n.emptyPlatform}}</view>
						<!-- 叫起 -->
						<view class="redCircle"></view>
						<view class="emptyPlatform" style="width: 8%;">{{i18n.wakeUp}}</view>
						<!-- 用餐 -->
						<view class="greenCircle"></view>
						<view class="emptyPlatform" style="width: 20%;">{{i18n.accountingPadOrder}}</view>
						<view class="yellowCircle"></view>
						<view class="emptyPlatform" style="width: 24%;">{{i18n.mobileUnconfirmedOrder}}</view>
						<view class="blueCircle"></view>
						<view class="emptyPlatform" style="width: 21%;">{{i18n.guestPadOrder}}</view>
						<!--客用スマホ席解除待ち-->
						<view class="purpleCircle"></view>
						<view class="emptyPlatform" style="width: 21%;">{{i18n.seatReleaseOrder}}</view>
					</view>
				</view>
			</view>
			<!-- 桌台信息 -->
			<view class="tableInfos">
				<block v-for="(item ,index) in tableList" :key="index">
					<view v-if="item.orderType === '01'" class="indexTableRed"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					<view v-else-if="item.orderType === '00'" class="indexTableGreen"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					<view v-else-if="item.orderType === '02' && item.orderStatus === '01'" class="indexTableYellow"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					<view v-else-if="item.orderType === '03'" class="indexTableBlue"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price| numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					<view v-else-if="item.orderType === '04' || (item.orderType === '02' && item.orderStatus === '02')" class="indexTableGreen"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price| numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					
					<view v-else-if="item.orderType === '05'" class="indexTablePurple"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{i18n.numberDiners}}：{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle">¥ {{item.price| numFilter}}</view> -->
						</view>
						<!-- 订单数 -->
						<!-- <view class="indexTable_Top">{{item.orderCount}}</view> -->
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
					
					
					<view v-else class="indexTableGrey"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top"></view>
							<!-- 金额 -->
							<!-- <view class="indexTableRight_Middle"></view> -->
						</view>
						<!-- 预约 -->
						<view v-if="0 < item.reservateCount" class="indexTable_Top_left">{{i18n.orderReservate}}</view>
					</view>
				</block>
			</view>
			<!-- 位置信息 -->
			<view class="tableInfosBottom">
				<scroll-view class="tableInfosScroll" scroll-x="true" @scroll="scroll">
					<view class="areaList" :style="{width:listWidth+'vw'}">
						<block v-for="(item, index) in areaTypeList" :key="item.areaId">
							<!-- 选中位置 -->
							<view v-if="Number(areaFirst) === Number(item.areaId)" class="bottomTabOther"  @click="selectArea(index)">
								<view class="bottomTabImg">
									<image class="bottomTabImgHome" :src="bottomTabImgHome"></image>
								</view>
								<view class="bottomTabFront">{{item.areaName}}</view>
							</view>
							<!-- 未选择中位置 -->
							<view v-else class="bottomTab"  @click="selectArea(index)">
								<view class="bottomTabImg">
									<image class="bottomTabImgHome" :src="bottomTabImgHome"></image>
								</view>
								<view class="bottomTabFront">{{item.areaName}}</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show = "showalert">
			<view class ="sweet-overlay"></view>
		    <view class="sweet-alert" >
		        <view class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
		        <!-- 提示信息 -->
		        <h2>{{tipMessage}}</h2>
		        <view class="sa-button-container">
					<!-- 取消按钮 -->
					<view v-if="isReservate === true && isHttpFail !== 1" class="sa-confirm-button-container">
					    <button style="display: inline-block; background-color: #adadad;" @click="cancelButton">{{i18n.cancell}}</button>
					</view>
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
	export default {
		// 引入多语言文件
		computed: {
			i18n () {
				return this.$t('message')  
			}
		}, 
		data() {
			return {
				// 图标路径
				leftTop: '../../static/leftTop.png',
				leftBell: '../../static/leftBell.png',
				pepolepic: '../../static/10-17ai-34.png',
				bottomTabImgHome: '../../static/bottomTabImgHome.png',
				leftAppointment: '../../static/appointment.png',
				leftMatching: '../../static/matching.png',
				leftRemove: '../../static/remove.png',
				// 位置信息
				areaTypeList: '',
				// 显示的位置总宽度
				listWidth: '',
				// 桌台信息
				tableList: '',
				// 位置areaId
				areaFirst: '',
				// 登录人账号
				userName: '',
				// 门店名称
				storeName: '',
				// 当前桌台位置
				nowAreaId: '',
				// 屏幕高度
				windowHeight: 0,
				// 弹框
				showalert: false,
				// 弹框提示
				tipMessage: '',
				// 请求失败
				isHttpFail: 0,
				// 预约提示
				isReservate: false,
				// 选择的桌子
				selectrdTableId: '',
				// 席解除表示標識　0１の場合表示、以外の場合、表示しない
				beforeAfterPaymentFlag: '',
				// 客用スマホ使用可能標識　１:可、0：不可
				smartPhonesAvailableFlag: ''
			}
		},
		onLoad: function (option) {

			// 获取屏幕高度
			const that = this;
			uni.getSystemInfo({
				success:function(res){
					that.windowHeight = res.windowHeight;
				}
			})
			// 当前桌台位置
			this.nowAreaId = option.nowAreaId;
			// 登录人信息
			this.userName = uni.getStorageSync('userName');
			// 席解除表示標識　0１の場合表示、以外の場合、表示しない
			this.beforeAfterPaymentFlag = uni.getStorageSync('beforeAfterPaymentFlag');
			this.smartPhonesAvailableFlag = uni.getStorageSync('smartPhonesAvailableFlag');
			// 数据信息
			const data = {
			 	storeId: getApp().globalData.storeId
			};
			// 获取位置信息
			http
			 	.post('api/stpd/getAreaTypeList', data)
			 	.then(result => {
					
					if (result.data.resultCode === '0000') {
						// 位置信息
						this.areaTypeList = result.data.areaTypeList;
						// 计算位置的横向宽度
						this.listWidth = 17 * this.areaTypeList.length;
						// 获取第一个位置areaId
						if(this.nowAreaId !== null && this.nowAreaId !== '' && this.nowAreaId !== undefined && this.nowAreaId !== 'undefined'){
							this.areaFirst = this.nowAreaId;
						} else {
							this.areaFirst = this.areaTypeList[0].areaId;
						}
						// 门店名称
						this.storeName = result.data.storeName;
						// 获取桌台信息
						this.loadTableData();
					}  else if (result.data.resultCode === '9001') {
						// 参数校验失败
						this.isHttpFail = 1;
						this.showalert = true;
						this.tipMessage = this.i18n.parameterVerificationFailed;
					} else {
						// 系统未知错误
						this.isHttpFail = 1;
						this.showalert = true;
						this.tipMessage = this.i18n.systemUnknownError;
					}
			 }).catch(() => {
				// 网络异常，请求失败
				this.isHttpFail = 1;
				this.showalert = true;
				this.tipMessage = this.i18n.networkExceptionRequestFailed;
			});
		},

		methods: {
			// 滚动触发
			scroll: function(e) {},
			// 切换位置
			selectArea: function(e) {
				this.areaFirst = this.areaTypeList[e].areaId
				this.loadTableData();
				
			},
			// 选择桌台
			selectTable: function(e) {
				// 有预约时
				if (0 < this.tableList[e].reservateCount) {
					this.isReservate = true;
					this.showalert = true;
					this.isHttpFail = 0;
					this.selectrdTableId = this.tableList[e].tableId;
					this.tipMessage = this.i18n.orderisHasReservate;
				} else {
					// 参数
					const item = {
						id: this.tableList[e].tableId,
						areaId: this.areaFirst
					};
					// 跳转桌台订单画面
					uni.reLaunch({
					    url: '/pages/table/table?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
			},
			// 跳转机能画面
			backToHome:function(obj){
				uni.reLaunch({
				    url: '/pages/homePage/homePage'
				});
			},
			// 跳转订单页面
			toOrderList:function(obj){
				uni.reLaunch({
				    url: '/pages/orderList/orderList'
				});
			},
			// 跳转受付页面
			toAppointmentList:function(obj){
				uni.reLaunch({
				    url: '/pages/appointment/appointment'
				});
			},
			// 跳转配席页面
			toMatchingList:function(obj){
				uni.reLaunch({
				    url: '/pages/matching/matching'
				});
			},
			// 跳转席解除页面
			toRemoveList: function(obj) {
				uni.reLaunch({
					url: '/pages/removeTable/removeTable'
				});
			},
			// 加载桌子信息
			loadTableData() {
				// 参数
				const dataArea = {
					storeId: getApp().globalData.storeId,
					areaId: this.areaFirst
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/getTableList', dataArea)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							this.tableList= '';
							// 桌台信息
							if (result.data.tableList === null || result.data.tableList === undefined ||
							result.data.tableList === 'undefined' || result.data.tableList === '' ||
							result.data.tableList === [] || result.data.tableList.length === 0) {
								this.tableList = '';
							} else {
								this.tableList = result.data.tableList;
							}
						}  else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
				 }).catch(() => {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
				if (this.isReservate) {
					// 参数
					const item = {
						id: this.selectrdTableId,
						areaId: this.areaFirst
					};
					// 跳转桌台订单画面
					uni.reLaunch({
					    url: '/pages/table/table?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
				this.isReservate = false;
				this.isHttpFail = 0;
			},
			// 点击弹框取消按钮
			cancelButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			},
		},
		// 过滤器
		filters:{
			// 钱数千分符
			numFilter (e) {
				let realVal = '';
				if (e !== undefined && e !== null && e !== '' && !isNaN(e)) {
					realVal = (e+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
				} else {
					realVal = e;
				}
				// 返回过滤后的结果
				return realVal
			}
		}
	}
</script>

<style>
	uni-page-body,#app {height: 100%;}
	.container {
		width: 100%;
	    height: 100%;
	    float: left;
	    overflow-y: hidden;
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
	.tableLeft {
		float: left;
	    height: 100%;
	    padding: 0;
	    background-color: #3987e4;
		width: 8.33%;
	}
	.commonModuleStyleTop {
		width: 100%;
	    height: 5%;	
	}
	.leftViewImgStyleOther {
		width: 100%;
		height: 9%;
		display: flex;
		background-color: #6db5f7;
	}
	.leftTop {
		margin: auto;
		width: 4.5vw;
		height: 4.5vw;
		display: flex;
	}
	.leftViewImgStyleBottom {
		position: absolute;
		width: 8.33%;
		height: 20%;
		bottom: 4%;
	}
	.pepolepic {
		width: 6vw;
		height: 6vw;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: 6vw;
	}
	.leftViewFrontSize {
		font-size: 1.5vw;
		text-align: center;
		color: white;	
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: 9vw;
	}
	.storeName {
	    height: 10%;
	    width: 35%;
	    float: left;
	    margin-right: 3%;
	    color: rgb(57, 135, 228);
	    font-size: 4vw;
	    margin-top: 2%;
	    margin-left: 1.5%;	
	}
	.storeNameInfo {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
	}
	.tableStatus {
	    height: 15%;
	    width: 56%;
	    float: right;
	    margin-right: 3%;	
	}
	.tableStatusLeft {
	    width: 42%;
	    height: 5vw;
	    margin-left: 5%;
	    margin-top: 7%;
	    background-color: #b5b5b9;
	    background-size: 100% 100%;
	    float: left;
	    position: relative;	
		font-size: 1.8vw;
		color: #fff;
		display: flex;
	}
	.tableStatusRight {
		width: 100%;
	    height: 5vw;
	    margin-left: 2%;
	    margin-top: 7%;
	    background-color: #807d7d;
	    background-size: 100% 100%;
	    float: left;
		display: flex;
		color: #fff;
	}
	.tableInfos {
		height: 65%;
	    max-height: 65%;
	    width: 100%;
		overflow-y: auto;	
	}
	.indexTableBlue {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgBlue.png);
		display: flex;
	}
	.indexTableGreen {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgGreen.png);
		display: flex;
	}
	
	.indexTablePurple {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgPurple.png);
		display: flex;
	}
	
	
	.indexTableGrey {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgGrey.png);
		display: flex;
	}
	.indexTableRed {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgRed.png);
		display: flex;
	}
	.indexTableYellow {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgYellow.png);
		display: flex;
	}
	.indexTable {
	    width: 23%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgGrey.png);
		display: flex;
	}
	.tableInfosTop {
		width: 100%;
		height: 15%;
	}
	.tableInfosBottom {
		width: 100%;
		height: 20%;
		display: flex;
	}
	.areaList {
		margin: auto 0;
		height: 7vw;
		float: left;
		overflow-x: auto;
		background-color: rgb(57, 135, 228);
	}
	.bottomTab {
		display: flex;
		float: left;
	    text-align: center;
	    width: 17vw;
	    height: 7vw;
	    font-weight: 800;
	    font-size: 2vw;
	}
	.bottomTabOther {
		display: flex;
		float: left;
	    text-align: center;
	    width: 17vw;
	    height: 7vw;
	    font-weight: 800;
	    font-size: 2vw;
		background-color: #4abcff;
		box-shadow: 3px 0px 14px #3333338f;
	}
	.bottomTabImg {
		float: left;
	    width: 30%;
	    height: 100%;	
		display: flex;
	}
	.bottomTabImgHome {
		width: 52%;
		height: 37%;
		margin: auto;
	}
	.bottomTabFront {
		float: left;
		width: 70%;
		margin: auto;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}
	.checkboxStyle {
		margin: auto 5%;
	}
	.emptyPlatform {
		font-size: 1.4vw;
		float: left;
		margin: auto auto auto 0;
		-webkit-line-clamp: 2;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.geryCircle {
		font-size: 1.1vw;
		float: left;
		width: 3%;
		height: 1.2vw;
		border-radius: 50%;
		background-color: #9c9c9c;
		margin: auto 1%;
	}
	.redCircle {
		font-size: 1.1vw;
		float: left;
		width: 1.3vw;
		height: 1.3vw;
		border-radius: 50%;
		background-color: #e61d61;
		margin: auto 1%;
	}
	.greenCircle {
		font-size: 1.1vw;
		float: left;
		width: 1.3vw;
		height: 1.3vw;
		border-radius: 50%;
		background-color: #00bad1;
		margin: auto 1%;
	}
	.yellowCircle {
		font-size: 1.1vw;
		float: left;
		width: 1.3vw;
		height: 1.3vw;
		border-radius: 50%;
		background-color: #F9C84E;
		margin: auto 1%;
	}
	.blueCircle {
		font-size: 1.1vw;
		float: left;
		width: 1.3vw;
		height: 1.3vw;
		border-radius: 50%;
		background-color: #6688F2;
		margin: auto 1%;
	}
	
	.purpleCircle {
		font-size: 1.1vw;
		float: left;
		width: 1.3vw;
		height: 1.3vw;
		border-radius: 50%;
		background-color: #A52A2A;
		margin: auto 1%;
	}
	.indexTableLeft {
		width: 41%;
		float: left;
		font-size: 1.6vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: auto;
		text-align: center;
		color: #fff;
	}
	.indexTableRight {
		width: 59%;
	    float: left;
	    color: black;
		display: flex;
	}
	.indexTableRight_Top {
		position: absolute;
	    top: 2.9vw;
	    right: 1vw;
	    font-size: 1.6vw;
	    font-weight: 500;	
	}
	.indexTableRight_Middle {
		font-size: 2vw;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: auto;
	}
	.indexTable_Top {
	    position: absolute;
	    right: -0.5vw;
	    top: -0.5vw;
	    width: 2vw;
	    height: 2vw;
	    background-color: red;
	    border-radius: 1vw;
	    text-align: center;
	    line-height: 2vw;
	    color: white;
	    font-size: 1.5vw	
	}
	.tableInfosScroll {
		width: 100%;
		margin: auto;
		width: 100%;
	}
	.leftWord {
		font-size: 1.7vw;
		color:#fff;
		text-align: center;	
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
