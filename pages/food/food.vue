<template>
	<view class="container">
		<view class="tableLeftCommon" :style="{ height: windowHeight + 'px' }">
			<view v-if="tableIdNotEmpty === true" class="tableHallTop">
				<!-- 桌名 -->
				<view class="tableHallTopLineOne">
					<image class="backArrowpic" :src="backArrowpic" @click="backArrow"></image>
					<view class="tableName">{{tableName}}</view>
				</view>
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
				<!-- 显示叫起页面 -->
				<!-- <view class="tableHallTopLineThird" @click="backTableList">
					<image class="hallToppic" :src="hallToppic"></image>
				</view> -->
			</view>
			<view v-if="tableIdNotEmpty === false" class="tableHallTop">
				<!-- 桌名 -->
				<view class="tableHallTopLineOne">
					<image class="backArrowpic" :src="backArrowpic" @click="backArrow"></image>
					<image class="packpic" :src="packpic"></image>
					<view class="packpicText">{{i18n.takeAway}}</view>
				</view>
			</view>
			<view class="tableHallBottom">
				<view class="hallTables">
					<view class="hallTablesInfo">
						<!-- 已出单 -->
						<view v-if="this.nowReceivablesId !== null && this.nowReceivablesId !== undefined && this.nowReceivablesId !== ''"
						 class="issuedOrder">
							<image class="quanpic" :src="quanpic"></image>
							<view>{{i18n.issuedOrder}}</view>
						</view>
						<!-- 未出单 -->
						<view v-else class="issuedOrder">
							<image class="quanpic" :src="noSelectedpic"></image>
							<view>{{i18n.notIssued}}</view>
						</view>
						<!-- 就餐人数 -->
						<view class="typelRrenNumber">
							<view class="typelRrenNumberInfo">{{i18n.people}}：{{dinnerNumber}}</view>
						</view>
					</view>
				</view>
				<view class="noOrderPlaced">
					<!-- 已下单商品 -->
					<block v-for="(item ,index) in itemOldList" :key="'info2-'+index">
						<view class="hallLi">
							<view class="hallFood">
								<view class="hallFoodQuan">
									<image class="hallFoodQuanpic" :src="quanpic"></image>
								</view>
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
								<view class="hallAmount">× {{item.itemCount}}</view>
								<view v-if="item.itemClassification === 0 || item.itemClassification === '0'" class="hallGoodPrice">¥
									{{item.itemPrice | numFilter}}</view>
								<view v-else class="hallGoodPrice">¥ -{{item.itemCount*item.itemPrice | numFilter}}</view>
							</view>
						</view>
					</block>
					<!-- 未下单商品 -->
					<block v-for="(item ,index) in unitemList" :key="index">
						<view :class="[unselectFoodOrder === index  ? 'hallLiOther' : 'hallLi' ]" @click="unselectFood(index)">
							<view class="hallFood">
								<!-- 判断商品是否下单,显示不同颜色圆圈:绿色下单,灰色未下单 -->
								<view class="hallFoodQuan">
									<image class="hallFoodQuanpic" :src="quanGreypic"></image>
								</view>
								<!-- 商品名称,规格信息 -->
								<view v-if="item.optionList !== null && item.optionList !== undefined && item.optionList.length !== 0
								&& item.optionList !== [] && item.optionList !== ''"
								 class="hallFoodName">
									<view class="hallNameOther">{{item.itemName}}</view>
									<view class="attributeActive">
										<block v-for="(itemOption ,indexOption) in item.optionList" :key="indexOption">
											{{itemOption.optionName + (itemOption.classification === 2 || itemOption.classification === '2'?'×'+itemOption.optionNumber:'') + '&nbsp;&nbsp;'}}
										</block>
									</view>
								</view>
								<view v-else class="hallFoodName">
									<view class="hallName">{{item.itemName}}</view>
								</view>
							</view>
							<!-- 商品数量,价钱 -->
							<view class="hallPriceAndAmount">
								<view class="hallAmount">× {{item.itemCount}}</view>
								<view class="hallGoodPrice">¥ {{item.itemTotalPrice | numFilter}}</view>
							</view>
						</view>
					</block>
				</view>
				<view class="noOrderPlacedBottom">
					<!-- 传送到后厨 -->
					<view class="lineFooterStart" @click="sendToChef">
						<image class="printpic" :src="printpic">{{i18n.sendToTheChef}}</image>
					</view>
					<!-- 总额 -->
					<view class="lineFooterStartOther">¥ {{orderTotalPrice + orderTotalPriceOld  | numFilter}}</view>
				</view>
			</view>
		</view>
		<view class="foodViewinfo" :style="{ height: windowHeight + 'px' }">
			<!-- 商品信息 -->
			<view v-show="foodCategoryHidden" class="foodInfo">
				<view class="foodScrollable">
					<block v-for="(item ,index) in itemList" :key="index">
						<!-- 判断是否售尽，售尽的不允许点击 -->
						<view :class="[item.itemSoldOutFlag === 1 || item.itemSoldOutFlag === '1' ? 'indexFoodOther' : 'indexFood' ]"
						 @click="selectFood(index)">
							<view class="indexFoodLeft">
								<!-- 商品单价 -->
								<view class="indexFoodPrice">¥{{item.itemPrice | numFilter}}</view>
								<!-- 商品单位 -->
								<view class="indexFoodCount">1{{item.itemUnitName}}</view>
							</view>
							<!-- 商品名称 -->
							<view class="indexFoodRight">
								<view class="centerFoodNameMore">{{item.itemName}}</view>
							</view>
							<!-- 商品个数 -->
							<view v-if="item.itemCount !== 0" class="indexFood_Top">{{item.itemCount}}</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 分类信息 -->
			<view v-show="foodCategoryHidden" class="categoryInfo">
				<view class="indexCategory">
					<view class="categorScrollable">
						<block v-for="(item ,index) in categoryList" :key="index">
							<view :class="[selectCategory === item.categoryId ? 'centerCategoryOther' : 'centerCategory' ]" @click="categoryButton(index)">{{item.categoryName}}</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 商品修改 -->
			<view v-show="modifyFoodHidden" class="orderDetailChange">
				<view class="commonSortInfo">
					<view class="attributeLine">
						<!-- 返回 -->
						<view class="attributeReturn" @click="attributeReturnButton">
							<image class="attributeReturnpic" :src="attributeReturnpic"></image>
						</view>
						<view class="attributeSorts">
							<!-- 删除品项 -->
							<view :class="[isDelectSort ? 'attributeSortOther' : 'attributeSort' ]" @click="delectSortButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="changeTablepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.deleteItem}}</view>
							</view>
							<!-- 修改品项 -->
							<view :class="[isModifySort ? 'attributeSortOther' : 'attributeSort' ]" @click="modifySortButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="changeTablepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.modifiedItem}}</view>
							</view>
							<!-- 添加商品 -->
							<view :class="[isAddSort ? 'attributeSortOther' : 'attributeSort' ]" @click="addSortButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="changeTablepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.addItem}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="commonDetialInfo">
					<!-- 修改品项 -->
					<view v-if="isModifySort" class="modifySortInfo">
						<view class="modifyFoodAttributeLine">
							<!-- 数量及备注 -->
							<view class="numAndRemark">
								<view class="numAndRemarkTitle">{{i18n.quantityAndRemarks}}</view>
								<view class="numAndRemarkNum">
									<view class="numAndRemarkJian" @click="jianunselectFood">-</view>
									<!-- 数量 -->
									<view class="numAndRemarkNUm">
										<!-- <view class="numAndRemarkInput">{{unselectFoodNumber}}</view> -->
										<input @input="inputChange" type="text" :value="unselectFoodNumber" class="middleButton" />
									</view>
									<view class="numAndRemarkAdd" @click="addunselectFood">+</view>
								</view>
							</view>
							<!-- 备注 -->
							<!-- <view class="numAndRemarkContent">
								<input maxlength="20" type="text" value="" class="numAndRemarkContentInput" :placeholder="i18n.remarks" />
							</view> -->
						</view>
						<!-- 规格 -->
						<view v-if="optionSpeList.length" class="foodAttributeSizeTitle">{{i18n.specifications}}</view>
						<view class="foodAttributeSize">
							<block v-for="(item ,index) in optionSpeList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameOther' : 'foodAttributelabelName' ]"
								 @click="selectOptionSpe(index)">{{item.optionName}}</view>
							</block>
						</view>
						<!-- 做法 -->
						<view v-if="optionMetList.length" class="foodAttributeSizeTitle">{{i18n.practice}}</view>
						<view class="foodAttributeSize">
							<block v-for="(item ,index) in optionMetList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameOther' : 'foodAttributelabelName' ]"
								 @click="selectOptionMet(index)">{{item.optionName}}</view>
							</block>
						</view>
						<!-- 配料 -->
						<view v-if="optionIngList.length" class="foodAttributeSizeTitle">{{i18n.ingredients}}</view>
						<view class="foodAttributeSize">
							<block v-for="(item ,index) in optionIngList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameIngredientsOther' : 'foodAttributelabelNameIngredients' ]">
									<!-- 配料名称 -->
									<view class="foodAttributelabelNameIngName" @click="selectOptionIng(index)">{{item.optionName}}</view>
									<view class="foodAttributelabelNameIngPrice">
										<view class="addIngredients" @click="addIngNumber(index)">+</view>
										<!-- 配料个数 -->
										<!-- <view class="inputIngredients">{{item.optionCount}}</view> -->
										<input @input="inputChangeoption($event,index)" type="text" :value="item.optionNumber" class="inputIngredients" />
										<view class="addIngredients" @click="jianIngNumber(index)">-</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<!-- 删除菜品 -->
					<view v-if="isDelectSort" class="deleteSortInfo">
						<view class="backDetailNum">{{i18n.deleteDishes}}</view>
						<view class="backDetailDeleteFood" @click="sureDeteleFood">{{i18n.oKToDelete}}</view>
					</view>
					<!-- 新增商品 -->
					<view v-if="isAddSort" class="deleteSortInfo">
						<view class="backDetailNum">{{i18n.quantityOfNewProducts}}:1</view>
						<view class="backDetailDeleteFood" @click="sureAddFood">{{i18n.confirm}}</view>
					</view>
				</view>
			</view>
			<view v-show="wakeUpHidden" class="remarkContent">
				<!-- 订单备注 -->
				<view class="orderRemarkTitle">{{i18n.orderNotes}}</view>
				<view class="orderRemark">
					<textarea class="orderRemarkContent"></textarea>
				</view>
				<!-- 叫起 -->
				<view class="wakeUp">
					<checkbox-group>
						<label class="checkboxLabel">
							<checkbox value="1" />{{i18n.wakeUp}}
						</label>
					</checkbox-group>
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
				// 图片路径
				tableSeatpic: '../../static/tableSeatpic.png',
				orderCountpic: '../../static/orderCountpic.png',
				orderPeoplepic: '../../static/orderPeoplepic.png',
				backArrowpic: '../../static/backArrow.png',
				hallToppic: '../../static/hallTop.png',
				noSelectedpic: '../../static/noSelected.png',
				quanGreypic: '../../static/noSelected.png',
				printpic: '../../static/print.png',
				changeTablepic: '../../static/changeTable.png',
				attributeReturnpic: '../../static/attributeReturn.png',
				quanpic: '../../static/quan.png',
				packpic: '../../static/pack.png',
				// 桌名
				tableName: '',
				// エリア名
				areaTypeName: '',
				// 桌位数
				tableSeatCount: '',
				// 顾客数
				customerCount: '',
				// 订单数
				orderCount: '',
				// 就餐人数
				dinnerNumber: '',
				// 当前桌台位置
				nowAreaId: '',
				// 商品分类信息
				categoryList: '',
				// 选择的分类
				selectCategory: '',
				// 商品信息
				itemList: '',
				// 未下单商品
				unitemList: [],
				// 判断是否数组中存在此商品
				judgeRepeat: '',
				// 选择的未下单商品顺序
				unselectFoodOrder: '',
				// 是否显示隐藏商品和分类
				foodCategoryHidden: true,
				// 是否显示隐藏修改商品
				modifyFoodHidden: false,
				// 是否选中删除品项
				isDelectSort: false,
				// 是否选中修改品项
				isModifySort: false,
				// 是否选中添加商品
				isAddSort: false,
				// 是否显示叫起画面
				wakeUpHidden: false,
				// 商品数量
				unselectFoodNumber: '',
				// 规格
				optionSpeList: '',
				// 做法
				optionMetList: '',
				// 配菜
				optionIngList: '',
				// 当前受付ID
				nowReceivablesId: '',
				// 已下单订单信息
				itemOldList: [],
				// 订单总价
				orderTotalPrice: 0,
				// 已下单总价
				orderTotalPriceOld: 0,
				// 判断特殊需求是否重复
				unitemOptionFlag: '',
				// 当前桌台ID
				nowTable: '',
				// 未下单商品的顺序
				inItemSunXu: 0,
				// 屏幕高度
				windowHeight: 0,
				// 弹框
				showalert: false,
				// 弹框提示
				tipMessage: '',
				// 桌号是否为空
				tableIdNotEmpty: true,
				// 放题ID
				buffetIdList: [],
				// 印刷結果
				printSuccessResult: ""
			}
		},
		onLoad: function(option) {
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
				}
			})
			const item = JSON.parse(decodeURIComponent(option.item));
			// 桌名
			this.tableName = item.tableName;
			// エリア名
			this.areaTypeName = item.areaTypeName;
			// 桌位数
			this.tableSeatCount = item.tableSeatCount;
			// 顾客数
			this.customerCount = item.customerCount;
			// 订单数
			this.orderCount = item.orderCount;
			// 就餐人数
			this.dinnerNumber = item.dinnerNumber;
			// 当前桌台位置
			this.nowAreaId = item.nowAreaId;
			// 当前受付ID
			this.nowReceivablesId = item.nowReceivablesId;
			// 当前桌台ID
			this.nowTable = item.nowTable;

			// 判断桌号是否为空（空代表带走，不为空代表店内）
			if (item.nowTable !== null && item.nowTable !== undefined && item.nowTable !== '') {
				this.tableIdNotEmpty = true;
			} else {
				this.tableIdNotEmpty = false;
			}

			if (this.nowReceivablesId !== null && this.nowReceivablesId !== undefined && this.nowReceivablesId !== '') {
				// 获取已下单商品信息
				this.loadItemOldData();
			}
			// 获取商品分类信息
			this.loadCategoryData();
		},
		methods: {
			// 返回桌子位置画面
			backArrow: function(e) {
				uni.reLaunch({
					url: '/pages/tableList/tableList?nowAreaId=' + this.nowAreaId
				});
			},
			// 获取已下单商品信息
			loadItemOldData() {

				const data = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					receivablesId: this.nowReceivablesId
				};
				// 获取订单商品信息
				http
					.post('api/stpd/getOrderItemList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 订单商品
							this.itemOldList = result.data.itemList;
							// 订单总价
							this.orderTotalPriceOld = result.data.orderAmount;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
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
			// 获取商品分类信息
			loadCategoryData() {

				const dataCategory = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					receivablesId: this.nowReceivablesId
				};
				// 获取桌台信息
				http
					.post('api/stpd/getCategoryList', dataCategory)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 分类信息
							this.categoryList = result.data.categoryList;
							// 取得第一个分类
							this.selectCategory = this.categoryList[0].categoryId;
							for (let i = 0; i < this.categoryList.length; i++) {
								if (this.categoryList[i].buffetFlag === '3') {
									this.buffetIdList.push(this.categoryList[i].categoryId)
								}
							}
							// 获取商品信息
							this.loadFoodData(this.selectCategory, this.categoryList[0].buffetFlag);
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
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
			// 获取商品信息
			loadFoodData(selectCategory, buffetFlag) {

				const dataFood = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					categoryId: selectCategory,
					receivablesId: this.nowReceivablesId,
					buffetId: buffetFlag === '3' ? selectCategory : '',
					buffetIdList: this.buffetIdList
				};
				// 获取桌台信息
				http
					.post('api/stpd/getItemList', dataFood)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 商品信息
							this.itemList = result.data.itemList;
							for (let i = 0; i < this.itemList.length; i++) {
								this.itemList[i]['itemCount'] = 0;
							}
							// 计算商品数量（商品右上角红点）
							this.calculationItemCount();
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
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
			// 计算商品数量（商品右上角红点）
			calculationItemCount() {
				if (this.unitemList !== null && this.unitemList !== undefined && this.unitemList !== '') {
					for (let i = 0; i < this.itemList.length; i++) {
						this.itemList[i].itemCount = 0;
						for (let y = 0; y < this.unitemList.length; y++) {
							if (this.itemList[i].itemId === this.unitemList[y].itemId) {
								this.itemList[i].itemCount = Number(this.itemList[i].itemCount) + Number(this.unitemList[y].itemCount);
							}
						}
					}
				}
			},
			// 选择分类
			categoryButton: function(e) {
				this.selectCategory = this.categoryList[e].categoryId;
				// 获取商品信息
				this.loadFoodData(this.selectCategory, this.categoryList[e].buffetFlag);
			},
			// 选择商品
			selectFood: function(e) {
				this.inItemSunXu = 0;

				// 判断是不是售尽
				if (this.itemList[e].itemSoldOutFlag !== 1 && this.itemList[e].itemSoldOutFlag !== '1') {
					this.itemList[e].itemCount = this.itemList[e].itemCount + 1;
					// 未下单商品总价
					this.orderTotalPrice = Number(this.orderTotalPrice) + Number(this.itemList[e].itemPrice);
					// 判断是否有已点商品
					if (this.unitemList !== null && this.unitemList !== undefined && this.unitemList !== [] &&
						this.unitemList !== '' && this.unitemList.length !== 0) {
						// 判断是否数组中存在此商品
						this.judgeRepeat = false;
						for (let i = 0; i < this.unitemList.length; i++) {
							if (this.itemList[e].itemId === this.unitemList[i].itemId) {
								// 判断是不是第二次进入
								if (this.judgeRepeat === false) {
									// 判断商品是否有特殊要求
									if (this.unitemList[i].optionList !== null && this.unitemList[i].optionList !== undefined &&
										this.unitemList[i].optionList.length !== 0 && this.unitemList[i].optionList !== '') {
										const food = {
											itemId: this.itemList[e].itemId,
											itemName: this.itemList[e].itemName,
											itemPrice: this.itemList[e].itemPrice,
											itemCount: 1,
											itemTotalPrice: this.itemList[e].itemPrice,
											optionList: []
										}
										this.unitemList.push(food);
										this.judgeRepeat = true;
										this.inItemSunXu = this.unitemList.length - 1;
									} else {
										// 商品数量加1
										this.unitemList[i].itemCount = this.unitemList[i].itemCount + 1;
										// 计算总计
										this.unitemList[i].itemTotalPrice = this.unitemList[i].itemCount * this.unitemList[i].itemPrice;
										this.judgeRepeat = true;
										this.inItemSunXu = i;
									}
								}
							}
						}
						// 数组中不存在此商品
						if (!this.judgeRepeat) {
							const food = {
								itemId: this.itemList[e].itemId,
								itemName: this.itemList[e].itemName,
								itemPrice: this.itemList[e].itemPrice,
								itemCount: 1,
								itemTotalPrice: this.itemList[e].itemPrice,
								optionList: []
							}
							this.unitemList.push(food);
							this.inItemSunXu = this.unitemList.length - 1;
						}
						// 没有已点商品
					} else {
						const food = {
							itemId: this.itemList[e].itemId,
							itemName: this.itemList[e].itemName,
							itemPrice: this.itemList[e].itemPrice,
							itemCount: 1,
							itemTotalPrice: this.itemList[e].itemPrice,
							optionList: []
						}
						this.unitemList.push(food);
						this.inItemSunXu = 0;
					}
					// 如果点击的商品有特殊需求，则默认点击了这个商品
					if (this.itemList[e].optionFlag === 1 || this.itemList[e].optionFlag === '1') {
						this.unselectFood(this.inItemSunXu);
					}
				}
			},
			// 选择未下单商品
			unselectFood: function(e) {
				// 选择的未下单商品顺序
				this.unselectFoodOrder = e;
				// 商品数量
				this.unselectFoodNumber = this.unitemList[e].itemCount;
				// 隐藏商品和分类
				this.foodCategoryHidden = false;
				// 显示修改商品信息
				this.modifyFoodHidden = true;
				// 显示修改品项
				this.isModifySort = true;
				// 隐藏删除品项
				this.isDelectSort = false;
				// 隐藏添加商品
				this.isAddSort = false;
				// 获取规格信息
				this.loadFoodOptionData(this.unitemList[e].itemId, this.unitemList[e].itemPrice);
			},
			// 获取商品特殊需求信息
			loadFoodOptionData(itemId, itemPrice) {

				const dataFoodOption = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					itemId: itemId,
					buffetItemFlag: (itemPrice === '0' || itemPrice === 0 || Number(itemPrice) === 0) ? '1' : ''
				};
				// 获取特殊需求信息
				http
					.post('api/stpd/getItem', dataFoodOption)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 商品特殊需求信息
							const optionTypeList = result.data.optionTypeList;
							// 规格数组
							this.optionSpeList = [];
							// 做法数组
							this.optionMetList = [];
							// 配料数组
							this.optionIngList = [];

							for (let i = 0; i < optionTypeList.length; i++) {
								if (optionTypeList[i].optionList === null || optionTypeList[i].optionList === undefined) {
									continue;
								}
								for (let y = 0; y < optionTypeList[i].optionList.length; y++) {
									// 単一選択
									if (optionTypeList[i].classification === 0 || optionTypeList[i].classification === '0') {
										// 判断已点菜是否含有规格
										if (this.unitemList[this.unselectFoodOrder].optionList !== null && this.unitemList[this.unselectFoodOrder].optionList
											.length !== 0 &&
											this.unitemList[this.unselectFoodOrder].optionList !== undefined) {
											this.unitemOptionFlag = 0;
											for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
												// 判断是不是同一种规格
												if ((this.unitemList[this.unselectFoodOrder].optionList[z].classification === 0 || this.unitemList[this.unselectFoodOrder]
														.optionList[z].classification === '0') &&
													this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === optionTypeList[i].optionList[y].optionCode
												) {
													// 记录住已点菜的规格
													this.optionSpeList.push(this.unitemList[this.unselectFoodOrder].optionList[z]);
													this.unitemOptionFlag = 1;
												}
											}
											// 不是同一种规格的重新赋值
											if (this.unitemOptionFlag === 0) {
												optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
												optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
												optionTypeList[i].optionList[y]['selectionStatus'] = '';
												this.optionSpeList.push(optionTypeList[i].optionList[y]);
											}
											// 已点菜不包含规格的重新赋值
										} else {
											optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
											optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
											optionTypeList[i].optionList[y]['selectionStatus'] = '';
											this.optionSpeList.push(optionTypeList[i].optionList[y]);
										}

										// 複数選択	
									} else if (optionTypeList[i].classification === 1 || optionTypeList[i].classification === '1') {
										// 判断已点菜是否含有做法
										if (this.unitemList[this.unselectFoodOrder].optionList !== null && this.unitemList[this.unselectFoodOrder].optionList
											.length !== 0 &&
											this.unitemList[this.unselectFoodOrder].optionList !== undefined) {
											this.unitemOptionFlag = 0;
											for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
												// 判断是不是同一种做法
												if ((this.unitemList[this.unselectFoodOrder].optionList[z].classification === 1 || this.unitemList[this.unselectFoodOrder]
														.optionList[z].classification === '1') &&
													this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === optionTypeList[i].optionList[y].optionCode
												) {
													// 记录住已点菜的做法
													this.optionMetList.push(this.unitemList[this.unselectFoodOrder].optionList[z]);
													this.unitemOptionFlag = 1;
												}
											}
											// 不是同一种做法的重新赋值
											if (this.unitemOptionFlag === 0) {
												optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
												optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
												optionTypeList[i].optionList[y]['selectionStatus'] = '';
												this.optionMetList.push(optionTypeList[i].optionList[y]);
											}
											// 已点菜不包含做法的重新赋值
										} else {
											optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
											optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
											optionTypeList[i].optionList[y]['selectionStatus'] = '';
											this.optionMetList.push(optionTypeList[i].optionList[y]);
										}

										// 数量選択	
									} else if (optionTypeList[i].classification === 2 || optionTypeList[i].classification === '2') {
										// 判断已点菜是否含有配菜
										if (this.unitemList[this.unselectFoodOrder].optionList !== null && this.unitemList[this.unselectFoodOrder].optionList
											.length !== 0 &&
											this.unitemList[this.unselectFoodOrder].optionList !== undefined) {
											this.unitemOptionFlag = 0;
											for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
												// 判断是不是同一种配菜
												if ((this.unitemList[this.unselectFoodOrder].optionList[z].classification === 2 || this.unitemList[this.unselectFoodOrder]
														.optionList[z].classification === '2') &&
													this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === optionTypeList[i].optionList[y].optionCode
												) {
													// 记录住已点菜的配菜
													this.optionIngList.push(this.unitemList[this.unselectFoodOrder].optionList[z]);
													this.unitemOptionFlag = 1;
												}
											}
											// 不是同一种配菜的重新赋值
											if (this.unitemOptionFlag === 0) {
												optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
												optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
												optionTypeList[i].optionList[y]['selectionStatus'] = '';
												optionTypeList[i].optionList[y]['optionNumber'] = '1';
												this.optionIngList.push(optionTypeList[i].optionList[y]);
											}
											// 已点菜不包含配菜的重新赋值
										} else {
											optionTypeList[i].optionList[y]['optionTypeCd'] = optionTypeList[i].optionTypeCd;
											optionTypeList[i].optionList[y]['classification'] = optionTypeList[i].classification;
											optionTypeList[i].optionList[y]['selectionStatus'] = '';
											optionTypeList[i].optionList[y]['optionNumber'] = '1';
											this.optionIngList.push(optionTypeList[i].optionList[y]);
										}

									}
								}
							}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3002') {
							// 数据不存在
							this.showalert = true;
							this.tipMessage = this.i18n.dataDoesNotExist;
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
			// 选择删除品项
			delectSortButton: function(e) {
				// 显示删除品项
				this.isDelectSort = true;
				// 隐藏修改品项
				this.isModifySort = false;
				// 隐藏添加商品
				this.isAddSort = false;
			},
			// 选择修改品项
			modifySortButton: function(e) {
				// 显示修改品项
				this.isModifySort = true;
				// 隐藏删除品项
				this.isDelectSort = false;
				// 隐藏添加商品
				this.isAddSort = false;
			},
			// 选择添加商品
			addSortButton: function(e) {
				// 显示添加商品
				this.isAddSort = true;
				// 隐藏修改品项
				this.isModifySort = false;
				// 隐藏删除品项
				this.isDelectSort = false;
			},
			// 返回点餐界面
			attributeReturnButton: function(e) {
				// 显示商品和分类
				this.foodCategoryHidden = true;
				// 隐藏修改商品信息
				this.modifyFoodHidden = false;
				this.unselectFoodOrder = '';
			},
			// 显示叫起画面
			backTableList: function(e) {
				this.unselectFoodOrder = '';
				if (this.wakeUpHidden === false) {
					this.wakeUpHidden = true;
					// 隐藏商品和分类
					this.foodCategoryHidden = false;
					// 隐藏修改商品信息
					this.modifyFoodHidden = false;
				} else {
					this.wakeUpHidden = false;
					// 显示商品和分类
					this.foodCategoryHidden = true;
					// 隐藏修改商品信息
					this.modifyFoodHidden = false;
				}
			},
			// 删除商品
			sureDeteleFood: function(e) {
				this.unitemList.splice(this.unselectFoodOrder, 1);
				// 计算总价
				this.calculateTotalPrice();
				// 计算商品数量（商品右上角红点）
				this.calculationItemCount();
			},
			// 添加商品
			sureAddFood: function(e) {
				const food = {
					itemId: this.unitemList[this.unselectFoodOrder].itemId,
					itemName: this.unitemList[this.unselectFoodOrder].itemName,
					itemPrice: this.unitemList[this.unselectFoodOrder].itemPrice,
					itemCount: 1,
					itemTotalPrice: this.unitemList[this.unselectFoodOrder].itemPrice,
					optionList: []
				}
				this.unitemList.push(food)
				// 计算总价
				this.calculateTotalPrice();
				// 计算商品数量（商品右上角红点）
				this.calculationItemCount();
			},
			// 增加商品数量
			addunselectFood: function(e) {
				this.unselectFoodNumber = Number(this.unselectFoodNumber) + 1;
				this.unitemList[this.unselectFoodOrder].itemCount = Number(this.unitemList[this.unselectFoodOrder].itemCount) + 1;
				// 计算总价
				this.calculateTotalPrice();
				// 计算商品数量（商品右上角红点）
				this.calculationItemCount();
			},
			// 减少商品数量
			jianunselectFood: function(e) {
				if (this.unselectFoodNumber !== 1 && this.unselectFoodNumber !== '1') {
					this.unselectFoodNumber = Number(this.unselectFoodNumber) - 1;
					this.unitemList[this.unselectFoodOrder].itemCount = Number(this.unitemList[this.unselectFoodOrder].itemCount) - 1;
					// 计算总价
					this.calculateTotalPrice();
					// 计算商品数量（商品右上角红点）
					this.calculationItemCount();
				}
			},
			// 改变商品数文本框
			inputChange(e) {
				this.unselectFoodNumber = e.detail.value;
				this.unitemList[this.unselectFoodOrder].itemCount = this.unselectFoodNumber;
				// 计算总价
				this.calculateTotalPrice();
				// 计算商品数量（商品右上角红点）
				this.calculationItemCount();
			},
			// 选择规格
			selectOptionSpe: function(e) {
				// 判断当前规格是否被选择
				if (this.optionSpeList[e].selectionStatus !== 1 && this.optionSpeList[e].selectionStatus !== '1') {
					// 状态改为被选中状态
					this.optionSpeList[e].selectionStatus = '1';
					this.unitemList[this.unselectFoodOrder].optionList.push(this.optionSpeList[e]);
					for (let i = 0; i < this.optionSpeList.length; i++) {
						if (e !== i) {
							this.optionSpeList[i].selectionStatus = '0';
							for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
								// 将其他的规格删除
								if (this.unitemList[this.unselectFoodOrder].optionList[z].optionTypeCd === this.optionSpeList[i].optionTypeCd &&
									this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === this.optionSpeList[i].optionCode) {
									this.unitemList[this.unselectFoodOrder].optionList.splice(z, 1);
								}
							}
						}
					}
				} else {
					// 状态变为选择状态
					this.optionSpeList[e].selectionStatus = '0';
					// 规格删除
					for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
						// 将其他的规格删除
						if (this.unitemList[this.unselectFoodOrder].optionList[z].optionTypeCd === this.optionSpeList[e].optionTypeCd &&
							this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === this.optionSpeList[e].optionCode) {
							this.unitemList[this.unselectFoodOrder].optionList.splice(z, 1);
						}
					}
				}

				// 计算总价
				this.calculateTotalPrice();
			},
			// 计算总价
			calculateTotalPrice() {
				// 总价初始化为0
				this.orderTotalPrice = 0;
				for (let z = 0; z < this.unitemList.length; z++) {
					// 配菜的价钱
					const priceOption = 0;
					for (let x = 0; x < this.unitemList[z].optionList.length; x++) {
						// 判断是否为数量選択
						if (this.unitemList[z].optionList[x].classification === 2 || this.unitemList[z].optionList[x].classification ===
							'2') {
							priceOption = priceOption + Number(this.unitemList[z].optionList[x].diffPrice) * Number(this.unitemList[z].optionList[
								x].optionNumber);
						} else {
							priceOption = priceOption + Number(this.unitemList[z].optionList[x].diffPrice);
						}

					}
					// 计算单个菜品总价
					this.unitemList[z].itemTotalPrice = (priceOption + Number(this.unitemList[z].itemPrice)) * Number(this.unitemList[
						z].itemCount);
					// 配菜的价钱
					this.unitemList[z].attributeTotalMoney = priceOption;
					// 计算订单总价
					this.orderTotalPrice = this.orderTotalPrice + this.unitemList[z].itemTotalPrice;
				}
			},
			// 选择做法
			selectOptionMet: function(e) {
				// 判断当前做法是否被选择
				if (this.optionMetList[e].selectionStatus === 1 || this.optionMetList[e].selectionStatus === '1') {
					this.optionMetList[e].selectionStatus = '0';
					// 做法状态为不选择时,删除数组中此数据
					for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
						if (this.unitemList[this.unselectFoodOrder].optionList[z].optionTypeCd === this.optionMetList[e].optionTypeCd &&
							this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === this.optionMetList[e].optionCode) {
							this.unitemList[this.unselectFoodOrder].optionList.splice(z, 1);
						}
					}
				} else {
					// 状态变为选择状态
					this.optionMetList[e].selectionStatus = '1';
					// 放入数组
					this.unitemList[this.unselectFoodOrder].optionList.push(this.optionMetList[e]);
				}
				// 计算总价
				this.calculateTotalPrice();
			},
			// 选择配菜
			selectOptionIng: function(e) {
				// 判断当前配菜是否被选择
				if (this.optionIngList[e].selectionStatus === 1 || this.optionIngList[e].selectionStatus === '1') {
					this.optionIngList[e].selectionStatus = '0';
					// 做法状态为不选择时,删除数组中此数据
					for (let z = 0; z < this.unitemList[this.unselectFoodOrder].optionList.length; z++) {
						if (this.unitemList[this.unselectFoodOrder].optionList[z].optionTypeCd === this.optionIngList[e].optionTypeCd &&
							this.unitemList[this.unselectFoodOrder].optionList[z].optionCode === this.optionIngList[e].optionCode) {
							this.unitemList[this.unselectFoodOrder].optionList.splice(z, 1);
						}
					}
				} else {
					// 状态变为选择状态
					this.optionIngList[e].selectionStatus = '1';
					// 放入数组
					this.unitemList[this.unselectFoodOrder].optionList.push(this.optionIngList[e]);
				}
				// 计算总价
				this.calculateTotalPrice();
			},
			// 增加配菜数量
			addIngNumber: function(e) {
				this.optionIngList[e].optionNumber = Number(this.optionIngList[e].optionNumber) + Number(1);
				if (this.optionIngList[e].selectionStatus === 1 || this.optionIngList[e].selectionStatus === '1') {
					// 计算总价
					this.calculateTotalPrice();
				}
			},
			// 减少配菜数量
			jianIngNumber: function(e) {
				if (this.optionIngList[e].optionNumber !== 1 && this.optionIngList[e].optionNumber !== '1') {
					this.optionIngList[e].optionNumber = Number(this.optionIngList[e].optionNumber) - Number(1);
				}
				if (this.optionIngList[e].selectionStatus === 1 || this.optionIngList[e].selectionStatus === '1') {
					// 计算总价
					this.calculateTotalPrice();
				}
			},
			// 改变配菜数文本框
			inputChangeoption: function(e, index) {
				this.optionIngList[index].optionNumber = e.detail.value;
				if (this.optionIngList[index].selectionStatus === 1 || this.optionIngList[index].selectionStatus === '1') {
					// 计算总价
					this.calculateTotalPrice();
				}
			},
			// 传送到后厨
			sendToChef: function(e) {
				this.$showLoading();
				if (this.unitemList !== null && 0 < this.unitemList.length) {
					const items = [];
					for (let z = 0; z < this.unitemList.length; z++) {
						const option = []
						for (let y = 0; y < this.unitemList[z].optionList.length; y++) {
							let optionCount = this.unitemList[z].optionList[y].optionNumber;
							if (optionCount === null) {
								optionCount = 1;
							}
							option.push({
								optionTypeCd: this.unitemList[z].optionList[y].optionTypeCd,
								optionCode: this.unitemList[z].optionList[y].optionCode,
								optionCount: optionCount,
								optionDiffPrice: this.unitemList[z].optionList[y].diffPrice
							})
						}
						items.push({
							itemId: this.unitemList[z].itemId,
							itemPrice: (this.unitemList[z].itemPrice + this.unitemList[z].attributeTotalMoney) * this.unitemList[z].itemCount,
							itemCount: this.unitemList[z].itemCount,
							attributeTotalMoney: this.unitemList[z].attributeTotalMoney,
							option: option
						})
					}
					const data = {
						storeId: getApp().globalData.storeId,
						customerCount: this.dinnerNumber,
						receivablesId: this.nowReceivablesId,
						tableId: this.nowTable,
						orderAmount: Number(this.orderTotalPrice),
						items: items
					};
					// 传送到后厨
					http
						.post('api/stpd/registOrder', JSON.stringify(data))
						.then(result => {
							if (result.data.resultCode === '0000') {

								this.printSuccessResult = "";
								printModule.printSlip(
									result.data.printInfo,
									(ret) => {
										this.printSuccessResult = ret.code;
										if (this.printSuccessResult != "00") {
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
											const item = {
												areaId: this.nowAreaId,
												nowReceivablesId: this.nowReceivablesId,
												id: this.nowTable
											};
											// 跳转桌台页面
											uni.reLaunch({
												url: '/pages/table/table?item=' + encodeURIComponent(JSON.stringify(item))
											});
											// 隐藏加载动画
											this.$hideLoading();
										}
									})
							} else if (result.data.resultCode === '9001') {
								// 参数校验失败
								this.showalert = true;
								this.tipMessage = this.i18n.parameterVerificationFailed;
								// 隐藏加载动画
								this.$hideLoading();
							} else if (result.data.resultCode === '3002') {
								// 数据不存在
								this.showalert = true;
								this.tipMessage = this.i18n.dataDoesNotExist;
								// 隐藏加载动画
								this.$hideLoading();
							} else {
								// 系统未知错误
								this.showalert = true;
								this.tipMessage = this.i18n.systemUnknownError;
								// 隐藏加载动画
								this.$hideLoading();
							}
						}).catch(() => {
							// 网络异常，请求失败
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
							// 隐藏加载动画
							this.$hideLoading();
						});
				}
				// 隐藏加载动画
				this.$hideLoading();
			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			},
		},
		// 过滤器
		filters: {
			// 金额千分符
			numFilter(e) {
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

	.foodViewinfo {
		height: 100%;
		padding-left: 2%;
		float: left;
		width: 64.67%;
	}

	.tableHallTop {
		background-color: rgb(57, 135, 228);
		height: 10%;
		float: left;
		width: 100%;
		display: flex;
	}

	.tableHallTopLineOne {
		margin: auto 3% auto 9%;
		float: left;
		width: 30%;
		font-size: 1.7vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tableHallTopLineSecond {
		width: 70%;
		float: left;
		text-align: left;
		font-size: 1.3vw;
		margin: 2% 2%;
	}

	.tableHallTopLineThird {
		margin: auto;
		width: 15%;
		height: 100%;
		font-size: 4vw;
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

	.tableSeatpic {
		width: 30%;
		height: 2vw;
		float: left;
	}

	.tableSeatCount {
		width: 70%;
		float: left;
	}

	.orderCount {
		width: 37%;
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

	.hallToppic {
		width: 3vw;
		height: 3vw;
		text-align: right;
	}

	.backArrowpic {
		position: absolute;
		top: 1vw;
		left: 0.2vw;
		width: 3vw;
		height: 3vw;
	}

	.tableName {
		font-size: 1.5vw;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: relative;
	}

	.tableHallBottom {
		float: left;
		width: 100%;
		height: 90%;
	}

	.hallTables {
		width: 100%;
		height: 8%;
		padding: 0;
		float: left;
		border-bottom: 1px solid #7D809A;
	}

	.noOrderPlaced {
		width: 100%;
		height: 78%;
		padding: 0;
		float: left;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.noOrderPlacedBottom {
		width: 100%;
		height: 14%;
		padding: 0;
		float: left;
		display: flex;
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
		line-height: 2.5vw;
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

	.lineFooterStart {
		margin: auto;
		float: left;
		width: 42.5%;
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

	.lineFooterStartOther {
		margin: auto;
		float: left;
		width: 42.5%;
		text-align: center;
		height: 4vw;
		font-size: 1.6vw;
		line-height: 4vw;
		color: #fff;
		font-weight: 600;
		background-color: #4abcff;
		background-size: 100% 100%;
		border: none;
	}

	.printpic {
		width: 2vw;
		height: 2vw;
		vertical-align: middle;
	}

	.foodInfo {
		height: 98%;
		width: 77%;
		float: left;
		padding-left: 2%;
		padding-right: 2%;
	}

	.categoryInfo {
		width: 19%;
		height: 100%;
		float: left;
	}

	.foodScrollable {
		overflow-y: auto;
		max-height: 100%;
		height: 100%;
	}

	.indexFood {
		width: 31%;
		height: 7vw;
		float: left;
		margin-top: 1vw;
		margin-left: 2%;
		background-image: url(../../static/foodImg.png);
		background-size: 110% 100%;
		font-weight: 700;
		position: relative;
	}

	.indexFoodOther {
		width: 31%;
		height: 7vw;
		float: left;
		margin-top: 1vw;
		margin-left: 2%;
		background-image: url(../../static/foodImgGrey.png);
		background-size: 110% 100%;
		font-weight: 700;
	}

	.indexFoodLeft {
		width: 45%;
		float: left;
		text-align: center;
		font-size: 1.2vw;
		color: black;
		height: 7vw;
	}

	.indexFoodPrice {
		height: 3.5vw;
		margin: auto;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		text-align: center;
		-webkit-box-pack: center;
		line-height: 3.5vw;
	}

	.indexFoodCount {
		height: 3.5vw;
		line-height: 3.5vw;
	}

	.indexFoodRight {
		width: 55%;
		float: left;
		color: black;
		color: white;
		height: 7vw;
		display: flex;
		text-align: center;
	}

	.centerFoodNameMore {
		font-size: 1vw;
		-webkit-line-clamp: 3;
		margin: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		word-break: break-all;
		white-space: inherit;
	}

	.indexCategory {
		margin-left: 4%;
		background-color: #3987e4;
		color: white;
		font-weight: 700;
		height: 100%;
	}

	.categorScrollable {
		height: 100%;
		max-height: 90%;
		float: left;
		width: 100%;
		overflow-y: auto;
		padding-top: 20%;
		padding-bottom: 20%;
	}

	.centerCategory {
		color: white;
		width: 100%;
		height: 6vw;
		font-size: 2vw;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		text-align: center;
		-webkit-box-pack: center;
	}

	.centerCategoryOther {
		background-color: #6db5f7;
		color: white;
		width: 100%;
		height: 6vw;
		font-size: 2vw;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		text-align: center;
		-webkit-box-pack: center;
	}

	.orderDetailChange {
		width: 100%;
		height: 100%;
		max-height: 100%;
	}

	.commonSortInfo {
		height: 18%;
		background-color: #3987e4;
	}

	.commonDetialInfo {
		border-radius: 2vw;
		height: 79%;
		margin-top: 2%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.attributeLine {
		height: 100%;
		width: 100%;
		float: left;
	}

	.attributeReturn {
		float: left;
		width: 8%;
		height: 100%;
		margin-left: 2%;
	}

	.attributeReturnpic {
		width: 5vw;
		height: 5vw;
		text-align: right;
	}

	.attributeSorts {
		float: left;
		width: 90%;
		height: 100%;
	}

	.attributeSort {
		float: left;
		width: 20%;
		height: 100%;
		margin-left: 3%;
		cursor: pointer;
	}

	.attributeSortOther {
		float: left;
		width: 20%;
		height: 100%;
		margin-left: 3%;
		cursor: pointer;
		background-color: #6db5f7;
		color: white;
	}

	.attributeSortImg {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 65%;
		text-align: center;
	}

	.attributeSortTitle {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #fff;
		font-size: 1.5vw;
		height: 35%;
	}

	.changeTablepic {
		width: 5vw;
		height: 5vw;
	}

	.modifySortInfo {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.modifyFoodAttributeLine {
		width: 98%;
		height: 9vw;
		margin-left: 2%;
		float: left;
		text-align: center;
		color: #333;
		margin-top: 1%;
	}

	.numAndRemark {
		float: left;
		width: 25%;
		height: 7vw;
	}

	.numAndRemarkContent {
		float: left;
		width: 60%;
		height: 7vw;
	}

	.numAndRemarkTitle {
		float: left;
		width: 100%;
		height: 3vw;
		line-height: 3vw;
		font-size: 2vw;
		margin-bottom: 1vw;
		text-align: left;
	}

	.numAndRemarkNum {
		float: left;
		width: 100%;
		height: 3vw;
		line-height: 3vw;
		text-align: center;
	}

	.numAndRemarkJian {
		float: left;
		width: 24%;
		height: 2.9vw;
		cursor: pointer;
		border: 1px solid #3987e4;
		font-size: 2vw;
	}

	.numAndRemarkNUm {
		float: left;
		width: 30%;
		height: 3vw;
	}

	.numAndRemarkInput {
		width: 100%;
		height: 3vw;
		background-color: rgba(255, 255, 255, 0.32);
		text-align: center;
		color: #333;
		font-size: 2vw;
	}

	.numAndRemarkAdd {
		float: left;
		width: 25%;
		height: 3vw;
		background-color: #3987e4;
		cursor: pointer;
		font-size: 2vw;
		color: rgb(255, 255, 255);
	}

	.numAndRemarkContentInput {
		width: 100%;
		height: 7vw;
		border-radius: 0.5vw;
		color: #333;
		border: 1px solid #3987e4;
	}

	.foodAttributeSizeTitle {
		float: left;
		width: 98%;
		margin-left: 2%;
		margin-bottom: 2%;
		font-size: 2vw;
		color: #333;
	}

	.foodAttributeSize {
		float: left;
		width: 98%;
		margin-left: 2%;
		margin-bottom: 2%;
	}

	.foodAttributelabelName {
		float: left;
		width: 23%;
		margin-right: 8%;
		margin-bottom: 2%;
		height: 5vw;
		line-height: 5vw;
		font-size: 2vw;
		text-align: center;
		color: #333;
		border-radius: 0.2em;
		cursor: pointer;
		border: 1px solid #3987e4;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.foodAttributelabelNameOther {
		float: left;
		width: 23%;
		margin-right: 8%;
		margin-bottom: 2%;
		height: 5vw;
		line-height: 5vw;
		font-size: 2vw;
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

	.foodAttributelabelNameIngredients {
		float: left;
		width: 35.5%;
		margin-right: 10%;
		margin-bottom: 2%;
		padding-left: 0.5vw;
		height: 5vw;
		line-height: 5vw;
		font-size: 2vw;
		text-align: center;
		color: #333;
		border-radius: 0.2em;
		text-align: left;
		cursor: pointer;
		border: 1px solid #3987e4;
	}

	.foodAttributelabelNameIngredientsOther {
		float: left;
		width: 35.5%;
		margin-right: 10%;
		margin-bottom: 2%;
		padding-left: 0.5vw;
		height: 5vw;
		line-height: 5vw;
		font-size: 2vw;
		text-align: center;
		color: #333;
		border-radius: 0.2em;
		text-align: left;
		cursor: pointer;
		border: 1px solid #3987e4;
		background-color: #6db5f7;
		color: white;
	}

	.foodAttributelabelNameIngName {
		float: left;
		width: 55%;
		height: 5vw;
		line-height: 5vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.foodAttributelabelNameIngPrice {
		float: right;
		width: 45%;
		height: 5vw;
		display: flex;
	}

	.inputIngredients {
		position: relative;
		margin: auto 1%;
		width: 3.5vw;
		font-size: 1.5vw;
		height: 3vw;
		color: black;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.5);
		border: 1px solid #adadad;
		line-height: 3vw;
	}

	.addIngredients {
		font-size: 2.5vw;
		margin: auto;
	}

	.deleteSortInfo {
		width: 100%;
		height: 100%;
	}

	.backDetailNum {
		float: left;
		width: 100%;
		height: 7vw;
		text-align: center;
		color: #000;
		font-size: 2vw;
		line-height: 7vw;
		font-weight: 600;
	}

	.backDetailDeleteFood {
		float: left;
		height: 5vw;
		width: 40%;
		margin-left: 30%;
		margin-right: 30%;
		margin-top: 0.5em;
		margin-bottom: 1.5em;
		background-color: #3987e4;
		background-size: 100% 100%;
		text-align: center;
		line-height: 5vw;
		font-size: 2vw;
		color: #fff;
		cursor: pointer;
	}

	.remarkContent {
		float: left;
		width: 95%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.32);
	}

	.orderRemarkTitle {
		margin-top: 3vw;
		color: #333;
		font-size: 2.5vw;
		text-align: center;
	}

	.orderRemark {
		float: left;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 2vw;
		width: 90%;
		margin-left: 5%;
		height: 20vw;
		margin-top: 2%;
	}

	.orderRemarkContent {
		border-radius: 2vw;
		padding-top: 1%;
		padding-left: 1%;
		height: 100%;
		width: 100%;
		font-size: 2vw;
		border: 1px solid #3987e4;
		color: #333;
	}

	.wakeUp {
		float: left;
		width: 100%;
		font-size: 3vw;
		margin-left: 5%;
		margin-top: 2%;
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

	.indexFood_Top {
		position: absolute;
		width: 2vw;
		height: 2vw;
		background-color: red;
		border-radius: 1vw;
		text-align: center;
		line-height: 2vw;
		color: white;
		font-size: 1.5vw;
		right: -0.5vw;
		top: -0.5vw;
	}

	.middleButton {
		box-shadow: 0 0 10px #ccc inset;
		height: 3vw;
	}

	.packpic {
		position: absolute;
		top: 1vw;
		left: 3.5vw;
		width: 3vw;
		height: 2.5vw;
	}

	.packpicText {
		font-size: 2vw;
		position: absolute;
		top: 1vw;
		left: 7vw;
	}
</style>
