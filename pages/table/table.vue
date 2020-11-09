<template>
	<view class="container">
		<view class="tableLeftCommon" :style="{ height: windowHeight + 'px' }">
			<view class="hallTopFirst" id="table-left-top">
				<view v-if="tableIdNotEmpty === true" class="tableHallTop">
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
					<!-- 返回位置页面 -->
					<view class="tableHallTopLineThird" @click="backTableList">
						<image class="tableHallTopLineThirdpic" :src="tableHallTopLineThirdpic"></image>
					</view>
				</view>
				<view v-if="tableIdNotEmpty === false " class="tableHallTop">
					<image class="packpic" :src="packpic"></image>
					<view class="packpicText">{{i18n.takeAway}}</view>
					<!-- 返回位置页面 -->
					<view v-if="reSettlementFlag === false" class="tableHallTopLineThird" style="height: auto;" @click="backTableList">
						<image class="tableHallTopLineThirdpic" :src="tableHallTopLineThirdpic"></image>
					</view>
				</view>	
			</view>
			<!-- 订单信息 -->
			<view v-if="orderListStatus !== '03' && tableIdNotEmpty === true" class="tableHallBottom">
				<view class="orderList">
					<view style="display: flex;float: left;height: 100%;">
						<block v-for="(item ,index) in orderList" :key="index">
							<view class="hallOrderImgs" @click="selectOtherOrder(index)">
								<!-- 订单总价 -->
								<view class="hallOrderImgsTop" :style="{'background-color':item.backGroundColor === true ?'#CCCCCC':'#FFFFFF'}">受付番号</view>
								<!-- 叫起订单 -->
								<view v-if="item.orderType === '01'" class="hallOrderImgsBottomRed" style="font-size: 1.5vw;">{{item.receivablesNo }}</view>
								<!-- 手机订单 -->
								<view v-else-if="item.orderType === '02' && item.orderStatus === '01'" class="hallOrderImgsBottomYellow" style="font-size: 1.5vw;">{{item.receivablesNo }}</view>
								<!-- pad订单 -->
								<view v-else-if="item.orderType === '03'" class="hallOrderImgsBottomBlue" style="font-size: 1.5vw;">{{item.receivablesNo }}</view>
								<!-- 前台订单 -->
								<view v-else-if="item.orderType === '04' || (item.orderType === '02' && item.orderStatus === '02')" class="hallOrderImgsBottomGreen" style="font-size: 1.5vw;">{{item.receivablesNo }}</view>
							</view>
						</block>
						<!-- 开台 -->
						<view class="hallOrderSpace" style="float: left;" @click="selectOpend">
							<image class="jiahaopic" :src="jiahaopic"></image>
						</view>
					</view>
				</view>
				<!-- 换桌按钮 -->
				<view class="threePoints" @click="hallMoreButton">
					<image class="threePointspic" :src="threePointspic"></image>
				</view>
			</view>
			<view v-if="Number(isOrderNotFlag) === 1 || orderListStatus === '01' || orderListStatus === '02' || orderListStatus === '03'" class="hallBottomFirst" :style="{ height: itemHeight + 'px' }">
				<view class="itemMessage">
					<view class="hallGoodsInfo">{{i18n.commodityInformation}}</view>
				</view>
				<!-- 商品信息 -->
				<view class="itemDetail">
					<view class="itemDetailInfo">
						<view class="hallTables">
							<view class="hallTablesInfo">
								<view class="issuedOrder">
									<image class="quanpic" :src="quanYellowpic"></image>
									<view style="float: left;">{{i18n.unConfrim}}</view>
									<image class="quanpic" :src="quanpic"></image>
									<view>{{i18n.issuedOrder}}</view>
								</view>
								<!-- 就餐人数 -->
								<view class="typelRrenNumber">
									<view class="typelRrenNumberInfo">人：{{customerPeopleCount}}</view>
								</view>
							</view>
						</view>
						<view class="hallLis">
							<block v-for="(item ,index) in itemList" :key="index">
								<view v-if="item.itemId !== null" >
									<view :class="[isSelectFood && selectFoodOrder === index  ? 'hallLiOther' : 'hallLi' ]" @click="selectFood(index)">
										<view class="hallFood">
											<!-- 判断商品是否确认,显示不同颜色圆圈:绿色已确认,黄色未确认 -->
											<view class="hallFoodQuan">
												<image v-if="item.itemSureStatus === '02'" class="hallFoodQuanpic" :src="quanpic"></image>
												<image v-else class="hallFoodQuanpic" :src="quanYellowpic"></image>
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
											<view v-if="item.itemClassification === 0 || item.itemClassification === '0'" class="hallGoodPrice">¥ {{item.itemPrice | numFilter}}</view>
											<view v-else class="hallGoodPrice">¥ -{{item.itemPrice | numFilter}}</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view class="hallListBottom">
							<!-- 廃棄 -->
							<view v-if="(orderStatus === '02' && orderListStatus !== '03' && orderAmount === 0) || (orderListStatus === '02' && orderStatus === '02' && orderAmount === 0)" class="lineFooterStart" @click="disposalButton">{{i18n.abandonment}}</view>
							<!-- 割勘 -->
							<view v-if="(orderStatus === '02' && orderListStatus !== '03') || (orderListStatus === '02' && orderStatus === '02')" class="lineFooterStart" @click="toAccountShare">{{i18n.dutchTreatment}}</view>
							<!-- 结算 -->
							<view v-if="(orderStatus === '02' && orderListStatus !== '03' && 0 < orderAmount) || (orderListStatus === '02' && orderStatus === '02' && 0 < orderAmount)" class="lineFooterStart" @click="toAccount">{{i18n.settlement}}</view>
							<!-- 单点 -->
							<view v-if="(orderStatus === '02' && orderListStatus !== '03') || (orderListStatus === '02' && orderStatus === '02')" class="lineFooterStart" @click="singlePointButton">{{i18n.singlePoint}}</view>
							<!-- 确认订单 -->
							<view v-if="orderStatus === '01' && orderListStatus !== '03'" class="sureOrderButton" @click="sureOrderButton">{{i18n.confirmOrder}}</view>
							<!-- 重新结算后的 -->
							<view v-if="orderListStatus === '03' && reSettlementFlag === false && accountsType === '00'" class="sureOrderButton" @click="reSettlementButton">{{i18n.reSettlement}}</view>
							<!-- 重新结算后的结算 -->
							<view v-if="reSettlementFlag === true && accountsType === '00'" class="sureOrderButtonShare" @click="toAccount">{{i18n.settlement}}</view>
							<!-- 重新结算后的割勘 -->
							<view v-if="reSettlementFlag === true && accountsType === '00'" class="sureOrderButtonShare" @click="toAccountShare">{{i18n.dutchTreatment}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 设定就餐人数 -->
			<view v-else class="hallBottomFirst">
				<view :class="[buffetList !== null && buffetList.length !== 0 && buffetList !== undefined  ? 'buffetNumberDiners' : 'numberDiners' ]" >
					<!-- 就餐人数 -->
					<view class="numberDinersPeople">{{i18n.numberDiners}}</view>
					<view class="numberDinersSet">
						<!-- 减少就餐人数 -->
						<view class="numberDinersSetLeft" @click="minNumber">
							<image class="minusSignpic" :src="minusSignpic"></image>
						</view>
						<!-- 就餐人数 -->
						<view class="numberDinersSetMiddle">{{dinnerNumber}}</view>
						<!-- 增加就餐人数 -->
						<view class="numberDinersSetRight" @click="addNumber">
							<image class="addSignpic" :src="addSignpic"></image>
						</view>
					</view>
				</view>
				<!-- 底部白色背景部分：放题信息 -->
				<view class="numberDinersPeople" v-if="buffetList !== null && buffetList.length !== 0 && buffetList !== undefined">{{i18n.buffet}}</view>
				<scroll-view v-if="buffetList !== null && buffetList.length !== 0 && buffetList !== undefined" 
				scroll-y="true" class="account-left-row2" @scroll="scroll">
					<block v-for="(item ,index) in buffetList" :key="index">
						<view :class="[item.selectionStatus === '1' ? 'buffetlabelNameOther' : 'buffetlabelName' ]" v-if="updateStatus"
						 @click="selectBuffet(index)">{{item.buffetName}}</view>
					</block>
				</scroll-view>
				<!-- 开台 -->
				<view class="openingDiners">
					<view class="lineFooterStart" @click="openingDiners">{{i18n.opening}}</view>
				</view>
			</view>
		</view>
		<!-- 桌子信息/换桌 -->
		<view class="foodTableinfo" :style="{ height: windowHeight + 'px' }">
			<!-- 桌子信息 -->
			<view v-show="tableShowHidden" class="orderDetailTable">
				<block v-for="(item ,index) in tableOtherList" :key="index">
					<view v-if="item.orderType === '01'" class="indexTableRed"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
						</view>
						<!-- 订单数 -->
						<view class="indexTable_Top">{{item.orderCount}}</view>
					</view>
					<view v-else-if="item.orderType === '00' " class="indexTableGreen"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
						</view>
						<!-- 订单数 -->
						<view class="indexTable_Top">{{item.orderCount}}</view>
					</view>
					<view v-else-if="item.orderType === '02' && item.orderStatus === '01'" class="indexTableYellow"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
						</view>
						<!-- 订单数 -->
						<view class="indexTable_Top">{{item.orderCount}}</view>
					</view>
					<view v-else-if="item.orderType === '03'" class="indexTableBlue"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
						</view>
						<!-- 订单数 -->
						<view class="indexTable_Top">{{item.orderCount}}</view>
					</view>
					<view v-else-if="item.orderType === '04' || (item.orderType === '02' && item.orderStatus === '02')" class="indexTableGreen"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
						</view>
						<!-- 订单数 -->
						<view class="indexTable_Top">{{item.orderCount}}</view>
					</view>
					<view v-else class="indexTableGrey"  @click="selectTable(index)">
						<!-- 桌子名 -->
						<view class="indexTableLeft">{{item.tableName}}</view>
						<view class="indexTableRight">
							<!-- 顾客数/桌位数 -->
							<view class="indexTableRight_Top"></view>
							<!-- 金额 -->
							<view class="indexTableRight_Middle"></view>
						</view>
					</view>
				</block>
			</view>
			<!-- 换桌 -->
			<view v-show="changeShowHidden" class="orderDetailChange">
				<view class="commonSortInfo">
					<view class="attributeLine">
						<view v-if="orderListStatus !== '01' && orderListStatus !== '02' && orderListStatus !== '03' " class="attributeReturn" @click="attributeReturnButton">
							<image class="attributeReturnpic" :src="attributeReturnpic"></image>
						</view>
						<view class="attributeSorts">
							<!-- 换桌 -->
							<view v-if="selectFoodOrder === ''" :class="[isAttributeSort ? 'attributeSortOther' : 'attributeSort' ]" @click="changeTableButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="changeTablepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.changeTables}}</view>
							</view>
							<!-- 修改人数 -->
							<view v-if="selectFoodOrder === ''" :class="[isAttributeSortPeople ? 'attributeSortOther' : 'attributeSort' ]" @click="changePeopleButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="changePeoplepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.numberOfPeopleModified}}</view>
							</view>
							<!-- 详细信息 -->
							<view v-if="selectFoodOrder !== ''" :class="[isAttributeSortDetail ? 'attributeSortOther' : 'attributeSort' ]" @click="detailMessageButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="detailMessagepic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.detailedInformation}}</view>
							</view>
							<!-- 作废商品 -->
							<view v-if="selectFoodOrder !== '' && (this.itemList[selectFoodOrder].itemClassification === 0 || this.itemList[selectFoodOrder].itemClassification === '0')" :class="[isAttributeSortScrap ? 'attributeSortOther' : 'attributeSort' ]" @click="scrapFoodButton">
								<view class="attributeSortImg">
									<image class="changeTablepic" :src="scrapFoodpic"></image>
								</view>
								<view class="attributeSortTitle">{{i18n.obsoleteGoods}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="commonDetialInfo">
					<!-- 换桌 -->
					<block v-if="isAttributeSort " v-for="(item ,index) in tableOtherList" :key="index">
						<view v-if="item.orderType === '01'" class="indexTableRed"  @click="changeTable(index)">
							<!-- 桌子名 -->
							<view class="indexTableLeft">{{item.tableName}}</view>
							<view class="indexTableRight">
								<!-- 顾客数/桌位数 -->
								<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
								<!-- 金额 -->
								<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
							</view>
							<!-- 订单数 -->
							<view class="indexTable_Top">{{item.orderCount}}</view>
						</view>
						<view v-else-if="item.orderType === '02' && item.orderStatus === '01'" class="indexTableYellow"  @click="changeTable(index)">
							<!-- 桌子名 -->
							<view class="indexTableLeft">{{item.tableName}}</view>
							<view class="indexTableRight">
								<!-- 顾客数/桌位数 -->
								<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
								<!-- 金额 -->
								<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
							</view>
							<!-- 订单数 -->
							<view class="indexTable_Top">{{item.orderCount}}</view>
						</view>
						<view v-else-if="item.orderType === '03'" class="indexTableBlue"  @click="changeTable(index)">
							<!-- 桌子名 -->
							<view class="indexTableLeft">{{item.tableName}}</view>
							<view class="indexTableRight">
								<!-- 顾客数/桌位数 -->
								<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
								<!-- 金额 -->
								<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
							</view>
							<!-- 订单数 -->
							<view class="indexTable_Top">{{item.orderCount}}</view>
						</view>
						<view v-else-if="item.orderType === '04' || (item.orderType === '02' && item.orderStatus === '02')" class="indexTableGreen"  @click="changeTable(index)">
							<!-- 桌子名 -->
							<view class="indexTableLeft">{{item.tableName}}</view>
							<view class="indexTableRight">
								<!-- 顾客数/桌位数 -->
								<view class="indexTableRight_Top">{{item.customerCount}}/{{item.tableSeatCount}}</view>
								<!-- 金额 -->
								<view class="indexTableRight_Middle">¥ {{item.price | numFilter}}</view>
							</view>
							<!-- 订单数 -->
							<view class="indexTable_Top">{{item.orderCount}}</view>
						</view>
						<view v-else class="indexTableGrey"  @click="changeTable(index)">
							<!-- 桌子名 -->
							<view class="indexTableLeft">{{item.tableName}}</view>
							<view class="indexTableRight">
								<!-- 顾客数/桌位数 -->
								<view class="indexTableRight_Top"></view>
								<!-- 金额 -->
								<view class="indexTableRight_Middle"></view>
							</view>
						</view>
					</block>
					<view class=""></view>
					<!-- 就餐人数 -->
					<view v-if="isAttributeSortPeople" class="peopleEditOne">{{i18n.numberDiners}}:{{setupCustomerPeopleCount}}</view>
					<view v-if="isAttributeSortPeople" class="peopleEditTwo">
						<!-- 增加就餐人数 -->
						<view class="jianButton" @click="minNumberNew">
							<image class="minusSignpic" :src="minusSignpic"></image>
						</view>
						<view class="middleButton">{{setupCustomerPeopleCount}}</view>
						<!-- 减少就餐人数 -->
						<view class="jiaButton" @click="addNumberNew">
							<image class="addSignpic" :src="addSignpic"></image>
						</view>
						<view class="hallEditDown" @click="sureCustomerCount">{{i18n.confirm}}</view>
					</view>
					<!-- 商品详细 -->
					<view v-if="isAttributeSortDetail" class="detailMessage">
						<view class="modifyFoodAttributeLine">
							<view class="numAndRemark">
								<!-- 商品数量及备注 -->
								<view class="numAndRemarkTitle">{{i18n.quantityAndRemarks}}</view>
								<view class="numAndRemarkNum">
									<view class="numAndRemarkJian">-</view>
									<!-- 商品数量 -->
									<view class="numAndRemarkNUm">
										<view class="numAndRemarkInput">{{itemCount}}</view>
									</view>
									<view class="numAndRemarkAdd">+</view>
								</view>
							</view>
							<!-- 商品备注 -->
 							<!-- <view class="numAndRemarkContent">
								<textarea maxlength="20"  :value="itemInfo" disabled="disabled" class="numAndRemarkContentInput" placeholder="i18n.remarks"></textarea>
							</view> -->
						</view>
						<!-- 规格 -->
						<view v-if="optionSpeList !== null && optionSpeList.length !== 0 && optionSpeList !== undefined" class="foodAttributeSizeTitle">{{i18n.specifications}}</view>
						<view v-if="optionSpeList !== null && optionSpeList.length !== 0 && optionSpeList !== undefined" class="foodAttributeSize">
							<block v-for="(item ,index) in optionSpeList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameOther' : 'foodAttributelabelName' ]">{{item.optionName}}</view>
							</block>
						</view>
						<!-- 做法 -->
						<view v-if="optionMetList !== null && optionMetList.length !== 0 && optionMetList !== undefined" class="foodAttributeSizeTitle">{{i18n.practice}}</view>
						<view v-if="optionMetList !== null && optionMetList.length !== 0 && optionMetList !== undefined" class="foodAttributeSize">
							<block v-for="(item ,index) in optionMetList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameOther' : 'foodAttributelabelName' ]">{{item.optionName}}</view>
							</block>
						</view>
						<!-- 配料 -->
						<view v-if="optionIngList !== null && optionIngList.length !== 0 && optionIngList !== undefined" class="foodAttributeSizeTitle">{{i18n.ingredients}}</view>
						<view v-if="optionIngList !== null && optionIngList.length !== 0 && optionIngList !== undefined" class="foodAttributeSize">
							<block v-for="(item ,index) in optionIngList" :key="index">
								<view :class="[item.selectionStatus === '1' || item.selectionStatus === '1'  ? 'foodAttributelabelNameIngredientsOther' : 'foodAttributelabelNameIngredients' ]">
									<!-- 配料名称 -->
									<view class="foodAttributelabelNameIngName">{{item.optionName}}</view>
									<view class="foodAttributelabelNameIngPrice">
										<view class="addIngredients">+</view>
										<!-- 配料个数 -->
										<view class="inputIngredients">{{item.optionNumber}}</view>
										<view class="addIngredients">-</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<!-- 退菜 -->
					<view v-if="isAttributeSortScrap" class="backFoodDetail">
						<!-- 退菜数/剩余数 -->
						<view class="backDetailNum">{{i18n.numberOfReturnedDishes}}{{returnItemNumber}}  {{i18n.remainingNumber}}{{remainingItemNumber < 0 ? 0 : remainingItemNumber}}</view>
						<!-- 确认退菜 -->
						<view class="sureReturnFood" @click="sureReturnItem">{{i18n.confirmReturn}}</view>
						<view class="backDetailNumAddReturn">
							<view class="backDetailNumAddDetailJian" @click="jianReturnItemNumber">-</view>
							<!-- 退菜数 -->
							<view class="backDetailNumAddDetailNum">{{returnItemNumber}}</view>
							<view class="backDetailNumAddDetailAdd" @click="addReturnItemNumber">+</view>
						</view>
						<!-- 退菜理由 -->
						<view class="backDetailReasonTitle">{{i18n.chooseReasonForReturning}}</view>
						<view class="backDetailReasonContent">
							<checkbox-group>
								<label class="checkboxLabel" v-for="(item ,index) in returnReasonList" :key="index" @click="checkboxChange(index)">
									<checkbox style="transform:scale(0.8)" :checked="item.checked" :value="item.returnReasonCode"/>{{item.returnReasonName}}
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框-->
		<view v-show = "showalert">
			<view class ="sweet-overlay"></view>
		    <view class="sweet-alert" >
		        <view v-if="isOrderItemExit === 1 || isOrderNotFlag === 0 || isReturnItem === true || orderListStatus === '03' || isHttpFail === 1" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<view v-else class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
		        <!-- 提示信息 -->
		        <h2>{{tipMessage}}</h2>
		        <view class="sa-button-container">
		            <!-- 取消按钮 -->
		            <view v-if="orderListStatus === '03'  && isHttpFail !== 1" class="sa-confirm-button-container">
		                <button style="display: inline-block; background-color: #adadad;" @click="cancelButton">{{i18n.cancell}}</button>
		            </view>
		            <!-- 确认按钮 -->
		            <view class="sa-confirm-button-container">
		                <button style="display: inline-block; background-color: #3987e4;" @click="confirmButton">{{i18n.confirm}}</button>
		            </view>
		        </view>
		    </view>
		</view>
		<view v-show = "showConfirmAlert">
			<view class ="sweet-overlay"></view>
		    <view class="sweet-alert" >
		        <view class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
				<!-- 提示信息 -->
		        <h2>{{tipMessage}}</h2>
		        <view class="sa-button-container">
		            <!-- 取消按钮 -->
		            <button style="display: inline-block; background-color: #adadad;" @click="cancelDisposalButton">{{i18n.cancell}}</button>
		            <!-- 确认按钮 -->
		            <view class="sa-confirm-button-container">
		                <button style="display: inline-block; background-color: #3987e4;" @click="confirmDisposalButton">{{i18n.confirm}}</button>
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
			i18n () {
				return this.$t('message')  
			}
		}, 
		data() {
			return {
				// 图片路径
				tableHallTopLineThirdpic: '../../static/error.png',
				tableSeatpic: '../../static/tableSeatpic.png',
				orderCountpic: '../../static/orderCountpic.png',
				orderPeoplepic: '../../static/orderPeoplepic.png',
				orderHourpic: '../../static/orderHourpic.png',
				jiahaopic: '../../static/jiahao.png',
				threePointspic: '../../static/more.png',
				quanpic: '../../static/quan.png',
				minusSignpic: '../../static/minus.png',
				addSignpic: '../../static/add.png',
				quanYellowpic: '../../static/quanYellow.png',
				attributeReturnpic: '../../static/attributeReturn.png',
				changeTablepic: '../../static/changeTable.png',
				changePeoplepic: '../../static/changpeple.png',
				detailMessagepic: '../../static/detailFood.png',
				scrapFoodpic: '../../static/delete.png',
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
				// 桌台订单
				orderList: '',
				// 支払区分
				paymentDistinction: '',
				// 人数
				customerPeopleCount: '',
				// 订单金额
				orderAmount: '',
				// 订单商品
				itemList: '',
				// 订单状态
				orderStatus: '',
				// 其他桌台
				tableOtherList: [],
				// 当前桌台
				nowTable: '',
				// 就餐人数
				dinnerNumber: 1,
				// 桌台列表的显示和隐藏
				tableShowHidden: true,
				// 换桌页面的显示和隐藏
				changeShowHidden: false,
				// 是否选中换桌按钮
				isAttributeSort: false,
				// 是否选中修改人数按钮
				isAttributeSortPeople: false,
				// 是否选中详细信息
				isAttributeSortDetail: false,
				// 是否选中作废信息
				isAttributeSortScrap: false,
				// 弹框
				showalert: false,
				// 是否选择商品
				isSelectFood: false,
				// 所选菜的顺序
				selectFoodOrder: '',
				// 当前受付ID
				nowReceivablesId: '',
				// 弹框提示消息
				tipMessage: '',
				// 当前桌台位置
				nowAreaId: '',
				// 规格
				optionSpeList: '',
				// 做法
				optionMetList: '',
				// 配菜
				optionIngList: '',
				// 区分重复订单ID
				orderIdFlag: '',
				// 商品数量
				itemCount: '',
				// 商品实际下单数量
				itemRealCount: '',
				// 商品备考
				itemInfo: '',
				// 剩余退菜数
				remainingItemNumber: '',
				// 退菜数
				returnItemNumber: '',
				// 退菜理由
				returnReasonList: [],
				// 退菜原因Code拼接
				returnReasonCode: '',
				// 判断是不是点击了退菜
				isReturnItem: false,
				// 订单列表状态
				orderListStatus: '',
				// 区分该桌台是否有订单
				isOrderNotFlag: 1,
				// 当前页
				currentPage: '',
				// 判断是不是重新结算
				reSettlementFlag: false,
				// 开始时间
				startOrderTime: '',
				// 结束时间
				endOrderTime: '',
				// 就餐方式
				selectEatMay: '',
				// 屏幕高度
				windowHeight: 0,
				// 商品信息view块的高度
				itemHeight: 0,
				// 判断是不是换桌
				isChangeTable: false,
				// 请求失败
				isHttpFail: 0,
				// 桌号是否为空
				tableIdNotEmpty: true,
				// 注文商品が存在
				isOrderItemExit:0,
				// 就餐方式
				takeoutFlag:0,
				// 支払方式
				accountsType: '',
				// 放题一览取得
				buffetList: [],
				// 左侧中间部分高度
				leftCenterHeight: '0',
				// 更新状态
				updateStatus: true,
				// 传递数据
				itemData: '',
				// 未下单商品
				unBuffetList: [],
				// 弹框
				showConfirmAlert: false,
				// 变更就餐人数
				setupCustomerPeopleCount: '',
				// 印刷結果
				printSuccessResult:'',
				//履歴からパラメータ
				transferFrom :false
			}
		},
		onLoad: function (option) {

			const that = this;
			uni.getSystemInfo({
				success:function(res){
					that.windowHeight = res.windowHeight;
				}
			})
			const item = JSON.parse(decodeURIComponent(option.item));
			
			this.itemData = JSON.parse(decodeURIComponent(option.item));
			// 当前桌台
			this.nowTable = item.id;
			// 当前桌台位置
			this.nowAreaId = item.areaId;
			this.transferFrom = item.transferFrom;
			// 当前受付ID
			this.nowReceivablesId = item.nowReceivablesId;
			// 订单状态（由订单页面跳转时传过来：01　未確認、02　未計済、03　会計済）
			this.orderListStatus = item.orderStatus;
			// 当前页（由订单页面跳转记录当前页）
			this.currentPage = item.currentPage;
			// 开始时间（由订单页面跳转记录开始时间）
			this.startOrderTime = item.startOrderTime;
			// 结束时间（由订单页面跳转记录结束时间）
			this.endOrderTime = item.endOrderTime;
			// 就餐方式（由订单页面跳转记录就餐方式）
			this.selectEatMay = item.selectEatMay;
			// 就餐方式
			this.takeoutFlag = item.takeoutFlag;
			
			// 判断桌号是否为空（空代表带走，不为空代表店内）
			if (item.id !== null && item.id !== undefined && item.id !== '') {
				this.tableIdNotEmpty = true;
				// 加载桌子信息
				this.loadTableData(item.id);
			} else {
				this.tableIdNotEmpty = false;
				// 加载订单商品信息
				this.loadOrderItemListData(this.nowReceivablesId);
			}
			if (this.orderListStatus === '03' || this.tableIdNotEmpty === false) {
				this.itemHeight = this.windowHeight * 0.9;
			} else {
				this.itemHeight = this.windowHeight * 0.8;
			}
			// 当前桌台位置不为空时才加载桌子列表信息
			if (this.nowAreaId !== null && this.nowAreaId !== undefined && this.nowAreaId !== '') {
				// 加载桌子列表信息
				this.loadTableLisData(item.areaId);
			}
			if (this.orderListStatus === '03' && this.nowReceivablesId !== null && this.nowReceivablesId !== undefined && this.nowReceivablesId !== '') {
				// 加载订单商品信息
				this.loadOrderItemListData(this.nowReceivablesId);
			}
			// 加载放题信息
			// this.loadBuffetListData();
		},
		methods: {
			backTableList:function(obj){
				// 判断是不是订单页面跳转过来的
				if (this.orderListStatus === '01' || this.orderListStatus === '02' || this.orderListStatus === '03') {
					
					const item = {
						orderStatus: this.orderListStatus,
						currentPage: this.currentPage,
						startOrderTime: this.startOrderTime,
						endOrderTime: this.endOrderTime,
						selectEatMay: this.selectEatMay
					};
					// 跳转订单页面
					uni.reLaunch({
					    url: '/pages/orderList/orderList?item=' + encodeURIComponent(JSON.stringify(item))
					});

				} else {
					// 跳转桌台位置页面
					uni.reLaunch({
					    url: '/pages/tableList/tableList?nowAreaId=' + this.nowAreaId
					});
				}
			},
			// 加载桌子信息
			loadTableData(tableId) {
				
				const dataTable = {
					storeId: getApp().globalData.storeId,
					tableId: tableId
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/getTable', dataTable)
				 	.then(result => {
						
					if (result.data.resultCode === '0000') {
						// 桌名
						this.tableName = result.data.tableName;
						// エリア名
						this.areaTypeName = result.data.areaTypeName;
						// 桌位数
						this.tableSeatCount = result.data.tableSeatCount;
						// 顾客数
						this.customerCount = result.data.customerCount;
						// 订单数
						this.orderCount = result.data.orderCount;
						// 会計済の場合
						if (this.orderListStatus === '03') {
							return;
						}
						// 桌台订单
						if (result.data.orderList === null || result.data.orderList === undefined ||
						result.data.orderList === 'undefined' || result.data.orderList === '' ||
						result.data.orderList === [] || result.data.orderList.length === 0) {
							this.orderList = '';
							this.isOrderNotFlag = 0;
						} else {
							const testId = this.nowReceivablesId;
							// 履歴の未会計画面から一つオーダーがあります
							if(this.transferFrom === true){
								// 桌台信息
								this.orderList = result.data.orderList.filter(order=> order.receivablesId === this.nowReceivablesId);
							}else{
								// 桌台信息
								this.orderList = result.data.orderList;
								
							}
							// 第一个订单的receivablesId
							this.nowReceivablesId = this.orderList[0].receivablesId;
							// 加载订单商品信息
							this.loadOrderItemListData(this.nowReceivablesId);
						}
					} else if (result.data.resultCode === '9001') {
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
			// 加载订单商品信息
			loadOrderItemListData(receivablesId) {
				
				const dataTable = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					receivablesId: receivablesId
				};
				// 获取订单商品信息
				http
				 	.post('api/stpd/getOrderItemList', dataTable)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 支払区分
							this.paymentDistinction = result.data.paymentDistinction;
							// 人数
							this.customerPeopleCount = result.data.customerCount;
							// 变更人数
							this.setupCustomerPeopleCount = result.data.customerCount;
							// 订单金额
							this.orderAmount = result.data.orderAmount;
							// if(result.data.itemList.size > 0){
								// 订单状态
								this.orderStatus = result.data.orderStatus;
								// 订单商品
								this.itemList = result.data.itemList;
								// 支払方式
								this.accountsType = result.data.accountsType;
							// }
						} else if (result.data.resultCode === '9001') {
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
			// 加载桌子列表信息
			loadTableLisData(areaId) {
				
				const dataArea = {
					storeId: getApp().globalData.storeId,
					areaId: areaId
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/getTableList', dataArea)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 桌台信息
							if (result.data.tableList === null || result.data.tableList === undefined ||
							result.data.tableList === 'undefined' || result.data.tableList === '' ||
							result.data.tableList === [] || result.data.tableList.length === 0) {
								this.tableList = '';
							} else {
								// 桌台信息
								this.tableOtherList = result.data.tableList;
								// 删除当前桌台信息
								for (let i = 0; i < this.tableOtherList.length; i++) {
									if (Number(this.tableOtherList[i].tableId) === Number(this.nowTable)) {
										this.tableOtherList.splice(i,1);
										break;
									}
								}
							}
						} else if (result.data.resultCode === '9001') {
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
			// 点击其他订单
			selectOtherOrder: function(e) {
				this.isOrderNotFlag = 1;
				// 清空选中商品顺序
				this.selectFoodOrder = '';
				// 显示桌子画面
				this.tableShowHidden = true;
				// 隐藏换桌画面
				this.changeShowHidden = false;
				// 当前受付ID
				this.nowReceivablesId = this.orderList[e].receivablesId;
				// 清空选中放题
				this.unBuffetList = [];
				// 加载订单商品信息
				this.loadOrderItemListData(this.nowReceivablesId);
				// 背景色追加
				for(let i = 0; i< this.orderList.length; i++){
					this.orderList[i].backGroundColor = false;
				}
				this.orderList[e].backGroundColor = true;
			},
			// 开台
			selectOpend: function(e) {
				// 区分该桌台是否有订单
				this.isOrderNotFlag = 0;
				// 隐藏换桌画面
				this.changeShowHidden = false;
				// 显示桌子画面
				this.tableShowHidden = true;
				// 清空选中放题
				this.unBuffetList = [];
			},
			// 减少就餐人数
			minNumber: function(e) {
				if (this.dinnerNumber !== 1) {
					this.dinnerNumber = this.dinnerNumber - 1;
				}
			},
			// 增加就餐人数
			addNumber: function(e) {
				this.dinnerNumber = this.dinnerNumber + 1;
			},
			// 显示换桌画面
			hallMoreButton: function(e) {
				if (this.isOrderNotFlag === 0) {
					this.showalert = true;
					this.tipMessage = this.i18n.selectAnOrder;
				} else {
					// 隐藏桌子画面
					this.tableShowHidden = false;
					// 显示换桌画面
					this.changeShowHidden = true;
					// 是否选中换桌按钮
					this.isAttributeSort = false;
					// 是否选中修改人数按钮
					this.isAttributeSortPeople = false;
					// 清空选中商品顺序
					this.selectFoodOrder = '';
					// 隐藏作废信息页面
					this.isAttributeSortScrap = false;
					// 隐藏详细信息页面
					this.isAttributeSortDetail = false;
				}
			},
			// 点击换桌按钮
			changeTableButton: function(e) {
				// 是否选中换桌按钮
				if (this.isAttributeSort === true) {
					this.isAttributeSort = false;
				} else {
					this.isAttributeSort = true;
				}
				// 隐藏修改人数画面
				this.isAttributeSortPeople = false;
				// 加载桌子列表信息
				this.loadTableLisData('');
			},
			// 点击修改人数按钮
			changePeopleButton: function(e) {
				// 是否选中修改人数钮
				if (this.isAttributeSortPeople === true) {
					this.isAttributeSortPeople = false;
				} else {
					this.isAttributeSortPeople = true;
				}
				// 隐藏换桌画面
				this.isAttributeSort = false;
			},
			// 设置就餐人数
			minNumberNew: function(e) {
				if (this.setupCustomerPeopleCount !== 1) {
					this.setupCustomerPeopleCount = this.setupCustomerPeopleCount - 1;
				}
			},
			// 设置就餐人数
			addNumberNew: function(e) {
				this.setupCustomerPeopleCount = this.setupCustomerPeopleCount + 1;
			},
			// 确认就餐人数
			sureCustomerCount: function(e) {
				// 显示加载画面
				this.$showLoading()
				// 修改就餐人数
				const changeCustomer = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId,
					customerPeopleCount: this.setupCustomerPeopleCount
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/changeCustomerCount', changeCustomer)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							this.customerPeopleCount = this.setupCustomerPeopleCount;
							// 显示弹框
							this.showalert = true;
							this.tipMessage = this.i18n.peopleModifiedSuccessfully;
							// 加载桌子信息
							this.loadTableData(this.nowTable);
						} else if (result.data.resultCode === '9001') {
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
						// 隐藏加载画面
						this.$hideLoading();
				 }).catch(() => {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
					// 隐藏加载画面
					this.$hideLoading();
				});

			},
			// 点击弹框确认按钮
			confirmButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
				// 判断是不是点击了退菜
				this.isReturnItem = false;
				// 判断是不是重新结算
				if (this.orderListStatus === '03' && this.isHttpFail !== 1) {
					// 更改订单状态
					this.updateOrderState();
				}
				// 判断是不是换桌
				if (this.isChangeTable) {
					// 跳转桌台位置页面
					uni.reLaunch({
					    url: '/pages/tableList/tableList?nowAreaId=' + this.nowAreaId
					});
				}
				this.isChangeTable = false;
				this.isHttpFail = 0;
			},
			// 点击弹框取消按钮
			cancelButton: function(e) {
				// 隐藏弹框
				this.showalert = false;
			},
			// 重新结算时更新订单状态
			updateOrderState: function(e) {
				// 参数
				const registPayment = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId
				};
				http
				 	.post('api/stpd/againRegistPayment', registPayment)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							this.reSettlementFlag = true;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else if (result.data.resultCode === '3004') {
							// 注文情報取得が異常です
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.exceptionInGettingOrderInformation;
						} else if (result.data.resultCode === '3008') {
							// 再会計が異常です
							this.isHttpFail = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.reAccountingIsAbnormal;
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
			// 选择商品
			selectFood: function(e) {
				// 判断是不是还没确定重新结算，是的话不允许点击菜
				if (this.orderListStatus !== '03' || this.reSettlementFlag === true) {
					// 选择的是第几个菜
					this.selectFoodOrder = e;
					this.isSelectFood = true;
					// 隐藏桌子画面
					this.tableShowHidden = false;
					// 显示换桌画面
					this.changeShowHidden = true;
					// 显示详细信息画面
					this.isAttributeSortDetail = true;
					// 隐藏换桌页面
					this.isAttributeSort = false;
					// 隐藏人数页面
					this.isAttributeSortPeople = false;
					// 隐藏作废商品画面
					this.isAttributeSortScrap = false;
					// 获取规格信息
					this.loadFoodOptionData(this.itemList[e].itemId,this.itemList[e].orderId,this.itemList[e].orderDetailId,this.itemList[e].itemPrice);
				}
			},
			// 获取商品特殊需求信息
			loadFoodOptionData(itemId,orderId,orderDetailId,itemPrice) {

				const dataFoodOption = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale,
					itemId: itemId,
					orderId: orderId,
					receivablesId: this.nowReceivablesId,
					orderDetailId: orderDetailId,
					buffetItemFlag: (itemPrice === '0' || itemPrice === 0 || Number(itemPrice) === 0) ? '1' : ''
				};
				// 获取特殊需求信息
				http
				 	.post('api/stpd/getItem', dataFoodOption)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 商品数量
							this.itemCount = result.data.itemCount;
							// 商品实际下单数量
							this.itemRealCount = result.data.itemRealCount;
							// 剩余退菜数
							if (Number(this.itemRealCount) === 0) {
								this.remainingItemNumber = 0;
							} else {
								this.remainingItemNumber = Number(this.itemRealCount) - 1;
							}
							// 商品备考
							this.itemInfo = result.data.itemInfo;
							// 商品特殊需求信息
							const optionTypeList = result.data.optionTypeList;
							// 规格数组
							this.optionSpeList = [];
							// 做法数组
							this.optionMetList = [];
							// 配料数组
							this.optionIngList = [];
							// 循环属性信息
							for (let i = 0; i < optionTypeList.length; i++) {
								if (optionTypeList[i].optionList === null || optionTypeList[i].optionList === undefined) {
									continue;
								}
								for (let y = 0; y < optionTypeList[i].optionList.length; y++) {
									// 単一選択
									if (optionTypeList[i].classification === 0 || optionTypeList[i].classification === '0') {
										this.optionSpeList.push(optionTypeList[i].optionList[y]);
									// 複数選択
									} else if (optionTypeList[i].classification === 1 || optionTypeList[i].classification === '1') {
										this.optionMetList.push(optionTypeList[i].optionList[y]);
									// 数量選択
									} else if (optionTypeList[i].classification === 2 || optionTypeList[i].classification === '2') {
										this.optionIngList.push(optionTypeList[i].optionList[y]);
									}
								}
							}
						} else if (result.data.resultCode === '9001') {
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
			// 点击详细信息按钮
			detailMessageButton: function(e) {
				// 是否选中详细信息
				if (this.isAttributeSortDetail === true) {
					this.isAttributeSortDetail = false;
				} else {
					this.isAttributeSortDetail = true;
				}
				// 隐藏作废信息页面
				this.isAttributeSortScrap = false;
			},
			// 点击作废信息按钮
			scrapFoodButton: function(e) {
				// 是否选中作废信息
				if (this.isAttributeSortScrap === true) {
					this.isAttributeSortScrap = false;
				} else {
					this.isAttributeSortScrap = true;
				}
				// 隐藏详细信息页面
				this.isAttributeSortDetail = false;
				// 退菜数
				this.returnItemNumber = 1;
				// 获取退菜信息
				this.loadReturnItemData();
				// 获取退菜理由
				this.loadReturnReasonData();
			},
			// 获取退菜信息
			loadReturnItemData() {
				
				const dataItem = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId,
					itemId: this.itemList[this.selectFoodOrder].itemId,
					orderId: this.itemList[this.selectFoodOrder].orderId,
					orderDetailId: this.itemList[this.selectFoodOrder].orderDetailId,
					languages: this._i18n.locale
				};
				// 获取退菜信息
				http
				 	.post('api/stpd/getItem', dataItem)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 剩余退菜数
							this.remainingItemNumber = result.data.itemRealCount - 1;
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.isHttpFail = 1;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 获取退菜理由
			loadReturnReasonData() {
				
				const dataReturn = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/getReturnReasonList', dataReturn)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							this.returnReasonList = [];
							// 退菜理由
							this.returnReasonList = result.data.returnReasonList;
							for (let i = 0; i < this.returnReasonList.length; i++) {
								this.returnReasonList[i]['checked'] = false;
							}
						} else if (result.data.resultCode === '9001') {
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
			// 选择理由
			checkboxChange: function (e) {
				this.returnReasonList[e].checked = !this.returnReasonList[e].checked;
			},
			// 返回桌子信息
			attributeReturnButton: function(e) {
				// 显示桌子信息页面
				this.tableShowHidden = true;
				// 隐藏换桌画面
				this.changeShowHidden = false;
				// 选择清空
				this.selectFoodOrder = '';
			},
			// 选择其他桌子
			selectTable: function(e) {
				if (this.tableOtherList[e].tableId !== this.nowTable) {
					// 加载桌子信息
					this.loadTableData(this.tableOtherList[e].tableId);
					this.nowTable = this.tableOtherList[e].tableId;
					this.loadTableLisData(this.nowAreaId);
				
				}
			},
			// 换桌
			changeTable: function(e) {
				// 显示加载画面
				this.$showLoading()
				// 换桌
				const changeTable = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId,
					newTableId: this.tableOtherList[e].tableId
				};
				// 获取桌台信息
				http
				 	.post('api/stpd/changeTable', changeTable)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 判断是不是换桌
							this.isChangeTable =  true;
							this.showalert = true;
							this.tipMessage = this.i18n.tableChangeOfSucceeded;
						} else if (result.data.resultCode === '9001') {
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
						// 隐藏加载画面
						this.$hideLoading();
				 }).catch(() => {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
					// 隐藏加载画面
					this.$hideLoading();
				});
				
			},
			// 开台
			openingDiners:function(e){
				// 传到后厨
				if ((this.nowReceivablesId === null || this.nowReceivablesId === '' || this.nowReceivablesId === undefined)
				&& this.unBuffetList !== null && 0 < this.unBuffetList.length) {
					// 显示加载画面
					this.$showLoading()
					const data = {
						storeId: getApp().globalData.storeId,
						customerCount: this.dinnerNumber,
						tableId: [{tableId: this.nowTable}],
						buffetId: this.unBuffetList
					};
					// 传送到后厨
					http
						.post('api/stpd/qrCodeIssue', data)
						.then(result => {
							if (result.data.resultCode === '0000') {
								const item = {
									tableName: this.tableName,
									customerCount: this.customerPeopleCount,
									tableSeatCount: this.tableSeatCount,
									areaTypeName: this.areaTypeName,
									orderCount: this.orderCount,
									dinnerNumber: this.dinnerNumber,
									nowAreaId: this.nowAreaId,
									nowReceivablesId: result.data.receivablesId,
									nowTable: this.nowTable
								};
								// 跳转点餐页面
								uni.reLaunch({
								    url: '/pages/food/food?item=' + encodeURIComponent(JSON.stringify(item))
								});
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
							// 隐藏加载画面
							this.$hideLoading();
						}).catch(() => {
							// 网络异常，请求失败
							this.showalert = true;
							this.tipMessage = this.i18n.networkExceptionRequestFailed;
							// 隐藏加载画面
							this.$hideLoading();
						});
				} else {
					const item = {
						tableName: this.tableName,
						customerCount: this.customerPeopleCount,
						tableSeatCount: this.tableSeatCount,
						areaTypeName: this.areaTypeName,
						orderCount: this.orderCount,
						dinnerNumber: this.dinnerNumber,
						nowAreaId: this.nowAreaId,
						nowReceivablesId: '',
						nowTable: this.nowTable
					};
					// 跳转点餐页面
					uni.reLaunch({
					    url: '/pages/food/food?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
			},
			// 单点
			singlePointButton:function(e){
				if(0 < this.itemList.length) {
					const item = {
						tableName: this.tableName,
						customerCount: this.customerPeopleCount,
						tableSeatCount: this.tableSeatCount,
						areaTypeName: this.areaTypeName,
						orderCount: this.orderCount,
						dinnerNumber: this.dinnerNumber,
						nowAreaId: this.nowAreaId,
						nowReceivablesId: this.nowReceivablesId,
						nowTable: this.nowTable
					};
					// 跳转点餐页面
					uni.reLaunch({
					    url: '/pages/food/food?item=' + encodeURIComponent(JSON.stringify(item))
					});
				} else {
					const sureDate = {
						storeId: getApp().globalData.storeId,
						receivablesId: this.nowReceivablesId
					};
					// 确认是不是从订单
					http
						.post('api/stpd/getOrderFlag', sureDate)
						.then(result => {
							if (result.data.resultCode === '0000') {
								// 从订单
								if (result.data.orderFlag === 0 || result.data.orderFlag === '0') {
									this.isHttpFail = 1;
									this.showalert = true;
									this.tipMessage = this.i18n.orderIsNotAdd;
								} else {
									const item = {
										tableName: this.tableName,
										customerCount: this.customerPeopleCount,
										tableSeatCount: this.tableSeatCount,
										areaTypeName: this.areaTypeName,
										orderCount: this.orderCount,
										dinnerNumber: this.dinnerNumber,
										nowAreaId: this.nowAreaId,
										nowReceivablesId: this.nowReceivablesId,
										nowTable: this.nowTable
									};
									// 跳转点餐页面
									uni.reLaunch({
									    url: '/pages/food/food?item=' + encodeURIComponent(JSON.stringify(item))
									});
								}
							} else if (result.data.resultCode === '9001') {
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
				}
			},
			// 跳转结算画面
			toAccount:function(e){
				//ＱＲコード発行した、注文しない場合、チェック追加
				if(0 < this.itemList.length && this.itemList[0].itemId !== null){
					const item = {
						nowReceivablesId: this.nowReceivablesId,
						nowTable: this.nowTable,
						nowAreaId: this.nowAreaId,
						reSettlementFlag: this.reSettlementFlag
					};
					// 跳转结算页面
					uni.reLaunch({
					    url: '/pages/orderAccount/orderAccount?item=' + encodeURIComponent(JSON.stringify(item))
					});
				} else {
					this.isOrderItemExit = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.orderItemExitCheck;
				}
			},
			// 跳转割勘结算画面
			toAccountShare:function(e){
				// 判断订单支払区分（01:普通、02:割勘）
				if (this.paymentDistinction === '01') {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.orderCannotBeCutOff;
				} else {
					const item = {
						nowReceivablesId: this.nowReceivablesId,
						nowTable: this.nowTable,
						nowAreaId: this.nowAreaId,
						reSettlementFlag: this.reSettlementFlag,
						customerPeopleCount: this.customerPeopleCount,
						paymentDistinction: this.paymentDistinction
					};
					// 跳转割勘结算页面
					uni.reLaunch({
						url: '/pages/orderAccount/orderAccountShare?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
			},
			// 增加退菜数
			addReturnItemNumber:function(e){
				if (this.remainingItemNumber !== 0 && this.remainingItemNumber !== '0') {
					this.returnItemNumber = Number(this.returnItemNumber) + 1;
					this.remainingItemNumber = Number(this.remainingItemNumber) - 1;
				}
			},
			// 减少退菜数
			jianReturnItemNumber:function(e){
				if (this.returnItemNumber !== 1 && this.returnItemNumber !== '1') {
					this.returnItemNumber = Number(this.returnItemNumber) - 1;
					this.remainingItemNumber = Number(this.remainingItemNumber) + 1;
				}
			},
			// 确认退菜
			sureReturnItem:function(e){
				// 判断订单状态，未确认状态不可退菜
				if (this.orderStatus === '01') {
					// 判断是不是点击的退菜
					this.isReturnItem = true;
					this.showalert = true;
					this.tipMessage = this.i18n.OrderIsNotConfirmedAndCanNotReturned;
					// 商品剩余数量已不够退菜
				} else if (this.remainingItemNumber < 0) {
					// 判断是不是点击的退菜
					this.isReturnItem = true;
					this.showalert = true;
					this.tipMessage = this.i18n.remainingQuantityNotEnough;
				} else {
					// 显示加载画面
					this.$showLoading()
					// 拼上退菜理由code
					this.returnReasonCode = '';
					for (let i = 0; i < this.returnReasonList.length; i++) {
						if (this.returnReasonList[i].checked) {
							this.returnReasonCode = this.returnReasonCode + this.returnReasonList[i].returnReasonCode + ',';
						}
					}
					
					const sureDate = {
						storeId: getApp().globalData.storeId,
						receivablesId: this.nowReceivablesId,
						orderId: this.itemList[this.selectFoodOrder].orderId,
						orderDetailId: this.itemList[this.selectFoodOrder].orderDetailId,
						itemId: this.itemList[this.selectFoodOrder].itemId,
						returnCount: this.returnItemNumber,
						returnReasonCode: this.returnReasonCode.substr(0,this.returnReasonCode.length-1)
					};
					// 确认退菜
					http
					 	.post('api/stpd/registReturn', sureDate)
					 	.then(result => {
							if (result.data.resultCode === '0000') {
								// 加载桌子信息
								this.loadTableData(this.nowTable);
								// 加载桌子列表信息
								this.loadTableLisData(this.nowAreaId);
								// 显示桌子页面
								this.tableShowHidden = true;
								// 隐藏退菜页面
								this.changeShowHidden = false;
								// 选择清空
								this.selectFoodOrder = '';
								// 隐藏加载画面
								this.$hideLoading();
								//返品印刷
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
										}
									})
													
								} else if (result.data.resultCode === '9001') {
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
						// 隐藏加载画面
						this.$hideLoading();
				});
				}
			},
			// 重新结算
			reSettlementButton:function(e){
				this.showalert = true;
				this.tipMessage = this.i18n.areYouSureToSettleAgain;
			},
			// 注文状態確認
			sureOrderButton:function(e){
				// 删除当前桌台信息
				const orderIdList = [];
				for (let i = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].itemSureStatus !== '02') {
						orderIdList.push(this.itemList[i].orderId);
					}
				}
				// 注文確認
				const sureOrderItem = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId,
					orderIdList: orderIdList
				};
				// 注文確認
				http
				 	.post('api/stpd/sureOrderItem', sureOrderItem)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 注文確認
							this.showalert = true;
							this.tipMessage = this.i18n.confirmOrderSucceeded;
				            // 判断桌号是否为空（空代表带走，不为空代表店内）
				            if (this.nowTable !== null && this.nowTable !== undefined && this.nowTable !== '') {
				            	// 加载桌子信息
				            	this.loadTableData(this.nowTable);
				            } else {
				            	// 加载订单商品信息
				            	this.loadOrderItemListData(this.nowReceivablesId);
				            }
							if(result.data.printInfo !== null && result.data.printInfo !== '' && result.data.printInfo !== undefined){
								printModule.printSlip(
									result.data.printInfo,
									(ret) => {
										if (ret.code != "00") {
											// 参数校验失败
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
							
						}
				 }).catch(() => {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
				});
			},
			// 加载放题信息
			loadBuffetListData() {
				
				const dataBuffet = {
					storeId: getApp().globalData.storeId,
					languages: this._i18n.locale
				};
				// 获取放题信息
				http
				 	.post('api/stpd/getBuffetList', dataBuffet)
				 	.then(result => {
						if (result.data.resultCode === '0000') {
							// 放题信息
							this.buffetList = result.data.buffetList;
							if (this.buffetList !== null && this.buffetList !== undefined && 0 < this.buffetList.length) {
								for (let i = 0; i < this.buffetList.length; i++) {
									this.buffetList[i].selectionStatus = '0';
									// TODO 暂时对应
									this.buffetList[i].buffetCount = 1;
								}
							}
						} else if (result.data.resultCode === '9001') {
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
			// 选择放題
			selectBuffet: function(e) {
				// 判断当前放題是否被选择
				if (this.buffetList[e].selectionStatus === '1') {
					// 状态改为被选中状态
					this.buffetList[e].selectionStatus = '0';
					for (let i = 0; i < this.unBuffetList.length; i++) {
						if (this.unBuffetList[i].buffetId === this.buffetList[e].buffetId) {
							this.unBuffetList.splice(i, 1);
						}
					}
				} else {
					this.buffetList[e].selectionStatus = '1';
					this.unBuffetList.push(this.buffetList[e]);
				}
				this.updateStatus = false;
				this.updateStatus = true;
			},
			scroll: function(e) {},
			// 廃棄
			disposalButton: function(e) {
				this.showConfirmAlert = true;
				this.tipMessage = this.i18n.areYouSureYouWantToDiscardIt;
			},
			// 廃棄
			disposalOrder(){
				// 显示加载画面
				this.$showLoading()
				const disposalDate = {
					storeId: getApp().globalData.storeId,
					receivablesId: this.nowReceivablesId,
				};
				// 廃棄
				http
					.post('api/stpd/discardOrder', disposalDate)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 跳转桌台位置页面
							uni.reLaunch({
							    url: '/pages/tableList/tableList?nowAreaId=' + this.nowAreaId
							});
						} else if (result.data.resultCode === '9001') {
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
						// 隐藏加载画面
						this.$hideLoading();
				 }).catch(() => {
					// 网络异常，请求失败
					this.isHttpFail = 1;
					this.showalert = true;
					this.tipMessage = this.i18n.networkExceptionRequestFailed;
					// 隐藏加载画面
					this.$hideLoading();
				});
			},
			// 点击弹框确认按钮
			confirmDisposalButton: function(e) {
				// 隐藏弹框
				this.showConfirmAlert = false;
				// 判断是不是点击了退菜
				this.disposalOrder();
			},
			// 点击弹框取消按钮
			cancelDisposalButton: function(e) {
				// 隐藏弹框
				this.showConfirmAlert = false;
			},
		},
		// 过滤器
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
	.foodViewinfo {
		padding: 0;
	    margin: 0;
	    height: 100%;
		width: 66.67%;
		padding-left: 2%;
		float: left;
	}
	.hallTopFirst {
		height: 10%;
		width: 100%;
		float: left;
	}
	.hallBottomFirst {
		height: 80%;
		float: left;
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
		margin: auto 3%;
		float: left;
		width: 28%;
		font-size: 1.7vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tableHallTopLineSecond {
		width: 57%;
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
	.tableHallTopLineThirdpic {
		width: 3vw;
		height: 3vw;
		text-align: right;
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
		width: 25vw;
		max-width: 25vw;
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
	.threePoints {
		float: right;
		height: 100%;
		margin-right: 3%;
		text-align: left;
		display: flex;
	}
	.threePointspic {
	    width: 3.5vw;
	    height: 3.5vw;	
		margin: auto;
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
		margin-left: 6px;
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
	    max-height: 74%;
	    height: 74%;
		overflow-y: auto;
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
	.hallListBottom {
		height: 17%;
		width: 100%;
		display: flex;
	}
	.lineFooterStart {
		margin: auto;
	    float: left;
	    width: 30%;
	    text-align: center;
	    height: 4vw;
	    font-size: 1.6vw;
	    line-height: 4vw;
	    color: #fff;
	    font-weight: 600;
	    background-color: #3987e4;
	    background-size: 100% 100%;
	    border: none;	
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.foodTableinfo {
		height: 98%;
	    color: white;
	    float: left;
	    padding-right: 0;
		width: 66.67%;
	}
	.orderDetailTable {
		width: 97%;
	    padding-left: 3%;
	    height: 100%;
	    max-height: 100%;
		overflow-y: auto;
	}
	.orderDetailChange {
		width: 98%;
		padding-left: 2%;
		height: 100%;
		max-height: 100%;
	}
	.indexTableBlue {
	    width: 31%;
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
	    width: 31%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgGreen.png);
		display: flex;
	}
	.indexTableGrey {
	    width: 31%;
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
	    width: 31%;
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
	    width: 31%;
	    height: 8vw;
	    float: left;
	    margin-top: 2vw;
	    margin-left: 1.5%;
	    background-size: 100% 100%;
	    position: relative;	
		background-image: url(../../static/tableImgYellow.png);
		display: flex;
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
	    top: 1vw;
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
	.numberDiners {
		float: left;
	    width: 100%;
	    height: 85%;	
	}
	.openingDiners {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		width: 100%;
		height: 15%;
	}
	.numberDinersPeople {
	    float: left;
	    width: 100%;
	    color: #333;
	    margin-left: 2%;
	    height: 10%;
	    font-size: 1.5vw;
		line-height: 5vw;
	}
	.numberDinersSet {
		float: left;
	    width: 90%;
	    height: 90%;
	    margin-left: 5%;
	    margin-right: 5%;	
	}
	.numberDinersSetLeft {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 29%;
	    height: 5vw;
	    border: 1px solid #3987e4;
	    border-radius: 2vw 0vw 0vw 2vw;	
	}
	.numberDinersSetMiddle {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 39%;
	    height: 5vw;
	    border: 1.5px solid #3987e4;
	    background-color: #3987e4;
	    font-size: 2vw;
	    text-align: center;
	    line-height: 5vw;
	}	
	.numberDinersSetRight {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 29%;
	    height: 5vw;
	    border: 1px solid #3987e4;
	    border-radius: 0vw 2vw 2vw 0vw;
	}
	.minusSignpic {
		height: 2.5vw;
	    width: 3vw;	
	}
	.addSignpic {
		height: 4vw;
	    width: 4vw;
	}
	.commonSortInfo {
	    height: 18%;
	    background-color: #3987e4;	
	}
	.commonDetialInfo {
		border-radius: 2vw;
	    height: 80%;
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
	.peopleEditOne {
		display: flex;
		align-items: center;
		justify-content: center;
	    float: left;
	    width: 50%;
	    color: #333;
	    height: 20%;
	    font-size: 1.5vw;
	}
	.peopleEditTwo {
		float: left;
	    width: 60%;
	    margin-left: 20%;
	    margin-right: 20%;	
	}
	.jianButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 29%;
	    height: 5vw;
	    border: 1px solid #3987e4;
	    border-radius: 2vw 0vw 0vw 2vw;	
	}
	.jiaButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 29%;
	    height: 5vw;
	    border: 1px solid #3987e4;
	    border-radius: 0vw 2vw 2vw 0vw;	
	}
	.middleButton {
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	    width: 39%;
	    height: 5vw;
	    border: 1.5px solid #3987e4;
	    background-color: #3987e4;
	    font-size: 2vw;
	    text-align: center;
	}
	.hallEditDown {
		float: left;
	    width: 30%;
	    height: 5vw;
	    border: 1px solid #6A6C79;
	    border-radius: 1vw;
	    margin-top: 2.5vw;
	    margin-left: 70%;
	    font-size: 2vw;
	    text-align: center;
	    line-height: 5vw;
	    background-color: #3987e4;
	    border: 0;	
	}
	.detailMessage {
	    color: #333;
	    font-size: 1.7vw;
	    font-weight: 500;
	    height: 70%;
	    width: 100%;
		margin-top: 3%;
	}
	.detailMessageLine {
		width: 100%;
		height: 15%;
		float: left;
	}
	.detailMessageLineBotton {
		width: 100%;
		height: 55%;
	}
	.detailMessageLineLeft {
		width: 25%;
	    text-align: center;	
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
	}
	.detailMessageLineRight {
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.backFoodDetail {
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
	.sureReturnFood {
		float: left;
	    height: 5vw;
	    width: 40%;
	    margin-left: 30%;
	    margin-right: 30%;
	    margin-top: 1vw;
	    margin-bottom: 2vw;
	    background-color: #3987e4;
	    background-size: 100% 100%;
	    text-align: center;
	    line-height: 5vw;
	    font-size: 2vw;
	    color: #fff;
	    cursor: pointer;	
	}
	.backDetailNumAddReturn {
	    float: left;
	    width: 100%;
	    height: 10%;
	    color: #fff;
	    margin-bottom: 5%;
		display: flex;
	}
	.backDetailNumAddDetailJian {
		margin: auto 0 auto auto;
		float: left;
	    width: 17%;
	    background-color: rgba(255,255,255,0.5);
	    height: 4vw;
	    font-size: 2vw;
	    text-align: center;
	    border-radius: 5em 0em 0em 5em;
	    border-right: 1px solid #949AA6;
	    line-height: 4vw;
	    cursor: pointer;
	    border: 1px solid #3987e4;
		color: #333;
	}
	.backDetailNumAddDetailNum {
		margin: auto 0;
		float: left;
	    width: 17%;
	    background-color: rgba(255,255,255,0.5);
	    height: 4vw;
	    font-size: 2vw;
	    text-align: center;
	    line-height: 4vw;
	    border: 1px solid #3987e4;
		color: #333;
	}
	.backDetailNumAddDetailAdd {
		margin: auto auto auto 0;
	    float: left;
	    width: 17%;
	    background-color: rgba(255,255,255,0.5);
	    height: 4vw;
	    font-size: 2vw;
	    text-align: center;
	    border-radius: 0em 5em 5em 0em;
	    border-left: 1px solid #949AA6;
	    line-height: 4vw;
	    cursor: pointer;
	    border: 1px solid #3987e4;	
		color: #333;
	}
	.backDetailReasonTitle {
	    width: 95%;
	    float: left;
	    margin-left: 5%;
	    font-size: 2vw;
	    font-weight: 600;
		color: #333;
		margin-bottom: 1%;
	}
	.backDetailReasonContent {
	    float: left;
	    width: 90%;
	    margin-left: 5%;
	    border-radius: 2vw;
	    font-size: 2vw;
	    border: 1px solid #3987e4;
		color: #333;
	}
	.backDetailReasonContentText {
	    float: left;
	    border-radius: 2vw;
	    width: 90%;
	    margin-left: 5%;
	    height: 30%;
	    margin-top: 2%;
	    border: 1px solid #3987e4;
	}
	.backDetailReasonContentTextarea {
	    border-radius: 2vw;
	    padding-top: 1%;
	    padding-left: 1%;
	    height: 100%;
	    width: 100%;
	    font-size: 2vw;
	    border: 0;
		color: #000000;
	}
	.checkboxStyle {
		margin: 2%;
	}
	.checkboxLabel {
		float: left;
	    margin-left: 3vw;
	    margin-top: 1vw;
	    margin-bottom: 1vw;	
	}
	.sureOrderButton {
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
	.sureOrderButtonShare {
	    float: left;
	    width: 43%;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		background-color: rgba(255,255,255,0.32);
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
	.numAndRemarkContentInput{
		width: 100%;
	    height: 7vw;
	    border-radius: 0.5vw;
	    color: #333;
	    border: 1px solid #3987e4;
		line-height: 7vw;
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
	    background-color: rgba(255,255,255,0.5);
		border: 1px solid #adadad;
		line-height: 3vw;
	}
	.addIngredients {
		font-size: 2.5vw;
	    margin: auto;	
	}
	.packpic {
	    margin: auto;
		width: 3vw;
		height: 2.5vw;
	}
	.packpicText {
	    font-size: 2vw;
	    margin: auto;
		width: 70%;
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
	.buffetNumberDiners {
		float: left;
	    width: 100%;	
	}
	.account-left-row2 {
		width: 100%;
		background-color: white;
		overflow-y: auto;
		height: 50%;
	}
</style>
