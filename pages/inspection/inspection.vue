<template>
	<view class="container" v-bind:style="{ height: windowHeight + 'px' }">
		<view class="menuLine">
			<!-- 返回上一页 -->
			<view class="menuReturn" id="return">
				<img src="static/backArrow.png" style="margin: 0;width: 100%;" @click="returnHomePage()"></image>
			</view>
			<!-- 売上标题 -->
			<view class="returnLable">
				<view>{{i18n.inspection}}</view>
			</view>
		</view>
		<!--情報入力  -->
		<view style="border-bottom: 1px solid #4e759b;font-size: 48%;text-align: center;">{{i18n.information}}</view>
		<digitKeyboard :keyBoardTop="keyBoardTop" :keyBoardLeft="keyBoardLeft" v-if="isShowKeyboardWindow" @cancel="keyBoardHid"
		 @confirm="keyboardConfirm" />

		<view class="table-loft" style="height: 70%;width: 48%;">
			<view class="table-responsive" style="width: 94%;margin: 2% 3% 0% 3%;overflow-x: scroll;overflow-y: hidden;">
				<!-- 見出し -->
				<view class="transferSecondTro">
					<!-- 金額 -->
					<view class="transferSecondTho" style="width:32%;">{{i18n.Amount}}</view>
					<!-- 枚数 -->
					<view class="transferSecondTho" style="width:32%;">{{i18n.AmountNumber}}</view>
					<!-- 合計 -->
					<view class="transferSecondTho" style="width:36%;">{{i18n.AmountTotal}}</view>
				</view>

				<!-- 金額 ¥10,000 -->
				<div style="height:100%;width:100%;overflow:scroll;background:#EEEEEE;">
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥10,000</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num1')" disabled="true" v-model="num1" v-on:change="getnum1()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num1' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku10000|thousandth}}</view>

					</view>

					<!-- 金額 ¥5,000 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥5,000</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num2')" disabled="true" v-model="num2" v-on:change="getnum2()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num2'&& isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku5000|thousandth}}</view>

					</view>

					<!-- 金額 ¥2,000 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥2,000</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num3')" disabled="true" v-model="num3" v-on:change="getnum3()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num3' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku2000|thousandth}}</view>

					</view>

					<!-- 金額 ¥1,000 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥1,000</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num4')" disabled="true" v-model="num4" v-on:change="getnum4()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num4' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku1000|thousandth}}</view>

					</view>

					<!-- 金額 ¥500 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥500</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num5')" disabled="true" v-model="num5" v-on:change="getnum5()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num5' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku500|thousandth}}</view>

					</view>

					<!-- 金額 ¥100 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥100</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num6')" disabled="true" v-model="num6" v-on:change="getnum6()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num6' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku100|thousandth}}</view>

					</view>
					<!-- 金額 ¥50 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥50</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num7')" disabled="true" v-model="num7" v-on:change="getnum7()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num7' && isShowKeyboardWindow ?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku50|thousandth}}</view>

					</view>

					<!-- 金額 ¥10 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥10</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num8')" disabled="true" v-model="num8" v-on:change="getnum8()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num8'&& isShowKeyboardWindow?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku10|thousandth}}</view>

					</view>
					<!-- 金額 ¥5 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥5</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num9')" disabled="true" v-model="num9" v-on:change="getnum9()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num9'&& isShowKeyboardWindow?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku5|thousandth}}</view>

					</view>
					<!-- 金額 ¥1 -->
					<view class="transferSecondTro-a">
						<!-- 金額 -->
						<view class="transferSecondTho" style="width:28%;text-align:left;">¥1</view>
						<!-- 枚数 -->
						<input class="transferSecondTho-a" @tap="selectInput('num10')" disabled="true" v-model="num10" v-on:change="getnum10()"
						 type="number" pattern="\d*" :style="{'background-color':tapInput==='num10'&& isShowKeyboardWindow?'#F0F8FF':'#FFFFFF'}">
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:28%;text-align:right;">¥{{kingaku1|thousandth}}</view>

					</view>

					<view style="float:left;height:15%;width: 100%;"></view>
				</div>
			</view>
			<!-- レジ内現金合計 -->
			<view class="menuLine-s">
				<view class="returnLable-a">{{i18n.TotalAmount}}</view>
				<input class="input-a" @tap="selectInput('total')" disabled="true" v-model="total" v-on:change="gettotal()" type="text">
				<img src="static/button_x.png" style="margin: 0;width:5%;height:60%; margin-top:8px;margin-right: 3%;" @click="clearamount()"></image>
			</view>
			<div class="returnLable-s">{{i18n.Description}}</div>
		</view>

		<!--分割 -->
		<div style='border:1px solid #4e759b;float:left;height:70%;'></div>
		<view class="table-loft" style="height: 70%;width: 50%;">
			<view class="table-responsive" style="width: 96%;margin: 2% 5% 0% 3%;overflow-x: scroll;overflow-y: hidden;">
				<view class="transferSecondTro">
					<!-- 科目 -->
					<view class="transferSecondTho" style="width:32%;">{{i18n.Subject}}</view>

					<view class="transferSecondTho" style="width:32%;"></view>
					<!-- 金額 -->
					<view class="transferSecondTho" style="width:36%;">{{i18n.Amount}}</view>
				</view>

				<div style="height:100%;width:100%;overflow:scroll;background:#EEEEEE;">

					<view class="transferSecondTro-a">
						<!-- 前日繰越金 -->
						<view class="transferSecondTho" style="width:33%;text-align: left;">{{i18n.previousDayTransferredAmount}}</view>
						<!--  -->
						<view class="transferSecondTho" style="width:20%;text-align: right;">a</view>
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:34%;text-align: right;margin-right:8%">¥{{kurikosikin|thousandth}}</view>

					</view>
					<view class="transferSecondTro-a">
						<!-- 本日増減額 -->
						<view class="transferSecondTho" style="width:33%;text-align: left;">{{i18n.appointedDayFluctuationAmount}}</view>
						<!--  -->
						<view class="transferSecondTho" style="width:20%;text-align: right;">b</view>
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:34%;text-align: right;margin-right:8%">¥{{honjitusogengaku|thousandth}}</view>

					</view>
					<view class="transferSecondTro-a">
						<!-- 計算上のレジ内現金合計 -->
						<view class="transferSecondTho" style="width:33%;text-align: left;">{{i18n.calculationCashRegisterAmount}}</view>
						<!--  -->
						<view class="transferSecondTho" style="width:20%;text-align: right;">c=a+b</view>
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:34%;text-align: right;margin-right:8%">¥{{genkingokei|thousandth}}</view>

					</view>
					<view class="transferSecondTro-a">
						<!-- 実際のレジ内現金合計 -->
						<view class="transferSecondTho" style="width:33%;text-align: left;">{{i18n.practicalCashRegisterAmount}}</view>
						<!--  -->
						<view class="transferSecondTho" style="width:20%;text-align: right;">d</view>
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:34%;text-align: right;margin-right:8%">¥{{jisaigenkingokei|thousandth}}</view>

					</view>
					<view class="transferSecondTro-a">
						<!-- 現金差異 -->
						<view class="transferSecondTho" style="width:33%;text-align: left;">{{i18n.cashDifference}}</view>
						<!--  -->
						<view class="transferSecondTho" style="width:20%;text-align: right;">e＝d‐c</view>
						<!-- 合計 -->
						<view class="transferSecondTho" style="width:34%;text-align: right;margin-right:8%">{{genkinsai}}</view>
					</view>
				</div>
			</view>
		</view>
		<view class="messageLabel"></view>

		<view class="buttonLine">
			<!-- ドロアオープン -->
			<button class="buttonStyle"  @click="openCashDoor">{{i18n.Draweropen}}</button>
			<!-- ドロアオープン -->
			<button class="buttonStyle"  @click="handlePrint">{{i18n.confirm}}</button>
		</view>


		<!-- 弹框-->
		<view v-show="showalert">
			<view class="sweet-overlay"></view>
			<view class="sweet-alert">
				<view class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 提示信息 -->
				<h2>{{tipMessage}}</h2>
				<view class="sa-button-container">
					<!-- 取消按钮 -->
					<button v-if="confirmStatus === 1" style="display: inline-block; background-color: #adadad" @click="cancelButton">{{i18n.cancelAccountShare}}</button>
					<!-- 确认按钮 -->
					<button style="display: inline-block; background-color: #3987e4" @click="confirmButton">{{i18n.confirm}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/http.js';

	var cashDoorServiceModule = uni.requireNativePlugin("CashDoorService");
	var printModule = uni.requireNativePlugin("PrintService");

	export default {
		computed: {
			// 引入多语言文件
			i18n() {
				return this.$t('message')
			}
		},

		data() {
			return {

				// 页面高度
				windowHeight: '',
				// 页面高度
				windowWidth: '',
				// 弹框
				showalert: false,
				// 金額10000
				kingaku10000: 0,
				// 金額5000
				kingaku5000: 0,
				// 金額2000
				kingaku2000: 0,
				// 金額1000
				kingaku1000: 0,
				// 金額500
				kingaku500: 0,
				// 金額100
				kingaku100: 0,
				// 金額50
				kingaku50: 0,
				// 金額10
				kingaku10: 0,
				// 金額5
				kingaku5: 0,
				// 金額1
				kingaku1: 0,
				// 金額合計
				total: "￥0",
				// 10000枚数
				num1: '',
				// 5000枚数
				num2: '',
				// 2000枚数
				num3: '',
				// 1000枚数
				num4: '',
				// 500枚数
				num5: '',
				// 100枚数
				num6: '',
				// 50枚数
				num7: '',
				// 10枚数
				num8: '',
				// 5枚数
				num9: '',
				// 1枚数
				num10: '',

				// 前日繰越金
				kurikosikin: 0,
				// 本日増減額
				honjitusogengaku: 0,
				// 計算上のレジ内現金合計
				genkingokei: 0,
				// 実際のレジ内現金合計
				jisaigenkingokei: 0,
				// 現金差異
				genkinsai: 0,
				// 出金
				siyukin: "￥0",
				// 銀行預入額
				ginkoatugarikin: "￥0",
				// 翌日繰越金
				yokujitukurikosikin: "￥0",
				//原価
				genka: "￥0",
				// 弹框提示
				tipMessage: '',
				// 点検印刷結果
				resCode: '',
				// 確認状態
				confirmStatus: 0,
				isShowKeyboardWindow:false,
				// 印刷結果
				printSuccessResult:''
			}
		},
		onLoad: function(option) {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
					that.windowWidth = res.windowWidth;
				}
			})
			// 获取金额的一览数据
			this.loadAmountSold();

		},
		methods: {
			// 点击返回按钮
			returnHomePage: function() {
				if(this.isShowKeyboardWindow){
					return;
				}
				uni.reLaunch({
					url: '/pages/homePage/homePage'
				});
			},
			// レシート印刷 DB保存
			handlePrint() {
				if(this.isShowKeyboardWindow){
					return;
				}
				if (String(this.deleteMark(this.genkinsai)) !== "0") {
					this.showalert = true;
					this.tipMessage = this.i18n.residentDiscrepancy;
					this.confirmStatus = 1;
				} else {
					// 金額数据保存
					this.saveAmountSold();
					this.confirmStatus = 0;
				}
			},
			selectInput(index) {
				this.tapInput = index;
				if (index === 'num1') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.3;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}
				if (index === 'num2') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.35;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num3') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.4;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num4') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.45;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num5') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.55;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num6') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.6;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num7') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.65;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num8') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.65;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num9') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.65;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}

				if (index === 'num10') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.65;
					this.keyBoardLeft = this.windowWidth * 0.3;
				}
				if (index === 'total') {
					this.isShowKeyboardWindow = true;
					this.keyBoardTop = this.windowHeight * 0.65;
					this.keyBoardLeft = this.windowWidth * 0.05;
				}
			},
			keyBoardHid() {
				this.isShowKeyboardWindow = false;
			},
			keyboardConfirm(val) {
				this.isShowKeyboardWindow = false;
				if (this.tapInput === 'num1') {
					this.num1 = Number(val);
					this.getnum1();
				}
				if (this.tapInput === 'num2') {
					this.num2 = Number(val);
					this.getnum2();
				}
				if (this.tapInput === 'num3') {
					this.num3 = Number(val);
					this.getnum3();
				}

				if (this.tapInput === 'num4') {
					this.num4 = Number(val);
					this.getnum4();
				}

				if (this.tapInput === 'num5') {
					this.num5 = Number(val);
					this.getnum5();
				}

				if (this.tapInput === 'num6') {
					this.num6 = Number(val);
					this.getnum6();
				}

				if (this.tapInput === 'num7') {
					this.num7 = Number(val);
					this.getnum7();
				}

				if (this.tapInput === 'num8') {
					this.num8 = Number(val);
					this.getnum8();
				}

				if (this.tapInput === 'num9') {
					this.num9 = Number(val);
					this.getnum9();
				}

				if (this.tapInput === 'num10') {
					this.num10 = Number(val);
					this.getnum10();
				}

				if (this.tapInput === 'total') {
					this.total = val;
					this.gettotal();
				}


				this.keyBoardInputVal = '';
			},
			// 获取输入的10000金额数量
			getnum1: function() {

				var num1 = this.num1;
				// 10000総金額
				this.kingaku10000 = num1 * 10000;
				this.total = 0;
				// 総金額
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;


				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;

				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的5000金额数量
			getnum2: function() {
				var num2 = this.num2;
				// 5000総金額
				this.kingaku5000 = num2 * 5000;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的2000金额数量
			getnum3: function() {
				var num3 = this.num3;
				// 2000総金額
				this.kingaku2000 = num3 * 2000;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的1000金额数量
			getnum4: function() {
				var num4 = this.num4;
				// 1000総金額
				this.kingaku1000 = num4 * 1000;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的500金额数量
			getnum5: function() {
				var num5 = this.num5;
				// 500総金額
				this.kingaku500 = num5 * 500;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的100金额数量
			getnum6: function() {
				var num6 = this.num6;
				// 100総金額
				this.kingaku100 = num6 * 100;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的50金额数量
			getnum7: function() {
				var num7 = this.num7;
				// 50総金額
				this.kingaku50 = num7 * 50;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的10金额数量
			getnum8: function() {
				var num8 = this.num8;
				// 10総金額
				this.kingaku10 = num8 * 10;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;

			},
			// 获取输入的5金额数量
			getnum9: function() {
				var num9 = this.num9;
				// 5総金額
				this.kingaku5 = num9 * 5;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;


			},
			// 获取输入的1金额数量
			getnum10: function() {
				var num10 = this.num10;
				this.kingaku1 = num10 * 1;
				this.total = 0;
				this.total = this.kingaku10000 + this.kingaku5000 + this.kingaku2000 + this.kingaku1000 +
					this.kingaku500 + this.kingaku100 + this.kingaku50 + this.kingaku10 + this.kingaku5 + this.kingaku1;
				//现金合计传给实际内金额合计
				this.jisaigenkingokei = this.total;
				//算出现金差异
				this.genkinsai = this.genkingokei - this.jisaigenkingokei;
				this.genkinsaihandan();
				//加符号
				this.total = (this.total + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + this.total;


			},

			// 获取输入的出金
			getsiyukin: function() {
				//出金
				var siyukin = this.siyukin;
				//翌日繰越金
				var yokujitukurikosikin = this.yokujitukurikosikin;
				//実際レジ内金額
				var jisaigenkingokei = this.jisaigenkingokei
				//出金转换成纯数值
				siyukin.replaceAll(",", "");
				siyukin = siyukin.replace(/[^0-9]/isg, "");

				//实际收银台金额转换成纯数值
				jisaigenkingokei = parseInt(jisaigenkingokei);
				//翌日繰越金金额转换成纯数值
				if (yokujitukurikosikin != "") {
					yokujitukurikosikin.replaceAll(",", "");
					//yokujitukurikosikin=parseInt(yokujitukurikosikin);
					yokujitukurikosikin = yokujitukurikosikin.replace(/[^0-9]/isg, "");
				}

				// 銀行預入金額
				this.ginkoatugarikin = jisaigenkingokei - yokujitukurikosikin - siyukin;

				//加符号.出金
				this.siyukin = (siyukin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.siyukin = "￥" + this.siyukin;
				//加符号.銀行預入金額
				//var ginkoatugarikin=this.ginkoatugarikin;
				this.ginkoatugarikin = (this.ginkoatugarikin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.ginkoatugarikin = "￥" + this.ginkoatugarikin;
				if (this.siyukin === "￥") {
					this.siyukin = "￥0";
				}
			},
			// 获取输入的銀行預入金額
			getginkoatugarikin: function() {
				// 获取输入的銀行預入金額
				var ginkoatugarikin = this.ginkoatugarikin;
				// 获取実際レジ内金
				var jisaigenkingokei = this.jisaigenkingokei;
				// 获取出金
				var siyukin = this.siyukin;
				// 翌日繰越金
				var yokujitukurikosikin = 0;

				//出金转换成纯数值
				siyukin = siyukin.replace(/[^0-9]/isg, "");
				//銀行預入金額转换成纯数值
				//this.ginkoatugarikin=parseInt(ginkoatugarikin);
				ginkoatugarikin = ginkoatugarikin.replace(/[^0-9]/isg, "");
				//翌日繰越金額转换成纯数值
				yokujitukurikosikin = this.jisaigenkingokei - ginkoatugarikin - siyukin;
				//加符号銀行預入金額
				this.ginkoatugarikin = (ginkoatugarikin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.ginkoatugarikin = "￥" + this.ginkoatugarikin;
				//加符号翌日繰越金
				this.yokujitukurikosikin = (yokujitukurikosikin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.yokujitukurikosikin = "￥" + this.yokujitukurikosikin;
				if (this.ginkoatugarikin === "￥") {
					this.ginkoatugarikin = "￥0";
				}
			},
			// 获取输入的翌日繰越金
			getyokujitukurikosikin: function() {
				// 获取输入的翌日繰越金
				var yokujitukurikosikin = this.yokujitukurikosikin;
				// 获取输入的出金
				var siyukin = this.siyukin;
				// 获取実際レジ内金額
				var jisaigenkingokei = this.jisaigenkingokei;
				// 出金
				siyukin = siyukin.replace(/[^0-9]/isg, "");
				//実際レジ内金額
				jisaigenkingokei = parseInt(jisaigenkingokei);
				//翌日繰越金
				yokujitukurikosikin = yokujitukurikosikin.replace(/[^0-9]/isg, "");
				// 銀行預入金額
				this.ginkoatugarikin = jisaigenkingokei - yokujitukurikosikin - siyukin;

				//加符号.翌日繰越金
				this.yokujitukurikosikin = (yokujitukurikosikin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.yokujitukurikosikin = "￥" + this.yokujitukurikosikin;
				//加符号
				var ginkoatugarikin = this.ginkoatugarikin;
				this.ginkoatugarikin = (ginkoatugarikin + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.ginkoatugarikin = "￥" + this.ginkoatugarikin;
				if (this.yokujitukurikosikin === "￥") {
					this.yokujitukurikosikin = "￥0";
				}
			},
			// 原価,符号
			getgenka: function() {
				//获取当前数值
				var genka = this.genka;
				//转换成纯数值
				let genka1 = genka.replace(/[^0-9]/ig, "");
				//給数值加逗号
				genka1 = (genka1 + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.genka = "￥" + genka1;
				if (this.genka === "￥") {
					this.genka = "￥0";
				}
			},
			// レジ内金額,符号
			gettotal: function() {
				//获取当前输入各个金钱数值清空
				var total = this.total;
				this.cleatall();


				//转换成纯数值
				let total1 = total.replace(/[^0-9]/isg, "");
				//手动输入的值传给实际收银台现金
				this.jisaigenkingokei = total1;
				//算出现金差异
				this.genkinsai = this.genkingokei - total1;
				if (this.jisaigenkingokei === "") {
					this.jisaigenkingokei = 0;
				}
				this.genkinsaihandan();

				//給数值加逗号
				total1 = (total1 + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				this.total = "￥" + total1;
				if (this.total === "￥") {
					this.total = "￥0";

				}

			},
			//金钱数值清空
			clearamount: function() {
				if(this.isShowKeyboardWindow){
					return;
				}
				//金钱数值清空
				this.total = "￥0";
				this.cleatall();
				this.jisaigenkingokei = 0;
				this.genkinsai = "￥0";
			},
			//获取当前输入各个金钱数值清空
			cleatall: function() {
				this.num1 = "";
				this.num2 = "";
				this.num3 = "";
				this.num4 = "";
				this.num5 = "";
				this.num6 = "";
				this.num7 = "";
				this.num8 = "";
				this.num9 = "";
				this.num10 = "";
				// 金額10000
				this.kingaku10000 = 0;
				// 金額5000
				this.kingaku5000 = 0;
				// 金額2000
				this.kingaku2000 = 0;
				// 金額1000
				this.kingaku1000 = 0;
				// 金額500
				this.kingaku500 = 0;
				// 金額100
				this.kingaku100 = 0;
				// 金額50
				this.kingaku50 = 0;
				// 金額10
				this.kingaku10 = 0;
				// 金額5
				this.kingaku5 = 0;
				// 金額1
				this.kingaku1 = 0;
			},
			//现金差异判断
			genkinsaihandan: function() {
				//现金差异判断
				if (this.genkingokei > this.jisaigenkingokei) {
					//现金差异绝对值
					this.genkinsai = Math.abs(this.genkinsai);
					//现金差异绝对值加逗号 负号和￥
					this.genkinsai = (this.genkinsai + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
					this.genkinsai = "-" + "￥" + this.genkinsai;

				} else {
					//现金差异绝对值
					this.genkinsai = Math.abs(this.genkinsai);
					//现金差异绝对值加逗号 负号和￥
					this.genkinsai = (this.genkinsai + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
					this.genkinsai = "￥" + this.genkinsai;

				}
			},

			// 获取金額一览数据
			openCashDoor: function() {
				if(this.isShowKeyboardWindow){
					return;
				}
				const data = {
					//店舗ID
					storeId: getApp().globalData.storeId

				};
				http.post('api/stpd/openCashDoor', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							cashDoorServiceModule.openCashDoor(
								result.data.printIp,
								(ret) => {
									this.resCode = ret.code;
							})
							
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							//this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							//this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}

					}).catch(err => {
						// 网络异常，请求失败
						//this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 获取金額一览数据
			loadAmountSold: function() {
				const data = {
					//店舗ID
					storeId: getApp().globalData.storeId,
					//精算区分
					settleType: "2"

				};
				http.post('api/stpd/getInspectionSettleInit', data)
					.then(result => {
						if (result.data.resultCode === '0000') {


							// 前日繰越金
							this.kurikosikin = result.data.previousDayTransferredAmount;
							// 本日増減額
							this.honjitusogengaku = result.data.todayFluctuationAmount;
							// 計算のレジ内現金合計
							this.genkingokei = Number(result.data.previousDayTransferredAmount) + Number(result.data.todayFluctuationAmount);
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							//this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							//this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}

					}).catch(err => {
						// 网络异常，请求失败
						//this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});
			},
			// 保存金額数据
			saveAmountSold: function() {
				this.$showLoading();
				const data = {
					//店舗ID
					storeId: getApp().globalData.storeId,
					//精算区分
					settleType: "2",
					// 前日繰越金
					previousDayTransferredAmount: this.deleteMark(this.kurikosikin),
					// 本日増減額
					todayFluctuationAmount: this.deleteMark(this.honjitusogengaku),
					// 計算上のレジ内現金合計
					calculationCashRegisterAmount: this.deleteMark(this.genkingokei),
					// 実際のレジ内現金合計
					practicalCashRegisterAmount: this.deleteMark(this.jisaigenkingokei),
					// 現金差異
					cashDifferenceAmount: this.deleteMark(this.genkinsai),
					// 出金
					outAmount: this.deleteMark(this.siyukin),
					// 銀行預入額
					bankDepositAmount: this.deleteMark(this.ginkoatugarikin),
					// 翌日繰越金
					nextDayTransferredAmount: this.deleteMark(this.yokujitukurikosikin),
					//原価
					purchasingCost: this.deleteMark(this.genka)
				};
				http.post('api/stpd/inspectionSettle', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							printModule.printSlip(
								result.data.printInfo,
								(ret) => {
									this.printSuccessResult = ret.code;
									if (this.printSuccessResult != "00") {
										// 印刷失敗
										this.showalert = true;
										if (ret.printIp != null && ret.printIp != undefined && ret.printIp != "") {
											this.tipMessage = this.i18n.printErrStatus.replace('{0}', ret.printIp);
										} else {
											this.tipMessage = this.i18n.printErrStatus.replace('({0})', '');
										}
										this.$hideLoading();
									}else{
										// 印刷成功
										this.showalert = true;
										this.tipMessage = this.i18n.inspectionOk;
										// 隐藏加载画面
										this.$hideLoading();
									}
								})
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
							// 隐藏加载画面
							this.$hideLoading();
						} else {
							// 系统未知错误
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
							// 隐藏加载画面
							this.$hideLoading();
						}
					}).catch(err => {
						// 网络异常，请求失败
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
						// 隐藏加载画面
						this.$hideLoading();
					});
			},
			// 判断￥是否存在
			deleteMark: function(val) {
				if (String(val).substr(0, 1) === "￥" || String(val).substr(0, 1) === "-") {
					if (String(val).substr(0, 1) === "-") {
						return "-" + val.replace(/[^0-9]/isg, "");
					}
					return val.replace(/[^0-9]/isg, "");
				} else {
					return val;
				}
			},
			// 取消
			cancelButton: function() {
				this.showalert = false;
			},
			// 确认按钮
			confirmButton: function() {
				// 确定按钮压下之后，保存数据
				if (this.confirmStatus === 1) {
					// 金額数据保存
					this.saveAmountSold();
					// 关闭确认画面
					this.confirmStatus = 0;
				} else {

					this.returnHomePage();
				}
				// 保存完了之后返回前一画面
				this.showalert = false;

			}
		},
		// 格式化
		filters: {
			// 数据格式,每三位一组,以逗号隔开
			thousandth: function(value) {
				value = String(value).replace("￥", "");
				var intPartFormat;
				if (value !== undefined && value !== null && value !== '' && !isNaN(value)) {
					var intPartFormat = (value + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
				} else {
					intPartFormat = '';
				}
				return intPartFormat;
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

	.menuLine {
		background-color: #3987e4;
		float: left;
		width: 100%;
		height: 9%;
		display: flex;
	}


	.menuLine-s {
		background-color: #3987e4;
		width: 94%;
		height: 9%;
		display: flex;
		margin-left: 3%;
	}

	.table-loft {
		float: left;
	}

	.input-a {
		color: #fff;
		display: flex;
		padding-right: 6px;
		margin-left: 1%;
		margin-right: 1%;
		margin-top: 1%;
		text-align: right;
		border: 1px solid #fff;
		width: 20%;
		height: 70%;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
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

	.returnLable-a {
		color: #fff;
		font-size: 35%;
		display: flex;
		width: 50%;
		padding-left: 2%;
		padding-right: 30%;
		margin: auto 0;
	}

	.returnLable-s {
		font-size: 1vw;
		height: 5%;
		width: 100%;
		margin-left: 3%;
		margin-top: 1%;

	}

	.button-s {
		font-size: 35%;
		height: 7%;
		width: 15%;
		margin-top: 2%;
		margin-left: 15%;
		margin-right: 20%;
		color: #fff;
		padding: auto 0;

	}

	.menuReturn {
		float: left;
		height: 50%;
		margin: auto 0;
		display: flex;
		width: 4%;
		padding-left: 2%;
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


	.table-responsive {

		width: 100%;
		height: 80%;
	}

	.transferSecondTro {
		background-color: #4e759b;
		color: #fff;
		float: left;
		font-size: 1.5vw;
		display: flex;
		width: 100%;
		/* height: 8%; */
	}

	.transferSecondTro-a {

		float: left;
		font-size: 1.5vw;
		display: flex;
		width: 100%;
		/* height: 8%; */
	}

	.transferSecondTho {

		padding-bottom: 3%;
		padding-left: 6px;
		margin-top: 3%;
		margin-right: 2%;
		/* padding: 0.7vw 0; */
		display: inline;
		line-height: 1.8vw;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
		/* display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all; */
		white-space: nowrap;
		text-align: center;

	}

	.transferSecondTho-a {
		padding-right: 6px;
		margin-top: 1%;
		margin-right: 0%;
		/* padding: 0.7vw 0; */
		display: inline;
		line-height: 1.8vw;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
		border: 1px solid #000000;
		width: 28%;
		height: 30px;
		background-color: #fff;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.buttonStyle {
		float: left;
		font-size: 1.7vw;
		background-color: #3987e4;
		width: 25%;
		height: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 5px;
		display: flex;
		color: #FFFFFF;
	}

	.buttonLine {
		width: 80%;
		margin: 2% 0% 0% 0%;
		display: flex;
		height: 6%;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
		float: left;
	}

	.messageLabel {
		width: 100%;
		height: 1%;
		font-size: 2.5vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #4e759b;

	}

	uni-button[disabled]:not([type]),
	uni-button[disabled][type=default] {
		color: white;
		background-color: #3987e4;
	}
</style>
