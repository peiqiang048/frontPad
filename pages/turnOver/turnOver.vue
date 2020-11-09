<template>
	<view class="container" v-bind:style="{ height: windowHeight + 'px' }">
		<view class="menuLine">
			<!-- 返回上一页 -->
			<view class="menuReturn" id="return">
				<img src= "static/backArrow.png"  style="margin: 0;width: 100%;" @click = "returnHomePage()" ></image>
			</view>
			<!-- 売上标题 -->
			<view class="returnLable">
				<view>{{i18n.turnOver}}</view>
			</view>
		</view>
		<view class ="topSearch">
			<!-- 日数按钮 -->
			<view class="dayButton">
				<button  v-if="dayChooseSign === 1" disabled="true" id="dayId" class="table-pay-search-button" @click="changeDay()">{{i18n.day}}</button>
				<button  v-if="dayChooseSign !== 1" id="dayId" class="table-pay-search-button" @click="changeDay()">{{i18n.day}}</button>
			</view>
			<!-- 月数按钮 -->
			<view class="monthButton">
				<button class="table-pay-search-button" v-if="monthChooseSign === 1" disabled="true" @click="changeMonth()">{{i18n.month}}</button>
				<button class="table-pay-search-button" v-if="monthChooseSign !== 1" @click="changeMonth()">{{i18n.month}}</button>
			</view>
			<!-- 年数按钮 -->
			<view class="monthButton">
				<button class="table-pay-search-button" v-if="yearChooseSign === 1" disabled="true" @click="changeYear()">{{i18n.year}}</button>
				<button class="table-pay-search-button" v-if="yearChooseSign !== 1" @click="changeYear()">{{i18n.year}}</button>
			</view>
			<!-- 开始时间 -->
			<view class="startTimeSearch">
				<view class="textLabel">{{i18n.startTime}}</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="startDate" :start="getStartDate" :end="getEndDate"  @change="bindStartDateChange">
						<view class="uni-input">{{startDate}}</view>
					</picker>
				</view>
			</view>
			<!-- 结束时间 -->
			<view class="startTimeSearch">
				<view class="textLabel">{{i18n.endTime}}</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="endDate" :start="getStartDate" :end="getEndDate" @change="bindEndDateChange">
						<view class="uni-input">{{endDate}}</view>
					</picker>
				</view>
			</view>
			<!-- 支付方式 -->
			<view class="startTimeSearch">
				<view class="textLabel">{{i18n.paymentMethodTwo}}</view>
				<view class="uni-list-cell-db">
					<picker @change="paymentMethodChange" :range="paymentTypeList" :value="index" range-key="paymentName">
						<view>{{paymentTypeList[index].paymentName}}</view>
					</picker>
				</view>
			</view>
			<!-- 搜索按钮 -->
			<view class="searchButton" style="margin-left: 1%;">
				<button class="table-pay-search-button" style="background-color: #3987e4;color: white;" @click="searchData()">{{i18n.search}}</button>
			</view>
		</view>
		<view class="topSearch" style="height: 4%;margin-top: 1%;">
			<view style="width: 100%;height: 100%;float: left;">
				<!-- 订购总额 -->
				<!-- <view class="textLabelTwo">{{i18n.totalOrderAmount}}:</view> -->
				<!-- <view class="textLabelThree" v-if="totalOrderAmount !== null && totalOrderAmount !== undefined && totalOrderAmount !== ''"><view class="textLabelFour">¥{{totalOrderAmount |thousandthTwo}}</view></view> -->
				<!-- <view class="textLabelThree" v-if="totalOrderAmount === null || totalOrderAmount === undefined || totalOrderAmount === ''"><view class="textLabelFour">¥0</view></view> -->
				<!-- 折扣总额 -->
				<!-- <view class="textLabelTwo">{{i18n.totalDiscount}}:</view> -->
				<!-- <view class="textLabelThree" v-if="totalDiscount !== null && totalDiscount !== undefined && totalDiscount !== ''"><view class="textLabelFour">¥{{totalDiscount |thousandthTwo}}</view></view> -->
				<!-- <view class="textLabelThree" v-if="totalDiscount === null || totalDiscount === undefined || totalDiscount === ''"><view class="textLabelFour">¥0</view></view> -->
				<!-- 支付总额 -->
				<view class="textLabelTwo">{{i18n.totalPay}}:</view>
				<view class="textLabelThree" v-if="totalPay !== null && totalPay !== undefined && totalPay !== ''"><view class="textLabelFour">¥{{totalPay |thousandthTwo}}</view></view>
				<view class="textLabelThree" v-if="totalPay === null || totalPay === undefined || totalPay === ''"><view class="textLabelFour">¥0</view></view>
			</view>
		</view>
		<view class ="table-responsive" style="width: 94%;margin: 2% 3% 0% 3%;overflow-x: scroll;overflow-y: hidden;">
			<view class ="transferSecondTro">
				<!-- 序号 -->
				<view class ="transferSecondTho" style="width:7%;">No</view>
				<!-- 店舗名 -->
				<view class ="transferSecondTho" style="width:25%;">{{i18n.storeName}}</view>
				<!-- 支払時間 -->
				<view class ="transferSecondTho" style="width:30%;">{{i18n.paymentTime}}</view>
				<!-- 受付番号 -->
				<!-- <view class ="transferSecondTho" style="width:13%;">{{i18n.receivablesNo}}</view> -->
				<!-- 注文金額 -->
				<!-- <view class ="transferSecondTho" style="width:14%;">{{i18n.orderAmount}}</view> -->
				<!-- 割引金額 -->
				<!-- <view class ="transferSecondTho" style="width:10%;">{{i18n.discountAmount}}</view> -->
				<!-- 値引き率 -->
				<!-- <view class ="transferSecondTho" style="width:9%;">{{i18n.discountRate}}</view> -->
				<!-- 支払金額 -->
				<view class ="transferSecondTho" style="width:18%;">{{i18n.paymentAmount}}</view>
				<!-- 支払方式 -->
				<view class ="transferSecondTho" style="width:20%;">{{i18n.paymentMethodTwo}}</view>
				<!-- 会計者 -->
				<!-- <view class ="transferSecondTho" style="width:6%;">{{i18n.accountant}}</view> -->
			</view>
			<!-- 暂无数据 -->
			<view class="noData" v-if="amountSold.length === 0">
				{{i18n.orderListNoData}}
			</view>
			<view style="float:left;height:91%;width: 100%;overflow-y: auto;">
				<view v-if="amountSold.length > 0" class="transferSecondTrContento" v-for="(amount, index) in pageList" :key="amount.receivablesNo">
					<!-- 序号 -->
					<view class="fontPositionso" style="width:7%;">{{index + 1  + (page) * itemsPerPage }}</view>
					<!-- 店舗名 -->
					<view class="fontPositionso" style="width:25%;">{{amount.storeName}}</view>
					<!-- 支払時間 -->
					<view class="fontPositionso" style="width:30%;">{{amount.paymentTime}}</view>
					<!-- 受付番号 -->
					<!-- <view class="fontPositionso" style="width:13%;">{{amount.receivablesNo}}</view> -->
					<!-- 注文金額 -->
					<!-- <view v-if="amount.orderAmount !== null && amount.orderAmount !== undefined && amount.orderAmount !== ''" class="fontPositionso" style="width:14%;">¥{{amount.orderAmount |thousandth}}</view> -->
					<!-- <view v-if="amount.orderAmount === null || amount.orderAmount === undefined || amount.orderAmount === ''" class="fontPositionso" style="width:14%;">¥0</view> -->
					<!-- 割引金額 -->
					<!-- <view v-if="amount.discountAmount !== null && amount.discountAmount !== undefined && amount.discountAmount !== ''" class="fontPositionso" style="width:10%;">¥{{amount.discountAmount |thousandth}}</view> -->
					<!-- <view v-if="amount.discountAmount === null || amount.discountAmount === undefined || amount.discountAmount === ''" class="fontPositionso" style="width:10%;">¥0</view> -->
					<!-- 値引き率 -->
					<!-- <view class="fontPositionso" style=" width:9%;">{{amount.discountRate}}</view> -->
					<!-- 支払金額 -->
					<view v-if="amount.paymentAmount !== null && amount.paymentAmount !== undefined && amount.paymentAmount !== ''" class="fontPositionso" style="width:18%;">¥{{amount.paymentAmount |thousandth}}</view>
					<view v-if="amount.paymentAmount === null || amount.paymentAmount === undefined || amount.paymentAmount === ''" class="fontPositionso" style="width:18%;">¥0</view>
					<!-- 支払方式 -->
					<view class="fontPositionso" style="width:20%;">{{amount.paymentMethod}}</view>
					<!-- 会計者 -->
					<!-- <view class="fontPositionso" style="width:6%;">{{amount.accountant}}</view> -->
				</view>
			</view>
		</view>
		<!-- 分页 -->
		<view class="pagination">
			<ul class="pagination" id="orderInfoPageTwo">
				<!-- 首页 -->
				<li jp-role="first" jp-data="1">
					<a class="first" v-bind:style ="[{ 'pointer-events' : (page == 0) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 0) || (pages == 0)  ? 'rgb(170, 170, 170)' : '#337ab7'}]" style="cursor: default; border-bottom-left-radius: 4px;border-top-left-radius: 4px;"  @click="firstPage()">{{i18n.firstPage}}</a>
				</li>
				<!-- 前一页 -->
				<li jp-role="prev" jp-data="0">
					<a class="prev" v-bind:style ="[{ 'pointer-events' : (page == 0) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 0) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]" style="cursor: default;" @click="prevPage()"><i class="arrow arrow2"></i>{{i18n.prevPage}}</a>
				</li>
				<!-- 页数 -->
				<li jp-role="page" jp-data="1">
					<a class="page" style="background-color: #337ab7;color: #FFFFFF;" >{{page + 1}}</a>
				</li>
				<!-- 下一页 -->
				<li jp-role="next" jp-data="2">
					<a class="next" v-bind:style ="[{ 'pointer-events' : (page == pages - 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages - 1) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]" style="cursor: default;" @click="nextPage()" >{{i18n.nextPage}}<i class="arrow arrow3"></i></a>
				</li>
				<!-- 尾页 -->
				<li jp-role="last" jp-data="1">
					<a class="last" v-bind:style ="[{ 'pointer-events' : (page == pages - 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages - 1) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"  @click="lastPage()" style="cursor: default; border-bottom-right-radius: 4px;border-top-right-radius: 4px;">{{i18n.lastPage}}</a>
				</li>
			</ul>
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
		                <!-- <button style="display: inline-block; background-color: #adadad" @click="cancelButton">{{i18n.cancel}}</button> -->
		            <!-- 确认按钮 -->
		                <button style="display: inline-block; background-color: #3987e4" @click="confirmButton">{{i18n.confirm}}</button>
		        </view>
		    </view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/http.js';
	export default {
		computed: {
			// 引入多语言文件
			i18n () {
				return this.$t('message')  
			},
			// 日历最早时间
			getStartDate() {
				return this.getDate('start');
			},
			// 日历最晚时间
			getEndDate() {
				return this.getDate('end');
			}
		},
		props: {
			// 每页显示几条
			itemsPerPage: {
				type: Number,
				default: 10
			},
		},
		data() {
			const currentDate = this.getDate({
			      format: true
			})
			return {
				// 页面高度
				windowHeight: '',
				// 当前系统日期
				date: currentDate,
				// 开始时间
				startDate: currentDate,
				// 结束时间
				endDate: currentDate,
				// 支付方式
				paymentTypeList: [{paymentCode: '',paymentName: ''}],
				// 选中的支付方式的序号
				index: 0,
				// 选中的支付方式
				paymentMethod: '',
				// 订购总额
				totalOrderAmount: '',
				// 折扣总额
				totalDiscount: '',
				// 支付总额
				totalPay: '',
				// 売上的一览数据
				amountSold: [],
				// 当前页
				page: 0,
				// 可分页数
				pages: 1,
				// 分页后的数据
				pageList: [],
				// 弹框提示信息
				tipMessage: '',
				// 是否显示弹框标识
				showalert: false,
				// 支付方式名
				paymentName: '',
				// 支付方式编号
				paymentCode: '',
				// 日按钮是否是选中状态的标识，1为选中状态，0为未选中状态
				dayChooseSign: 1,
				// 月按钮是否是选中状态的标识，1为选中状态，0为未选中状态
				monthChooseSign: 0,
				// 年按钮是否是选中状态的标识，1为选中状态，0为未选中状态
				yearChooseSign: 0,
				// 壳上总件数
				soldOrderCount: ''
			}
		},
		onLoad: function (option) {
			const that = this;
			uni.getSystemInfo({
				success:function(res){
					that.windowHeight = res.windowHeight;
				}
			})
			// 获取売上的一览数据
			this.loadAmountSold();
			// 获取支付方式的数据
			this.loadPaymentTypeList();
		},
		methods: {
			// 点击返回按钮
			returnHomePage: function() {
				uni.reLaunch({
					url: '/pages/homePage/homePage'
				});
			},
			// 改变开始时间
			bindStartDateChange: function(e) {
				// 当用户自己选择时间的时候,取消年月日按钮的选中状态
				this.dayChooseSign = 0;
				this.monthChooseSign = 0;
				this.yearChooseSign = 0;
			    this.startDate = e.target.value
			},
			// 改变结束时间
			bindEndDateChange: function(e) {
				// 当用户自己选择时间的时候,取消年月日按钮的选中状态
				this.dayChooseSign = 0;
				this.monthChooseSign = 0;
				this.yearChooseSign = 0;
			    this.endDate = e.target.value
			},
			// 获取系统当前时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 查询数据
			searchData:function() {
				// 开始时间不可大于结束时间
				if (this.startDate > this.endDate) {
					this.showalert = true;
					this.tipMessage = this.i18n.startTimeCannotGreaterThanEndTime;
				} else {
					this.page = 0;
					this.loadAmountSold();
				}
			},
			// 获取支付方式的数据
			loadPaymentTypeList:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale
				};
				http.post('api/stpd/getPaymentTypeList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收支付方式的数据
							this.paymentTypeList =result.data.paymentTypeList;
							this.paymentTypeList.splice(0,0,{paymentCode: "",paymentName: '--' + this.i18n.select + '--'})
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 获取売上的一览数据
			loadAmountSold:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					startDate: this.startDate,
					endDate: this.endDate,
					paymentMethod: this.paymentMethod,
					page: this.page,
					pageCount: this.itemsPerPage
				};
				http.post('api/stpd/amountSold', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收营业额一览数据
							this.amountSold = result.data.amountSold;
							// 可分页数
							this.pages = Math.ceil(result.data.soldOrderCount/this.itemsPerPage);
							// 接收接收订购总额数据
							this.totalOrderAmount = result.data.totalOrderAmount;
							// 接收折扣总额数据
							this.totalDiscount = result.data.totalDiscount;
							// 接收支付总额数据
							this.totalPay = result.data.totalPay;
							// this.pageList =[];
							this.pageList = this.amountSold;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 点击日按钮
			changeDay:function() {
				// 设置日按钮为选中状态,年月按钮为未选中状态
				this.dayChooseSign = 1;
				this.monthChooseSign = 0;
				this.yearChooseSign = 0;
				// 开始日期
				this.startDate = this.date;
				// 结束日期
				this.endDate = this.date;
			},
			// 点击月按钮
			changeMonth:function() {
				// 设置月按钮为选中状态,年日按钮为未选中状态
				this.dayChooseSign = 0;
				this.monthChooseSign = 1;
				this.yearChooseSign = 0;
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				const lastDate = (new Date(year,month,0)).getDate();
				month = month > 9 ? month : '0' + month;
				// 开始日期
				this.startDate = year + '-' + month + '-' + '01';
				// 结束日期
				this.endDate =  year + '-' + month + '-' + lastDate;
			},
			// 点击年按钮
			changeYear:function() {
				// 设置年按钮为选中状态,月日按钮为未选中状态
				this.dayChooseSign = 0;
				this.monthChooseSign = 0;
				this.yearChooseSign = 1;
				// 获取系统当前年数
				const date = new Date();
				let year = date.getFullYear();
				// 开始日期
				this.startDate = year + '-' + '01' + '-' + '01';
				// 结束日期
				this.endDate =  year + '-' + '12' + '-' + '31';
			},
			// 选择支付方式下拉框
			paymentMethodChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.index = e.detail.value;
				// 选择的就餐方式
				if(this.paymentTypeList[this.index].paymentName === '--选择--'){
					this.paymentMethod = '';
				} else {
					this.paymentMethod = this.paymentTypeList[this.index].paymentCode;
				}
			},
			// 分页
			// dataPage:function(){
			// 	var startPage =  (this.page) * this.itemsPerPage;
			// 	var endPage =  startPage + this.itemsPerPage ;
			// 	this.pageList =[];
			// 	this.pageList = this.amountSold.slice(parseInt(startPage) , parseInt(endPage ));
			// },
			// 首页
			firstPage:function() {
				this.page = 0;
				this.loadAmountSold();
			},
			// 前一页
			prevPage:function() {
				this.page = this.page -1;
				this.loadAmountSold();
			},
			// 下一页
			nextPage:function() {//alert();
				this.page = this.page + 1;
				this.loadAmountSold();
			},
			// 尾页
			lastPage:function() {
				this.page = this.pages - 1;
				this.loadAmountSold();
			},
			// 确认按钮
			confirmButton:function() {
				this.showalert = false;		
			}
		},
		// 格式化
		filters: {
			// 数据格式,每三位一组,以逗号隔开
			thousandth: function(value) {
				var intPartFormat;
				if (value !== undefined && value !== null && value !== '' && !isNaN(value)) {
					var intPartFormat = (value+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
				} else {
					intPartFormat = '';
				}
				return intPartFormat;
			},
			// 数据格式,每三位一组,以逗号隔开，并四舍五入保留两位小数
			thousandthTwo: function(value) {
				var intPartFormat;
				// value = parseFloat(value).toFixed(2)
				if (value !== undefined && value !== null && value !== '' && !isNaN(value)) {
					var intPartFormat = (value+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
				} else {
					intPartFormat = '';
				}
				return intPartFormat;
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
	.menuLine {
	    background-color: #3987e4;
	    float: left;
	    width: 100%;
	    height: 9%;
		display: flex;
	}
	.returnLable {
	    color: #fff;
	    font-size: 2.5vw;
		display: flex;
		width: 10%;
		padding-left: 2%;
		display: flex;
		width: 10%;
		padding-left: 2%;
		margin: auto 0;
	}
	.menuReturn {
	    float: left;
	    height: 50%;
		margin: auto 0;
		display: flex;
		width: 4%;
		padding-left: 2%;
	}
	.topSearch {
        diaplay: flex;
		height: 10%;
		float: left;
		width: 100%;
	}
	.table-pay-search-button {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin: auto 1% auto auto;		
		font-size: 1.5vw;
		border-radius: 0.6vw;
		color: black;
		border: 0;
		white-space: nowrap;
		background-color: #d1d1d1;
	}
	.dayButton {
		margin: 2.1% 1% 2% 3%;
		float: left;
		width: 5%;
		height: 48%;
		align-items: center;
		justify-content: center;
		border-radius: 0.6vw;
	}
	.monthButton {
		margin: 2.1% 1% 2% 0%;
		float: left;
		width: 5%;
		height: 48%;
		align-items: center;
		justify-content: center;
		border-radius: 0.6vw;
	}
	.searchButton {
		margin: 1.8% 1% 2% 0%;
		float: left;
		width: 6%;
		height: 53%;
		align-items: center;
		justify-content: center;
	}
	.startTimeSearch {
		width: 23%;
		height: 100%;
		float: left;
		margin-right: 0%;
	}
	.textLabel {
		font-size: 1.7vw;
		float: left;
		width: 35%;
		height: 45%;
		margin-top: 9%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.textLabelTwo {
		margin-top: 0.2%;
		font-size: 1.5vw;
		float: left;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 10.5%;
		margin-left: 1%;
		color: black;
	}
	.textLabelThree {
		font-size: 1.5vw;
		float: left;
		width: 15%;
		height: 100%;
		display: flex;
		align-items: center;
		margin-left: 0%;
		/* border: 1px solid #caccce; */
	}
	.textLabelFour {
		margin-top: 2%;
		margin-left: 5%;
		align-items: center;
		justify-content: center;
	}
	.uni-list-cell-db {
		font-size: 1.7vw;
		border: solid 1px #3987e4;
		text-align: center;
		border-radius: 4px;
		white-space: nowrap;
		width: 60%;
		height: 48%;
		margin-top: 8%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.table-responsive {
		float: left;
		width: 100%;
		height: 60%;
	}
	.transferSecondTro {
		background-color: #4e759b;
		color: #fff;
		float:left;
		font-size: 1.5vw;
		display: flex;
		width: 100%;
		/* height: 8%; */
	}
	.transferSecondTho {
		border-right: 1px solid #fff;
		/* padding: 0.7vw 0; */
		display: inline;
		line-height: 3.5vw;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
/* 		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all; */
		white-space: nowrap;
		text-align: center;
	}
	.transferSecondTrContento {
		font-size: 1.5vw;
		color: #000;
		text-align: center;
		float: left;
		display: flex;
		padding: 1.1% 0;
		width: 100%;
	}
	.fontPositionso {
		margin: auto 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
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
	.pagination {
		width: auto;
		height: 8%;
		float: right;
		display: flex;
		align-items: center;
		border-radius: 4px;
		font-size: 2vw;
		bottom: 0;
		margin-left: -8%;
		margin-top: 1%;
	}
	.pagination > li {
		display: inline;
	}
	.pagination > li > a {
		position: relative;
		float: left;
		padding: 6px 12px;
		margin-left: -1px;
		line-height: 1.42857143;
		color: #337ab7;
		text-decoration: none;
		background-color: #fff;
		font-weight: 700;
	}
	.first {
		border-left: 1px solid #337ab7;
		border-top: 1px solid #337ab7;
		border-bottom: 1px solid #337ab7;
	}
	.prev {
		border-left: 1px solid #DDDDDD;
		border-top: 1px solid #337ab7;
		border-bottom: 1px solid #337ab7;
	}
	.page {
		border-top: 1px solid #337ab7;
		border-bottom: 1px solid #337ab7;
		border-left: 1px solid #337ab7;
		border-right: 1px solid #337ab7;
	}
	.next {
		border-right: 1px solid #DDDDDD;
		border-top: 1px solid #337ab7;
		border-bottom: 1px solid #337ab7;
	}
	.last {
		border-left: 1px solid #DDDDDD;
		border-top: 1px solid #337ab7;
		border-bottom: 1px solid #337ab7;
		border-right: 1px solid #337ab7;
	}
	uni-button[disabled]:not([type]), uni-button[disabled][type=default] {
	    color: white;
	    background-color: #3987e4;
	}
</style>
