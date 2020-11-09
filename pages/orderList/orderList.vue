<template>
	<view class="container" v-bind:style="{ height: windowHeight + 'px' }">
		<!-- 引入组件-->
		<leftMenu :current="currentTabIndex" @click="tabClick"></leftMenu>
		<view class="orderPage">
			<view class="orderList" id="transferLeftOut">
				<view style="width:100%;height:4%;"></view>
				<!-- 订单查询 -->
				<view class="transferLeftFront" style="background-color: rgba(40,40,52,0.6);">
					<view class="fontPosition">{{i18n.orderSearch}}</view>
				</view>
				<!-- 未确认 -->
				<view class="transferLeftFronts" id="jinxingzhong" style="border-radius: 0px;">
					<view v-bind:class="[ state == '01' ? 'commonActives' : 'fontPosition']" @click="changeList('01')">{{i18n.unConfrim}}</view>
				</view>
				<!-- 已结算 -->
				<view class="transferLeftFronts" style="border-radius: 0px;">
					<view v-bind:class="[ state == '03' ? 'commonActives' : 'fontPosition']" @click="changeList('03')">{{i18n.orderComplete}}</view>
				</view>
				<!-- 未结算 -->
				<view class="transferLeftFronts" style="border-radius: 0px;">
					<view v-bind:class="[ state == '02' ? 'commonActives' : 'fontPosition']" @click="changeList('02')">{{i18n.orderUnComplete}}</view>
				</view>
				<!-- 外卖 06为外卖，07为外卖的编辑-->
				<view v-if="this.deliveryDisplayFlag === '1'" class="transferLeftFronts" style="border-radius: 0px;">
					<view v-bind:class="[( state == '06'|| state ==  '07') ? 'commonActives' : 'fontPosition']" @click="changeList('06')">{{i18n.takeOut}}</view>
				</view>
				<!-- 呼叫 -->
				<view class="transferLeftFront" style="background-color: rgba(40,40,52,0.6);">
					<view class="fontPosition">{{i18n.call}}</view>
				</view>
				<!-- 呼叫中 -->
				<view class="transferLeftFronts" style="border-radius: 0px;">
					<view v-bind:class="[ state == '04' ? 'commonActives' : 'fontPosition']" @click="changeList('04')">{{i18n.calling}}</view>
				</view>
				<!-- 退款 -->
				<view class="transferLeftFront" style="background-color: rgba(40,40,52,0.6);">
					<view class="fontPosition">{{i18n.refund}}</view>
				</view>
				<!-- 支付一览 -->
				<view class="transferLeftFronts" style="border-radius: 0px;">
					<view v-bind:class="[ state == '05' ? 'commonActives' : 'fontPosition']" @click="changeList('05')">{{i18n.payList}}</view>
				</view>
			</view>
			<!-- 未确认 未结算 已结算 -->
			<view class="transferRightInhand" v-if="state == '01' || state == '02' || state == '03'">
				<view class="topSearch">
					<view class="searchCondition">
						<!-- 开始时间 -->
						<view class="startTimeSearch">
							<view class="textLabel">{{i18n.startTime}}</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="orderStartDate" :start="startDate" :end="endDate" @change="bindStartDateChange">
									<view class="uni-input">{{orderStartDate}}</view>
								</picker>
							</view>
						</view>
						<!-- 结束时间 -->
						<view class="startTimeSearch">
							<view class="textLabel">{{i18n.endTime}}</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="orderEndDate" :start="startDate" :end="endDate" @change="bindEndDateChange">
									<view class="uni-input">{{orderEndDate}}</view>
								</picker>
							</view>
						</view>
					</view>
					<!-- 就餐方式 -->
					<view class="searchCondition" style="margin-top: 2%;">
						<view class="startTimeSearch">
							<view class="textLabel">{{i18n.diningStyle}}</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :range="eatMayArray" :value="index" range-key="text">
									<view>{{eatMayArray[index].text}}</view>
								</picker>
							</view>
						</view>
						<!-- 查询 -->
						<button class="table-pay-search-button" @click="searchData()">{{i18n.search}}</button>
					</view>
				</view>
				<view class="table-responsive" style="width: 100%;overflow-x: scroll;overflow-y: hidden;">
					<view class="transferSecondTro" style="width: 100%;">
						<!-- 序号 -->
						<view class="transferSecondTho" style=" width:5%;"></view>
						<!-- 下单时间 -->
						<view class="transferSecondTho" style=" width:18%;">{{i18n.orderDateTime}}</view>
						<!-- 受付番号 -->
						<view class="transferSecondTho" style=" width:18%;">{{i18n.receivablesNo}}</view>
						<!-- 就餐方式 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.diningStyle}}</view>
						<!-- 桌名 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.tableName}}</view>
						<!-- 合计金额 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.orderTotalAmount}}</view>
						<!-- 支付金额 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.paymentAmount}}</view>
						<!-- 操作人 -->
						<view class="transferSecondTho" style=" width:18%;">{{i18n.operator}}</view>
						<!-- 操作 -->
						<view class="transferSecondTho" style=" width:42%;">{{i18n.operate}}</view>

					</view>
					<!-- 暂无数据 -->
					<view class="noData" v-if="orderList.length === 0">
						{{i18n.orderListNoData}}
					</view>
					<view style="float:left;height:92%;width:100%;overflow-y: auto;">
						<view v-if="orderList.length > 0" style="width: 100%" class="transferSecondTrContento" v-for="(order, index) in pageList"
						 :key="order.receivablesId">
							<!-- 序号 -->
							<view class="fontPositionso" style=" width:5%;">{{index + 1  + (page - 1) * itemsPerPage }}</view>
							<!-- 下单时间 -->
							<view class="fontPositionso" style=" width:18%;">{{order.orderDateTime | timeString('1') }}<br>{{order.orderDateTime | timeString('2') }}</view>
							<!-- 受付番号 -->
							<view class="fontPositionso" style=" width:18%;"><a style="text-decoration:underline;color:rgb(0,0,238)" href="javascript:void(0);"
								 @click="orderViewInfo(order)">{{order.receivablesNo}}</a>
							</view>
							<!-- 就餐方式 -->
							<view v-if="order.takeoutFlag === '0' || order.takeoutFlag === 0" class="fontPositionso" style=" width:14%;">{{i18n.storeDining}}</view>
							<view v-if="order.takeoutFlag === '1' || order.takeoutFlag === 1" class="fontPositionso" style=" width:14%;">{{i18n.takeAway}}</view>
							<!-- 桌名 -->
							<view class="fontPositionso" style=" width:14%;">{{order.tableName}}</view>
							<!-- 合计金额 -->
							<view class="fontPositionso" style=" width:14%;">¥{{order.orderTotalAmount |thousandth}}</view>
							<!-- 支付金额 -->
							<view class="fontPositionso" style=" width:14%;">¥{{order.paymentAmount |thousandth}}</view>
							<!-- 操作人 -->
							<view class="fontPositionso" style=" width:18%;">{{order.operator}}</view>
							<!-- 操作 -->
							<view v-bind:class="[ state == '03' ? 'detailButton' : 'detailButtonState']" @click="detailButton(order.receivablesId, order.tableId)">{{i18n.detail}}</view>
							<view v-if="state == '03'" class="detailButton">
								<!-- 領収書 -->
								<view @click="receiptButton(order.paymentAmount,order.orderSummaryId)">{{i18n.receipt}}</view>
							</view>

							<view v-if="state == '03'" class="detailButton">
								<!-- レシート -->
								<view @click="accountButton(order.receivablesId)">{{i18n.receiptPrinting}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 分页 -->
				<view class="pagination">
					<ul class="pagination" id="orderInfoPageTwo">
						<!-- 首页 -->
						<li jp-role="first" jp-data="1">
							<a class="first" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 0)  ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default; border-bottom-left-radius: 4px;border-top-left-radius: 4px;" @click="firstPage()">{{i18n.firstPage}}</a>
						</li>
						<!-- 前一页 -->
						<li jp-role="prev" jp-data="0">
							<a class="prev" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default;" @click="prevPage()"><i class="arrow arrow2"></i>{{i18n.prevPage}}</a>
						</li>
						<!-- 页数 -->
						<li jp-role="page" jp-data="1">
							<a class="page" style="background-color: #337ab7;color: #FFFFFF;">{{page}}</a>
						</li>
						<!-- 下一页 -->
						<li jp-role="next" jp-data="2">
							<a class="next" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default;" @click="nextPage()">{{i18n.nextPage}}<i class="arrow arrow3"></i></a>
						</li>
						<!-- 尾页 -->
						<li jp-role="last" jp-data="1">
							<a class="last" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 @click="lastPage()" style="cursor: default; border-bottom-right-radius: 4px;border-top-right-radius: 4px;">{{i18n.lastPage}}</a>
						</li>
					</ul>
				</view>
			</view>
			<!-- 外卖 -->
			<view class="transferRightInhand" v-if="state == '06'">
				<view class="topSearch">
					<view class="searchCondition">
						<!-- 开始时间 -->
						<view class="startTimeSearch" style="width: 40%">
							<view class="textLabel">
								<view class="overLong">{{i18n.startTime}}</view>
							</view>
							<view class="uni-list-cell-db">
								<e-picker-plus mode="YMDhms" style="width: 100%;" @confirm="bindStartTimeChange" :start="userTimeStart" :end="userTimeEnd"
								 :defaultValue="deliveryOrderTimeFrom">{{deliveryOrderTimeFrom ===''? '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp':deliveryOrderTimeFrom}}</e-picker-plus>
							</view>
						</view>
						<!-- 结束时间 -->
						<view class="startTimeSearch" style="width: 40%">
							<view class="textLabel">
								<view class="overLong">{{i18n.endTime}}</view>
							</view>
							<view class="uni-list-cell-db">
								<e-picker-plus mode="YMDhms" style="width: 100%;" @confirm="bindEndTimeChange" :start="userTimeStart" :end="userTimeEnd"
								 :defaultValue="deliveryOrderTimeTo">{{deliveryOrderTimeTo ===''? '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp':deliveryOrderTimeTo}}</e-picker-plus>
							</view>
						</view>
					</view>
					<view class="searchCondition" style="margin-top: 2%;">
						<!-- 出前仕方 -->
						<view class="startTimeSearch" style="width: 40%">
							<view class="textLabel">
								<view class="overLong">{{i18n.deliveryStyle}}</view>
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChangeDelivery" style="width: 100%;" :range="deliveryTypeFlagList" :value="indexDelivery"
								 range-key="deliveryTypeFlagName">
									<view>{{deliveryTypeFlagList[indexDelivery].deliveryTypeFlagName}}</view>
								</picker>
							</view>
						</view>
						<!-- 状态 -->
						<view class="startTimeSearch" style="width: 40%">
							<view class="textLabel">
								<view class="overLong">{{i18n.state}}</view>
							</view>
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChangeStatus" style="width: 100%;" :range="statusList" :value="indexStatus"
								 range-key="statusName">
									<view>{{statusList[indexStatus].statusName}}</view>
								</picker>
							</view>
						</view>
						<!-- 查询 -->
						<button class="table-pay-search-button" style="width: 9.5%;" @click="searchData()">
							<view class="overLong">{{i18n.search}}</view>
						</button>
					</view>
				</view>
				<view class="table-responsive" style="width: 100%;overflow-x: scroll;overflow-y: hidden;">
					<view class="transferSecondTro">
						<!-- 序号 -->
						<view class="transferSecondTho" style="width: 3vw;display: -webkit-box;"></view>
						<!-- 下单时间 -->
						<view class="transferSecondTho" style="width: 10vw;display: -webkit-box;">{{i18n.orderDateTime}}</view>
						<!-- 受付番号 -->
						<view class="transferSecondTho" style="width: 8vw;display: -webkit-box;">{{i18n.receivablesNo}}</view>
						<!-- 出前仕方 -->
						<view class="transferSecondTho" style="width: 8vw;display: -webkit-box;">{{i18n.deliveryStyle}}</view>
						<!-- 支付金额 -->
						<view class="transferSecondTho" style="width: 8vw;display: -webkit-box;">{{i18n.paymentAmount}}</view>
						<!-- 状态 -->
						<view class="transferSecondTho" style="width: 8vw;display: -webkit-box;">{{i18n.state}}</view>
						<!-- 操作 -->
						<view class="transferSecondTho" style="width: 29vw;display: -webkit-box;">{{i18n.operate}}</view>
					</view>
					<!-- 暂无数据 -->
					<view class="noData" v-if="deliveryOrderList.length === 0">
						{{i18n.orderListNoData}}
					</view>
					<view style="float:left;height:92%;overflow-y: auto;overflow-x: hidden;">
						<view v-if="deliveryOrderList.length > 0" class="transferSecondTrContento" v-for="(order, index) in pageList"
						 :key="order.receivablesId">
							<!-- 序号 -->
							<view class="fontPositionso" style="width: 3vw;border-right: 1px solid #fff;">{{index + 1  + (page - 1) * itemsPerPage }}</view>
							<!-- 下单时间 -->
							<view class="fontPositionso" style="width: 10vw;border-right: 1px solid #fff;" v-if="order.orderTime">{{order.orderTime | timeString('1') }}<br>{{order.orderTime | timeString('2') }}</view>
							<!-- 受付番号 -->
							<view class="fontPositionso" style="width: 8vw;border-right: 1px solid #fff;">{{order.receivablesNo}}</view>
							<!-- 就餐方式 -->
							<view class="fontPositionso" style="width: 8vw;border-right: 1px solid #fff;">{{order.deliveryTypeFlag}}</view>
							<!-- 支付金额 -->
							<view class="fontPositionso" style="width: 8vw;border-right: 1px solid #fff;">{{order.paymentAmount |thousandth}}</view>
							<!-- 状态 -->
							<view class="fontPositionso" style="width: 8vw;border-right: 1px solid #fff;">{{order.statusName}}</view>
							<!-- 操作 -->
							<view class="fontPositionso" style="width: 29vw;display: flex;margin 0;border-right: 1px solid #fff;margin: 0%;">
								<view class="detailButtonTwo" @click="detailButton(order.receivablesId, order.tableId)">{{i18n.detail}}</view>
								<view class="detailButtonTwo" @click="editButton(order.orderSummaryId,order.receivablesId,order.statusCd)">{{i18n.edit}}</view>
								<view class="detailButtonTwo" @click="refundDeliveryOrder(order.orderId,order.paymentCode,order.orderSummaryId)">{{i18n.returnMoney}}</view>
								<view class="detailButtonTwo" @click="printButton(order.orderSummaryId, order.paymentAmount)">{{i18n.print}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 分页 -->
				<view class="pagination">
					<ul class="pagination" id="orderInfoPageTwo">
						<!-- 首页 -->
						<li jp-role="first" jp-data="1">
							<a class="first" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 0)  ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default; border-bottom-left-radius: 4px;border-top-left-radius: 4px;" @click="firstPage()">{{i18n.firstPage}}</a>
						</li>
						<!-- 前一页 -->
						<li jp-role="prev" jp-data="0">
							<a class="prev" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 0)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default;" @click="prevPage()"><i class="arrow arrow2"></i>{{i18n.prevPage}}</a>
						</li>
						<!-- 页数 -->
						<li jp-role="page" jp-data="1">
							<a class="page" style="background-color: #337ab7;color: #FFFFFF;">{{page}}</a>
						</li>
						<!-- 下一页 -->
						<li jp-role="next" jp-data="2">
							<a class="next" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 style="cursor: default;" @click="nextPage()">{{i18n.nextPage}}<i class="arrow arrow3"></i></a>
						</li>
						<!-- 尾页 -->
						<li jp-role="last" jp-data="1">
							<a class="last" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
							 @click="lastPage()" style="cursor: default; border-bottom-right-radius: 4px;border-top-right-radius: 4px;">{{i18n.lastPage}}</a>
						</li>
					</ul>
				</view>
			</view>
			<!-- 呼叫中 -->
			<view class="transferRightInhand" v-show="state == '04' && showCallView == 0 ">
				<view class="topSearch" style="height: 5%;padding-bottom: 3%;display: flex;">
					<!-- 订单号 -->
					<view class="topLabel">{{i18n.orderNumber}}</view>
					<input style="width: 23%;" class="table-search-input" v-model="callReceivablesNo" />
					<!-- 查询按钮 -->
					<button class="table-search-button" @click="searchData()">{{i18n.search}}</button>
				</view>
				<view class="table-responsive" style="height: 80%;">
					<view class="transferSecondTr">
						<!-- 序号 -->
						<view class="transferSecondTho" style=" width:5%;"></view>
						<!-- 桌名 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.tableName}}</view>
						<!-- 订单号 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.orderNumber}}</view>
						<!-- 受付ID -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.paidId}}</view>
						<!-- 呼叫时间 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.callTime}}</view>
						<!-- 呼叫次数 -->
						<view class="transferSecondTho" style=" width:20%;">{{i18n.callCount}}</view>
						<!-- 操作 -->
						<view class="transferSecondTho" style=" width:30%;">{{i18n.operate}}</view>
					</view>
					<!-- 暂无数据 -->
					<view class="noData" v-if="callList.length === 0">
						{{i18n.callListNoData}}
					</view>
					<view style="float:left;height: 85%;overflow-y: auto;width: 100%;">
						<view v-if="callList.length > 0" class="transferSecondTrContent" v-for="(call, index) in callList" :key="call.receivablesId">
							<!-- 序号 -->
							<view class="fontPositions" style=" width:5%;">{{index + 1}}</view>
							<!-- 桌名 -->
							<view class="fontPositions" style=" width:25%;">{{call.tableName}}</view>
							<view class="fontPositions table-max-length" style=" width:25%;">{{call.receivablesNo}}</view>
							<view class="fontPositions table-max-length" style=" width:25%;">{{call.receivablesId}}</view>
							<view class="fontPositions" style=" width:25%;">{{call.callDateTime | timeString('1') }}<br>{{call.callDateTime | timeString('2') }}</view>
							<view class="fontPositions" style=" width:20%;">{{call.callCount}}</view>
							<view class="fontPositions" style=" width:30%;white-space:nowrap;"><button class="operate-button" @click="callingchuli(call.receivablesId)">{{i18n.handle}}</button></view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="state == '04' && showCallView == 1 " class="transferRightCallView" style="font-size:2vw;overflow-y: auto;color: #333;padding-top: 3%;">
				<view style="float: left;width: 100%;display: flex;">
					<view class="tranferHistoryDiv" style="width: 15%;padding-left: 5%;">
						<view style="width: 80%;padding: 0;">{{i18n.count}}</view>
						<view style="width: 20%;padding: 0;">1</view>
					</view>
					<view class="tranferHistoryDiv" style="width: 30%;padding-left: 10%;">
						<view style="width: 30%;padding: 0;">{{i18n.tableName}}</view>
						<view style="width: 70%;padding: 0;">222</view>
					</view>
					<view class="tranferHistoryDiv" style="width: 40%;">
						<view style="width: 20%;padding: 0;">{{i18n.time}}</view>
						<view style="width: 80%;padding: 0;">2019-04-01 16:53:49</view>
					</view>
				</view>
				<view class="tranferHistoryBottom">
					<button @click="backCallContents()" class="call-button-left">{{i18n.return}}</button>
					<button @click="callingchuli(receivablesId)" class="call-button-right">{{i18n.handle}}</button>
				</view>
			</view>
			<!-- 支付一览 -->
			<view v-if="state == '05' " class="transferRightInhand" style="font-size:2vw;overflow-y: auto;color: #333;">
				<view class="topSearch" style="height: 5%;padding-bottom: 3%;display: flex;width:96%;">
					<!-- 订单号 -->
					<view class="topLabel">{{i18n.orderNumber}}</view>
					<input class="table-search-input" v-model="payReceivablesNo" style="width: 23%;" />
					<!-- 时间 -->
					<view class="uni-list" style="display: flex; float: left; width: 40%;">
						<view class="uni-list-cell-db" style="margin-left: 5%;">
							<picker mode="date" :value="orderStartDate" :start="startDate" :end="endDate" @change="bindStartDateChange">
								<view class="uni-input">{{orderStartDate}}</view>
							</picker>
						</view>
						<view class="uni-list-cell-db" style="margin-left: 5%;">
							<picker mode="date" :value="orderEndDate" :start="startDate" :end="endDate" @change="bindEndDateChange">
								<view class="uni-input">{{orderEndDate}}</view>
							</picker>
						</view>

					</view>
					<!-- 查询按钮 -->
					<button class="table-pay-search-button" @click="searchData()">{{i18n.search}}</button>
				</view>
				<view class="table-responsive" style="height: 80%;">
					<view class="transferSecondTr">
						<!-- 序号 -->
						<view class="transferSecondTho" style=" width:5%;"></view>
						<!-- 支付时间 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.payTime}}</view>
						<!-- 桌名 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.tableName}}</view>
						<!-- 订单号 -->
						<view class="transferSecondTho" style=" width:30%;">{{i18n.orderNumber}}</view>
						<!-- 支付金额 -->
						<view class="transferSecondTho" style=" width:20%;">{{i18n.paymentAmounts}}</view>
						<!-- 支付方法 -->
						<view class="transferSecondTho" style=" width:25%;">{{i18n.paymentMethod}}</view>
						<!-- 操作 -->
						<view class="transferSecondTho" style=" width:30%;">{{i18n.operate}}</view>
					</view>
					<!-- 暂无数据 -->
					<view class="noData" v-if="paymentList.length === 0">
						{{i18n.payListNoData}}
					</view>
					<view style="float:left;height: 45vw;overflow-y: auto;width: 100%;">
						<view v-if="paymentList.length > 0" class="transferSecondTrContent" v-for="(pay, index) in paymentList" :key="pay.receivablesId">
							<!-- <view class="fontPositions" style=" width:5%;">{{index + 1  + (page -1) * itemsPerPage }}</view> -->
							<view class="fontPositions" style=" width:5%;">{{index + 1}}</view>
							<view class="fontPositions" style=" width:25%;">{{pay.payTime}}</view>
							<view class="fontPositions" style=" width:25%;">{{pay.tableName}}</view>
							<view class="fontPositions table-max-length" style=" width:30%;">{{pay.receivablesNo}}</view>
							<view class="fontPositions" style=" width:20%;">{{pay.paymentAmount |thousandth}}</view>
							<view class="fontPositions" style=" width:25%;">{{pay.paymentMethod}}</view>
							<view class="fontPositions" style=" width:30%;"><button class="refund-button" @click="refundAmount(pay.orderNo, pay.paymentCode)">{{i18n.refund}}</button></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 弹框-->
			<view v-show="showalert">
				<view class="sweet-overlay"></view>
				<view class="sweet-alert">
					<view v-if="modifySuccess == 2" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
					<!-- 成功图标 -->
					<view v-else class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
					<!-- 提示信息 -->
					<h2>{{tipMessage}}</h2>
					<view class="sa-button-container">
						<!-- 取消按钮 -->
						<button v-if="modifySuccess != 2 && modifySuccess != 3" style="display: inline-block; background-color: #adadad"
						 @click="cancelButton">{{i18n.cancell}}</button>
						<!-- 确认按钮 -->
						<button style="display: inline-block; background-color: #3987e4" @click="confirmButton">{{i18n.confirm}}</button>
					</view>
				</view>
			</view>
			<!-- 外卖的编辑画面 -->
			<view :class="[deliveryTypeFlagEdit == '1' ? 'transferRightInhandTwo' : 'transferRightInhand' ]" v-if="state == '07'">
				<view :class="[deliveryTypeFlagEdit == '1' ? 'editPartOne' : 'editPartTwo' ]">
					<!-- 基本信息 -->
					<view class="titleLine">
						<view class="overLong">{{i18n.basicInfo}}</view>
					</view>
					<!-- 姓名 -->
					<view class="nameClass">
						<!-- 姓名 -->
						<view class="nameLable">
							<view class="overLong">{{i18n.name}}</view>
						</view>
						<input class="table-search-input" v-model="customerName" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;" />
					</view>
					<!-- 电话 -->
					<view class="nameClass">
						<!-- 电话 -->
						<view class="nameLable">
							<view class="overLong">{{i18n.phoneNumber}}</view>
						</view>
						<input class="table-search-input" v-model="telNumber" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;" />
					</view>
					<!-- 时间 -->
					<view class="nameClass">
						<!-- 时间 -送餐方式为配達时，显示配達時間リス，为持帰り时，显示持帰り時間リスト-->
						<view class="nameLable">
							<view class="overLong">{{i18n.takeOutTime}}</view>
						</view>
						<!-- 配達時間リス -->
						<view v-if="deliveryTypeFlagEdit == '1' && this.statusEdit != '3'" class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
							<picker @change="bindPickerTimeChange" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;"
							 :range="cateringTimeList" :value="timeIndex" range-key="cateringTime">
								<view>{{deliveryTime}}</view>
							</picker>
						</view>
						<!-- 配達時間リス，当状态为配達中时不可选 -->
						<view v-if="deliveryTypeFlagEdit == '1' && this.statusEdit == '3'" class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;color: #a09c9c;">
							<picker @change="bindPickerTimeChange" disabled="ture" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;"
							 :range="cateringTimeList" :value="timeIndex" range-key="cateringTime">
								<view>{{deliveryTime}}</view>
							</picker>
						</view>
						<!-- 持帰り時間リスト -->
						<view v-if="deliveryTypeFlagEdit == '2' && this.statusEdit != '3'" classs="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
							<picker @change="bindPickerTimeChange" style="width: 100%;height: 100%;display: flexs;align-items: center;justify-content: center;"
							 :range="takeoutTimeList" :value="timeIndex" range-key="takeoutTime">
								<view>{{deliveryTime}}</view>
							</picker>
						</view>
						<!-- 持帰り時間リスト，当状态为配達中时不可选 -->
						<view v-if="deliveryTypeFlagEdit == '2' && this.statusEdit == '3'" class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;color: #a09c9c;">
							<picker @change="bindPickerTimeChange" disabled="ture" style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;"
							 :range="takeoutTimeList" :value="timeIndex" range-key="takeoutTime">
								<view>{{deliveryTime}}</view>
							</picker>
						</view>
					</view>
					<view style="width: 100%;display: flex;margin: 2.5% 0% 0% 0%;float: left;height: 7.2%;">
						<view class="nameClass" style="margin: 0%;width: 70%;float: left;height: 100%;margin-left: 12%;">
							<!-- 邮箱 -->
							<view class="nameLable">
								<view class="overLong">{{i18n.emailPos}}</view>
							</view>
							<input maxlength="100" class="table-search-input" v-model="mailAddress" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;" />
						</view>
						<!-- 再发送按钮 -->
						<view class="reSend" @click="reSendButton()">
							<view class="overLong">{{i18n.reSend}}</view>
						</view>
					</view>
					<!-- 状态 -->
					<view class="nameClass">
						<!-- 状态 -->
						<view class="nameLable">
							<view class="overLong">{{i18n.state}}</view>
						</view>
						<view class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
							<picker @change="editStatusListChange" style="width: 100%;" :range="statusList" :value="statusListIndex"
							 range-key="statusName">
								<view>{{statusList[statusListIndex].statusName}}</view>
							</picker>
						</view>
					</view>
					<!-- 出前仕方 -->
					<view class="nameClass">
						<!-- 出前仕方 -->
						<view class="nameLable">
							<view class="overLong">{{i18n.deliveryStyle}}</view>
						</view>
						<view class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
							<picker @change="editDeliveryTypeFlagListChange" :disabled="true" style="width: 100%;" :range="deliveryTypeFlagList"
							 :value="deliveryTypeFlagListIndex" range-key="deliveryTypeFlagName">
								<view>{{deliveryTypeFlagList[deliveryTypeFlagListIndex].deliveryTypeFlagName}}</view>
							</picker>
						</view>
					</view>
					<!-- 要望 -->
					<view class="nameClass" style="height: 16%;">
						<!-- 要望 -->
						<view class="nameLable">
							<view class="overLong">{{i18n.comment}}</view>
						</view>
						<textarea maxlength="300" style="background-color: white;border: 1px solid #ffffff;width: 77%;height: 100%;font-size: 1.5vw;"
						 v-model="comment" />
						</view>
					</view>
					<!-- 送餐方式为配送时显示，为自取时不显示 -->
					<view v-if= "deliveryTypeFlagEdit == '1'" class ="editPartOne" style="height: 40%;margin: 3% 2% 0% 2%;">
						<!-- 送餐地址 -->
						<view class="titleLineTwo"><view class="overLong">{{i18n.takeOutAddress}}</view></view>
						<view class="nameClassTwo">
							<!-- 都道府县 -->
							<view class="nameLable"><view class="overLong">{{i18n.duDao}}</view></view>
							<view class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
								<picker @change="bindPickerChangePrefecture" style="width: 100%;" :range="prefectureList" :value="prefectureListIndex" range-key="prefectureName">
									<view>{{prefectureList[prefectureListIndex].prefectureName}}</view>
								</picker>
							</view>
						</view>
						<view class="nameClassTwo">
							<!-- 市区町村 -->
							<view class="nameLable"><view class="overLong">{{i18n.shiQu}}</view></view>
							<view class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
								<picker @change="bindPickerChangeCityList" style="width: 100%;" :range="cityList" :value="cityListIndex" range-key="cityName">
									<view>{{cityList[cityListIndex].cityName}}</view>
								</picker>
							</view>
						</view>
						<view class="nameClassTwo">
							<!-- 町域番地 -->
							<view class="nameLable"><view class="overLong">{{i18n.dingYu}}</view></view>
							<view class="uni-list-cell-db" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;">
								<picker @change="bindPickerChangeBlockList" style="width: 100%;" :range="blockList" :value="blockListIndex" range-key="blockName">
									<view>{{blockList[blockListIndex].blockName}}</view>
								</picker>
							</view>
						</view>
						<!-- 详细地址 -->
						<view class="nameClassTwo">
							<!-- 详细地址 -->
							<view class="nameLable"><view class="overLong">{{i18n.detailAddress}}</view></view>
							<input class="table-search-input" v-model= "other" style="background-color: white;border: 1px solid #ffffff;width: 77%;font-size: 1.5vw;"/>
						</view>
					</view>
					<view :class="[deliveryTypeFlagEdit == '1' ? 'buttonLine' : 'buttonLineTwo' ]">
						<!-- 返回按钮 -->
						<view class="buttonStyle" @click="returnTakeOut()"><view class="overLong">{{i18n.returnButton}}</view></view>
						<!-- 确定按钮 -->
						<view class="buttonStyle" @click="takeOutEditConfirm()" style="margin-left: 68%;"><view class="overLong">{{i18n.confirmButton}}</view></view>
					</view>
				</view>
		</view>
		
		
		<!-- 弹框-->
		<view v-show="showalertPrint">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<!-- <view style="color: #333333;" class="sa-icon sa-custom close" >×</view> -->
				<view  class="sa-icon sa-custom "  style="display: right;align-items: right;justify-content: right;	margin: -1% 1.5% 1.7% 88%;height: 3vw;width: 3vw; display: block;background-image: url('../../static/button_x.png');" @click="close()"></view>
				<!-- 提示信息 -->
				<h2 style="color:#333333;">{{receiptSelect}}</h2>
					<!-- 操作 -->
					<!-- <view class="fontPositionso" style="width: 29vw;display: flex;margin 0;border-right: 1px solid #fff;margin: 0%;"> -->
						<view class="printButtonType" @click="receiptPrintButton('1')">{{i18n.kitchen}}</view>
						<view class="printButtonType" @click="receiptPrintButton('2')">{{i18n.accounting}}</view>
						<view class="printButtonType" @click="receiptPrintButton('3')">{{i18n.receipt}}</view>
						<view style="height: 2vw;"></view>
					<!-- </view> -->
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
	
	var printModule = uni.requireNativePlugin("PrintService");
	
	
	export default {
		computed: {
				i18n () {  
				    return this.$t('message')  
				},
				// 日历最早时间
				startDate() {
					return this.getDate('start');
				},
				// 日历最晚时间
				endDate() {
					return this.getDate('end');
				}
		}, 
		props: {
			// 每页显示几条
			itemsPerPage: {
				type: Number,
				default: 5
			},
		},
		data() {
			const currentDate = this.getDate({
			      format: true
			})
			return {
				// 当前页
				page: 0,
				// 可分页数
				pages: 1,
				date: currentDate,
				// 开始时间
				orderStartDate: currentDate,
				// 结束时间
				orderEndDate: currentDate,
				// 订单数据
				orderList: [],
				// 呼叫数据
				callList: [],
				// 支付数据
				paymentList: [],
				// 菜单默认位置：进行中
				state: '01',
				// 分页后的数据
				pageList: [],
				// 桌号
				tableNo: '',
				// 呼叫受付番号
				callReceivablesNo: '',
				// 支付受付番号
				payReceivablesNo: '',
				// 呼叫详细显示标识
				showCallView: 0,
				showalert: false,
				// 弹框提示信息
				tipMessage: '',
				receivablesId: '',
				// 0 未设定 1 处理成功 2 处理失败,3 外卖编辑保存成功
				modifySuccess: 0,
				parms: '',
				// 图标路径
				leftTop: '../../static/leftTop.png',
				leftBell: '../../static/leftBell.png',
				pepolepic: '../../static/pepolepic.png',
				currentTabIndex: 0,
				// 就餐方式
				eatMayArray: [],
				// 出前仕方列表
				deliveryTypeFlagList: [{deliveryTypeFlagCd: '',deliveryTypeFlagName: ''}],
				// 一览的配送方式的
				indexDelivery: 0,
				// 编辑的配送方式的
				deliveryTypeFlagListIndex: 0,
				// 外卖状态列表，1:支払済、2:受付済、3:配達中、4:処理済
				statusList: [{statusCd: '',statusName: ''}],
				// 一览的状态的
				indexStatus: 0,
				// 编辑的状态的
				statusListIndex: 0,
				// 一览选中的外卖状态
				status: '',
				// 编辑选中的外卖状态
				statusEdit: '',
				index: 0,
				// 选中的就餐方式
				selectEatMay: 2,
				// 外卖查询条件,开始时间
				deliveryOrderTimeFrom: currentDate + ' 00:00:00',
				// 外卖查询条件,结束时间
				deliveryOrderTimeTo: currentDate + ' 23:59:59',
				// 外卖查询条件,出前仕方,1:配達、2:持帰り
				deliveryTypeFlag: '',
				// 外卖订单一览数据
				deliveryOrderList: [],
				// 外卖订单编辑姓名
				customerName: '',
				// 外卖订单编辑电话
				telNumber: '',
				// 外卖订单编辑配送时间
				deliveryTime: '',
				// 外卖订单编辑电子邮箱
				mailAddress: '',
				// 外卖订单编辑都道府县Id
				prefectureId: '',
				// 外卖订单编辑市区町村ID
				cityId: '',
				// 外卖订单编辑町域番地ID
				blockId: '',
				// 外卖订单编辑地址
				other: '',
				// 外卖订单编辑状态
				status: '',
				// 一览选中的出前仕方
				deliveryTypeFlag: '',
				// 编辑选中的出前仕方
				deliveryTypeFlagEdit: '',
				// 外卖订单编辑要望
				comment: '',
				// 外卖订单编辑都道府県リスト
				prefectureList: [{prefectureId: '',prefectureName: ''}],
				prefectureListIndex: 0,
				// 外卖订单编辑市区町村リスト
				cityList: [{cityId: '',cityName: ''}],
				cityListIndex: 0,
				// 外卖订单编辑町域番地リスト
				blockList: [{blockId: '',blockName: ''}],
				blockListIndex: 0,
				// 注文サマリID
				orderSummaryId: '',
				// 区域列表
				areaList: [],
				// 一览下拉开始的时间选择
				userTimeStart: '',
				// 一览下拉结束的时间选择
				userTimeEnd: '',
				// 配達時間リスト
				cateringTimeList: [{cateringTime: ''}],
				// 持帰り時間リスト
				takeoutTimeList: [{takeoutTime: ''}],
				timeIndex: 0,
				// 配送方式名称
				deliveryTypeFlagName: '',
				// 伝票種類弹框
				showalertPrint:false,
				// 注文サマリID(印刷)
				orderSummaryIdPrint: '',
				// レシート選択
				receiptSelect: '',
				paymentAmountPrint: '',
				// 出前機能表示標識
				deliveryDisplayFlag: '',
				// 印刷結果
				printSuccessResult:''
			}
		},
		onLoad: function(option) {
			// 出前機能表示標識 １の場合表示、以外の場合、表示しない
			this.deliveryDisplayFlag=uni.getStorageSync('deliveryDisplayFlag')
			this.getTimeRange();
			// 计算页面尺寸
			const that = this;
			uni.getSystemInfo({
			    success:function(res){
					that.windowHeight = res.windowHeight;
			    }
			})
			// 定义就餐方式
			this.eatMayArray = [
				    {
				        id: 2,
				        text: '--' + this.i18n.select + '--',
				    },
				    {
				        id: 0,
				        text: this.i18n.storeDining,
				    },
				    {
				        id: 1,
				        text: this.i18n.takeAway,
				    }
				]
			// 判断参数是否为空
			if(option.item != undefined &&  option.item != null){
				this.parms = JSON.parse(decodeURIComponent(option.item));
			} else {
				this.parms = '';
			}
			// 当前页
			this.page = this.parms === '' ? 1 : this.parms.currentPage;
			// 开始时间
			this.orderStartDate = this.parms === '' ? this.getDate({format: true}) : this.parms.startOrderTime;
			this.deliveryOrderTimeFrom = this.parms === '' ? this.getDate({format: true}) + ' 00:00:00' : this.parms.startOrderTime;
			// 结束时间
			this.orderEndDate = this.parms === '' ? this.getDate({format: true}) : this.parms.endOrderTime;
			this.deliveryOrderTimeTo = this.parms === '' ? this.getDate({format: true}) + ' 23:59:59' : this.parms.endOrderTime;
			// 订单状态
			this.state = this.parms === '' ? '01' : this.parms.orderStatus ;
			// 就餐方式
			this.selectEatMay = this.parms === '' ? 2 : this.parms.selectEatMay ;
			// 选中的状态Id
			this.status = this.parms === '' ? '' : this.parms.status ;
			// 选中的送餐方式Id
			this.deliveryTypeFlag = this.parms === '' ? '' : this.parms.deliveryTypeFlag ;
			if (this.selectEatMay === 0) {
				this.index = 1;
			} else if (this.selectEatMay === 1) {
				this.index = 2;
			}
			if(this.state !== '06') {
			// 获取订单数据
			this.loadOrderData();
			} else {
				// 获取外卖订单数据
				this.loadTakeOutData();
			}
		},
		methods: {
			// 切换menu
			tabClick(index){
			    this.currentTabIndex = index
				if (this.currentTabIndex === 0) {
					this.toTableList();
				} else if (this.currentTabIndex === 1) {
					uni.reLaunch({
					    url: '/pages/appointment/appointment'
					});
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
			// 切换菜单
			changeList:function(e){
				this.state = e;
				this.page = 1;
				this.orderStartDate = this.getDate({format: true});
				this.orderEndDate = this.getDate({format: true});
				this.deliveryOrderTimeFrom = this.getDate({format: true}) + ' 00:00:00';
				this.deliveryOrderTimeTo = this.getDate({format: true}) + ' 23:59:59';
				this.indexDelivery = 0;
				this.indexStatus = 0;
				// 就餐方式为空
				this.index = 0;
				// 选中的就餐方式为空
				this.selectEatMay = 2;
				this.loadAllData();
			},
			// 读取数据区分
			loadAllData:function() {
				// 呼叫
				if(this.state === '04') {
					this.loadCallData();
				// 支付一览
				} else if (this.state === '05') {
					this.loadPayData();
				// 外卖
				} else if (this.state === '06') {
					this.loadTakeOutData();
				// 订单查询
				} else {
					this.loadOrderData();
				}
			},
			
			// 读取订单数据
			loadOrderData:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					orderDateStart: this.orderStartDate,
					orderDateEnd: this.orderEndDate,
					takeoutFlag: this.selectEatMay,
					orderStatus: this.state,
					page: this.page,
					pageCount: this.itemsPerPage
				};
                http.post('api/stpd/getOrderList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
						// 接收数据
						this.orderList = result.data.orderList;
						// 可分页数
						this.pages = Math.ceil(result.data.orderCount/this.itemsPerPage);
						this.pageList = this.orderList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 获取呼叫数据
			loadCallData:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					receivablesNo: this.callReceivablesNo,
				};
				http.post('api/stpd/getCallList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
						    // 接收数据
						    this.callList = result.data.callList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 获取外卖一览数据
			loadTakeOutData:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					deliveryOrderTimeFrom: this.deliveryOrderTimeFrom,
					deliveryOrderTimeTo: this.deliveryOrderTimeTo,
					deliveryTypeFlag: this.deliveryTypeFlag,
					status: this.status,
					page: this.page,
					pageCount: this.itemsPerPage
				};
				http.post('api/stpd/getDeliveryOrderList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收数据
							this.deliveryOrderList = result.data.deliveryOrderList;
							// 配送方式列表
							this.deliveryTypeFlagList = [];
							this.deliveryTypeFlagList = result.data.deliveryTypeFlagList;
							this.deliveryTypeFlagList.splice(0,0,{deliveryTypeFlagCd: '',deliveryTypeFlagName: '--' + this.i18n.select + '--'});
							// 状态列表
							this.statusList = [];
							this.statusList = result.data.statusList;
							this.statusList.splice(0,0,{statusCd: '',statusName: '--' + this.i18n.select + '--'});
							// 可分页数
							this.pages = Math.ceil(result.data.deliveryOrderCount/this.itemsPerPage);
							this.pageList = this.deliveryOrderList;
							// 当从详细页面返回的时候,通过传回来的参数显示之前被选中的选项
							if((this.deliveryTypeFlag !== '' || this.status !== '') && this.parms.orderStatus === '06') {
								for(let i = 0;i<this.deliveryTypeFlagList.length; i++){
									if(this.deliveryTypeFlag === this.deliveryTypeFlagList[i].deliveryTypeFlagCd) {
										this.indexDelivery = i;
									}
								}
								for(let i = 0;i<this.statusList.length; i++){
									if(this.status === this.statusList[i].statusCd) {
										this.indexStatus = i;
									}
								}
							}
							this.parms = '';
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 获取支付数据
			loadPayData:function(){
				const data = {
					storeId: getApp().globalData.storeId,
					receivablesNo: this.payReceivablesNo,
					orderDateStart: this.orderStartDate,
					orderDateEnd: this.orderEndDate
				};
				http.post('api/stpd/getRefundsList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收数据
							this.paymentList = result.data.orderList;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 分页
			dataPage:function(){
				var startPage =  (this.page) * this.itemsPerPage;
				var endPage =  startPage + this.itemsPerPage ;
				this.pageList =[];
				if( this.state == '04') {
					this.pageList =[];
				} else if (this.state == '05') {
					this.pageList =[];
				} else {
					this.pageList = this.orderList.slice(parseInt(startPage) , parseInt(endPage ));
				}
			},
			
			// 首页
			firstPage:function() {
				this.page = 1;
				this.loadAllData();
			},
			// 前一页
			prevPage:function() {
				this.page = this.page - 1 ;
				this.loadAllData();
			},
			// 下一页
			nextPage:function() {
				this.page = this.page + 1 ;
				this.loadAllData();
			},
			// 尾页
			lastPage:function() {
				this.page = this.pages;
				this.loadAllData();
			},
			// 查询数据
			searchData:function() {
				if ((this.orderStartDate > this.orderEndDate) && this.state !== '06') {
					this.modifySuccess = 2;
					this.showalert = true;
					this.tipMessage = this.i18n.startTimeCannotGreaterThanEndTime;
				} else if ((this.deliveryOrderTimeFrom > this.deliveryOrderTimeTo) && this.state === '06') {
					this.modifySuccess = 2;
					this.showalert = true;
					this.tipMessage = this.i18n.startTimeCannotGreaterThanEndTime;
				} else {
					switch(this.state){
						// 未确认
						case "01":
							this.page = 1;
							this.loadOrderData();
							break
						// 未结算
						case "02":
							this.page = 1;
							this.loadOrderData();
							break
						// 已结算
						case "03":
							this.page = 1;
							this.loadOrderData();
							break
						// 呼叫中
						case "04":
							this.loadCallData();
							break
						// 支付一览
						case "05":
							this.loadPayData();
							break
						// 外卖一览
						case "06":
							this.page = 1;
							this.loadTakeOutData();
							break
					}
				}
			}, 
			// 呼叫详细
			callView:function(receivablesId) {
				this.showCallView = 1;
			},
			// 返回呼叫
			backCallContents: function() {
				this.showCallView = 0;
			},
			//处理
			callingchuli: function(receivablesId) {
				this.showalert = true;
				this.tipMessage = this.i18n.sureToHandle;
				this.receivablesId = receivablesId;
			},
			// 确认按钮
			confirmButton:function() {
				this.showalert = false;
				
				if(this.modifySuccess == 0) {
					this.$showLoading();
					const data = {
						storeId: getApp().globalData.storeId,
						receivablesId: this.receivablesId,
						userId: uni.getStorageSync('userId'),
					};
					http.post('api/stpd/modifyCallStatus', data)
						.then(result => {
							if (result.data.resultCode == '0000') {
								// 隐藏提示框
								this.showalert = false;
								this.showCallView = 0;
								// 刷新呼叫列表
								this.loadCallData();
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
							} else {
								// 系统未知错误
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
							}
							// 隐藏加载动画
							this.$hideLoading();
						}).catch(err => {
							// 网络异常，请求失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
							// 隐藏加载画面
							this.$hideLoading();
					});
				} else {
					this.modifySuccess = 0;
					// 隐藏加载动画
					this.$hideLoading();
				}
				
			},	
			// 取消按钮
			cancelButton:function() {
				this.showalert = false;
			},
			// 改变开始时间
			bindStartDateChange: function(e) {
			    this.orderStartDate = e.target.value
			},
			// 改变结束时间
			bindEndDateChange: function(e) {
			    this.orderEndDate = e.target.value
			},
			// 外卖改变开始时间
			bindStartTimeChange: function(e) {
				this.deliveryOrderTimeFrom = e.result;
			},
			// 外卖改变结束时间
			bindEndTimeChange: function(e) {
				this.deliveryOrderTimeTo = e.result;
			},
			getTimeRange: function() {
				// 获取当前日期
				var date = new Date();
				// 开始年份-20
				var startYear = date.getFullYear() - 20;
				// 结束年份+20
				var endYear = date.getFullYear() + 20;
				// 下拉开始时间
				this.userTimeStart = startYear + '-01-01 00:00:00';
				// 下拉结束时间
				this.userTimeEnd = endYear + '-12-31 24:59:59';
			},
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
			// 返回登录页
			backToHome:function(obj){
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			},
			// 前往点餐页
			toTableList:function(obj){
				uni.reLaunch({
				    url: '/pages/tableList/tableList'
				});
			},
			// 订单详细信息
			orderViewInfo:function(obj){
				const item = {
				     id: obj.tableId,
				     nowReceivablesId: obj.receivablesId,
				     orderStatus: this.state,
					 currentPage: this.page,
					 startOrderTime: this.orderStartDate,
					 endOrderTime: this.orderEndDate,
					 selectEatMay: this.selectEatMay,
					 transferFrom: true,
					 takeoutFlag: obj.takeoutFlag
				    };
				    // 跳转桌台订单画面
				    uni.reLaunch({
				        url: '/pages/table/table?item=' + encodeURIComponent(JSON.stringify(item))
				    });
			},
			detailButton:function(receivablesId, tableId){
				if(this.state !== '06') {
				    const item = {
					    receivablesId: receivablesId,
					    tableId: tableId,
					    orderStatus: this.state,
					    currentPage: this.page,
					    startOrderTime: this.orderStartDate,
					    endOrderTime: this.orderEndDate,
						selectEatMay: this.selectEatMay,
						status: this.status,
						deliveryTypeFlag: this.deliveryTypeFlag
					};
					// 跳转订单的详细画面
					uni.reLaunch({
					    url: '/pages/orderDetail/orderDetail?item=' + encodeURIComponent(JSON.stringify(item))
					});
				} else {
					const item = {
						receivablesId: receivablesId,
						tableId: tableId,
						orderStatus: this.state,
						currentPage: this.page,
						startOrderTime: this.deliveryOrderTimeFrom,
						endOrderTime: this.deliveryOrderTimeTo,
						selectEatMay: this.selectEatMay,
						status: this.status,
						deliveryTypeFlag: this.deliveryTypeFlag
					};
					// 跳转订单的详细画面
					uni.reLaunch({
						url: '/pages/orderDetail/orderDetail?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
			},
			// 領収書印刷
			receiptButton:function(paymentAmount, orderSummaryId){
				// 显示加载画面
				this.$showLoading()
				const parameter = {
					// 门店id
					storeId: getApp().globalData.storeId,
					
					// 支払金額
					paymentAmount: paymentAmount,
					// オーダーサマリID
					orderSummaryId: orderSummaryId,
				}
				// 領収書
					http
						.post('api/stpd/receiptPrint', parameter)
						.then(result => {
							if (result.data.resultCode === '0000') {
								this.printSuccessResult = "";
								printModule.printSlip(
									result.data.printInfo,
									(ret) => {
											this.printSuccessResult = ret.code;
											if(this.printSuccessResult === "00"){
												// 参数校验失败
												this.modifySuccess = 2;
												this.showalert = true;
												this.tipMessage = this.i18n.printingSuccessful;
												// 隐藏加载画面
												this.$hideLoading();
											}else{
												// 参数校验失败
												this.modifySuccess = 2;
												this.showalert = true;
												if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
													this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
												} else {
													this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
												}
												// 隐藏加载画面
												this.$hideLoading();
											}
									})
								
							}
						}).catch(() => {
							// 网络异常，请求失败
							this.showalert = true;
							this.modifySuccess = 2;
							this.tipMessage = this.i18n.printErrStatus;
							// 隐藏加载画面
							this.$hideLoading();
							return;
						});
			},
			// 会計印刷
			accountButton:function(receivablesId){
				// 显示加载画面
				this.$showLoading()
				const parameter = {
					// 门店id
					storeId: getApp().globalData.storeId,
					
					// 受付ID
					receivablesId: receivablesId
				}
				// 会計収書
				http
					.post('api/stpd/accountingPrint', parameter)
					.then(result => {
						if (result.data.resultCode === '0000') {
							this.printSuccessResult = "";
							printModule.printSlip(
								result.data.printInfo,
								(ret) => {
									this.printSuccessResult = ret.code;
									if(this.printSuccessResult === "00"){
										// 参数校验失败
										this.modifySuccess = 2;
										this.showalert = true;
										this.tipMessage = this.i18n.printingSuccessful;
										// 隐藏加载画面
										this.$hideLoading();
									}else{
										// 参数校验失败
										this.modifySuccess = 2;
										this.showalert = true;
										if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
											this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
										} else {
											this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
										}
										// 隐藏加载画面
										this.$hideLoading();
									}
								})
								
							
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.showalert = true;
						this.modifySuccess = 2;
						this.tipMessage = this.i18n.printErrStatus;
						// 隐藏加载画面
						this.$hideLoading();
						return;
					});
			},
			
			// 外卖订单的编辑按钮
			editButton:function(orderSummaryId, receivablesId, statusCd){
				if(statusCd == '4') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 该订单已处理完毕
					this.tipMessage = this.i18n.processedAlready;
				} else {
					this.orderSummaryId = orderSummaryId;
					this.receivablesId = receivablesId;
					this.state = '07';
					// 参数
					const data = {
						storeId: getApp().globalData.storeId,
						// 注文サマリID
						orderSummaryId: orderSummaryId,
						languages: this._i18n.locale
					};
					http.post('api/stpd/getDeliveryOrderEditInfo', data)
						.then(result => {
							if (result.data.resultCode == '0000') {
								// 外卖订单编辑姓名
								this.customerName = result.data.customerName;
								// 外卖订单编辑电话
								this.telNumber = result.data.telNumber;
								// 配送开始时间
								this.deliveryStartTime = result.data.deliveryStartTime;
								// 配送结束时间
								this.deliveryEndTime = result.data.deliveryEndTime;
								// 外卖订单编辑配送时间
								this.deliveryTime = result.data.deliveryTime;
								// 外卖订单编辑电子邮箱
								this.mailAddress = result.data.mailAddress;
								// 外卖订单编辑都道府县Id
								this.prefectureId = result.data.prefectureId;
								// 外卖订单编辑市区町村ID
								this.cityId = result.data.cityId;
								// 外卖订单编辑町域番地ID
								this.blockId = result.data.blockId;
								// 外卖订单编辑地址
								this.other = result.data.other;
								// 外卖订单编辑状态
								this.statusEdit = result.data.status;
								// 出前仕方
								this.deliveryTypeFlagEdit = result.data.deliveryTypeFlag;
								// 外卖订单编辑要望
								this.comment = result.data.comment;
								// 配達時間リスト
								this.cateringTimeList = result.data.cateringTimeList;
								// 持帰り時間リスト
								this.takeoutTimeList = result.data.takeoutTimeList;
								this.statusList = [];
								// 外卖订单编辑状態リスト
								this.statusList = result.data.statusList;
								for(let i = 0; i< this.statusList.length ; i++){
									if(this.statusList[i].statusCd.toString() === this.statusEdit) {
										// 默认选中
										this.statusListIndex = i;
									}
								}
								this.deliveryTypeFlagList = [];
								// 配送方式リスト
								this.deliveryTypeFlagList = result.data.deliveryTypeFlagList;
								for(let i = 0; i< this.deliveryTypeFlagList.length ; i++){
									if(this.deliveryTypeFlagList[i].deliveryTypeFlagCd.toString() === this.deliveryTypeFlagEdit) {
										// 默认选中
										this.deliveryTypeFlagListIndex = i;
									}
								}
								if(result.data.prefectureList.length > 0) {
									// 外卖订单编辑都道府県リスト
									this.prefectureList = result.data.prefectureList;
									// 插入选择的空白项
									this.prefectureList.splice(0,0,{prefectureId: '',prefectureName: '--' + this.i18n.select + '--'});
									for(let i = 0; i< this.prefectureList.length ; i++){
										if(this.prefectureList[i].prefectureId === this.prefectureId) {
											// 默认选中
											this.prefectureListIndex = i;
										}
									}
								}
								if(result.data.cityList != undefined && result.data.cityList.length > 0) {
									// 外卖订单编辑市区町村リスト
									this.cityList = result.data.cityList;
									// 插入选择的空白项
									this.cityList.splice(0,0,{cityId: '',cityName: '--' + this.i18n.select + '--'});
									for(let i = 0; i< this.cityList.length ; i++){
										if(this.cityList[i].cityId === this.cityId) {
											// 默认选中
											this.cityListIndex = i;
										}
									}
								}else{
									// 外卖订单编辑市区町村リスト
									this.cityList = [];
									// 插入选择的空白项
									this.cityList.splice(0,0,{cityId: '',cityName: '--' + this.i18n.select + '--'});
								}
								
								if(result.data.cityList != undefined && result.data.cityList.length > 0) {
									// 外卖订单编辑町域番地リスト
									this.blockList = result.data.blockList;
									// 插入选择的空白项
									this.blockList.splice(0,0,{blockId: '',blockName: '--' + this.i18n.select + '--'});
									for(let i = 0; i< this.blockList.length ; i++){
										if(this.blockList[i].blockId === this.blockId) {
											// 默认选中
											this.blockListIndex = i;
										}
									}
								}else{
									// 外卖订单编辑町域番地リスト
									this.blockList = [];
									// 插入选择的空白项
									this.blockList.splice(0,0,{blockId: '',blockName: '--' + this.i18n.select + '--'});
								}
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
							} else {
								// 系统未知错误
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
							}
						}).catch(err => {
							// 网络异常，请求失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
				}
			},
			// 外卖订单的返金按钮
			refundDeliveryOrder:function(orderId,paymentCode,orderSummaryId){
				// 显示加载画面
				this.$showLoading()
				// 参数
				const data = {
					storeId: getApp().globalData.storeId,
					// 注文ID
					orderNo: orderId,
					// 支払方式コード
					paymentCode: paymentCode,
					// 注文サマリID
					orderSummaryId: orderSummaryId
				};
				http.post('api/stpd/refundDeliveryOrder', data)
					.then(result => {
						if (result.data.resultCode == '0000') {
							// 返金成功
							this.modifySuccess = 3;
							this.showalert = true;
							this.tipMessage = this.i18n.returnMoneySuccess;
							// 刷新外卖订单一览数据
							this.loadTakeOutData();
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
						// 隐藏加载画面
						this.$hideLoading();
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 外卖订单的印刷按钮
			printButton:function(orderSummaryId, paymentAmount){
				this.showalertPrint = true;
				this.orderSummaryIdPrint = orderSummaryId;
				this.paymentAmountPrint = paymentAmount;
				this.receiptSelect = this.i18n.receiptSelect;
			},
			// 外卖订单的印刷按钮
			close:function(){
				this.showalertPrint = false;
				this.orderSummaryIdPrint = "";
			},
			
			// 外卖订单的印刷按钮
			receiptPrintButton:function(printType){
				// 显示加载画面
				this.$showLoading()
				// 参数
				const data = {
					storeId: getApp().globalData.storeId,
					// 注文サマリID
					orderSummaryId: this.orderSummaryIdPrint,
					deliverPrintType: printType,
					paymentAmount: this.paymentAmountPrint
				};
				http.post('api/stpd/printDeliverOrder', data)
					.then(result => {
						if (result.data.resultCode == '0000') {
							this.printSuccessResult = "";
							printModule.printSlip(
								result.data.printInfo,
								(ret) => {
									this.printSuccessResult = ret.code;
									// 打印成功
									if(this.printSuccessResult === "00"){
										this.modifySuccess = 3;
										this.showalertPrint = false;
										this.showalert = true;
										this.tipMessage = this.i18n.printSuccess;
									}else{
										this.modifySuccess = 3;
										this.showalertPrint = false;
										this.showalert = true;
										if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
											this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
										} else {
											this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
										}
									}
							})
							
							
							// 刷新外卖订单一览数据
							this.loadTakeOutData();
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
							this.showalertPrint = false;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
							this.showalertPrint = false;
						}
						// 隐藏加载画面
						this.$hideLoading();
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.printErrStatus;
						// 隐藏加载画面
						this.$hideLoading();
				});
			},
			//下拉框
			bindPickerChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.index = e.detail.value;
				// 选择的就餐方式
				this.selectEatMay = this.eatMayArray[this.index].id;
			},
			// 返金
			refundAmount:function(orderNo, paymentCode) {
				this.showalert = false;
				
				if(this.modifySuccess == 0) {
					this.$showLoading();
					const data = {
						storeId: getApp().globalData.storeId,
						orderNo: orderNo,
						paymentCode: paymentCode,
					};
					http.post('api/stpd/refunds', data)
						.then(result => {
							if (result.data.resultCode == '0000') {
								// 隐藏加载动画
								this.$hideLoading();
								// 隐藏提示框
								this.showalert = false;
								this.showCallView = 0;
								// 刷新支付一览
								this.loadPayData();
							} else {
								// 隐藏加载动画
								this.$hideLoading();
								// 显示提示框
								this.showalert = true;
								this.tipMessage = this.i18n.handleFail;
								this.modifySuccess = 2;
							}
						}).catch(err => {
							// 隐藏加载动画
							this.$hideLoading();
							// 网络异常，请求失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
				} else {
					this.modifySuccess = 0;
					// 隐藏加载动画
					this.$hideLoading();
				}
			},
			// 外卖订单编辑的状态下拉
			editStatusListChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.statusListIndex = e.detail.value;
				// 状态Id
				this.statusEdit = this.statusList[this.statusListIndex].statusCd;
			},
			// 外卖订单编辑的配送时间的下拉
			bindPickerTimeChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.timeIndex = e.detail.value;
				if(this.deliveryTypeFlagEdit == '1') {
					// 外卖订单编辑的配送时间
					this.deliveryTime = this.cateringTimeList[this.timeIndex].cateringTime;
				} else {
					// 外卖订单编辑的配送时间
					this.deliveryTime = this.takeoutTimeList[this.timeIndex].takeoutTime;
				}
			},
			// 外卖订单编辑的配送方式下拉
			editDeliveryTypeFlagListChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.deliveryTypeFlagListIndex = e.detail.value;
				// 配送方式Id
				this.deliveryTypeFlagEdit = this.deliveryTypeFlagList[this.deliveryTypeFlagListIndex].deliveryTypeFlagCd;
				this.timeIndex = 0;
				// 配送
				if(this.deliveryTypeFlagEdit == '1') {
					// 外卖订单编辑的配送时间
					this.deliveryTime = this.cateringTimeList[0].cateringTime;
				} else {
					// 自取
					// 外卖订单编辑的配送时间
					this.deliveryTime = this.takeoutTimeList[0].takeoutTime;
					// 自取时，清空送餐地址相关的信息
					this.prefectureListIndex = 0;
					this.cityListIndex = 0;
					this.blockListIndex = 0;
					this.prefectureId = '';
					this.cityId = '';
					this.blockId = '';
					this.other = '';
					// 清空市区町村列表
					this.cityList = [{cityId: '',cityName: ''}];
					// 清空町域番地列表
					this.blockList = [{blockId: '',blockName: ''}];
				}
			},
			// 都道府県リスト
			bindPickerChangePrefecture: function(e) {
				//将数组改变索引赋给定义的index变量
				this.prefectureListIndex = e.detail.value;
				// 都道府県Id
				this.prefectureId = this.prefectureList[this.prefectureListIndex].prefectureId;
				// 获取对应的市区町村リスト
				this.getAreaList('01',this.prefectureId,this.cityId);
			},
			// 市区町村リスト
			bindPickerChangeCityList: function(e) {
				//将数组改变索引赋给定义的index变量
				this.cityListIndex = e.detail.value;
				// 市区町村Id
				this.cityId = this.cityList[this.cityListIndex].cityId;
				this.getAreaList('02',this.prefectureId,this.cityId);
			},
			// 町域番地リスト
			bindPickerChangeBlockList: function(e) {
				//将数组改变索引赋给定义的index变量
				this.blockListIndex = e.detail.value;
				// 町域番地Id
				this.blockId = this.blockList[this.blockListIndex].blockId;
			},
			// 获取区域列表
			getAreaList: function(areaType,prefectureId,cityId) {
				// 参数
				const data = {
					storeId: getApp().globalData.storeId,
					areaType: areaType,
					prefectureId: prefectureId,
					cityId: cityId,
					// 语言
					languages: this._i18n.locale
				};
				// 获取对应的市区町村リスト
				http.post('api/stpd/getSelectedAreaList', data)
					.then(result => {
						if (result.data.resultCode == '0000') {
							if(areaType === '1') {
								this.cityList = [{cityId: '',cityName: ''}];
								this.cityId = '';
								this.cityListIndex = 0;
								this.areaList = result.data.areaList;
								if(this.areaList.length > 0) {
									this.cityList = [];
									for(let i=0 ; i < this.areaList.length ; i++ ) {
										this.cityList.push({cityId: this.areaList[i].areaId, cityName: this.areaList[i].areaName});
									}
									// 插入选择的空白项
									this.cityList.splice(0,0,{cityId: '',cityName: '--' + this.i18n.select + '--'});
								}
								// 清空町域番地列表
								this.blockList = [{blockId: '',blockName: ''}];
								this.blockListIndex = 0;
								this.blockId = '';
							} else {
								this.blockList = [{blockId: '',blockName: ''}];
								this.blockId = '';
								this.blockListIndex = 0;
								this.areaList = result.data.areaList;
								if(this.areaList.length > 0) {
									this.blockList = [];
									for(let i=0 ; i < this.areaList.length ; i++ ) {
										this.blockList.push({blockId: this.areaList[i].areaId, blockName: this.areaList[i].areaName});
									}
									// 插入选择的空白项
									this.blockList.splice(0,0,{blockId: '',blockName: '--' + this.i18n.select + '--'});
								}
							}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.modifySuccess = 2;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 出前仕方下拉框
			bindPickerChangeDelivery: function(e) {
				//将数组改变索引赋给定义的index变量
				this.indexDelivery = e.detail.value;
				// 选择的出前仕方
				this.deliveryTypeFlag = this.deliveryTypeFlagList[this.indexDelivery].deliveryTypeFlagCd;
			},
			// 外卖订单一览的状态下拉框
			bindPickerChangeStatus: function(e) {
				//将数组改变索引赋给定义的index变量
				this.indexStatus = e.detail.value;
				// 选择的状态
				this.status = this.statusList[this.indexStatus].statusCd;
			},
			// 外卖编辑的返回按钮
			returnTakeOut:function(){
				this.state = '06';
				this.status = '';
				this.clearEditData();
				this.loadTakeOutData();
			},
			// 外卖编辑画面再发送按钮
			reSendButton:function(){
				const reg = /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/;
				if(this.customerName === ''|| this.customerName === undefined || this.customerName === null) {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请输入姓名
					this.tipMessage = this.i18n.namePlease;
				} else if(this.mailAddress === '' || this.mailAddress === undefined || this.mailAddress === null) {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请输入电子邮箱
					this.tipMessage = this.i18n.emailPlease;
				} else if(this.mailAddress !== null && this.mailAddress !== undefined && this.mailAddress !== '' && !reg.test(this.mailAddress)) {
					this.modifySuccess = 2;
					this.showalert = true;
					// 邮箱格式不正确
					this.tipMessage = this.i18n.emailStyleWrong;
				} else {
					// 显示加载画面
					this.$showLoading()
					// 参数
					const data = {
						receivablesId: this.receivablesId,
						customerName: this.customerName,
						mailAddress: this.mailAddress
					};
					http.post('api/stpd/resendMail', data)
						.then(result => {
							if (result.data.resultCode == '0000') {
								// 再发送成功
								this.modifySuccess = 3;
								this.showalert = true;
								// 再发送成功
								this.tipMessage = this.i18n.reSendSuccess;
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
							} else {
								// 系统未知错误
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
							}
							// 隐藏加载画面
							this.$hideLoading();
						}).catch(err => {
							// 网络异常，请求失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
				}
			},
			takeOutEditConfirm:function(){
				const reg = /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+$/;
				const telReg = /^0\d{9,10}$/;
				if(this.customerName === '') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请输入姓名
					this.tipMessage = this.i18n.namePlease;
				} else if(this.telNumber === '') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请输入电话号码
					this.tipMessage = this.i18n.telNumberPlease;
				} else if(!telReg.test(this.telNumber)) {
					this.modifySuccess = 2;
					this.showalert = true;
					// 电话号码格式不对
					this.tipMessage = this.i18n.wrongTelNumber;
				} else if(this.mailAddress !== null && this.mailAddress !== undefined && this.mailAddress !== '' && !reg.test(this.mailAddress)) {
						this.modifySuccess = 2;
						this.showalert = true;
						// 邮箱格式不正确
						this.tipMessage = this.i18n.emailStyleWrong;
				} else if(this.deliveryTime === '') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择配送时间
					this.tipMessage = this.i18n.timePlease;
				} else if(this.statusEdit === '') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择状态
					this.tipMessage = this.i18n.statusPlease;
				} else if(this.deliveryTypeFlagEdit === '') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择配送方式
					this.tipMessage = this.i18n.deliveryTypePlease;
				} else if(this.prefectureId === '' && this.deliveryTypeFlagEdit === '1') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择都道府県
					this.tipMessage = this.i18n.prefecturePlease;
				} else if(this.cityId === '' && this.deliveryTypeFlagEdit === '1') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择市区町村
					this.tipMessage = this.i18n.cityPlease;
				} else if(this.blockId === '' && this.deliveryTypeFlagEdit === '1') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请选择町域番地
					this.tipMessage = this.i18n.blockPlease;
				} else if(this.other === '' && this.deliveryTypeFlagEdit === '1') {
					this.modifySuccess = 2;
					this.showalert = true;
					// 请输入详细地址
					this.tipMessage = this.i18n.otherPlease;
				} else {
					// 参数
					const data = {
						storeId: getApp().globalData.storeId,
						// 注文サマリID
						orderSummaryId: this.orderSummaryId,
						customerName: this.customerName,
						telNumber: this.telNumber,
						deliveryTime: this.deliveryTime,
						mailAddress: this.mailAddress,
						status: this.statusEdit,
						deliveryTypeFlag: this.deliveryTypeFlagEdit,
						prefectureId: this.prefectureId,
						cityId: this.cityId,
						blockId: this.blockId,
						other: this.other,
						comment: this.comment,
					};
					http.post('api/stpd/updateDeliveryOrder', data)
						.then(result => {
							if (result.data.resultCode == '0000') {
								// 刷新外卖订单一览数据
								this.loadTakeOutData();
								// 编辑成功
								this.modifySuccess = 3;
								this.showalert = true;
								// 编辑成功
								this.tipMessage = this.i18n.editSuccess;
								this.state = '06';
								this.clearEditData();
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
							} else {
								// 系统未知错误
								this.modifySuccess = 2;
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
							}
						}).catch(err => {
							// 网络异常，请求失败
							this.modifySuccess = 2;
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
				}
			},
			// 外卖编辑,点击返回和确认之后,清空编辑的数据
			clearEditData:function(){
				this.customerName = '';
				this.telNumber = '';
				this.deliveryTime = '';
				this.timeIndex = 0;
				this.mailAddress = '';
				this.statusEdit = '';
				this.statusListIndex = 0;
				this.deliveryTypeFlagEdit = '';
				this.deliveryTypeFlagListIndex = 0;
				this.prefectureId = '';
				this.cityId = '';
				this.blockId = '';
				this.prefectureListIndex = 0;
				this.cityListIndex = 0;
				this.blockListIndex = 0;
				this.other = '';
				this.comment = '';
			}
		},
		// 时间格式化
		filters: {
			formatTime: function (date, fmt) {
				var date = new Date(date);
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				var o = {
					'M+': date.getMonth() + 1,
					'd+': date.getDate(),
					'h+': date.getHours(),
					'm+': date.getMinutes(),
					's+': date.getSeconds()
				};
				for (var k in o) {
					if (new RegExp('('+k+')').test(fmt)) {
						var str = o[k] + '';
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
					}
				}
				return fmt;
			},
			timeString: function(date, fmt) {
				if (fmt === '1') {
					return date.substring(0,10);
				} else if (fmt === '2') {
					return date.substring(11,date.length);
				}
			},
			thousandth: function(value) {
				var intPartFormat;
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
	.tableModuleStyle {
		float: left;
		height: 100%;
		padding-left: 3%;
		padding-right: 3%;
		width: 85.67%;
		min-height: 100%;
		max-height: 100%;
	}
	.orderPage {
		height: 100%;
	}
	.orderList {
		width: 14%;
		height: 100%;
		color: white;
		font-weight: 700;
		background-color: rgb(74, 188, 255);
		overflow: hidden;
		margin-left: 1%;
		float: left;
	}
	.transferLeftFront {
		width: 100%;
		float: left;
		height: 8%;
		text-align: center;
		font-size: 2vw;
		display: flex;
	}
	.transferLeftFronts {
		width: 100%;
		float: left;
		height: 9%;
		text-align: center;
		font-size: 2vw;
		display: flex;
	}
	.fontPosition {
		margin: auto;
		width: 100%;
		padding: 3%;
	}
	.commonActives {
		margin: auto;
		width: 100%;
		padding: 3%;
		background-color: rgba(40,40,52,0.21);
	}
	.transferRightInhand {
		float: left;
		width: 75%;
		height: 100%;
		padding-left: 1%;
	}
	.transferRightInhandTwo {
		float: left;
		width: 75%;
		height: 100%;
		padding-left: 1%;
		overflow-y: auto;
	}
	.topSearch {
		padding-top:3%;
		height: 16%;
		float: left;
		width: 100%;
		background-color: #FFFFFF;
	}
	.search-input {
		width: 23%;
		font-size: 1.5vw;
		border-radius: 4px;
		color: #555;
		border: 1px solid #3987e4;
		margin: auto 0 auto auto;
		padding: 0.5% 1%;
	}
	.search-button {
		width: 10%;
		background-color: #3987e4;
		margin: auto 1% auto 3%;
		font-size: 1.3vw;
		border-radius: 0.6vw;
		color: #fff;
		border: 0;
		font-weight: bold;
	}
	.table-responsive {
		float: left;
		width: 100%;
		height: 68%;
	}
	.transferSecondTr {
		width: 100%;
		background-color: #4e759b;
		color: #fff;
		float:left;
		font-size: 1.5vw;
		display: flex;
		height: 6%;
	}
	.transferSecondTro {
		/* height: 7.5%; */
		background-color: #4e759b;
		color: #fff;
		float:left;
		font-size: 1.5vw;
		display: flex;
	}
	.transferSecondTh {
		padding: 1.3% 1%;
		border-right: 1px solid #fff;
		text-align: center;
		/* font-weight: 700; */
	}
	.transferSecondTho {
		border-right: 1px solid #fff;
		padding: 0.7vw 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.transferSecondTrContent {
		width: 100%;
		font-size: 1.6vw;
		color: #000;
		text-align: center;
		float: left;
		display: flex;
		padding: 2% 0;
	}
	.transferSecondTrContento {
		font-size: 1.5vw;
		color: #000;
		text-align: center;
		/* font-weight: 700; */
		float: left;
		display: flex;
		padding: 1.5% 0;
	}
	.fontPositions {
		margin: auto 0;
		padding: 0% 1%;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; */
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
		height: 13%;
		float: right;
	    display: flex;
		align-items: center;
	    border-radius: 4px;
		font-size: 2vw;
		bottom: 0;
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
/* 	    border: 1px solid #ddd;
 */		font-weight: 700;
	}
	.arrow2 {
	    margin: 3px 8px 4px 0;
	    border-left: 5px dashed transparent;
	    border-bottom: 5px dashed transparent;
	    border-top: 5px dashed transparent;
	    border-right: 5px solid #ccc;
	    display: inline-block;
	    vertical-align: middle;
	}
	.arrow3 {
	    margin: 3px 0 4px 8px;
	    border-top: 5px dashed transparent;
	    border-bottom: 5px dashed transparent;
	    border-right: 5px dashed transparent;
	    border-left: 5px solid #ccc;
	    display: inline-block;
	    vertical-align: middle;
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
	.topLabel {
		font-size: 1.8vw;
		margin: auto 3% auto 3%;
	}
	.operate-button {
		width: 50%;
		background-color: #3987E4;
		color: #FFFFFF;
		font-size: 1.5vw;
	}
	.refund-button {
		width:55%;
		background-color: #3987E4;
		color: #FFFFFF;
		font-size: 1.5vw;
	}
	.table-search-button {
		width: 10%;
		background-color: #3987e4;
		margin: auto 7% auto auto;		
		font-size: 1.5vw;
		border-radius: 0.6vw;
		color: #fff;
		border: 0;
	}
	.table-pay-search-button {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 9%;
		background-color: #3987e4;
		margin: auto 1% auto auto;		
		font-size: 1.5vw;
		border-radius: 0.6vw;
		color: #fff;
		border: 0;
	}
	.table-search-input {
		width: 59%;
		height: 100%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5vw;
		border-radius: 4px;
		color: #555;
		border: 1px solid #3987e4;
/* 		margin: auto auto auto 1%;
		padding: 0.5% 1%; */
	}
	.commonModuleStyle {
		position: relative;
		height: 100%;
		color: white;
		font-weight: 700;
	}
	.tranferHistoryDiv {
		height: 12%;
		padding-top: 2%;
		display: flex;
	}
	.tranferHistoryBottom {
		float: left;
		margin-top: 3%;
		width: 100%;
		text-align: center;
		display: flex;
		font-weight: 700;
		
	}
	.transferRightCallView {
		float: left;
		width: 75%;
		height: 100%;
		padding-left: 1%;
	}
	.call-button-left {
		height: 60%;
		margin-right: 5%;
		width: 10%;
		background-color: #3987e4;
		color: #FFFFFF;
		font-weight: 600;
	}
	.call-button-right {
		height: 60%;
		margin-left: 5%;
		width: 10%;
		background-color: #3987e4;
		color: #FFFFFF;
		font-weight: 600;
	}
	.tableInfosScroll {
		width: 100%;
		margin: auto;
		width: 100%;
	}
	.uni-list-cell-db {
		font-size: 1.7vw;
		border: solid 1px #3987e4;
		text-align: center;
		border-radius: 4px;
		white-space: nowrap;
		width: 59%;
		height: 100%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.table-max-length {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}
	.searchCondition {
		width: 100%;
		height: 33%;
	}
	.startTimeSearch {
		width: 35%;
		height: 100%;
		float: left;
		margin-right: 5%;
	}
	.textLabel {
		font-size: 1.7vw;
		float: left;
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.detailButton {
	    width: 12%;
	    margin: 0.7% 0.5% 0.7% 0.5%;
	    background-color: #3987e4;
	    color: #fff;
	    border-radius: 0.5vw;
	    display: flex;
	    align-items: center;
	    justify-content: center;	
	}
	.detailButtonState{
	    width: 40%;
	    margin: 0.7% 0.5% 0.7% 0.5%;
	    background-color: #3987e4;
	    color: #fff;
	    border-radius: 0.5vw;
	    display: flex;
	    align-items: center;
	    justify-content: center;	
	}
	.receiptButton {
	    width: 11%;
	    margin: 0.7% 0.5% 0.7% 0.5%;
	    background-color: #3987e4;
	    color: #fff;
	    border-radius: 0.5vw;
	    display: flex;
	    align-items: center;
	    justify-content: center;	
	}
	.detailButtonTwo {
		background-color: #3987e4;
		color: #fff;
		border-radius: 0.5vw;
		display: flex;
		align-items: center;
		justify-content: center;	
		width: 22%;
		margin: 1.7% 1.5% 1.7% 1.5%;
	}
	.printButtonType {
			background-color: #3987e4;
			color: #fff;
			font-size: 2vw;
			border-radius: 0.5vw;
			display: center;
			align-items: center;
			line-height: 4vw;
			justify-content: center;	
			width: 70%;
			height: 4vw;
			margin: 1.7% 1.5% 1.7% 15%;
		}
	.fontPositionsoTwo {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		width: 25%;
		overflow-x: auto;
		margin: 0px;
	}
	.editPartOne {
		width: 96%;
		margin: 3% 2% 0% 2%;
		height: 70%;
		float: left;
		background-color: #e0efff;
		border-radius: 20px;
		text-align: center;
	}
	.editPartTwo {
		width: 96%;
		margin: 9% 2% 2% 2%;
		height: 71%;
		float: left;
		background-color: #e0efff;
		border-radius: 20px;
		text-align: center;
	}
	.titleLine {
		width: 30%;
		height: 8%;
		float: left;
		margin: 2% 35% 0% 35%;
		font-size: 2.1vw;
		font-weight: 500;
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.nameClass {
		width: 70%;
		height: 7.2%;
		display: flex;
		margin: 2% 0% 0% 12%;
		float: left;
	}
	.titleLineTwo {
		width: 30%;
		height: 12%;
		float: left;
		margin: 2% 35% 0% 35%;
		font-size: 2.1vw;
		font-weight: 500;
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.nameClassTwo {
		width: 70%;
		height: 12%;
		display: flex;
		margin: 2% 10% 0% 12%;
		float: left;
	}
	.nameLable {
		font-size: 1.7vw;
		width: 20%;
		text-align: left;
		display: flex;
		align-items: center;
		margin-right: 3%;
	}
	.reSend {
		width: 14%;
		background-color: #3987e4;
		color: white;
		font-size: 1.7vw;
		border-radius: 5px;
		margin-left: 2%;
		margin-right: 1%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		float: left;
	}
	.buttonLine {
		width: 80%;
		margin: 4% 10% 4% 10%;
		display: flex;
		height: 5%;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
		float: left;
	}
	.buttonLineTwo {
		width: 80%;
		margin: 5% 10% 4% 10%;
		display: flex;
		height: 5%;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
		float: left;
	}
	.buttonStyle {
		float: left;
		font-size: 1.7vw;
		background-color: #3987e4;
		width: 16%;
		height: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 5px;
		display: flex;
	}
	.overLong {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
