<template>
	<view class="container">
		<view class="tableLeftCommon" :style="{ height: windowHeight + 'px' }">
			<view class="hallTopFirst">
				<view v-if="tableIdNotEmpty === true && this.orderStatus !== '06'" class="tableHallTop">
					<!-- 桌名 -->
					<view class="tableHallTopLineOne">{{tableName}}</view>
					<view class="tableHallTopLineSecond">
						<view class="tableHallTopLineSecondTop">
							<view class="tableSeat">
								<image class="tableSeatpic" :src="tableSeatpic"></image>
								<!-- 顾客数/桌位数 -->
								<view class="tableSeatCount">{{customerCount}}/{{tableSeatCount}}</view>
							</view>
							<!-- 位置名称 -->
							<view class="areaType">{{areaTypeName}}</view>
						</view>
						<view class="tableHallTopLineSecondTop">
							<!-- 订单数 -->
							<view class="orderCount">
								<image class="orderCountpic" :src="orderCountpic"></image>
								<view class="orderCountNumber">{{orderCount}}</view>
							</view>
							<!-- 座位数 -->
							<view class="orderCount">
								<image class="orderCountpic" :src="orderPeoplepic"></image>
								<view class="orderCountNumber">{{tableSeatCount}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tableIdNotEmpty === false && this.orderStatus !== '06'" class="tableHallTop">
					<image class="packpic" :src="packpic"></image>
					<view class="packpicText">{{i18n.takeAway}}</view>
				</view>	
				<!-- 外卖 -->
				<view v-if="this.orderStatus === '06'" class="tableHallTop">
					<image class="packpic" :src="packpic"></image>
					<view class="packpicText">{{i18n.takeOut}}</view>
				</view>	
			</view>
			<!-- 订单信息 -->
			<!-- <view v-if="this.orderStatus !== '03' && this.tableIdNotEmpty === true && this.orderStatus !== '06'" class="tableHallBottom">
				<view class="orderList">
					<view style="display: flex;float: left;height: 100%;">
						<block v-for="(item ,index) in orderList" :key="index">
							<view class="hallOrderImgs">
								订单总价
								<view class="hallOrderImgsTop">¥{{item.orderPrice | numFilter}}</view>
								手机订单
								<view v-if="item.orderType === '02' && item.orderStatus === '01'" class="hallOrderImgsBottomYellow"></view>
								pad订单
								<view v-else-if="item.orderType === '03'" class="hallOrderImgsBottomBlue"></view>
								前台订单
								<view v-else-if="item.orderType === '04' || (item.orderType === '02' && item.orderStatus === '02')" class="hallOrderImgsBottomGreen"></view>
							</view>
						</block>
					</view>
				</view>
			</view> -->
			<view class="hallBottomFirst" :style="{ height: itemHeight + 'px' }">
				<view class="itemMessage">
					<view class="hallGoodsInfo">{{i18n.commodityInformation}}</view>
				</view>
				<!-- 商品信息 -->
				<view class="itemDetail">
					<view class="itemDetailInfo">
						<view v-if="this.orderStatus !== '06'" class="hallLis">
							<block v-for="(item ,index) in itemList" :key="index">
								<!-- 回数 -->
								<view class="itemNumberTime">{{index + 1}}{{i18n.numberOfTimes}}</view>
								<view class="hallLi"  v-for="(itemOrderNumber ,indexOne) in item.orderNumber" :key="indexOne">
									<view class="hallFood">
										<!-- 商品名称,规格信息 -->
										<view v-if="itemOrderNumber.itemOption !== null && itemOrderNumber.itemOption !== ''" class="hallFoodName">
											<view class="hallNameOther">{{itemOrderNumber.itemName}}</view>
											<view class="attributeActive">{{itemOrderNumber.itemOption}}</view>
										</view>
										<view v-else class="hallFoodName">
											<view class="hallName">{{itemOrderNumber.itemName}}</view>
										</view>
									</view>
									<!-- 商品数量,价钱 -->
									<view class="hallPriceAndAmount">
										<view class="hallAmount">
											<view style="float: left;width: 50%;">× {{itemOrderNumber.itemCount}}</view>
											<view v-if="itemOrderNumber.itemSureStatus === '01'" style="font-size: 1vw;color: #888;">({{i18n.unConfrim}})</view>
											<view v-else style="font-size: 1vw;color: #888;">({{i18n.confirmed}})</view>
										</view>
										<view v-if="itemOrderNumber.itemClassification === 0 || itemOrderNumber.itemClassification === '0'" class="hallGoodPrice">¥ {{itemOrderNumber.itemPrice | numFilter}}</view>
										<view v-else class="hallGoodPrice">¥ -{{itemOrderNumber.itemPrice | numFilter}}</view>
									</view>
								</view>
							</block>
						</view>
						<view v-if="this.orderStatus === '06'" class="hallLis">
							<block v-for="(item ,index) in itemList" :key="index">
								<view class="hallLi">
									<view class="hallFood">
										<!-- 商品名称,规格信息 -->
										<view v-if="item.itemOption !== null && item.itemOption !== ''" class="hallFoodName">
											<view class="hallNameOther">{{item.itemName}}</view>
											<view class="attributeActive">{{item.itemOption}}</view>
										</view>
										<view v-else class="hallFoodName">
											<view class="hallName">{{item.itemName}}</view>
										</view>
									</view>
									<!-- 商品数量,价钱 -->
									<view class="hallPriceAndAmount">
										<view class="hallAmount">
											<view style="float: left;width: 50%;">× {{item.itemCount}}</view>
										</view>
										<view class="hallGoodPrice">¥ {{item.itemCount*item.itemPrice | numFilter}}</view>
									</view>
								</view>
							</block>
						</view>
						<view class="hallListBottom">
							<!-- 返回 -->
							<view class="backDetailButton" @click="backDetailButton">{{i18n.returns}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单详细信息 -->
		<view class="foodTableinfo" :style="{ height: windowHeight + 'px' }">
			<view style="height: 10%;background-color: rgb(57, 135, 228);width: 100%;">
			</view>
			<view style="overflow-y: auto;width: 100%;" :style="{ height: windowHeight*0.9 + 'px' }">
			<!-- 受付时间 -->
			<view class="detailLine">
				<view class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.timeOfPayment}}:</view>
				<view class="detailLineRight">{{receptionTime}}</view>
			</view>
			<!-- 受付番号 -->
			<view class="detailLine">
				<view class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.receivablesNo}}:</view>
				<view class="detailLineRight">{{receptionNo}}</view>
			</view>
			<!-- 受付Id -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.paidId}}:</view>
				<view class="detailLineRight">{{receivablesId}}</view>
			</view>
			<!-- テーブル -->
			<view v-if="this.orderStatus !== '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.tableName}}:</view>
				<view class="detailLineRight">{{tableName}}</view>
			</view>
			<!-- 小計 -->
			<view class="detailLine">
				<view v-if="this.orderStatus !== '06'" class="detailLineColor" style="background-color: #6688F2;"></view>
				<view v-if="this.orderStatus === '06'" class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.orderAccount.subtotal}}:</view>
				<view class="detailLineRight">{{subtotal | numFilter}}</view>
			</view>
			
			<!-- 外税 -->
			<view class="detailLine">
				<view v-if="this.orderStatus !== '06'" class="detailLineColor" style="background-color: #00afc6;"></view>
				<view v-if="this.orderStatus === '06'" class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.orderAccount.foreignTax}}:</view>
				<view class="detailLineRight">{{foreignTax | numFilter}}</view>
			</view>
			
			<!-- 合計 -->
			<view class="detailLine">
				<view v-if="this.orderStatus !== '06'" class="detailLineColor" style="background-color: #00afc6;"></view>
				<view v-if="this.orderStatus === '06'" class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.orderAccount.total}}:</view>
				<view class="detailLineRight">{{total | numFilter}}</view>
			</view>
			<!-- 割引 -->
			<view v-if="this.orderStatus !== '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.orderDiscountRate}}:</view>
				<view class="detailLineRight">{{discountTax}}</view>
			</view>
			<!-- 値引 -->
			<view v-if="this.orderStatus !== '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.orderDiscountMoney}}:</view>
				<view class="detailLineRight">{{priceDiscountAmount | numFilter}}</view>
			</view>
			<!-- 支払金額 -->
			<view class="detailLine">
				<view v-if="this.orderStatus !== '06'" class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view v-if="this.orderStatus === '06'" class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.paymentAmount}}:</view>
				<view class="detailLineRight">{{paymentAmount | numFilter}}</view>
			</view>
			<!-- 支払方式 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view v-if="this.orderStatus !== '06'" class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view v-if="this.orderStatus === '06'" class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.paymentMethod}}:</view>
				<view class="detailLineRight">{{paymentMethod}}</view>
			</view>
			<!-- 姓名 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.name}}:</view>
				<view class="detailLineRight">{{customerName}}</view>
			</view>
			<!-- 电话 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.phoneNumber}}:</view>
				<view class="detailLineRight">{{telNumber}}</view>
			</view>
			<!-- 时间 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.takeOutTime}}:</view>
				<view class="detailLineRight">{{deliveryTime}}</view>
			</view>
			<!-- 邮箱 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.email}}:</view>
				<view class="detailLineRight">{{mailAddress}}</view>
			</view>
			<!-- 地址 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.address}}:</view>
				<view class="detailLineRight">{{address}}</view>
			</view>
			<!-- 状态 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #00afc6;"></view>
				<view class="detailLineLeft">{{i18n.state}}:</view>
				<view class="detailLineRight">{{status}}</view>
			</view>
			<!-- 出前仕方 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
				<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.diningStyle}}:</view>
				<view class="detailLineRight">{{deliveryTypeFlag}}</view>
			</view>
			<!-- 配達費 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
			<view class="detailLineColor" style="background-color: #F9C84E;"></view>
				<view class="detailLineLeft">{{i18n.cateringCharge}}:</view>
				<view class="detailLineRight">{{cateringCharge}}</view>
			</view>
			<!-- 要望 -->
			<view v-if="this.orderStatus === '06'" class="detailLine">
			<view class="detailLineColor" style="background-color: #6688F2;"></view>
				<view class="detailLineLeft">{{i18n.comment}}:</view>
				<view class="detailLineRight">{{comment}}</view>
			</view>
			<!-- <view class="detailLine" style="height: 7.25%;">
			</view> -->
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
		            <!-- 确认按钮 -->
		            <view class="sa-confirm-button-container">
		                <button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
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
				// 受付ID
				receivablesId: '',
				// 桌号
				tableId: '',
				// エリア名
				areaTypeName: '',
				// 桌位数
				tableSeatCount: '',
				// 顾客数
				customerCount: '',
				// 订单数
				orderCount: '',
				// 订单商品
				itemList: [],
				// 订单状态
				orderStatus: '',
				// 桌台订单
				orderList: [],
				// 图片路径
				tableSeatpic: '../../static/tableSeatpic.png',
				orderCountpic: '../../static/orderCountpic.png',
				orderPeoplepic: '../../static/orderPeoplepic.png',
				quanpic: '../../static/quan.png',
				quanYellowpic: '../../static/quanYellow.png',
				packpic: '../../static/pack.png',
				// 受付時間
				receptionTime: '',
				// 受付番号
				receptionNo: '',
				// テーブル名
				tableName: '',
				// 小計
				subtotal: '',
				// 外税
				foreignTax: '',
				// 配達費
				cateringCharge: '',
				// 合計
				total: '',
				// 割引率
				discountTax: '',
				// 値引額
				priceDiscountAmount: '',
				// 支払金額
				paymentAmount: '',
				// 弹框
				showalert: false,
				// 弹框提示
				tipMessage: '',
				// 商品信息view块的高度
				itemHeight: 0,
				// 就餐方式
				selectEatMay: '',
				// 支払方式
				paymentMethod: '',
				// 姓名
				customerName: '',
				// 电话号码
				telNumber: '',
				// 配送时间
				deliveryTime: '',
				// 电子邮箱
				mailAddress: '',
				// 地址
				address: '',
				// 状态
				status: '',
				// 配送方式
				deliveryTypeFlag: '',
				// 要望
				comment: '',
				// 外卖一览页面选中的状态的Id
				statusYiLan: 0,
				// 外卖一览页面选中的送餐方式的Id
				deliveryTypeFlagYiLan: 0
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
			const item = JSON.parse(decodeURIComponent(option.item));
			// 订单状态
			this.orderStatus = item.orderStatus;
			// 当前页
			this.currentPage = item.currentPage;
			// 开始时间
			this.startOrderTime = item.startOrderTime;
			// 结束时间
			this.endOrderTime = item.endOrderTime;
			// 受付ID
			this.receivablesId = item.receivablesId;
			// 桌号
			this.tableId = item.tableId;
			// 就餐方式
			this.selectEatMay = item.selectEatMay;
			// 外卖一览页面选中的状态的Id
			this.statusYiLan = item.status;
			// 外卖一览页面选中的送餐方式的Id
			this.deliveryTypeFlagYiLan = item.deliveryTypeFlag;
			// 外卖一览页面选中的状态的Id
			this.statusYiLan = item.status;
			// 外卖一览页面选中的送餐方式的Id
			this.deliveryTypeFlagYiLan = item.deliveryTypeFlag;
			
			// 判断桌号是否为空（空代表带走，不为空代表店内）
			if (this.tableId !== null && this.tableId !== undefined && this.tableId !== '') {
				this.tableIdNotEmpty = true;
				// 加载桌子信息
				this.loadTableData(this.tableId);
				// 加载订单商品信息
				this.loadOrderItemListData(this.receivablesId);
			} else {
				if(this.orderStatus !== '06') {
				this.tableIdNotEmpty = false;
				// 加载订单商品信息
				this.loadOrderItemListData(this.receivablesId);
				} else {
					this.tableIdNotEmpty = false;
					// 加载外卖订单详细信息
					this.getDeliveryOrderDetailInfo(this.receivablesId);
				}
			}
			// 判断是不是已结算订单和带走订单
			//if (this.orderStatus === '03' || this.tableIdNotEmpty === false) {
				this.itemHeight = this.windowHeight * 0.9;
			//} else {
			//	this.itemHeight = this.windowHeight * 0.8;
			//}
			// 判断是不是外卖
			if (this.orderStatus === '06') {
				this.itemHeight = this.windowHeight * 0.9;
			}
		},
		methods: {
			// 加载桌子信息
			loadTableData(tableId) {
				// 参数
				const dataTable = {
					storeId: getApp().globalData.storeId,
					tableId: tableId
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/getTable', dataTable)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// エリア名
							this.areaTypeName = result.data.areaTypeName;
							// 桌位数
							this.tableSeatCount = result.data.tableSeatCount;
							// 顾客数
							this.customerCount = result.data.customerCount;
							// 订单数
							this.orderCount = result.data.orderCount;
							// 桌台订单
							if (result.data.orderList !== null || result.data.orderList !== undefined ||
							result.data.orderList !== 'undefined' || result.data.orderList.length !== 0) {
								// 桌台信息
								this.orderList = result.data.orderList;
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
				 }).catch(() => {
					// 网络异常，请求失败
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 加载订单商品信息
			loadOrderItemListData(receivablesId) {
				// 参数
				const dataTable = {
					storeId: getApp().globalData.storeId,
					receivablesId: receivablesId,
					languages: this._i18n.locale
				};
				// 获取订单商品信息
				http
				 	.post('api/stpd/getOrderDetail', dataTable)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 受付時間
							this.receptionTime = result.data.receptionTime;
							// 受付番号
							this.receptionNo = result.data.receptionNo;
							// 桌名
							this.tableName = result.data.tableName;
							// 小計
							this.subtotal = result.data.subtotal;
							// 外税
							this.foreignTax = result.data.foreignTax;
							// 合計
							this.total = result.data.total;
							// 割引率
							this.discountTax = result.data.discountTax;
							// 値引額
							this.priceDiscountAmount = result.data.priceDiscountAmount;
							// 支払金額
							this.paymentAmount = result.data.paymentAmount;
							// 订单商品
							this.itemList = result.data.itemList;
						}else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						}else {
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
			// 加载外卖订单详细信息
			getDeliveryOrderDetailInfo(receivablesId) {
				// 参数
				const dataTable = {
					storeId: getApp().globalData.storeId,
					receivablesId: receivablesId,
					// 语言
					languages: this._i18n.locale
				};
				// 获取卖订单详细信息
				http
					.post('api/stpd/getDeliveryOrderDetailInfo', dataTable)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 受付時間
							this.receptionTime = result.data.receptionTime;
							// 受付番号
							this.receptionNo = result.data.receptionNo;
							// 受付Id
							this.receivablesId = result.data.receivablesId;
							// 小計
							this.subtotal = result.data.orderAmount;
							// 外税
							this.foreignTax = result.data.foreignTax;
							// 配達費
							this.cateringCharge = result.data.cateringCharge;
							// 合計
							this.total = result.data.totalAmount;
							// 支払金額
							this.paymentAmount = result.data.paymentAmount;
							// 支払方式
							this.paymentMethod = result.data.paymentMethod;
							// 姓名
							this.customerName = result.data.customerName;
							// 电话号码
							this.telNumber = result.data.telNumber;
							// 配送时间
							this.deliveryTime = result.data.deliveryTime;
							// 电子邮箱
							this.mailAddress = result.data.mailAddress;
							// 地址
							this.address = result.data.address;
							// 状态
							this.status = result.data.status;
							// 配送方式
							this.deliveryTypeFlag = result.data.deliveryTypeFlag;
							// 要望
							this.comment = result.data.comment;
							// 订单商品
							this.itemList = result.data.itemList;
						}else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						}else {
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
			// 返回订单一览画面
			backDetailButton() {
				const item = {
					orderStatus: this.orderStatus,
					currentPage: this.currentPage,
					startOrderTime: this.startOrderTime,
					endOrderTime: this.endOrderTime,
					selectEatMay: this.selectEatMay,
					status: this.statusYiLan,
					deliveryTypeFlag: this.deliveryTypeFlagYiLan
				};
				uni.reLaunch({
				    url: '/pages/orderList/orderList?item=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			},
		},
		// 千分符过滤器
		filters:{
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
		overflow: hidden;
	}
	.tableLeftCommon {
		height: 100%;
		width: 33.33%;
		padding: 0;
		box-shadow: 5px 0 7px 3px #ddd;
		overflow-y: hidden;
		overflow-x: hidden;
		color: white;
		font-weight: 700;
		float: left;
	}
	.hallTopFirst {
		height: 10%;
		width: 100%;
	}
	.hallBottomFirst {
		float: left;
		height: 80%;
		width: 100%;
	}
	.tableHallTop {
		background-color: rgb(57, 135, 228);
		height: 100%;
		float: left;
		width: 100%;
		display: flex;
	}
	.tableHallBottom {
	    float: left;
	    height: 10%;
	    width: 100%;
	    background-color: #4abcff;
	}
	.tableHallTopLineOne {
	    margin: 4% 2% 4% 3%;
	    float: left;
	    width: 32%;
	    font-size: 1.7vw;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.tableHallTopLineSecond {
		width: 59%;
		float: left;
		text-align: left;
		font-size: 1.3vw;
		margin: 2% 2%;
	}
	.tableHallTopLineSecondTop {
		width: 100%;
		height: 50%;
		display: flex;
	}
	.tableSeat {
		margin: auto;
		width: 37%;
		float: left;
		font-size: 1.2vw;
	}
	.areaType {
		margin: auto 1%;
	    width: 63%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;	
	}
	.orderCount {
	    width: 37%;
		float: left;
		font-size: 1.2vw;
		margin: auto 0%;
	}
	.orderHour {
		width:46%;
		float: left;
		font-size: 1.2vw;
	}
	.orderCountpic {
		float: left;
		width: 2vw;
		height: 2vw;
		vertical-align: middle;
	}
	.orderCountNumber {
		float: left;
	}
	.orderList {
		float: left;
		height: 100%;
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		display: block;
	}
	.hallOrderImgs {
	    width: 5vw;
	    height: 80%;
	    background-color: #fff;
	    margin: auto 5px;
	    float: left;
	}
	.hallOrderSpace {
		font-weight: 100;
		font-size: 5vw;
		width: 5vw;
		height: 77%;
		margin: auto 5px;
		float: left;
		border: 1px solid #ffffff;
		color: #ffffff;
		display: flex;
	}
	.hallOrderImgsTop {
	    width: 100%;
	    height: 50%;
	    color: #000;
	    text-align: center;
	    font-size: 1.2vw;
	    padding-top: 10%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.hallOrderImgsBottomBlue {
		width: 100%;
	    height: 40%;
	    background-color: #6688F2;
	    color: #fff;
	    text-align: center;	
	}
	.hallOrderImgsBottomGreen {
		width: 100%;
	    height: 40%;
	    background-color: #00afc6;
	    color: #fff;
	    text-align: center;	
	}
	.hallOrderImgsBottomRed {
		width: 100%;
	    height: 40%;
	    background-color: #e71d62;
	    color: #fff;
	    text-align: center;	
	}
	.hallOrderImgsBottomYellow {
		width: 100%;
	    height: 40%;
	    background-color: #F9C84E;
	    color: #fff;
	    text-align: center;	
	}
	.jiahaopic {
		height: 40%;
		margin: 33%;
	}
	.itemMessage {
	    float: left;
	    width: 100%;
	    height: 9%;
	    color: #333;
	    font-size: 1.8vw;	
	}
	.itemDetail {
		float: left;
		width: 100%;
		height: 91%;
	}
	.hallGoodsInfo {
		display: flex;
		align-items: center;
		justify-content: center;
	    float: left;
	    width: 100%;
	    height: 100%;
	    font-size: 1.6vw;
	    text-align: center;	
		border-bottom: 2px solid #3987e4;
	}
	.itemDetailInfo {
		float: left;
		width: 100%;
		height: 100%;
	}
	.hallTables {
		width: 100%;
	    height: 9%;
	    padding: 0;
		float: left;
		border-bottom: 1px solid #7D809A;
	}
	.hallTablesInfo {
		margin: auto 3%;
		float: left;
	    width: 94%;
	    color: #333;
	    font-weight: 600;
	    height: 100%;
	    font-size: 1.5vw;
		display: flex;
	}
	.issuedOrder {
		float: left;
	    width: 70%;	
		margin: auto;
	}
	.typelRrenNumber {
		float: right;
	    width: 30%;
	    padding-top: 0%;
		margin: auto;
	}
	.quanpic {
		float: left;
		width: 2vw;
	    height: 2vw;
	}
	.typelRrenNumberInfo {
	    float: right;
	    max-width: 100%;
	    font-size: 1vw;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;	
	}
	.hallLis {
	    width: 100%;
	    max-height: 80%;
	    height: 80%;
	    overflow-y: auto;
	    margin-top: 3%;
	}
	.hallLi {
		float: left;
	    width: 90%;
	    color: #333;
	    padding-left: 5%;
	    padding-right: 5%;
	    height: 5vw;
	    font-size: 1.5vw;
		line-height: 5vw;
	}
	.hallLiOther {
		float: left;
		width: 90%;
		color: #333;
		padding-left: 5%;
		padding-right: 5%;
		height: 5vw;
		font-size: 1.5vw;
		line-height: 5vw;
		background-color: #6db5f7;
		color: #fff;
	}
	.hallFood {
		float: left;
	    width: 70%;	
	}
	.hallPriceAndAmount {
		float: right;
	    width: 30%;
	    height: 5vw;
		line-height: 2vw;
	}
	.hallFoodQuan {
		width: 2.5vw;
	    float: left;
	    height: 5vw;
		line-height: 6vw;
	}
	.hallFoodQuanpic {
		width: 2vw;
	    height: 2vw;
	    margin-right: 0.5vw;	
	}
	.hallFoodName {
		float: left;
	    width: 86%;
	    height: 5vw;	
	}
	.hallName {
	    float: left;
	    width: 100%;
	    height: 5vw;
	    font-size: 1.5vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.hallAmount {
		text-align: right;
	    font-size: 1.5vw;
	    height: 2vw;
		margin-top: 0.5vw;
	}
	.hallGoodPrice {
		font-size: 1.5vw;
	    height: 2vw;
	    text-align: right;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
		margin-bottom: 0.5vw;
	}
	.hallListBottom {
		height: 17%;
		width: 100%;
		display: flex;
	}
	.tableSeatpic {
		width: 30%;
		height: 2vw;
		float: left;
	}
	.tableSeatCount {
		width: 70%;
		float: left;
	}
	.attributeActive {
		float: left;
	    width: 100%;
	    height: 1.5vw;
	    font-size: 1.2vw;
	    line-height: 1.5vw;	
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.hallNameOther {
		float: left;
	    width: 100%;
	    height: 3vw;
	    font-size: 1.5vw;
	    line-height: 4vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.backDetailButton {
	    float: left;
	    width: 85%;
		margin: auto;
	    text-align: center;
	    height: 4vw;
	    font-size: 1.6vw;
	    line-height: 4vw;
	    color: #fff;
	    font-weight: 600;
	    background-color: #3987e4;
	    background-size: 100% 100%;
	    border: none;	
	}
	.itemNumberTime {
		color: #333;
	    height: 3vw;
	    font-size: 1.5vw;
	    line-height: 3vw;
	    border-bottom: 1px solid #ccc;
	    width: 96%;
	    margin-left: 2%;
	    margin-right: 2%;
		float: left;
	}
	.foodTableinfo {
	    color: white;
	    float: left;
	    padding-right: 0;
	    width: 64.67%;
	    padding: 0% 0% 0% 2%;
	}
	.detailLine {
		width: 50%;
		color: #000000;
		height: 10.5%;
		float: left;
		margin-bottom: 3%;
	}
	.detailLineLeft {
	    font-size: 1.7vw;
	    width: 93%;
	    float: left;
	    font-weight: 600;
	    height: 50%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    bottom: 0;
		margin-left: 4%;
		display: flex;
		align-items: center;
	}
	.detailLineRight {
	    font-size: 1.7vw;
	    width: 93%;
	    float: left;
	    height: 50%;
		margin-left: 4%;
		display: flex;
		align-items: center;
	}
	.detailLineColor {
		width: 3%;
		height: 100%;
		float: left;
	}
	.packpic {
	    margin: auto;
		width: 3vw;
		height: 2.5vw;
	}
	.packpicText {
	    font-size: 2vw;
	    margin: auto;
		width: 85%;
	}
</style>
