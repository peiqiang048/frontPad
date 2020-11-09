<template>
	<!-- 结账界面 整体屏幕 宽度100% 高度100% -->
	<view class="accountBody" v-bind:style="{ height: windowHeight + 'px' }">
		<!-- 左侧栏-订单信息 宽度33% 右外边距20px 高度100% -->
		<view class="account-left" style="position: relative;">
			<!-- 顶部蓝色背景部分 -->
			<view class="account-left-row1" id="account-left-top">
				<!-- 左侧返回按钮 右侧人数 -->
				<view class="account-left-row1-1">
					<!-- 左侧返回按钮 -->
					<view style="flex: 1;" class="account-display account-hidden">
						<!-- 返回按钮图片 -->
						<image v-if="!reSettlementFlag" class="leftReturn" :src="leftReturn" @click="ToTableVue"></image>
						<view class="account-left-row1-1-1 account-font-size-small account-hidden" style="margin: auto 10px auto 5px;font-size: 2vw;">
							￥{{orderAmount | numFilter}}
						</view>
					</view>
					<!-- 右侧人数 -->
					<view class="account-font-size-small account-display" style="flex: none;margin: auto 10px;">
						<!-- 人数 -->
						<view class="leftQuanText">
							<!-- 多语言 - 人数 -->
							{{i18n.numberPeople}} : {{customerPeopleCount}}
						</view>
					</view>
				</view>
			</view>
			<view v-bind:style="{ height: leftCenterHeight + 'px' }">
				<view style="width: 100%;height: 91.5%;">
					<!-- 底部白色背景部分：订单信息 -->
					<scroll-view scroll-y="true" class="account-left-row2" id="orderItemList" @scroll="scrollfunc">
						<block v-for="(item ,index) in orderItemList" :key="index">
							<!-- 一行菜品信息(绿色圈未结算菜品) 宽度100% 高度自适应 -->
							<view :class="[item.status === 'false' ? 'account-left-row2-1' : 'account-left-row2-2' ]">
								<view class="account-left-row-itemOption" style="height: 5vw;font-size: 1.5vw;">
									<!-- 菜品名 -->
									<view class="account-item-name" @click="changeStatus(index)">
										<view class="account-item-name-left">
											<!-- 绿色圈图片 -->
											<image class="leftQuanImg" :src="leftGreenQuan"></image>
										</view>
										<view class="account-item-name-right">
											<!-- 菜名 -->
											{{item.itemName}}
										</view>
									</view>
									<!-- 菜品数量 -->
									<view class="account-item-number">
										<view v-if="item.status === 'true' && item.itemCount > 1 " class="account-item-number-jian" @click="reduceItemCount(index)">-</view>
										<view v-if="item.status === 'true' && item.itemCount > 1" class="account-item-number-middle">{{item.actualItemCount}}</view>
										<view v-if="item.status === 'true' && item.itemCount > 1  " class="account-item-number-jia" @click="addItemCount(index)">+</view>
									</view>
									<!-- 菜品数量 -->
									<view class="account-item-money" @click="changeStatus(index)">
										×{{item.itemCount}}
									</view>
									<!-- 菜品价格 -->
									<view class="account-item-money" @click="changeStatus(index)">
										￥{{item.itemPrice | numFilter}}
									</view>
								</view>
								<view class="account-left-row-itemOption" style="font-size: 1.5vw;" @click="changeStatus(index)">
									<!-- 特殊需求拼接一起 -->
									<view v-if="item.itemOption !== null && item.itemOption !== undefined && item.itemOption !== ''" class="account-item-name"
									 style="width: 100%;height: 2.5vw;line-height: 2vw;">
										<view class="account-item-name-left" style="width: 1.7vw;height: 1.7vw;">
										</view>
										<view class="account-item-name-right">
											<!-- 特殊需求 -->
											{{item.itemOption}}
										</view>
									</view>
								</view>
							</view>
						</block>
						<!-- 滑动到底部提示 -->
						<view class="account-left-row2-1" style="text-align: center;font-size: 1.2vw;color: #989898;" v-if="scrollBottomTips">
							<!-- 多语言 - &nbsp;&nbsp;我是有底线的&nbsp;&nbsp; -->
							---&nbsp;&nbsp;{{i18n.orderAccount.bottomLine}}&nbsp;&nbsp;---
						</view>
					</scroll-view>
				</view>
				<view class="dutchTreatment-all">
					<view class="dutchTreatment-all-left">
						<!-- 人数 -->
						<view class="dutchTreatment-people">
							<view class="ellipsisClass">{{i18n.numberPeople}}：</view>
						</view>
						<!-- 减少人数 -->
						<view class="dutchTreatment-people-jian" @click="reducePeopleCount">-</view>
						<!-- 人数数量 -->
						<view class="dutchTreatment-people-number">{{changePeolpleCount}}</view>
						<!-- 增加人数 -->
						<view class="dutchTreatment-people-jia" @click="addPeopleCount">+</view>
					</view>
					<!-- 全选 -->
					<view v-if="selectallAndCancel === '0'" class="dutchTreatment-all-middle" @click="selectAll">
						<view class="ellipsisClass">{{i18n.selectAll}}</view>
					</view>
					<!-- 取消 -->
					<view v-if="selectallAndCancel === '1'" class="dutchTreatment-all-middle" @click="cancelAll">
						<view class="ellipsisClass">{{i18n.cancelAccountShare}}</view>
					</view>
					<!-- 计算 -->
					<!-- <view class="dutchTreatment-all-right" @click="calculation">{{i18n.calculation}}</view> -->
				</view>
			</view>
			<!-- 5px高度间隔 -->
			<view style="width: 100%;float: left;height: 3px;background-color: white;">
			</view>
			<view class="account-left-row3" id="account-left-bottom" style="font-size: 1.5vw;position: absolute;bottom: 0px;">
				<view style="float: left;width: 100%;display: flex;margin-top: 10px;margin-bottom: 10px;">
					<view class="account-left-row3-left">
						<view class="account-left-row3-text" v-bind:style="{ 'background-color': foreignTaxSwithStyleL}" @click="foreignTaxSwithClick('0')">
							<!-- 多语言 - 店内就餐（标准税率） -->
							{{i18n.orderAccount.inStoreDining}}
						</view>
					</view>
					<view class="account-left-row3-right">
						<view class="account-left-row3-text" v-bind:style="{ 'background-color': foreignTaxSwithStyleR}" @click="foreignTaxSwithClick('1')">
							<!-- 多语言 - 打包带走（轻减税率） -->
							{{i18n.orderAccount.packAndTakeAway}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 右侧栏-结账信息 宽度(display:flex;排布，自动补充剩余宽度) 高度100% -->
		<view v-if="!discountShow" class="account-right">
			<view class="account-right-row1 account-display">
				<view style="flex: 1;" class="account-display"></view>
				<!-- 订单未收信息 -->
				<view style="flex: none;margin: auto;" class="account-display">
					<view class="account-font-size-small" style="margin: auto 0px 5px 10px;padding-bottom: 0px;color: white;font-weight: 600;font-size: 1.7vw;">
						<view style="float: left;margin-right: 15px;">
							{{i18n.orderAccount.uncollected}}: ￥{{orderUncollectedAmount | thousandthSign}}
						</view>
					</view>
				</view>
				<!-- 折扣按钮 -->
				<view class="account-font-size-small account-display" style="flex: none;margin: auto;">
					<view class="account-discount" @click="discountShowClick()">
						<!-- 多语言 - 优惠 -->
						{{i18n.orderAccount.discount}}
					</view>
				</view>
			</view>
			<!-- 底部白色背景部分：订单信息 -->
			<view class="account-right-row2" v-bind:style="{ height: rightCenterHeight + 'px' }">
				<!-- 左侧支付方式列表 -->
				<view class="account-pay-left" v-bind:style="{ height: rightCenterHeight + 'px' }">
					<block v-for="(item ,index) in paymentTypeList" :key="index">
						<view @click="payMethodSelect(item.paymentCode, item.paymentName)" class="account-pay-method" v-bind:class="[paymentTypeIsActive == item.paymentCode ? 'account-pay-method-background' : paymentTypeIsActive != 1, '']">
							<view style="padding: 20px 5px;display: flex;">
								<view style="flex: none;display: flex;">
									<image class="jinEImg" :src="jinEImg"></image>
								</view>
								<view class="account-pay-method-right">
									{{item.paymentName}}
								</view>
							</view>
						</view>
					</block>
				</view>
				<!-- 右侧支付金额模块 -->
				<view class="account-pay-right">
					<!-- API小计金额 -->
					<view class="account-pay-money account-display">
						<view style="float: left;margin-left: 60px;flex: none;">
							<!-- 多语言 - 小计: ￥ -->
							{{i18n.orderAccount.subtotal}}: ￥
						</view>
						<view class="account-hidden" style="float: left;flex: 1;">
							{{subtotal | thousandthSign}}
						</view>
					</view>
					<!-- API外税金额 -->
					<view class="account-pay-money account-display">
						<view style="float: left;margin-left: 60px;flex: none;">
							<!-- 多语言 - 外税: ￥ -->
							{{i18n.orderAccount.foreignTax}}: ￥
						</view>
						<view class="account-hidden" style="float: left;flex: 1;">
							{{foreignTax | thousandthSign}}
						</view>
					</view>
					<!-- API总计金额 -->
					<view class="account-pay-money account-display">
						<view style="float: left;margin-left: 60px;flex: none;">
							<!-- 多语言 - 合计: ￥ -->
							{{i18n.orderAccount.total}}: ￥
						</view>
						<view class="account-hidden" style="float: left;flex: 1;">
							{{total | thousandthSign}}
						</view>
					</view>
					<!-- 优惠金额 -->
					<view class="account-pay-money account-display">
						<view style="float: left;margin-left: 60px;flex: none;">
							<!-- 多语言 - 优惠: ￥ -->
							{{i18n.orderAccount.discount}}: ￥
						</view>
						<view class="account-hidden" style="float: left;flex: 1;">
							{{orderAmountDiscount | thousandthSign}}
						</view>
					</view>
					<!-- 找零-->
					<view v-if="paymentTypeIsActive === '00'" class="account-pay-money account-display">
						<view style="float: left;margin-left: 60px;flex: none;">
							{{i18n.orderAccount.change}}: ￥
						</view>
						<view class="account-hidden" style="float: left;flex: 1;">
							{{giveChangeAmount | thousandthSign}}
						</view>
					</view>
					<!-- QRコードPAY -->
					<view v-if="paymentTypeIsActive === '98' || (paymentTypeIsActive >= '21' && paymentTypeIsActive <= '36')" class="QRPay">
						<view class="QRPayTop">{{i18n.paymentCode}}：</view>
						<input @input="inputChange" maxlength="200" :value="paymentCodeQR" class="QRPayCenter" />
						<view class="QRPayBottom" @click="getPaymentCodeQR">{{i18n.read}}</view>
					</view>
					<!-- 显示当前选中支付方式 -->
					<view v-if="paymentTypeIsActive !== '98' && (paymentTypeIsActive < '21' || paymentTypeIsActive > '36')" style="float: left;width: 100%;margin-top: 6%;font-size: 1.7vw;">
						<view style="float: left;margin-left: 60px;font-weight: bold;">
							{{paymentTypeNameIsActive}}
							<!-- 多语言 - 金额 -->
							{{i18n.orderAccount.money}}
						</view>
					</view>
					<!-- 实付金额与清空按钮模块 -->
					<view :class="(paymentTypeIsActive !== '98' && (paymentTypeIsActive < '21' || paymentTypeIsActive > '36')) ? 'paidInAmount' : 'paidInAmountOther'">
						<view style="float: left;width: 71%;margin-left: 60px;height: 100%;">
							<!-- 实付金额  ￥+金额-->
							<view class="account-hidden" style="float: left;width: 75%;background-color: #4e759b;height: 100%;text-align: center;display: flex;align-items: center;justify-content: center;">
								￥{{payInAmount | thousandthSign}}
							</view>
							<!-- 实付金额清空按钮 -->
							<view style="float: left;width: 25%;background-color: #4e759b;height: 100%;text-align: center;" @click="clearPayInAmount">
								<view style="border-left: 1px solid #fff;height: 100%;display: flex;align-items: center;justify-content: center;">
									<!-- 多语言 - 清空 -->
									{{i18n.orderAccount.clear}}
								</view>
							</view>
						</view>
					</view>
					<!-- 数字键盘模块 -->
					<view :class="(paymentTypeIsActive !== '98' && (paymentTypeIsActive < '21' || paymentTypeIsActive > '36')) ? 'digitalKeyboardClass' : 'digitalKeyboardClassOther'">
						<view style="float: left;margin-left: 60px;width: 71%;text-align: center;height: 100%;" id="accountKeyboard">
							<!-- 数字键盘 -->
							<table style="width: 100%;border-spacing: 0;height: 100%;">
								<tr>
									<!-- 数字键盘 1 -->
									<td @click="digitalKeyboard('1')">
										1
									</td>
									<!-- 数字键盘 2 -->
									<td @click="digitalKeyboard('2')">
										2
									</td>
									<!-- 数字键盘 3 -->
									<td @click="digitalKeyboard('3')">
										3
									</td>
									<!-- 结账按钮点击事件 -->
									<td rowspan="4" @click="toCheckOut()">
										<!-- 多语言 - 结账 -->
										{{i18n.orderAccount.closing}}
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 4 -->
									<td @click="digitalKeyboard('4')">
										4
									</td>
									<!-- 数字键盘 5 -->
									<td @click="digitalKeyboard('5')">
										5
									</td>
									<!-- 数字键盘 6 -->
									<td @click="digitalKeyboard('6')">
										6
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 7 -->
									<td @click="digitalKeyboard('7')">
										7
									</td>
									<!-- 数字键盘 8 -->
									<td @click="digitalKeyboard('8')">
										8
									</td>
									<!-- 数字键盘 9 -->
									<td @click="digitalKeyboard('9')">
										9
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 . -->
									<td @click="digitalKeyboard('00')">
										00
									</td>
									<!-- 数字键盘 0 -->
									<td @click="digitalKeyboard('0')">
										0
									</td>
									<!-- 数字键盘 删除按钮 -->
									<td @click="digitalKeyboard('del')">
										<image style="width: 2vw;height: 2vw;margin-top: 5%;" :src="leftJianTouImg"></image>
									</td>
								</tr>
							</table>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 右侧让价优惠模块 -->
		<view v-if="discountShow" class="account-right-discount">
			<!-- 顶部蓝色部分 -->
			<view class="account-right-row1 account-display">
				<!-- 整单和单品切换按钮 -->
				<view class="discount-top" v-bind:style="{ 'font-size': fontSize }">
					<view @click="discountActiveClick('0')" class="discount-center-left" v-bind:class="[discountActive == '0' ? 'discountActive' : paymentTypeIsActive != '0', '']">
						<!-- 多语言 - 整单折扣 -->
						{{i18n.orderAccount.fullOrderDiscount}}
					</view>
					<view @click="discountActiveClick('1')" class="discount-center-right" v-bind:class="[discountActive == '1' ? 'discountActive' : paymentTypeIsActive != '1', '']">
						<!-- 多语言 - 整单让价 -->
						{{i18n.orderAccount.fullOrderAllowance}}
					</view>
				</view>
				<!-- 右侧返回按钮 -->
				<view class="discount-top-right">
					<image @click="discountShowClick()" style="width: 4vw;height: 4vw;margin-top: 1vw;" :src="chaHaoImg"></image>
				</view>
			</view>
			<!-- 优惠模块底部白色部分 -->
			<view class="account-left-row2" style="overflow-y: hidden;display: flex;" v-bind:style="{ height: rightCenterHeight + 'px' }">
				<view style="width: 100%;margin: auto;">
					<!-- 实付金额与清空按钮模块 -->
					<view style="float: left;width: 100%;margin-top: 40px;color: white;font-size: 1.5vw;font-size: 1.9vw;font-weight: bold;">
						<view style="float: left;width: 71%;margin-left: 60px;">
							<!-- 实付金额  ￥+金额-->
							<view class="account-hidden" style="float: left;width: 66.7%;background-color: #4e759b;height: 5vw;line-height: 5vw;text-align: center;">
								<span v-if="discountActive == '1' && discountAmount != ''">-</span>
								<span v-if="discountActive == '0'">
									{{discountAmount}}
								</span>
								<span v-if="discountActive == '1'">
									{{discountAmount | thousandthSign}}
								</span>
								<span v-if="discountActive == '0' && discountAmount != ''">
									<!-- 多语言 - 折 -->
									{{i18n.orderAccount.fracture}}
								</span>
							</view>
							<!-- 实付金额清空按钮 -->
							<view style="float: left;width: 33.3%;background-color: #4e759b;height: 5vw;line-height: 5vw;text-align: center;"
							 @click="discountSure()">
								<view style="border-left: 1px solid #fff;">
									<!-- 多语言 - 确定 -->
									{{i18n.orderAccount.sure}}
								</view>
							</view>
						</view>
					</view>
					<!-- 优惠数字键盘模块 -->
					<view style="float: left;width: 100%;margin-top: 50px;color: white;font-size: 1.5vw;font-size: 1.9vw;font-weight: bold;">
						<view style="float: left;margin-left: 60px;width: 71%;line-height: 5vw;text-align: center;" id="accountKeyboard">
							<!-- 数字键盘 -->
							<table style="width: 100%;border-spacing: 0;">
								<tr>
									<!-- 数字键盘 1 -->
									<td @click="digitalKeyboard('1')">
										1
									</td>
									<!-- 数字键盘 2 -->
									<td @click="digitalKeyboard('2')">
										2
									</td>
									<!-- 数字键盘 3 -->
									<td @click="digitalKeyboard('3')">
										3
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 4 -->
									<td @click="digitalKeyboard('4')">
										4
									</td>
									<!-- 数字键盘 5 -->
									<td @click="digitalKeyboard('5')">
										5
									</td>
									<!-- 数字键盘 6 -->
									<td @click="digitalKeyboard('6')">
										6
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 7 -->
									<td @click="digitalKeyboard('7')">
										7
									</td>
									<!-- 数字键盘 8 -->
									<td @click="digitalKeyboard('8')">
										8
									</td>
									<!-- 数字键盘 9 -->
									<td @click="digitalKeyboard('9')">
										9
									</td>
								</tr>
								<tr>
									<!-- 数字键盘 . -->
									<td @click="digitalKeyboard('.')">
										.
									</td>
									<!-- 数字键盘 0 -->
									<td @click="digitalKeyboard('0')">
										0
									</td>
									<!-- 数字键盘 删除按钮 -->
									<td @click="digitalKeyboard('del')">
										<image style="width: 2vw;height: 2vw;margin-top: 2vw;" :src="leftJianTouImg"></image>
									</td>
								</tr>
							</table>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<view v-if="warnSuccess == 1 " class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<view v-if="warnSuccess == 2 " class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
				<!-- 提示信息 -->
				<h2>{{tipMessage}}</h2>
				<view class="sa-button-container">
					<!-- 取消按钮 -->
					<button v-if="modifySuccess != 2 " style="display: inline-block; background-color: #adadad;" @click="cancelButton">{{i18n.cancel}}</button>
					<!-- 确认按钮 -->
					<button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
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
				// 返回按钮图片
				leftReturn: '../../static/ai-01.png',
				// 绿色圈图片
				leftGreenQuan: '../../static/quan.png',
				// 红色圈图片
				leftRedQuan: '../../static/AlreadyFood.png',
				// 左箭头图片
				leftJianTouImg: '../../static/jiantou.png',
				// 叉号图片 返回按钮
				chaHaoImg: '../../static/chahao.png',
				// 支付方式左侧图片 -- 金额图片
				jinEImg: '../../static/jinE.png',
				// 左侧中间部分高度
				leftCenterHeight: '0',
				// 右侧底部部分高度
				rightCenterHeight: '0',
				// id为orderItemList的滚动条区域
				orderItemListScroll: '',
				// 是否显示已经滑动到底部提示 false不显示  true显示
				scrollBottomTips: false,
				// 支付方式列表 -- 数组
				paymentTypeList: [],
				// 选中的支付方式 typeCode
				paymentTypeIsActive: '',
				// 选中的支付方式 名称
				paymentTypeNameIsActive: '',
				// 未收金额 -- 实际收取客户金额
				orderUncollectedAmount: '',
				// 优惠金额 为空时,不显示该项
				orderAmountDiscount: '0',
				// 税收金额 - API外税
				foreignTax: '',
				// 订单金额 - API小計
				subtotal: '',
				// 合计 - API合計
				total: '',
				// 实付金额
				payInAmount: '',
				// 订单金额 -- API小計保持不变 -- 作为原订单金额去计算
				orderAmount: '',
				// 订单菜品列表 -- 数组
				orderItemList: [],
				// 是否显示提示框 false不显示 true显示
				showalert: false,
				// 是否显示提示框取消按钮 2不显示 否则显示
				modifySuccess: '1',
				// 提示框显示警告图片还是成功图片（1：警告图片  2：成功图片）
				warnSuccess: '',
				// 弹框提示信息
				tipMessage: '',
				// 参数错误标识 false 参数错误  true 正常
				buttonStatus: true,
				// 是否显示优惠界面 true显示 false不显示
				discountShow: false,
				// 选择整单折扣（'0'） 或者 选择整单让价（'1'）
				discountActive: '0',
				// 整单折扣（8） 或者 整单让价金额
				discountAmount: '',
				// 切换就餐方式 店内就餐（标准税率）:'0'  打包带走（轻减税率）:'1'
				foreignTaxSwith: '',
				// 当前切换语言
				languages: 'zh_CN',
				// 界面字体大小 （整单折扣，整单让价）
				fontSize: '2vw',
				// 记录前一个界面的当前桌号
				nowTable: '',
				// 记录前一个界面的当前桌台位置
				nowAreaId: '',
				// 店内就餐（标准税率） 按钮颜色
				foreignTaxSwithStyleL: '',
				// 打包带走（轻减税率） 按钮颜色
				foreignTaxSwithStyleR: '',
				// 重新结账订单区分 true:重新结算  false:正常结账
				reSettlementFlag: false,
				// 屏幕高度
				windowHeight: 0,
				// 割引额
				priceDiscountAmount: '',
				// 割引率
				priceDiscountRate: '',
				// 付款码
				paymentCodeQR: '',
				// 点击按钮为结算按钮
				isAccount: 0,
				// 总人数
				customerPeopleCount: '',
				// 提交的人数
				changePeolpleCount: 1,
				// 支払区分01:普通、02:割勘
				paymentDistinction: '',
				// 找零
				giveChangeAmount: 0,
				// 最後注文フラグ 0:非、1:是
				lastOrderFlag: '',
				// 判断是全选还是取消  0全选  1取消
				selectallAndCancel: '0',
				// お釣メッセージ
				paymentChangeMessage: '',
				// 印刷結果
				printSuccessResult: ''
			}
		},
		// 监听页面加载
		onLoad: function(option) {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					// 获取屏幕高度
					that.windowHeight = res.windowHeight;
				}
			});
			// 当前切换语言
			this.languages = this._i18n.locale;
			if (this.languages === 'zh_CN' || this.languages === 'ko_KN') {
				// 界面字体大小 （整单折扣，整单让价）
				this.fontSize = '2vw';
			} else if (this.languages === 'ja_JP' || this.languages === 'en_US') {
				// 界面字体大小 （整单折扣，整单让价）
				this.fontSize = '1.5vw';
			}

			if (option.item != undefined && option.item != null && option.item != '') {
				// URL上取得参数
				const item = JSON.parse(decodeURIComponent(option.item));
				// 当前结账订单的订单号
				this.receivablesId = item.nowReceivablesId;
				// 记录前一个界面的当前桌号
				this.nowTable = item.nowTable;
				// 记录前一个界面的当前桌台位置
				this.nowAreaId = item.nowAreaId;
				// 重新结账订单区分 true:重新结算  false:正常结账
				if (item.reSettlementFlag === 'true') {
					// true:重新结算
					this.reSettlementFlag = true;
				} else if (item.reSettlementFlag === 'false') {
					// false:正常结账
					this.reSettlementFlag = false;
				} else {
					//  true:重新结算  false:正常结账
					this.reSettlementFlag = item.reSettlementFlag;
				}
				// 人数
				this.customerPeopleCount = item.customerPeopleCount;
				// 支払区分
				this.paymentDistinction = item.paymentDistinction;
				// API获取订单信息和支付方式，包括菜品信息，金额，数量，订单金额等
				this.getAccountInit();
				this.buttonStatus = true;
			} else {
				// 参数错误
				this.buttonStatus = false;
				// 返回结果异常提示 -- '参数错误，请退出重试'
				this.tipShow(this.i18n.orderAccount.messageF, true, '2', '1');
			}
			// お釣メッセージ
			this.paymentChangeMessage = this.i18n.settlementSuccessfulChange;
			// 接收扫码的值
			let _this = this;
			// $eventHub在mainjs定义了 
			_this.$eventHub.$on("scanResult", function(data) {
				_this.paymentCodeQR = data.result;
			});
		},
		// 监听页面初次渲染完成
		onReady: function() {
			// 重新计算各模块尺寸
			this.onWindowResize();
		},
		// 离开界面时触发
		onHide: function() {},
		methods: {
			// 跳转订单信息页面
			ToTableVue: function(obj) {
				const item = {
					// 当前结账订单的订单号
					nowReceivablesId: this.receivablesId,
					// 记录前一个界面的当前桌号
					id: this.nowTable,
					// 记录前一个界面的当前桌台位置
					areaId: this.nowAreaId
				};
				// 跳转订单一览界面
				uni.reLaunch({
					url: '/pages/table/table?item=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			// 滚动条滚动触发事件
			scrollfunc: function(e) {},
			// 窗口尺寸计算
			onWindowResize: function() {
				// 作用域 定义that
				const that = this;
				uni.getSystemInfo({
					success: function(res) {
						// 左侧中间部分高度
						that.leftCenterHeight = res.windowHeight;
						// 右侧底部部分高度
						that.rightCenterHeight = res.windowHeight;
						const queryTop = wx.createSelectorQuery();
						queryTop.select('#account-left-top').boundingClientRect();
						queryTop.selectViewport().scrollOffset();
						queryTop.exec(function(res_top) {
							// 左侧中间部分高度  窗口高度-顶部蓝色部分高度-底部按钮部分高度
							that.leftCenterHeight = (that.leftCenterHeight - res_top[0].height - 3);
							// // 右侧底部部分高度  窗口高度-顶部蓝色部分高度
							that.rightCenterHeight = (that.rightCenterHeight - res_top[0].height);
						})
						const queryBottom = wx.createSelectorQuery();
						queryBottom.select('#account-left-bottom').boundingClientRect();
						queryBottom.selectViewport().scrollOffset();
						queryBottom.exec(function(res_bottom) {
							// 左侧中间部分高度  窗口高度-顶部蓝色部分高度-底部按钮部分高度
							that.leftCenterHeight = (that.leftCenterHeight - res_bottom[0].height);
						})
					}
				});
			},
			// 提示框确认按钮
			confirmButton: function() {
				this.showalert = false;
				if (this.isAccount === 1) {
					// 未收金额等于支付金额，说明为最后一次结算，跳转到桌台界面
					if (this.lastOrderFlag === '1') {
						uni.reLaunch({
							url: '/pages/tableList/tableList'
						});
					} else {
						// 清空支付金额
						this.clearPayInAmount();
						// 清空付款码
						this.paymentCodeQR = '';
						// 全选按钮显示，隐藏取消按钮
						this.selectallAndCancel = '0';
						// 总人数
						this.customerPeopleCount = Number(this.customerPeopleCount) - Number(this.changePeolpleCount),
							// 提交人数变为1
							this.changePeolpleCount = '1';
						// 多次结算的订单需重新获取数据
						this.getAccountInit();
					}
					this.isAccount = 0;
				}
			},
			// 提示框取消按钮
			cancelButton: function() {
				this.showalert = false;
			},
			// 选择支付方式
			payMethodSelect: function(e, v) {
				this.paymentTypeIsActive = e;
				this.paymentTypeNameIsActive = v;
				// 清空支付金额
				this.clearPayInAmount();
				// 清空付款码
				this.paymentCodeQR = '';
			},
			// 清空实付金额事件
			clearPayInAmount: function() {
				this.payInAmount = '';
				// 找零金额清零
				this.giveChangeAmount = 0;
			},
			// 改变付款码文本框
			inputChange(e) {
				this.paymentCodeQR = e.detail.value;
			},
			// 数字键盘点击事件
			digitalKeyboard: function(e) {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				// 键盘区分
				if (!this.discountShow) {
					// 结算界面键盘
					if (e === 'del') {
						// 点击删除，去除最后一位
						this.payInAmount = this.payInAmount.substring(0, this.payInAmount.length - 1);
					} else {
						// 拼接字符
						this.payInAmount = this.payInAmount + e;
					}
					//先把非数字的都替换掉，除了数字
					this.payInAmount = this.payInAmount.replace(/[^\d]/g, '');
					if (this.payInAmount !== undefined && this.payInAmount !== null && this.payInAmount !== '' && !isNaN(this.payInAmount)) {
						// 避免出现以0开头的数值
						this.payInAmount = parseFloat(this.payInAmount).toString();
					}
					// 计算找零金额
					if (this.payInAmount === null || this.payInAmount === undefined || this.payInAmount === '') {
						this.giveChangeAmount = 0;
					} else {
						if (parseFloat(this.payInAmount) > parseFloat(this.orderUncollectedAmount)) {
							this.giveChangeAmount = parseFloat(this.payInAmount) - parseFloat(this.orderUncollectedAmount);
						}
					}
				} else {
					// 优惠界面键盘
					if (e === 'del') {
						// 点击删除，去除最后一位
						this.discountAmount = this.discountAmount.substring(0, this.discountAmount.length - 1);
					} else {
						// 拼接字符
						this.discountAmount = this.discountAmount + e;
					}
					// 选择整单折扣（'0'） 或者 选择整单让价（'1'）
					if (this.discountActive === '0') {
						if (this.subtotal !== 0) {
							// 必须保证第一个为数字而不是.
							this.discountAmount = this.discountAmount.replace(/^\./g, '');
							// 保证只有出现一个.而没有多个. 
							this.discountAmount = this.discountAmount.replace(/\.{2,}/g, '.');
							// 保证.只出现一次，而不能出现两次以上 
							this.discountAmount = this.discountAmount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
							// 只能输入两个小数
							this.discountAmount = this.discountAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
							// 最大10折，相当于免单
							if (this.discountAmount !== '' && parseFloat(this.discountAmount) > 10) {
								// 点击删除，去除最后一位
								this.discountAmount = this.discountAmount.substring(0, this.discountAmount.length - 1);
							} else if (this.discountAmount !== '' && parseFloat(this.discountAmount) === 10) {
								//先把非数字的都替换掉，除了数字
								this.discountAmount = this.discountAmount.replace(/[^\d]/g, '');
							}
						} else {
							this.discountAmount = '';
						}
					} else {
						//先把非数字的都替换掉，除了数字
						this.discountAmount = this.discountAmount.replace(/[^\d]/g, '');
						if (this.discountAmount !== '' && parseFloat(this.discountAmount) > parseFloat(this.subtotal)) {
							// 让价金额大于订单金额，直接舍弃最后一位
							this.discountAmount = this.discountAmount.substring(0, this.discountAmount.length - 1);
						}
					}
					if (this.discountAmount !== undefined && this.discountAmount !== null && this.discountAmount !== '' && !isNaN(
							this.discountAmount)) {
						// 取最后一位，判断是不是以小数点结尾
						const point = this.discountAmount.substring(this.discountAmount.length - 1, this.discountAmount.length);
						// 避免出现以0开头的数值
						this.discountAmount = Number(this.discountAmount).toString();
						// 如果以小数点结尾，则拼上小数点
						if (point === '.') {
							// 处理完数值，拼接小数点
							this.discountAmount = this.discountAmount + point;
						}
					}
				}

			},
			// API获取订单信息，包括菜品信息，金额，数量，订单金额等
			getAccountInit: function() {
				// 滚动条滚动隐藏底部提示
				this.scrollBottomTips = false;
				// 清空订单菜品列表 -- 数组
				this.orderItemList = [];
				// 参数
				const dataParameter = {
					// 门店id
					storeId: getApp().globalData.storeId,
					// 语言
					languages: this._i18n.locale,
					// 受付ID
					receivablesId: this.receivablesId,
					// 就餐方式
					takeoutFlag: this.foreignTaxSwith,
					// 支払区分
					paymentDistinction: '02'
				};
				// 获取订单商品信息
				http
					.post('api/stpd/getAccountInit', dataParameter)
					.then(result => {
						// 返回结果正常
						if (result.data.resultCode === '0000') {
							// 税收 - API外税
							this.foreignTax = result.data.foreignTax;
							// 订单金额 - API小計
							this.subtotal = result.data.subtotal;
							// 订单金额 -- 保持不变 -- 作为原订单金额去计算
							this.orderAmount = result.data.subtotal;
							// 合计 - API合計
							this.total = result.data.total;
							// 未收金额 -- 实际收取客户金额
							this.orderUncollectedAmount = result.data.unpay;
							// 割引额
							this.priceDiscountAmount = result.data.priceDiscountAmount;
							// 割引率
							this.priceDiscountRate = result.data.priceDiscountRate;
							// 订单商品
							const itemListJson = result.data.itemList;
							for (let i = 0; i < itemListJson.length; i++) {
								itemListJson[i]['status'] = 'false';
								itemListJson[i]['actualItemCount'] = itemListJson[i].itemCount;
								this.orderItemList.push(itemListJson[i]);
							}

							// 支付方式
							this.paymentTypeList = result.data.paymentTypeList;
							// 如果能查询到支付方式
							if (this.paymentTypeList.length > 0) {
								// 将第一个支付方式作为默认的支付方式code
								this.paymentTypeIsActive = this.paymentTypeList[0].paymentCode;
								// 将第一个支付方式作为默认的支付方式名称
								this.paymentTypeNameIsActive = this.paymentTypeList[0].paymentName;
							} else {
								// 没有支付方式，默认值空 code
								this.paymentTypeIsActive = '';
								// 没有支付方式，默认值空 名称
								this.paymentTypeNameIsActive = '';
							}

							// 就餐区分
							if (result.data.takeoutFlag === '') {
								this.foreignTaxSwith = '0';
								this.foreignTaxSwithStyleL = '#3987e4';
								this.foreignTaxSwithStyleR = '#C1C1C1';
							} else {
								this.foreignTaxSwith = result.data.takeoutFlag;
								if (this.foreignTaxSwith === 0 || this.foreignTaxSwith === '0') {
									this.foreignTaxSwithStyleL = '#3987e4';
									this.foreignTaxSwithStyleR = '#C1C1C1';
								} else if (this.foreignTaxSwith === 1 || this.foreignTaxSwith === '1') {
									this.foreignTaxSwithStyleL = '#C1C1C1';
									this.foreignTaxSwithStyleR = '#3987e4';
								}
							}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.tipShow(this.i18n.parameterVerificationFailed, true, '2', '1');
							this.dataEqualZero();
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.tipShow(this.i18n.dataDoesNotExist, true, '2', '1');
							this.dataEqualZero();
						} else if (result.data.resultCode === '3003') {
							// 会计初期化异常
							this.tipShow(this.i18n.accountingIncipientAbnormality, true, '2', '1');
							this.dataEqualZero();
						} else {
							// 系统未知错误
							this.tipShow(this.i18n.systemUnknownError, true, '2', '1');
							this.dataEqualZero();
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.tipShow(this.i18n.networkExceptionRequestFailed, true, '2', '1');
						return;
					});
			},
			// 数据错误时候，清空数据
			dataEqualZero() {
				// 税收 - API外税
				this.foreignTax = '--';
				// 订单金额 - API小計
				this.subtotal = '--';
				// 订单金额 -- 保持不变 -- 作为原订单金额去计算
				this.orderAmount = '--';
				// 合计 - API合計
				this.total = '--';
				// 未收金额 -- 实际收取客户金额
				this.orderUncollectedAmount = '--';
				// 订单商品
				this.orderItemList = [];
				// 支付方式
				this.paymentTypeList = [];
			},
			// 提示框
			tipShow: function(e, v, o, w) {
				// tip Message信息
				this.tipMessage = e;
				// 是否显示提示框 false不显示 true显示
				this.showalert = v;
				// 是否显示提示框取消按钮 2不显示 否则显示
				this.modifySuccess = o;
				// 提示框显示警告还是成功
				this.warnSuccess = w;
			},
			// 数字键盘 去结账事件
			toCheckOut: function() {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				if (this.payInAmount === '' || this.payInAmount === null || this.payInAmount === undefined) {
					// 请输入结算金额 -- '请输入结算金额'
					this.tipShow(this.i18n.orderAccount.messageB, true, '2', '1');
					return;
				}
				// 判断是不是最后一次结账
				this.lastOrderFlag = '1';
				// 商品数组
				let itemListDate = [];
				for (let z = 0; z < this.orderItemList.length; z++) {
					if (this.orderItemList[z].status === 'false' || (Number(this.orderItemList[z].actualItemCount) !== Number(this.orderItemList[
							z].itemCount))) {
						this.lastOrderFlag = '0';
					}
					if (this.orderItemList[z].status === 'true') {
						const food = {
							orderId: this.orderItemList[z].orderId,
							orderDetailId: this.orderItemList[z].orderDetailId,
							itemId: this.orderItemList[z].itemId,
							itemCount: (this.orderItemList[z].actualItemCount).toString(),
							itemPrice: this.orderItemList[z].itemPrice/this.orderItemList[z].itemCount * this.orderItemList[z].actualItemCount
						}
						itemListDate.push(food);
					}
				}
				//預かり金額
				const custody = this.payInAmount;
				// QRコードPAY
				if (this.paymentTypeIsActive === '98' || ('21' <= this.paymentTypeIsActive && this.paymentTypeIsActive <= '36')) {
					if (parseFloat(this.payInAmount) !== parseFloat(this.orderUncollectedAmount)) {
						// 结算金额 大于 未收金额 -- '请核对结算金额'
						this.tipShow(this.i18n.orderAccount.messageC, true, '2', '1');
						return;
					}
					if (this.lastOrderFlag === '0' && Number(this.changePeolpleCount) === Number(this.customerPeopleCount)) {
						// 人数选择最大但商品有剩余 -- '请核对订单商品与人数'
						this.tipShow(this.i18n.orderAccount.messageG, true, '2', '1');
						return;
					}
					if (this.lastOrderFlag === '1' && Number(this.changePeolpleCount) !== Number(this.customerPeopleCount)) {
						// 商品选满但是人数有剩余 -- '请核对订单商品与人数'
						this.tipShow(this.i18n.orderAccount.messageG, true, '2', '1');
						return;
					}
					if (this.subtotal === 0) {
						// 小计等于0 -- '请核对订单金额'
						this.tipShow(this.i18n.orderAccount.messageH, true, '2', '1');
						return;
					}
					if (this.paymentCodeQR !== '') {
						// 显示加载画面
						this.$showLoading()
						// 参数
						const dataParameter = {};
						const that = this;
						// 没有优惠的情况
						if (this.discountAmount === '') {
							that.dataParameter = {
								// 门店id
								storeId: getApp().globalData.storeId,
								// 受付ID
								receivablesId: this.receivablesId,
								// 值引额
								priceDiscountAmount: '',
								// 值引率
								priceDiscountRate: '',
								// 支払い金額
								paymentAmount: this.payInAmount,
								// 就餐方式
								takeoutFlag: this.foreignTaxSwith,
								// 二维码CD
								payCodeId: this.paymentCodeQR,
								// 人数
								customerCount: this.changePeolpleCount,
								// 最後注文フラグ
								lastOrderFlag: this.lastOrderFlag,
								// 商品リスト
								itemList: itemListDate,
								// テーブルID
								tableId: this.nowTable,
								// 小計
								subtotal: this.subtotal,
								// 外税
								sotoTax: this.foreignTax,
								// 语言
								languages: this._i18n.locale
							}
							// 选择整单折扣（'0'） 折扣数值
						} else if (this.discountActive === '0') {
							that.dataParameter = {
								// 门店id
								storeId: getApp().globalData.storeId,
								// 受付ID
								receivablesId: this.receivablesId,
								// 值引额
								priceDiscountAmount: '',
								// 值引率
								priceDiscountRate: this.discountAmount,
								// 支払い金額
								paymentAmount: this.payInAmount,
								// 就餐方式
								takeoutFlag: this.foreignTaxSwith,
								// 二维码CD
								payCodeId: this.paymentCodeQR,
								// 人数
								customerCount: this.changePeolpleCount,
								// 最後注文フラグ
								lastOrderFlag: this.lastOrderFlag,
								// 商品リスト
								itemList: itemListDate,
								// テーブルID
								tableId: this.nowTable,
								// 小計
								subtotal: this.subtotal,
								// 外税
								sotoTax: this.foreignTax,								
								// 语言
								languages: this._i18n.locale
							}
							// 选择整单让价（'1'） 让价金额
						} else {
							that.dataParameter = {
								// 门店id
								storeId: getApp().globalData.storeId,
								// 受付ID
								receivablesId: this.receivablesId,
								// 值引额
								priceDiscountAmount: this.discountAmount,
								// 值引率
								priceDiscountRate: '',
								// 支払い金額
								paymentAmount: this.payInAmount,
								// 就餐方式
								takeoutFlag: this.foreignTaxSwith,
								// 二维码CD
								payCodeId: this.paymentCodeQR,
								// 人数
								customerCount: this.changePeolpleCount,
								// 最後注文フラグ
								lastOrderFlag: this.lastOrderFlag,
								// 商品リスト
								itemList: itemListDate,
								// テーブルID
								tableId: this.nowTable,
								// 小計
								subtotal: this.subtotal,
								// 外税
								sotoTax: this.foreignTax,
								// 语言
								languages: this._i18n.locale
							}
						}
						// QRコードPAY结账
						http
							.post('api/stpd/dutchAccountPayLater', that.dataParameter)
							.then(result => {
								if (result.data.resultCode === '0000') {
									// 支払結果("00"代表支付成功，"09"代表超时)
									if (result.data.respCode === '00') {
										if(result.data.itemList.length > 0){
											this.orderItemList = result.data.itemList
										}
										printModule.printSlip(
											result.data.printInfo,
											(ret) => {
												this.printSuccessResult = ret.code;
												if (this.printSuccessResult != "00") {
													if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
														this.tipShow(this.i18n.printErrStatus.replace('{0}', ret.printIp), true, '2', '2');
													} else {
														this.tipShow(this.i18n.printErrStatus.replace('({0})', ret.printIp), true, '2', '2');
													}
												}
											})
										this.isAccount = 1;
										// 结算成功
										this.tipShow(this.i18n.settlementSuccessful, true, '2', '2');
										//割引項目クリア
										this.discountAmount = "";
										this.priceDiscountAmount = "";
										
									} else if (result.data.respCode === '09') {
										if (result.data.cancelRespCode === '00') {
											// 交易超时
											this.tipShow(this.i18n.paymentTimeout, true, '2', '1');
											// 清空支付金额
											this.clearPayInAmount();
											// 清空付款码
											this.paymentCodeQR = '';
										} else {
											// 结算失败
											this.tipShow(this.i18n.settlementFailed, true, '2', '1');
											// 清空支付金额
											this.clearPayInAmount();
											// 清空付款码
											this.paymentCodeQR = '';
										}
									} else {
										// 结算失败
										this.tipShow(this.i18n.settlementFailed, true, '2', '1');
										// 清空支付金额
										this.clearPayInAmount();
										// 清空付款码
										this.paymentCodeQR = '';
									}
								} else if (result.data.resultCode === '9001') {
									// 参数校验失败
									this.tipShow(this.i18n.parameterVerificationFailed, true, '2', '1');
									// 清空支付金额
									this.clearPayInAmount();
									// 清空付款码
									this.paymentCodeQR = '';
								} else if (result.data.resultCode === '3007') {
									// 後払いが異常です
									this.tipShow(this.i18n.backpaymentIsAbnormal, true, '2', '1');
									// 清空支付金额
									this.clearPayInAmount();
									// 清空付款码
									this.paymentCodeQR = '';
								} else {
									// 系统未知错误
									this.tipShow(this.i18n.systemUnknownError, true, '2', '1');
									// 清空支付金额
									this.clearPayInAmount();
									// 清空付款码
									this.paymentCodeQR = '';
								}
								// 隐藏加载画面
								this.$hideLoading();
							}).catch(() => {
								// 网络异常，请求失败
								this.tipShow(this.i18n.networkExceptionRequestFailed, true, '2', '1');
								// 隐藏加载画面
								this.$hideLoading();
								return;
							});

					} else {
						this.tipShow(this.i18n.pleaseScanCode, true, '2', '1');
						return;
					}

					// 现金结算
				} else {
					if (parseFloat(this.payInAmount) < parseFloat(this.orderUncollectedAmount)) {
						// 结算金额 大于 未收金额 -- '请核对结算金额'
						this.tipShow(this.i18n.orderAccount.messageC, true, '2', '1');
						return;
					}
					if (this.lastOrderFlag === '0' && Number(this.changePeolpleCount) === Number(this.customerPeopleCount)) {
						// 人数选择最大但商品有剩余 -- '请核对订单商品与人数'
						this.tipShow(this.i18n.orderAccount.messageG, true, '2', '1');
						return;
					}
					if (this.lastOrderFlag === '1' && Number(this.changePeolpleCount) !== Number(this.customerPeopleCount)) {
						// 商品选满但是人数有剩余 -- '请核对订单商品与人数'
						this.tipShow(this.i18n.orderAccount.messageG, true, '2', '1');
						return;
					}
					if (this.subtotal === 0) {
						// 小计等于0 -- '请核对订单金额'
						this.tipShow(this.i18n.orderAccount.messageH, true, '2', '1');
						return;
					}
					
					if (parseFloat(this.payInAmount) > parseFloat(this.orderUncollectedAmount)) {
						this.payInAmount = this.orderUncollectedAmount;
					}
					
					// 显示加载画面
					this.$showLoading()
					// 参数
					const dataParameter = {};
					const that = this
					// 没有优惠的情况
					if (this.discountAmount === '') {
						that.dataParameter = {
							// 门店id
							storeId: getApp().globalData.storeId,
							// 受付ID
							receivablesId: this.receivablesId,
							// 值引额
							priceDiscountAmount: '',
							// 值引率
							priceDiscountRate: '',
							// 支付金额
							paymentAmount: this.payInAmount,
							// 就餐方式
							takeoutFlag: this.foreignTaxSwith,
							// 外税
							sotoTax: this.foreignTax,
							// 小計
							subtotal: this.subtotal,
							// 支払い方式コード
							paymentMethodCode: this.paymentTypeIsActive,
							// お預かり金額
							custody: custody,
							// 人数
							customerCount: this.changePeolpleCount,
							// 最後注文フラグ
							lastOrderFlag: this.lastOrderFlag,
							// 商品リスト
							itemList: itemListDate,
							// テーブルID
							tableId: this.nowTable,
							
							// 语言
							languages: this._i18n.locale
						}
						// 选择整单折扣（'0'） 折扣数值
					} else if (this.discountActive === '0') {
						that.dataParameter = {
							// 门店id
							storeId: getApp().globalData.storeId,
							// 受付ID
							receivablesId: this.receivablesId,
							// 值引额
							priceDiscountAmount: '',
							// 值引率
							priceDiscountRate: this.discountAmount,
							// 支付金额
							paymentAmount: this.payInAmount,
							// 就餐方式
							takeoutFlag: this.foreignTaxSwith,
							// 外税
							sotoTax: this.foreignTax,
							// 小計
							subtotal: this.subtotal,
							// 支払い方式コード
							paymentMethodCode: this.paymentTypeIsActive,
							// お預かり金額
							custody: custody,
							// 人数
							customerCount: this.changePeolpleCount,
							// 最後注文フラグ
							lastOrderFlag: this.lastOrderFlag,
							// 商品リスト
							itemList: itemListDate,
							// テーブルID
							tableId: this.nowTable,
							
							// 语言
							languages: this._i18n.locale
						}
						// 选择整单让价（'1'） 让价金额
					} else {
						that.dataParameter = {
							// 门店id
							storeId: getApp().globalData.storeId,
							// 受付ID
							receivablesId: this.receivablesId,
							// 值引额
							priceDiscountAmount: this.discountAmount,
							// 值引率
							priceDiscountRate: '',
							// 支付金额
							paymentAmount: this.payInAmount,
							// 就餐方式
							takeoutFlag: this.foreignTaxSwith,
							// 外税
							sotoTax: this.foreignTax,
							// 小計
							subtotal: this.subtotal,
							// 支払い方式コード
							paymentMethodCode: this.paymentTypeIsActive,
							// お預かり金額
							custody: custody,
							// 人数
							customerCount: this.changePeolpleCount,
							// 最後注文フラグ
							lastOrderFlag: this.lastOrderFlag,
							// 商品リスト
							itemList: itemListDate,
							// テーブルID
							tableId: this.nowTable,
							
							// 语言
							languages: this._i18n.locale
						}
					}
					// 现金结账
					http
						.post('api/stpd/registDutchAccount', that.dataParameter)
						.then(result => {
							if (result.data.resultCode === '0000') {
								if(result.data.itemList.length > 0){
									this.orderItemList = result.data.itemList
								}
								printModule.printSlip(
									result.data.printInfo,
									(ret) => {
										this.printSuccessResult = ret.code;
										if (this.printSuccessResult != "00") {
											this.isAccount = 1;
											if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
												this.tipShow(this.i18n.printErrStatus.replace('{0}', ret.printIp), true, '2', '2');
											}else{
												this.tipShow(this.i18n.printErrStatus.replace('({0})', ''), true, '2', '2');
											}
										}
									})
								this.isAccount = 1;
								// 结算成功
								this.tipShow(this.paymentChangeMessage.replace('{0}', this.moenySign(this.giveChangeAmount)), true, '2', '2');
								//割引項目クリア
								this.discountAmount = "";
								this.priceDiscountAmount = "";
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.tipShow(this.i18n.parameterVerificationFailed, true, '2', '1');
								// 清空支付金额
								this.clearPayInAmount();
								// 清空付款码
								this.paymentCodeQR = '';
							} else if (result.data.resultCode === '3004') {
								// 注文情報取得が異常です
								this.tipShow(this.i18n.exceptionInGettingOrderInformation, true, '2', '1');
								// 清空支付金额
								this.clearPayInAmount();
								// 清空付款码
								this.paymentCodeQR = '';
							} else if (result.data.resultCode === '3005') {
								// 现金结算异常
								this.tipShow(this.i18n.cashAccountingIsAbnormal, true, '2', '1');
								// 清空支付金额
								this.clearPayInAmount();
								// 清空付款码
								this.paymentCodeQR = '';
							} else {
								// 系统未知错误
								this.tipShow(this.i18n.systemUnknownError, true, '2', '1');
								// 清空支付金额
								this.clearPayInAmount();
								// 清空付款码
								this.paymentCodeQR = '';
							}
							// 隐藏加载画面
							this.$hideLoading();
						}).catch(() => {
							// 网络异常，请求失败
							this.tipShow(this.i18n.networkExceptionRequestFailed, true, '2', '1');
							// 隐藏加载画面
							this.$hideLoading();
							return;
						});
				}
			},
			// 优惠界面显示与隐藏
			discountShowClick: function() {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				// 取反 实现界面显示与隐藏
				this.discountShow = !this.discountShow;
			},
			// 切换整单折扣和整单让价
			discountActiveClick: function(e) {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				// 切换整单折扣（'0'） 或者 选择整单让价（'1'）
				this.discountActive = e;
				// 切换优惠方式，清空优惠折扣值或者让价金额
				this.discountAmount = '';
			},
			// 确认优惠事件
			discountSure: function() {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				if (this.discountAmount !== '') {
					// 整单折扣
					if (this.discountActive === '0') {
						// （只有未收金额和优惠金额发生变化）
						// 计算未收金额
						this.orderUncollectedAmount = Math.round(parseFloat(this.total) * (parseFloat(10 - this.discountAmount) / 10));
						// 计算优惠金额
						this.orderAmountDiscount = Math.round(parseFloat(this.total) - parseFloat(this.orderUncollectedAmount));
					}
					// 整单让价
					if (this.discountActive === '1') {
						if (this.discountAmount === '0') {
							// 整单让价金额不能为0 -- '让价金额不能为0'
							this.tipShow(this.i18n.orderAccount.messageD, true, '2', '1');
							return;
						} else {
							// （只有未收金额和优惠金额发生变化）
							// 计算未收金额
							this.orderUncollectedAmount = Math.round(parseFloat(this.total) - parseFloat(this.discountAmount))
							// 计算优惠金额
							this.orderAmountDiscount = Math.round(parseFloat(this.total) - parseFloat(this.orderUncollectedAmount));
						}
					}
					// 隐藏优惠界面,显示结账界面
					this.discountShow = false;
				} else {
					// 计算未收金额
					this.orderUncollectedAmount = this.total;
					// 计算优惠金额
					this.orderAmountDiscount = '0';
					// 隐藏优惠界面,显示结账界面
					this.discountShow = false;
				}
			},
			// 切换就餐方式 店内就餐（标准税率）:'0'  打包带走（轻减税率）:'1'
			foreignTaxSwithClick: function(e) {
				if (!this.buttonStatus) {
					// 参数错误，按钮失效
					return;
				}
				this.foreignTaxSwith = e;
				if (e === '0') {
					this.foreignTaxSwithStyleL = '#3987e4';
					this.foreignTaxSwithStyleR = '#C1C1C1';
					// API获取订单信息和支付方式，包括菜品信息，金额，数量，订单金额等
					this.getAccountInit();
				} else {
					this.foreignTaxSwithStyleL = '#C1C1C1';
					this.foreignTaxSwithStyleR = '#3987e4';
					// API获取订单信息和支付方式，包括菜品信息，金额，数量，订单金额等
					this.getAccountInit();
				}
				// 优惠金额变为0
				this.orderAmountDiscount = 0;
				// 找零
				this.giveChangeAmount = 0;
				// 输入金额
				this.payInAmount = '';
			},
			// 读取付款码
			getPaymentCodeQR: function(e) {
				// 跳转扫码页面
				uni.navigateTo({
					url: '/pages/orderAccount/scan'
				});
			},
			// 改变商品选中状态
			changeStatus: function(e) {
				if (this.orderItemList[e].status == 'false') {
					this.orderItemList[e].status = 'true';
					
						this.orderItemList[e].dutchTreatItemPrice = this.orderItemList[e].itemPrice;
					
				} else {
					
						this.orderItemList[e].dutchTreatItemPrice = 0;
					
					this.orderItemList[e].status = 'false';
					// 显示全选按钮
					this.selectallAndCancel = '0';
				}
				
				// 小计
				this.subtotal = 0;
				// 外税
				this.foreignTax = 0;
				// 总计
				this.total = 0;
				// 未收
				this.orderUncollectedAmount = 0;
				// 优惠金额
				this.orderAmountDiscount = 0;
				// 找零
				this.giveChangeAmount = 0;
				// 订单金额
				this.orderAmount = 0;
				// 输入金额
				this.payInAmount = '';
				this.calculation();
			},
			// 增加商品数量
			addItemCount: function(e) {
				if (Number(this.orderItemList[e].actualItemCount) !== Number(this.orderItemList[e].itemCount)) {
					this.orderItemList[e].actualItemCount = Number(this.orderItemList[e].actualItemCount) + 1;
					this.orderItemList[e].dutchTreatItemPrice = Number(this.orderItemList[e].itemPrice) / Number( this.orderItemList[e].itemCount) * Number(this.orderItemList[e].actualItemCount)
				}
				// 小计
				this.subtotal = 0;
				// 外税
				this.foreignTax = 0;
				// 总计
				this.total = 0;
				// 未收
				this.orderUncollectedAmount = 0;
				// 优惠金额
				this.orderAmountDiscount = 0;
				// 找零
				this.giveChangeAmount = 0;
				// 订单金额
				this.orderAmount = 0;
				// 输入金额
				this.payInAmount = '';
				this.calculation();
			},
			// 减少商品数量
			reduceItemCount: function(e) {
				if (Number(this.orderItemList[e].actualItemCount) !== 1) {
					this.orderItemList[e].actualItemCount = Number(this.orderItemList[e].actualItemCount) - 1;
					this.orderItemList[e].dutchTreatItemPrice = Number(this.orderItemList[e].itemPrice) / Number( this.orderItemList[e].itemCount) * Number(this.orderItemList[e].actualItemCount)
				}
				// 小计
				this.subtotal = 0;
				// 外税
				this.foreignTax = 0;
				// 总计
				this.total = 0;
				// 未收
				this.orderUncollectedAmount = 0;
				// 优惠金额
				this.orderAmountDiscount = 0;
				// 找零
				this.giveChangeAmount = 0;
				// 订单金额
				this.orderAmount = 0;
				// 输入金额
				this.payInAmount = '';
				this.calculation();
			},
			// 全选
			selectAll() {
				// 商品状态变为全选
				for (let z = 0; z < this.orderItemList.length; z++) {
					this.orderItemList[z].status = 'true';
				}
				// 显示取消按钮
				this.selectallAndCancel = '1';
				// 选择人数
				this.changePeolpleCount = this.customerPeopleCount;
			},
			// 取消全选
			cancelAll() {
				// 商品状态变为取消全选
				for (let z = 0; z < this.orderItemList.length; z++) {
					this.orderItemList[z].status = 'false';
				}
				// 显示全选按钮
				this.selectallAndCancel = '0';
				// 小计
				this.subtotal = 0;
				// 外税
				this.foreignTax = 0;
				// 总计
				this.total = 0;
				// 未收
				this.orderUncollectedAmount = 0;
				// 优惠金额
				this.orderAmountDiscount = 0;
				// 找零
				this.giveChangeAmount = 0;
				// 订单金额
				this.orderAmount = 0;
				// 输入金额
				this.payInAmount = '';
				// 选择人数
				this.changePeolpleCount = 1;
			},
			// 增加就餐人数
			addPeopleCount() {
				if (Number(this.changePeolpleCount) !== Number(this.customerPeopleCount)) {
					this.changePeolpleCount = Number(this.changePeolpleCount) + 1;
				}
			},
			// 减少就餐人数
			reducePeopleCount() {
				if (Number(this.changePeolpleCount) !== 1) {
					this.changePeolpleCount = Number(this.changePeolpleCount) - 1;
				}
			},
			// 计算
			calculation() {
				let settlementJudge = false;
				// 循环取出被选中的商品
				let itemList = [];
				for (let z = 0; z < this.orderItemList.length; z++) {
					if (this.orderItemList[z].status === 'true') {
						settlementJudge = true;
						const food = {
							itemId: this.orderItemList[z].itemId,
							itemPrice: Number(this.orderItemList[z].dutchTreatItemPrice)
						}
						itemList.push(food);
					}
				}
				if (settlementJudge === true) {
					
					// 参数
					const dataFood = {
						storeId: getApp().globalData.storeId,
						takeoutFlag: this.foreignTaxSwith,
						itemList: itemList
					};
					// 税金額取得
					http
						.post('api/stpd/getTaxAmount', dataFood)
						.then(result => {
							if (result.data.resultCode === '0000') {
								// 税收 - API外税
								this.foreignTax = result.data.foreignTax;
								// 订单金额 - API小計
								this.subtotal = result.data.orderAmount;
								// 订单金额 -- 保持不变 -- 作为原订单金额去计算
								this.orderAmount = result.data.orderAmount;
								// 合计 - API合計
								this.total = result.data.total;
								// 未收
								this.orderUncollectedAmount = result.data.total;
								// 优惠金额
								this.orderAmountDiscount = 0;
								// 找零
								this.giveChangeAmount = 0;
								// 输入金额
								this.payInAmount = '';
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.tipShow(this.i18n.parameterVerificationFailed, true, '2', '1');
							} else {
								// 系统未知错误
								this.tipShow(this.i18n.systemUnknownError, true, '2', '1');
							}
							
						}).catch(() => {
							// 隐藏加载画面
							this.$hideLoading();
							// 网络异常，请求失败
							this.tipShow(this.i18n.networkExceptionRequestFailed, true, '2', '1');
							return;
						});
				}
			},
			// 千分符过滤器
			moenySign: function(e) {
				let realVal = '';
				if (e !== undefined && e !== null && e !== '' && !isNaN(e)) {
					realVal = (e + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				} else {
					realVal = e;
				}
				// 返回过滤后的结果
				return realVal
			}
		},
		// 过滤器
		filters: {
			numFilter(e) {
				let realVal = '';
				if (e !== undefined && e !== null && e !== '' && !isNaN(e)) {
					// 截取当前数据到小数点后0位
					realVal = parseFloat(e).toFixed(0)
				} else {
					// 不符合规则的数值直接显示0
					realVal = '0'
				}
				realVal = parseFloat(e).toLocaleString();
				// 返回过滤后的结果
				return realVal
			},
			// 千分符过滤器
			thousandthSign(e) {
				let realVal = '';
				if (e !== undefined && e !== null && e !== '' && !isNaN(e)) {
					realVal = (e + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
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
	.accountBody {
		display: flex;
		width: 100%;
		height: 100%;
		float: left;
		background-color: white;
		overflow: hidden;
	}

	.account-left {
		flex: none;
		width: 33%;
		height: 100%;
		float: left;
		margin-right: 2%;
		box-shadow: 1px 0px 5px 3px #ddd;
		overflow: hidden;
	}

	.account-right {
		width: 65%;
		height: 100%;
		float: left;
		background-color: white;
		box-shadow: 3px 0 7px 5px #ddd;
		overflow: hidden;
	}

	/* 超过一定宽度隐藏 */
	.account-hidden {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-left-row1 {
		width: 100%;
		height: 7vw;
		background-color: #3987e4;
	}

	.account-right-row1 {
		width: 100%;
		height: 7vw;
		float: left;
		background-color: #3987e4;
	}

	.account-left-row1-1 {
		display: flex;
		float: left;
		width: 100%;
		height: 100%;
	}

	.account-left-row1-1-1 {
		flex: 1;
	}

	.account-left-row1-1-2 {
		flex: none;
		display: flex;
		float: left;
	}

	.leftReturn {
		width: 3vw;
		height: 3vw;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 5px;
	}

	.leftQuanImg {
		width: 1.7vw;
		height: 1.7vw;
		margin-top: auto;
		margin-bottom: auto;
	}

	.leftQuanText {
		margin: auto;
		margin-left: 5px;
		line-height: 0px;
	}

	.account-font-size {
		font-size: 2.5vw;
		color: white;
	}

	.account-font-size-small {
		font-size: 1.5vw;
		color: white;
	}

	.account-display {
		display: flex;
		float: left;
	}

	.account-left-row2 {
		width: 100%;
		background-color: white;
		overflow-y: auto;
		height: 100%;
	}

	.account-right-row2 {
		width: 100%;
		float: left;
		background-color: white;
	}

	.account-left-row2-1 {
		float: left;
		width: 94%;
		font-size: 1.6vw;
		padding: 3px 3%;
	}

	.account-left-row2-2 {
		float: left;
		width: 94%;
		font-size: 1.6vw;
		padding: 3px 3%;
		background-color: #ddedff;
	}

	.account-item-name {
		float: left;
		width: 45%;
		display: flex;
		height: 5vw;
		line-height: 5vw;
	}

	.account-item-number {
		float: left;
		height: 5vw;
		width: 25%;
		align-items: center;
		display: flex;
	}

	.account-item-money {
		float: left;
		width: 30%;
		text-align: right;
		word-wrap: break-word;
		height: 2.5vw;
		line-height: 2.5vw;
	}

	.account-item-name-left {
		flex: none;
		margin-right: 5px;
		margin-top: 3px;
	}

	.account-item-name-right {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-left-row3 {
		width: 100%;
		float: left;
		text-align: center;
		background-color: #fff;
		box-shadow: 0px -3px 12px rgba(0, 0, 0, 0.1);
	}

	.account-left-row3-left {
		float: left;
		text-align: center;
		color: white;
		width: 46%;
		margin: auto 2%;
		display: flex;
	}

	.account-left-row3-right {
		float: left;
		text-align: center;
		color: #fff;
		width: 46%;
		margin: auto 2%;
		display: flex;
	}

	.account-left-row3-text {
		width: 100%;
		font-size: 1.5vw;
		padding: 10px 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.account-discount {
		background-color: white;
		color: #3987e4;
		cursor: pointer;
		margin-right: 10px;
		padding: 6px 16px;
		font-size: 1.7vw;
		font-weight: 700;
	}

	#orderItemList::-webkit-scrollbar {
		//滚动条宽度
		width: 0.4vw;
		height: 0.1vw;
	}

	.account-pay-method {
		float: left;
		width: 100%;
		color: white;
		font-size: 1.7vw;
		text-align: center;
		border-bottom: 1px solid white;
		font-weight: 700;
	}

	.account-pay-method-background {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.account-pay-left {
		float: left;
		width: 25%;
		box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.3);
		background-color: rgb(74, 188, 255);
		overflow-y: auto;
	}

	.account-pay-right {
		float: left;
		width: 75%;
		font-size: 1.5vw;
		padding-top: 4%;
		height: 96%;
	}

	.account-pay-money {
		float: left;
		width: 50%;
		margin-top: 2%;
		height: 4.5%;
		font-weight: 600;
		font-size: 1.5vw;
	}

	#accountKeyboard table tr td {
		width: 25%;
		text-align: center;
		cursor: pointer;
		color: #fff;
		background-size: 100% 100%;
		height: 25%;
		background-color: #4e759b;
		border-right: 1px solid #fff;
		border-top: 1px solid #fff;
	}

	.account-right-discount {
		width: 40%;
		flex: none;
		height: 100%;
		float: left;
		background-color: white;
		box-shadow: 1px 0px 5px 3px #ddd;
		overflow: hidden;
	}

	.discount-top {
		display: flex;
		float: left;
		margin-left: 8%;
		width: 80%;
		font-size: 2vw;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.discount-top-right {
		float: left;
		width: 12%;
		font-size: 2vw;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
		color: #fff;
	}

	.discount-center-left {
		float: left;
		width: 50%;
		border: 1px solid #C8C8C9;
		height: 4vw;
		line-height: 4vw;
		border-radius: 2vw 0vw 0vw 2vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.discount-center-right {
		float: left;
		width: 50%;
		border: 1px solid #C8C8C9;
		border-left: 0px solid #C8C8C9;
		height: 4vw;
		line-height: 4vw;
		border-radius: 0vw 2vw 2vw 0vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.discountActive {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.jinEImg {
		width: 2.7vw;
		height: 2.7vw;
		margin: auto 7px auto 10px;
	}

	.account-left-row-itemOption {
		float: left;
		width: 100%;
		height: 100%;
	}

	.paidInAmount {
		float: left;
		width: 100%;
		margin-top: 10px;
		color: white;
		font-size: 1.9vw;
		font-weight: bold;
		height: 9%;
	}

	.digitalKeyboardClass {
		float: left;
		width: 100%;
		margin-top: 5%;
		color: white;
		font-size: 1.9vw;
		font-weight: bold;
		height: 43%;
	}

	.paidInAmountOther {
		float: left;
		width: 99.5%;
		margin-top: 8%;
		color: white;
		font-size: 1.9vw;
		font-weight: bold;
		height: 9%;
	}

	.digitalKeyboardClassOther {
		float: left;
		width: 100%;
		color: white;
		font-size: 1.9vw;
		font-weight: bold;
		height: 43%;
	}

	.QRPay {
		float: left;
		width: 100%;
		margin-top: 6%;
		font-size: 1.7vw;
		height: 12%;
	}

	.QRPayTop {
		float: left;
		margin-left: 60px;
		font-weight: bold;
		width: 100%;
	}

	.QRPayCenter {
		width: 53%;
		float: left;
		background-color: rgb(78, 117, 155);
		height: 70%;
		margin-left: 60px;
		margin-top: 10px;
		color: #fff;
		text-align: center;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.9vw;
	}

	.QRPayBottom {
		width: 17%;
		float: left;
		background-color: rgb(78, 117, 155);
		height: 70%;
		margin-top: 10px;
		margin-left: 1px;
		color: #fff;
		text-align: center;
		font-weight: bold;
		font-size: 1.9vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.account-pay-method-right {
		flex: 1 1 0%;
		margin: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}

	.account-item-number-jian {
		float: left;
		width: 33%;
		cursor: pointer;
		height: 2.5vw;
		line-height: 2.5vw;
		font-size: 1.5vw;
		color: rgb(255, 255, 255);
		text-align: center;
		background-color: #3987e4;
	}

	.account-item-number-middle {
		width: 33%;
		float: left;
		text-align: center;
		line-height: 2.5vw;
		height: 2.5vw;
	}

	.account-item-number-jia {
		float: left;
		width: 33%;
		background-color: #3987e4;
		cursor: pointer;
		font-size: 1.5vw;
		color: rgb(255, 255, 255);
		text-align: center;
		line-height: 2.5vw;
		height: 2.5vw;
	}

	.dutchTreatment-all {
		width: 96%;
		height: 7%;
		float: left;
		margin-left: 2%;
		margin-top: 1.5%;
	}

	.dutchTreatment-all-left {
		height: 100%;
		width: 62%;
		float: left;
		background-color: #3987e4;
		color: #fff;
		font-size: 1.5vw;
		margin-right: 2%;
	}

	.dutchTreatment-all-middle {
		height: 100%;
		width: 34%;
		float: left;
		background-color: #3987e4;
		color: #fff;
		font-size: 1.5vw;
		margin-right: 2%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dutchTreatment-all-right {
		height: 100%;
		width: 17%;
		float: left;
		background-color: #3987e4;
		color: #fff;
		font-size: 1.5vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dutchTreatment-people {
		height: 100%;
		width: 37%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dutchTreatment-people-jian {
		height: 100%;
		width: 21%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dutchTreatment-people-number {
		height: 100%;
		width: 21%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dutchTreatment-people-jia {
		height: 100%;
		width: 21%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ellipsisClass {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
