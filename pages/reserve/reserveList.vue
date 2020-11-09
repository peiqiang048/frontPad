<template>
	<view class="container" v-bind:style="{ height: windowHeight + 'px' }">
		<view class="orderPage">
			<view class="orderList" id="transferLeftOut">
				<view class="menuReturn" id="return" style="    margin-top: 5%;margin-bottom: -4%;margin-left: -1%;">
					<img src="static/backArrow.png" style="margin: 0;width: 40%;margin-left: 23%;" @click="returnHomePage()"></image>
				</view>
				<view class="transferLeftFront" style="background-color: rgba(40,40,52,0.6);">
					<view class="fontPosition">{{i18n.appointmentTitle}}</view>
				</view>
			</view>
			<!-- 名前 电话番号 状态 来店时间 -->
			<view class="transferRightInhand">
				<view class="topSearch">
					<view class="searchCondition">
						<view class="startTimeSearch">
							<!-- 名前 -->
							<view class="textLabell">{{i18n.name}}</view>
							<input class="table-search-input" v-model="name" maxlength="100" style="text-align: center;"/>
						</view>
						<view class="startTimeSearch">
							<!-- 电话番号 -->
							<view class="textLabel">{{i18n.phoneNumber}}</view>
							<input class="table-search-input" v-model="phoneNumber" maxlength="11" type="number" style="text-align: center;" />
						</view>
						<view class="startTimeSearch">
							<!-- 状态 -->
							<view class="textLabel">{{i18n.state}}</view>
							<view class="uni-list-cell-db">
								<picker style="height: 100%; width: 100%;" @change="bindPickerChange" :range="eatMayArray" :value="index"
								 range-key="text">
									<view style="margin-top: 1%;">{{eatMayArray[index].text}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="searchCondition" style="margin-top: 2%;">
						<!-- 到店时间 -->
						<view class="startTimeSearch">
							<view class="textLabell">{{i18n.time}}</view>
							<view class="uni-list-cell-db">
								<e-picker-plus mode="YMDhm" @confirm="getData" :start="userTimeStart" :end="userTimeEnd" :defaultValue="startTime">{{startTime ===''? '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp':startTime}}</e-picker-plus>
							</view>
						</view>
						<view class="startTimeSearch">
							<view class="textLabel">{{i18n.pozhehao}}</view>
							<view class="uni-list-cell-db">
								<e-picker-plus mode="YMDhm" @confirm="getEndtime" :start="userTimeStart" :end="userTimeEnd" :defaultValue="endTime">{{endTime ===''? '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp':endTime}}</e-picker-plus>
							</view>
						</view>
						<view><button style="float: right;margin-right: 1%;height: 4vw;align-items: center;display: flex;" class="table-pay-search-button"
							 @click="searchData()">{{i18n.search}}</button></view>
					</view>
				</view>
				<!-- 一览 -->
				<view class="table-responsive" style="width: 99%;overflow-x: scroll;overflow-y: hidden;">
					<view class="transferSecondTro" style="width: 100%;">
						<view class="transferSecondTho" style=" width:4%;"></view>
						<!-- 来店时间 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.time}}</view>
						<!-- 姓名 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.name}}</view>
						<!-- 电话号码 -->
						<view class="transferSecondTho" style=" width:20%;">{{i18n.phoneNumber}}</view>
						
						<!-- テーブル名 -->
						<view class="transferSecondTho" style=" width:20%;">{{i18n.tableName}}</view>
						<!-- 顾客人数 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.customers}}</view>
						<!-- 套餐 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.Coursetitle}}</view>
						<!-- 状态 -->
						<view class="transferSecondTho" style=" width:10%;">{{i18n.state}}</view>
						<!-- 操作 -->
						<view class="transferSecondTho" style=" width:14%;">{{i18n.operate}}</view>
					</view>
					<!-- 暂无数据 -->
					<view class="noData" v-if="reservateList.length === 0">
						{{i18n.orderListNoData}}
					</view>
					<view style="float:left;height:85%;overflow-y: auto;width: 100%;">
						<view v-if="reservateList.length > 0" style="width: 100%" :class="[order.checked === true  ? 'transferSecondTrContentoOther' : 'transferSecondTrContento' ]"
						 v-for="(order, index) in pageList" :key="order.receivablesId">
							<checkbox style="margin: 1% 0 0 0.5%;" :value="order.reservateId" :checked="order.checked" @click="checkboxChange(index, order.reservateId)" />
							<!-- 来店时间 -->
							<view name="1" class="fontPositionso" style=" width:14%;">{{order.reservateTime | timeString('1') }}<br>{{order.reservateTime | timeString('2') }}</view>
							<!-- 姓名 -->
							<view name="1" class="fontPositionso" style=" width:14%;">{{order.customerName}}</a></view>
							<!-- 电话号码 -->
							<view name="1" class="fontPositionso" style=" width:20%;">{{order.telNumber}}</view>
							<!-- テーブル名 -->
							<view name="1" class="fontPositionso" style=" width:20%;">{{order.tableName}}</view>
							<!-- 顾客人数 -->
							<view name="1" class="fontPositionso" style=" width:14%;">{{order.customerCount}}</view>
							<!-- 套餐自助餐 -->
							<view name="1" class="fontPositionso" style=" width:14%;">{{order.courseBuffet}}</view>
							<!-- 状态 -->
							<view v-if="order.status ==='01'" class="fontPositionso" style=" width:11%;">{{i18n.appointment}}</view>
							<view v-if="order.status ==='02'" class="fontPositionso" style=" width:11%;">{{i18n.processing}}</view>
							<view v-if="order.status ==='03'" class="fontPositionso" style=" width:11%;">{{i18n.cancell}}</view>
							<!-- 操作 -->
							<view class="detailButton" style=" width:12%;" @click="detailButton(order.reservateId)">{{i18n.detail}}</view>
						</view>
					</view>
				</view>
				<!-- 分页 -->
				<view class="pagination" style="width: 99%">
					<view style="width: 40%;float:left;">
						<!-- 新增 -->
						<button style="width: 21%; float:left; margin-right: 4%;height: 4vw;padding: 0;" class="table-pay-search-button"
						 @click="change(1)">{{i18n.creat}}</button>
						<!-- 变更 -->
						<button style="width: 21%; float:left; margin-right: 4%;height: 4vw;padding: 0;" class="table-pay-search-button"
						 @click="change(2)">{{i18n.change}}</button>
						<!-- 取消 -->
						<button style="width: 21%; float:left; margin-right: 4%;height: 4vw;padding: 0;" class="table-pay-search-button"
						 @click="changeState(1)">{{i18n.appointmentCancell}}</button>
						<!-- 来店 -->
						<button style="width: 21%; float:left; margin-right: 4%;height: 4vw;padding: 0;" class="table-pay-search-button"
						 @click="changeState(2)">{{i18n.Processed}}</button>
					</view>
					<view style="float: right;width: 50%;">
						<ul class="paginationn" id="orderInfoPageTwo" style="padding-left: 0;">
							<!-- 首页 -->
							<li jp-role="first" jp-data="1" style="width: 22%;">
								<a class="first" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 1)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 1)  ? 'rgb(170, 170, 170)' : '#337ab7'}]"
								 style="cursor: default; border-bottom-left-radius: 4px;border-top-left-radius: 4px;width: 94%;padding-left: 3%;padding-right: 3%;text-align: center;"
								 @click="firstPage()">{{i18n.firstPage}}</a>
							</li>
							<!-- 前一页 -->
							<li jp-role="prev" jp-data="0" style="width: 22%;">
								<a class="prev" v-bind:style="[{ 'pointer-events' : (page == 1) || (pages == 1)  ?  'none'  : '' ,  'color': (page == 1) || (pages == 1) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
								 style="cursor: default;width: 94%;padding-left: 3%;padding-right: 3%;text-align: center;" @click="prevPage()"><i
									 class="arrow arrow2"></i>{{i18n.prevPage}}</a>
							</li>
							<!-- 页数 -->
							<li jp-role="page" jp-data="1" style="width: 11%;">
								<a class="page" style="background-color: #337ab7;color: #FFFFFF;width: 94%;padding-left: 3%;padding-right: 3%;text-align: center;">{{page}}</a>
							</li>
							<!-- 下一页 -->
							<li jp-role="next" jp-data="2" style="width: 22%;">
								<a class="next" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
								 style="cursor: default;width: 94%;padding-left: 3%;padding-right: 3%;text-align: center;" @click="nextPage()">{{i18n.nextPage}}<i
									 class="arrow arrow3"></i></a>
							</li>
							<!-- 尾页 -->
							<li jp-role="last" jp-data="1" style="width: 22%;">
								<a class="last" v-bind:style="[{ 'pointer-events' : (page == pages) || (pages == 0)  ?  'none'  : '' ,  'color': (page == pages) || (pages == 0) ? 'rgb(170, 170, 170)' : '#337ab7'}]"
								 @click="lastPage()" style="cursor: default; border-bottom-right-radius: 4px;border-top-right-radius: 4px;width: 94%;padding-left: 3%;padding-right: 3%;text-align: center;">{{i18n.lastPage}}</a>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<!-- 弹框-->
			<view v-show="showalert">
				<view class="sweet-overlay"></view>
				<view class="sweet-alert">
					<!-- 为1显示对号图片 不为1显示叹号图片-->
					<view v-if="cancleConfirmFlag != 1" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
					<view v-if="cancleConfirmFlag === 1" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
					<!-- 提示信息 -->
					<h2>{{tipMessage}}</h2>
					<view class="sa-button-container">
						<!-- 取消按钮 -->
						<button v-if="modifySuccess != 2 " style="display: inline-block; background-color: #adadad" @click="cancelButton">{{i18n.cancell}}</button>
						<!-- 确认按钮 -->
						<button style="display: inline-block; background-color: #3987e4" @click="confirmButton">{{i18n.confirm}}</button>
					</view>
				</view>
			</view>
			<!-- 弹框-->
			<view v-show="showalertTwo">
				<view class="sweet-overlay"></view>
				<view class="sweet-alert">
					<view v-if="cancleConfirmFlagTwo === 0" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/warn.png');"></view>
					<view v-if="cancleConfirmFlagTwo === 1" class="sa-icon sa-custom" style="display: block;background-image: url('../../static/success.png');"></view>
					<!-- 提示信息 -->
					<h2>{{tipMessageTwo}}</h2>
					<view class="sa-button-container">
						<!-- 取消按钮 -->
						<view v-if="cancleFlag === 1" class="sa-confirm-button-container">
							<button style="display: inline-block; background-color: #adadad;" @click="cancelButtonTwo">{{i18n.cancell}}</button>
						</view>
						<!-- 确认按钮 -->
						<view class="sa-confirm-button-container">
							<button style="display: inline-block; background-color: #368be8" @click="confirmButtonTwo">{{i18n.confirm}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<request-loading></request-loading>
		<!-- 新增和编辑画面 -->
		<view v-if="showCreatndUpdate" class="creatndUpdateDiv">
			<view class="wholeDiv">
				<view class="containerTwo">
					<!-- 第一行信息 -->
					<view class="body">
						<view class="borderClass" style="height: 20%;">
							<view style="margin: 0% 2% 0% 2%;height: 100%;">
								<view style="width: 100%;height: 12%;"></view>
								<view class="firstLine" style="height: 30%;margin: 0%;">
									<!-- 名前 -->
									<view class="firstLineOne" style="margin-left: 0%;">
										<!-- 名前 - 多语言 - -->
										<view class="firstLineText" style="margin-right: 7%;">{{i18n.customerName}}</view>
										<!-- 名前 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input" v-model="customerName" maxlength="100" /></view>
									</view>
									<!-- 電話番号 -->
									<view class="firstLineOne">
										<!-- 電話番号 - 多语言 - -->
										<view class="firstLineText">{{i18n.telNumber}}</view>
										<!-- 電話番号 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input" v-model="telNumber" maxlength="11" type="number"/></view>
									</view>
									<!-- 顧客人数 -->
									<view class="firstLineOne">
										<!-- 顧客人数 - 多语言 - -->
										<view class="firstLineText">{{i18n.customerCount}}</view>
										<!-- 顧客人数 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input" v-model="customerCount" type="number" /></view>
									</view>
								</view>
								<view style="width: 100%;height: 10%;"></view>
								<!-- 来店時間 -->
								<view class="firstLine" style="height: 30%;">
									<!-- 来店時間 - 多语言 - -->
									<view class="lableClass">{{i18n.reservateTime}}</view>
									<!-- 来店時間-开始时间输入框 -->
									<view class="reservateTimeClass">
										<e-picker-plus mode="YMDhm" @confirm="reservateTimeChange" :start="userTimeStartTwo" :end="userTimeEndTwo"
										 :defaultValue="reservateTimeTwo">{{reservateTimeTwo==''?'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp':reservateTimeTwo}}</e-picker-plus>
									</view>
									<!-- 时长 -->
									<view class="firstLineOne" style="margin-left: 5.5%;">
										<!-- 时长 - 多语言 - -->
										<view class="firstLineText" style="margin-right: 7%;">{{i18n.useTime}}</view>
										<!-- 时长 - 下拉框 - -->
										<view class="uni-list-cell-dbTwo courseListClassOne" style="height: 100%;width: 59%;margin-left: 0%;border-radius: 5px;">
											<picker @change="useTimeChange" :range="useTimeListWenZi" :value="indexTwo" range-key="courseName" class="useTimeClass">
												<view>{{useTimeWenZi}}</view>
											</picker>
										</view>
									</view>
									<!-- 空席确认 - 按钮 -->
									<view class="addButton" style="margin-left: 25%;width: 9%;height: 92%;" @click="emptyTableConfirm()">
										<!-- 空席确认 - 多语言 - -->
										<view class="overLong">{{i18n.emptyTableConfirm}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="borderClass" style="height: auto;margin-top: 1%;">
							<view style="margin: 2% 2% 2% 2%;height: 100%;">
								<!-- 予約区分 -->
								<!-- 予約区分 - 多语言 - -->
								<view class="lableClass" style="margin-bottom: 2%;width: 20%;">{{i18n.reservateType}}</view>
								<view class="firstLine">
									<view class="distinctRadio">
										<radio-group @change="radioChange" style="display: flex;">
											<!-- 席のみ - 单选按钮 -->
											<label class="uni-list-cell uni-list-cell-pd">
												<view style="width: 15%;align-items: center;display: flex;">
													<radio :value="'01'" :checked="reservateType === '01'" />
												</view>
												<!-- 席のみ - 多语言 - -->
												<view class="justSeat" style="margin-top: 1%;">{{i18n.justSeat}}</view>
											</label>
											<!-- コース・放題＋席 - 单选按钮 -->
											<label class="uni-list-cell uni-list-cell-pd">
												<view style="width: 15%;align-items: center;display: flex;">
													<radio :value="'02'" :checked="reservateType === '02'" />
												</view>
												<!-- コース・放題＋席 - 多语言 - -->
												<view class="justSeat" style="margin-top: 1%;">{{i18n.seatAndMaeal}}</view>
											</label>
										</radio-group>
									</view>
								</view>
								<!-- コース -->
								<view class="firstLine" style="height: 4vw;margin-bottom: 2%;">
									<!-- コース - 多语言 - -->
									<view class="lableClass" style="font-weight: normal;margin-left: 1%;">{{i18n.course}}</view>
									<!-- 套餐追加 - 按钮可选 -->
									<view v-if="reservateType === '02'" class="addButton" style="background-color: #35c6ec;" @click="addCourse()">
										<!-- 追加 - 多语言 - -->
										<view class="overLong">{{i18n.add}}</view>
									</view>
									<!-- 套餐追加 - 按钮不可选 -->
									<view v-if="reservateType === '01'" class="addButton" style="background-color: #adadad;">
										<!-- 追加 - 多语言 - -->
										<view class="overLong">{{i18n.add}}</view>
									</view>
								</view>
								<!-- 套餐选择-->
								<view v-if="reservateType === '02' && this.selectCourseInfoList.length > 0" style="height: auto;margin-bottom: 2%;">
									<block v-for="(item ,index1) in selectCourseInfoList" :key="index1">
										<view class="courseClass" @click="currentCourseButton(index1)">
											<!-- 套餐下拉框 -->
											<view class="uni-list-cell-dbTwo courseListClass">
												<picker @change="courseListChange" :range="courseList" :value="indexMeal" range-key="courseName" style="height: 100%;font-size: 1.5vw;">
													<view v-if="item.courseIndex !== '00'" style="line-height: 4vw;">{{courseList[item.courseIndex].courseName}}</view>
												</picker>
											</view>
											<!-- 套餐数量按钮 -->
											<view class="jiaJianNumberClass">
												<view class="jiaJianClass" @click="jianCourseNumber(index1)">-</view>
												<view class="numberClass">{{item.courseNumber}}</view>
												<view class="jiaJianClass" @click="jiaCourseNumber(index1)">+</view>
											</view>
											<!-- 套餐 - 删除 - 按钮 -->
											<view class="addButton" style="margin-left: 8%;height: 100%;width: 10%;" @click="deleteCourse(index1)">
												<!-- 删除 - 多语言 - -->
												<view class="overLong">{{i18n.deleteMeal}}</view>
											</view>
										</view>
									</block>
								</view>
								<!-- 自助 -->
								<view class="firstLine" style="margin-top: 1%;height: 4vw;margin-bottom: 2%;">
									<!-- 自助 - 多语言 - -->
									<view class="lableClass" style="font-weight: normal;margin-left: 1%;">{{i18n.buffet}}</view>
									<!-- 自助追加 - 按钮可选 -->
									<view v-if="reservateType === '02'" class="addButton" style="background-color: #35c6ec;" @click="addBuffet()">
										<!-- 追加 - 多语言 - -->
										<view class="overLong">{{i18n.add}}</view>
									</view>
									<!-- 自助追加 - 按钮 不可选-->
									<view v-if="reservateType === '01'" class="addButton" style="background-color: #adadad;">
										<!-- 追加 - 多语言 - -->
										<view class="overLong">{{i18n.add}}</view>
									</view>
								</view>
								<!-- 自助选择-->
								<view v-if="reservateType === '02' && this.selectBuffetInfoList.length > 0" style="height: auto;margin-bottom: 3%;">
									<block v-for="(item ,index1) in selectBuffetInfoList" :key="index1">
										<view class="courseClass" @click="currentBuffetButton(index1)">
											<!-- 自助下拉框 -->
											<view class="uni-list-cell-dbTwo courseListClass">
												<picker @change="buffetListChange" :range="buffetList" :value="indexBuffet" range-key="buffetName" style="height: 100%;font-size: 1.5vw;">
													<view v-if="item.buffetIndex !== '00'" style="line-height: 4vw;">{{buffetList[item.buffetIndex].buffetName}}</view>
												</picker>
											</view>
											<!-- 自助数量按钮 -->
											<view class="jiaJianNumberClass">
												<view class="jiaJianClass" @click="jianBuffetNumber(index1)">-</view>
												<view class="numberClass">{{item.buffetNumber}}</view>
												<view class="jiaJianClass" @click="jiaBuffetNumber(index1)">+</view>
											</view>
											<!-- 套餐 - 删除 - 按钮 -->
											<view class="addButton" style="margin-left: 8%;height: 100%;width: 10%;" @click="deleteBuffet(index1)">
												<!-- 删除 - 多语言 - -->
												<view class="overLong">{{i18n.deleteMeal}}</view>
											</view>
										</view>
									</block>
								</view>
							</view>
						</view>
						<view class="borderClass" style="height: 65%;margin-top: 1%;">
							<view style="margin: 0% 2% 0% 2%;height: 100%;">
								<view style="width: 100%;height: 5%;"></view>
								<!-- 自助 - 桌位指定 - -->
								<view class="lableClass" style="width: 100%;height: 10%;">{{i18n.tableType}}</view>
								<!-- 桌位指定 -->
								<view class="firstLine" style="margin: 0%;height: 10%;">
									<view class="tableColorInfoListClass">
										<!-- 桌台颜色示意图列表 -->
										<block v-for="(item ,index) in tableTypeList" :key="index">
											<!-- <view class="tableColorInfoClass"> -->
											<view class="tableColorInfoClassOne">
												<view class="tableColorInfoClassOneText" :style="{'background-color':item.tableColor}"></view>
											</view>
											<view class="tableColorInfoClass">{{item.tableTypeName}}</view>
											<!-- </view> -->
										</block>
									</view>
								</view>
								<view style="width: 100%;height: 7%;"></view>
								<!-- 桌子列表 -->
								<view class="tableInfos">
									<block v-for="(item ,index) in tableList" :key="index">
										<!-- 桌子可选 -->
										<view v-if="tableChoosenFlagList[index] === '2' && areaId === item.areaId" class="tableClass"
										 :style="{'background-color':item.tableColor}" @click="selectTable(index)">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
										<!-- 桌子不可选 -->
										<view v-if="tableChoosenFlagList[index] === '0' && item.useFlag === '2' && areaId === item.areaId" class="tableClass"
										 style="background-color: grey;" @click="selectTable(index)">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
										<!-- 桌子可选 -->
										<view v-if="tableChoosenFlagList[index] === '0' && item.useFlag === '1' && areaId === item.areaId" class="tableClass"
										 :style="{'background-color':item.tableColor}" @click="selectTable(index)">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
										<view v-if="tableChoosenFlagList[index] === '1' && areaId === item.areaId" class="tableClass" :style="{'background-color': '#191970'}"
										 @click="selectTable(index)">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
									</block>
								</view>
								<view style="width: 100%;height: 3%;"></view>
								<!-- 楼层列表 -->
								<view class="tableInfosBottom">
									<scroll-view class="tableInfosScroll" scroll-x="true" @scroll="scroll">
										<view class="areaList" :style="{width:listWidth+'vw'}">
											<block v-for="(item, index) in areaList" :key="index">
												<!-- 选中的楼层区域 -->
												<view v-if="areaId === item.areaId" class="bottomTabOther" @click="selectArea(index)">
													<view class="bottomTabFront overLong">{{item.areaName}}</view>
												</view>
												<!-- 未选择中的楼层区域 -->
												<view v-else class="bottomTab" @click="selectArea(index)">
													<view class="bottomTabFront overLong">{{item.areaName}}</view>
												</view>
											</block>
										</view>
									</scroll-view>
								</view>
								<view style="width: 100%;height: 3%;"></view>
								<!-- 已被选择的席位 -->
								<view v-if="areaSelect.length > 0" class="tableSelected">{{i18n.chooseTable}}
									<block v-for="(item, index) in areaSelect" :key="index">
										<a>{{item.areaName}}:</a>
										<block v-for="(item1, index1) in tableList" :key="index1">
											<a v-if="tableChoosenFlagList[index1] === '1' && item1.areaName === item.areaName && lastTableId !== item1.tableId">{{tableList[index1].tableName}},</a>
											<a v-if="tableChoosenFlagList[index1] === '1' && item1.areaName === item.areaName && lastTableId === item1.tableId">{{tableList[index1].tableName}}</a>
										</block>
									</block>
								</view>
								<view style="width: 100%;height: 5%;"></view>
							</view>
						</view>
						<view class="borderClass" style="height: 25%;margin-top: 1%;">
							<view style="margin: 1% 2% 2% 2%;height: 90%;">
								<!-- 要求 -->
								<view class="lableClass">{{i18n.request}}</view>
								<view style="height: 60%;display: flex;margin: 1%;">
									<view style="width: 100%;height: 100%;border: 1px solid #dedede;font-size: 1.5vw;">
										<textarea maxlength="200" style="width: 100%;height: 100%;font-size: 1.5vw;" v-model="comment"/>
										</view>
								</view>
							</view>
						</view>
						<!-- 底部按钮 -->
						<view style="height: 11%;display: flex;font-size: 1.5vw;margin-top: 3%;">
							<!-- 取消按钮 -->
							<view class="buttonClass" style="margin: 0% 10% 0% 35%;" @click="createCancle"><view class="overLong">{{i18n.cancell}}</view></view>
							<!-- 确定按钮 -->
							<view class="buttonClass" style="margin: 0% 35% 0% 0%;" @click="checkCreateDataButton"><view class="overLong">{{i18n.confirm}}</view></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详细 -->
		<view v-if="showDetail" class="creatndUpdateDiv">
			<view class="wholeDiv">
				<view class="containerTwo">
					<!-- 第一行信息 -->
					<view class="body">
						<view class="borderClass" style="height: 20%;">
							<view style="margin: 0% 2% 0% 2%;height: 100%;">
								<view style="width: 100%;height: 12%;"></view>
								<view class="firstLine" style="height: 30%;margin: 0%;">
									<!-- 名前 -->
									<view class="firstLineOne" style="margin-left: 0%;">
										<!-- 名前 - 多语言 - -->
										<view class="firstLineText" style="margin-right: 7%;">{{i18n.customerName}}</view>
										<!-- 名前 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input disabled" v-model="customerName" maxlength="100" disabled="true" /></view>
									</view>
									<!-- 電話番号 -->
									<view class="firstLineOne">
										<!-- 電話番号 - 多语言 - -->
										<view class="firstLineText">{{i18n.telNumber}}</view>
										<!-- 電話番号 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input disabled" v-model="telNumber" maxlength="11" type="number" disabled="true"/></view>
									</view>
									<!-- 顧客人数 -->
									<view class="firstLineOne">
										<!-- 顧客人数 - 多语言 - -->
										<view class="firstLineText">{{i18n.customerCount}}</view>
										<!-- 顧客人数 - 输入框 - -->
										<view class="firstLineInput"><input class="uni-input disabled" v-model="customerCount" type="number" disabled="true"/></view>
									</view>
								</view>
								<view style="width: 100%;height: 10%;"></view>
								<!-- 来店時間 -->
								<view class="firstLine" style="height: 30%;">
									<!-- 来店時間 - 多语言 - -->
									<view class="lableClass">{{i18n.reservateTime}}</view>
									<!-- 来店時間-开始时间输入框 -->
									<view class="reservateTimeClass disabled">
									    <input class="uni-input disabled" v-model="reservateTimeTwo" disabled="true" style="border: none;"/>
									</view>
									<!-- 时长 -->
									<view class="firstLineOne" style="margin-left: 5.5%;">
										<!-- 时长 - 多语言 - -->
										<view class="firstLineText" style="margin-right: 7%;">{{i18n.useTime}}</view>
										<!-- 时长 - 下拉框 - -->
										<view class="uni-list-cell-dbTwo courseListClassOne disabled" style="height: 100%;width: 59%;margin-left: 0%;border-radius: 5px;">
											<picker :range="useTimeListWenZi" :value="indexTwo" range-key="courseName" class="useTimeClass" disabled="true">
												<view>{{useTimeWenZi}}</view>
											</picker>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="borderClass" style="height: auto;margin-top: 1%;">
							<view style="margin: 2% 2% 2% 2%;height: 100%;">
								<!-- 予約区分 -->
								<!-- 予約区分 - 多语言 - -->
								<view class="lableClass" style="margin-bottom: 2%;width: 20%;">{{i18n.reservateType}}</view>
								<view class="firstLine">
									<view class="distinctRadio">
										<radio-group style="display: flex;">
											<!-- 席のみ - 单选按钮 -->
											<label class="uni-list-cell uni-list-cell-pd">
												<view style="width: 15%;align-items: center;display: flex;">
													<radio :value="'01'" :checked="reservateType === '01'" disabled="true"/>
												</view>
												<!-- 席のみ - 多语言 - -->
												<view class="justSeat" style="margin-top: 1%;">{{i18n.justSeat}}</view>
											</label>
											<!-- コース・放題＋席 - 单选按钮 -->
											<label class="uni-list-cell uni-list-cell-pd">
												<view style="width: 15%;align-items: center;display: flex;">
													<radio :value="'02'" :checked="reservateType === '02'" disabled="true"/>
												</view>
												<!-- コース・放題＋席 - 多语言 - -->
												<view class="justSeat" style="margin-top: 1%;">{{i18n.seatAndMaeal}}</view>
											</label>
										</radio-group>
									</view>
								</view>
								<!-- コース -->
								<view class="firstLine" style="height: 4vw;margin-bottom: 2%;">
									<!-- コース - 多语言 - -->
									<view class="lableClass" style="font-weight: normal;margin-left: 1%;">{{i18n.course}}</view>
									<!-- 套餐追加 - 按钮不可选 -->
									<!--<view class="addButton" style="background-color: #adadad;">-->
										<!-- 追加 - 多语言 - -->
									<!--	<view class="overLong">{{i18n.add}}</view>-->
									<!--</view>-->
								</view>
								<!-- 套餐选择-->
								<view v-if="reservateType === '02' && this.selectCourseInfoList.length > 0" style="height: auto;margin-bottom: 2%;">
									<block v-for="(item ,index1) in selectCourseInfoList" :key="index1">
										<view class="courseClass">
											<!-- 套餐下拉框 -->
											<view class="uni-list-cell-dbTwo courseListClass disabled">
												<picker :range="courseList" :value="indexMeal" range-key="courseName" style="height: 100%;font-size: 1.5vw;" disabled="true">
													<view v-if="item.courseIndex !== '00'" style="line-height: 4vw;">{{courseList[item.courseIndex].courseName}}</view>
												</picker>
											</view>
											<!-- 套餐数量按钮 -->
											<view class="jiaJianNumberClass" style="width: 10%;">
												<view class="numberClass">{{item.courseNumber}}</view>
											</view>
										</view>
									</block>
								</view>
								<!-- 自助 -->
								<view class="firstLine" style="margin-top: 1%;height: 4vw;margin-bottom: 2%;">
									<!-- 自助 - 多语言 - -->
									<view class="lableClass" style="font-weight: normal;margin-left: 1%;">{{i18n.buffet}}</view>
									<!-- 自助追加 - 按钮 不可选-->
									<!--<view class="addButton" style="background-color: #adadad;">-->
										<!-- 追加 - 多语言 - -->
									<!--	<view class="overLong">{{i18n.add}}</view>-->
									<!--</view>-->
								</view>
								<!-- 自助选择-->
								<view v-if="reservateType === '02' && this.selectBuffetInfoList.length > 0" style="height: auto;margin-bottom: 3%;">
									<block v-for="(item ,index1) in selectBuffetInfoList" :key="index1">
										<view class="courseClass">
											<!-- 自助下拉框 -->
											<view class="uni-list-cell-dbTwo courseListClass disabled">
												<picker :range="buffetList" :value="indexBuffet" range-key="buffetName" style="height: 100%;font-size: 1.5vw;" disabled="true">
													<view v-if="item.buffetIndex !== '00'" style="line-height: 4vw;">{{buffetList[item.buffetIndex].buffetName}}</view>
												</picker>
											</view>
											<!-- 自助数量按钮 -->
											<view class="jiaJianNumberClass" style="width: 10%;">
												<view class="numberClass">{{item.buffetNumber}}</view>
											</view>
										</view>
									</block>
								</view>
							</view>
						</view>
						<view class="borderClass" style="height: 65%;margin-top: 1%;">
							<view style="margin: 0% 2% 0% 2%;height: 100%;">
								<view style="width: 100%;height: 5%;"></view>
								<!-- 自助 - 桌位指定 - -->
								<view class="lableClass" style="width: 100%;height: 10%;">{{i18n.tableType}}</view>
								<!-- 桌位指定 -->
								<view class="firstLine" style="margin: 0%;height: 10%;">
									<view class="tableColorInfoListClass">
										<!-- 桌台颜色示意图列表 -->
										<block v-for="(item ,index) in tableTypeList" :key="index">
											<!-- <view class="tableColorInfoClass"> -->
											<view class="tableColorInfoClassOne">
												<view class="tableColorInfoClassOneText" :style="{'background-color':item.tableColor}"></view>
											</view>
											<view class="tableColorInfoClass">{{item.tableTypeName}}</view>
											<!-- </view> -->
										</block>
									</view>
								</view>
								<view style="width: 100%;height: 7%;"></view>
								<!-- 桌子列表 -->
								<view class="tableInfos">
									<block v-for="(item ,index) in tableList" :key="index">
										<!-- 桌子不可选 -->
										<view v-if="tableChoosenFlagList[index] === '0' && item.useFlag === '2' && areaId === item.areaId" class="tableClass"
										 style="background-color: grey;">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
										<!-- 桌子可选 -->
										<view v-if="tableChoosenFlagList[index] === '0' && item.useFlag === '1' && areaId === item.areaId" class="tableClass"
										 :style="{'background-color':item.tableColor}">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
										<view v-if="tableChoosenFlagList[index] === '1' && areaId === item.areaId" class="tableClass" :style="{'background-color': '#191970'}">
											<view class="overLong">{{item.tableName}}({{item.tableSeatCount}})</view>
										</view>
									</block>
								</view>
								<view style="width: 100%;height: 3%;"></view>
								<!-- 楼层列表 -->
								<view class="tableInfosBottom">
									<scroll-view class="tableInfosScroll" scroll-x="true" @scroll="scroll">
										<view class="areaList" :style="{width:listWidth+'vw'}">
											<block v-for="(item, index) in areaList" :key="index">
												<!-- 选中的楼层区域 -->
												<view v-if="areaId === item.areaId" class="bottomTabOther" @click="selectArea(index)">
													<view class="bottomTabFront overLong">{{item.areaName}}</view>
												</view>
												<!-- 未选择中的楼层区域 -->
												<view v-else class="bottomTab" @click="selectArea(index)">
													<view class="bottomTabFront overLong">{{item.areaName}}</view>
												</view>
											</block>
										</view>
									</scroll-view>
								</view>
								<view style="width: 100%;height: 3%;"></view>
								<!-- 已被选择的席位 -->
								<view v-if="areaSelect.length > 0" class="tableSelected">{{i18n.chooseTable}}
									<block v-for="(item, index) in areaSelect" :key="index">
										<a>{{item.areaName}}:</a>
										<block v-for="(item1, index1) in tableList" :key="index1">
											<a v-if="tableChoosenFlagList[index1] === '1' && item1.areaName === item.areaName && lastTableId !== item1.tableId">{{tableList[index1].tableName}},</a>
											<a v-if="tableChoosenFlagList[index1] === '1' && item1.areaName === item.areaName && lastTableId === item1.tableId">{{tableList[index1].tableName}}</a>
										</block>
									</block>
								</view>
								<view style="width: 100%;height: 5%;"></view>
							</view>
						</view>
						<view class="borderClass" style="height: 25%;margin-top: 1%;">
							<view style="margin: 1% 2% 2% 2%;height: 90%;">
								<!-- 要求 -->
								<view class="lableClass">{{i18n.request}}</view>
								<view style="height: 60%;display: flex;margin: 1%;">
									<view style="width: 100%;height: 100%;border: 1px solid #dedede;font-size: 1.5vw;background-color: #adadad;">
										<textarea maxlength="200" style="width: 100%;height: 100%;font-size: 1.5vw;" v-model="comment" disabled/>
										</view>
								</view>
							</view>
						</view>
						<!-- 底部按钮 -->
						<view style="height: 11%;display: flex;font-size: 1.5vw;margin-top: 3%;">
							<!-- 确定按钮 -->
							<view class="buttonClass" style="margin: 0 auto;" @click="checkDetailDataButton"><view class="overLong">{{i18n.cancell}}</view></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/http.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
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
				page: 1,
				// 可分页数
				pages: 1,
				date: currentDate,
				// 开始时间
				orderStartDate: currentDate,
				// 结束时间
				orderEndDate: currentDate,
				// 订单数据
				reservateList: [],
				// 呼叫数据
				callList: [],
				// 分页后的数据
				pageList: [],
				showalert: false,
				// 弹框提示信息
				tipMessage: '',
				receivablesId: '',
				// 0 未设定 1 取消操作时设置为1 用于弹窗判断  2 无取消选项
				modifySuccess: 0,
				parms: '',
				// 图标路径
				leftTop: '../../static/leftTop.png',
				leftBell: '../../static/leftBell.png',
				pepolepic: '../../static/10-17ai-34.png',
				currentTabIndex: 0,
				// 状态
				eatMayArray: [],
				// 选中的状态
				selectEatMay: '',
				// 到店时间
				startTime: '',
				// 截止时间
				endTime: '',
				// 顾客名称
				name: '',
				// 电话号码
				phoneNumber: '',
				current: '',
				// checkbox初始值
				checkList: [],
				// 弹窗图片flag
				cancleConfirmFlag: 0,
				// 下拉开始时间选择
				userTimeStart: '',
				// 下拉结束时间选择
				userTimeEnd: '',
				// 下拉开始时间选择
				userTimeStartTwo: '',
				// 下拉结束时间选择
				userTimeEndTwo: '',
				// 隐藏新增和编辑画面
				showCreatndUpdate: false,
				// 下拉位数为0
				index: 1,
				// 屏幕高度
				windowHeight: 0,
				// 来店時間-开始时间
				reservateTimeTwo: '',
				// 区分，默认选中仅座位01, 01：席のみ、02：コース・放題＋席
				reservateType: '01',
				// 套餐下拉列表
				courseList: [],
				// 选择的套餐信息列表
				selectCourseInfoList: [],
				// 选中的套餐列表
				selectCourseList: [],
				// 选择的自助信息列表
				selectBuffetInfoList: [],
				// 选中的自助列表
				selectBuffetList: [],
				// 选择的套餐数量
				selectedCourseNumber: 1,
				// 选择的自助数量
				selectedBuffetNumber: 1,
				// 自助下拉列表
				buffetList: [],
				// 桌台颜色示意图列表
				tableTypeList: [],
				// 桌子列表
				tableList:[],
				// 选择的套餐
				courseSelected: '',
				// 选择的自助
				buffetSelected: '',
				// 记录时长的序号
				indexTwo: 0,
				// 套餐数量
				courseNumber: '0',
				// 自助数量
				buffetNumber: '0',
				// 当前编辑的套餐序号
				currentCourse: '',
				// 当前编辑的自助序号
				currentBuffet: '',
				// 予約ID
				reservateId: null,
				// 姓名
				customerName: '',
				// 时长，默认2小时
				useTime: '2',
				useTimeWenZi: '',
				// 时长列表
				useTimeList: ['0.5','1.0','1.5','2.0','2.5','3.0'],
				useTimeListWenZi: [],
				// 电话号
				telNumber: '',
				// 顾客人数
				customerCount: null,
				// 要求
				comment: '',
				// 选中的桌子列表
				selectTableList: [],
				// 用来记录桌子选中状态的列表
				tableChoosenFlagList: [],
				areaList: [],
				// 选中的区域Id
				areaId: 0,
				// 显示的就餐区域总宽度
				listWidth: '',
				// 被选中区域的列表
				areaSelect: [],
				// 弹框提示信息
				tipMessageTwo: '',
				// 是否显示提示框 false不显示 true显示
				showalertTwo: false,
				cancleFlag: '',
				// 显示警告图片0,显示确认图片1
				cancleConfirmFlagTwo: '',
				// 获取最后一个被选中区域的最后一个被选中的桌子的id 
				lastTableId: '',
				// 来店时间选择时间范围
				userTimeStart: '',
				userTimeEnd: '',
				// 状态list
				statusList: [],
				// 记录套餐的序号
				indexMeal: 0,
				// 记录自助的序号
				indexBuffet: 0,
				// 就餐人数确认
				isCrmCustomerCount: false,
				// 详细
				showDetail: false
			}
		},
		onLoad: function(option) {
			this.getTimeRange();
			// 计算页面尺寸
			const that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
				}
			})
			// 定义状态
			this.eatMayArray = [{
					id: '',
					text: '',
				},
				{
					id: '01',
					text: this.i18n.appointment,
				},
				{
					id: '02',
					text: this.i18n.processing,
				},
				{
					id: '03',
					text: this.i18n.appointmentCancell,
				}
			]
			// 开始时间
			// this.startTime = this.getDate({
			// 	format: true
			// });
			this.startTime = '';
			// 结束时间
			this.endTime = '';
			this.useTimeListWenZi = [this.i18n.zeroFiveHour,this.i18n.oneHour,this.i18n.oneFiveHour,this.i18n.twoHour,this.i18n.twoFiveHour,this.i18n.threeHour];
			// 选择的状态赋值给selectEatMay
			this.selectEatMay = this.eatMayArray[this.index].id;
			// 获取预约数据
			this.loadOrderData();
		},
		methods: {
			getTimeRange: function() {
				// 获取当前日期
				var date = new Date();
				// 开始年份-20
				var startYear = date.getFullYear() - 20;
				// 结束年份+20
				var endYear = date.getFullYear() + 20;
				// 下拉开始时间
				this.userTimeStart = startYear + '-01-01 00:00';
				// 下拉结束时间
				this.userTimeEnd = endYear + '-12-31 23:59';
				// 下拉开始时间
				this.userTimeStartTwo = startYear + '-01-01 00:00';
				// 下拉结束时间
				this.userTimeEndTwo = endYear + '-12-31 23:59';
			},
			// 滚动触发
			scroll: function(e) {},
			// 获取选择的到店开始时间
			getData: function(e) {
				// 选中的时间赋值给startTime
				this.startTime = e.result;
			},
			// 获取选择的到店结束时间
			getEndtime: function(e) {
				// 选中的时间赋值给endTime
				this.endTime = e.result;
			},
			// checkbox选择
			checkboxChange: function(index, id) {
				// 如果选中项的check属性是false
				if (this.pageList[index].checked === false) {
					//更改checked属性为true
					this.pageList[index].checked = true;
					const checkReservateId = {
						reservateId: id
					}
					//预约id放入list集合保存
					this.checkList.push(checkReservateId);
					// 对应的状态放入状态list
					this.statusList.push(this.pageList[index].status);
					// 如果选中项的check属性是true	
				} else if (this.pageList[index].checked === true) {
					// 更改checked属性为false
					this.pageList[index].checked = false;
					for (var i = 0; i < this.checkList.length; i++) {
						// 获取list里对象项的位置
						if (this.checkList[i].reservateId === this.pageList[index].reservateId) {
							// 移除对应项
							this.checkList.splice(i, 1);
							this.statusList.splice(i, 1);
							break;
						}
					}
				}
			},
			// 新增,修改页面check后在进入页面
			change: function(e) {
				// 2 为修改
				if (e === 2) {
					// 是否未选择checkbox或者多选了
					if (this.checkList.length === 0) {
						// 是否显示取消按钮的flag
						this.modifySuccess = 2;
						// 是否显示对号图片的flag
						this.cancleConfirmFlag = 0;
						// 调用窗口
						this.showalert = true;
						this.tipMessage = this.i18n.oneOrMoreMessageCanChange;
					} else if (this.checkList.length > 1) {
						// 是否显示取消按钮的flag
						this.modifySuccess = 2;
						// 是否显示对号图片的flag
						this.cancleConfirmFlag = 0;
						// 调用窗口
						this.showalert = true;
						this.tipMessage = this.i18n.onlyOneMessageCanChange;
					} else {
						// 取出状态LIST里的值做判断
						for (var i = 0, lenI = this.statusList.length; i < lenI; ++i) {
							// list里的状态ID是否等于01
							if (this.statusList[i] === '01') {
								// 新增和编辑画面显示
								this.showCreatndUpdate = true;
								// 加载新增和编辑画面数据
								// 新建编辑加载所有信息
								this.reservateId = Number(this.checkList[0].reservateId);
								this.loadAllData();
								// 恢复数据
								this.cancleConfirmFlag = 0;
								break;
							} else {
								// 是否显示取消按钮的flag
								this.modifySuccess = 2;
								// 是否显示对号图片的flag
								this.cancleConfirmFlag = 0;
								// 调用窗口
								this.showalert = true;
								this.tipMessage = this.i18n.cantChange;
								break;
							}

						}
					}
					// 1 为新建
				} else {
					const item = {};
					// 新增和编辑画面显示
					this.showCreatndUpdate = true;
					// 加载新增和编辑画面数据
					this.loadAllData();
					// 恢复数据
					this.checkList = [];
					this.statusList = [];
					this.cancleConfirmFlag = 0;
					this.loadOrderData();
				}
			},
			// 取消，来店按钮方法
			changeState: function(e) {
				// 判断是否执行操作的flag
				var flag = true;
				// 1为取消
				if (e === 1) {
					// 判断是否未选择checkbox
					if (this.checkList.length === 0) {
						// 是否显示取消按钮的flag
						this.modifySuccess = 2;
						// 是否显示对号图片的flag
						this.cancleConfirmFlag = 0;
						// 调用窗口
						this.showalert = true;
						this.tipMessage = this.i18n.oneOrMoreMessageCanChange;
					} else {
						for (var i = 0, lenI = this.statusList.length; i < lenI; ++i) {
							// 状态集循环判断是否等于01
							if (this.statusList[i] !== '01') {
								// 如果选择的数据是一条
								if (this.checkList.length === 1) {
									// 调用窗口并给flag赋值
									this.modifySuccess = 2;
									this.cancleConfirmFlag = 0;
									this.showalert = true;
									this.tipMessage = this.i18n.cantCancel;
									flag = false;
									break;
									// 如果选择的数据是一条以上
								} else if (this.checkList.length > 1) {
									// 调用窗口并给flag赋值
									this.modifySuccess = 2;
									this.cancleConfirmFlag = 0;
									this.showalert = true;
									this.tipMessage = this.i18n.cantCancelAll;
									flag = false;
									break;
								}
							}

						}
						// 如果为true 弹出弹窗询问是否操作
						if (flag) {
							// 调用窗口 并赋值flag
							this.modifySuccess = 1;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.processTheSelectedData;
						}
					}
				} else {
					// 来店
					// 判断是否未选择checkbox 或者多选
					if (this.checkList.length === 0) {
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.oneOrMoreMessageCanChange;
					} else if (this.checkList.length > 1) {
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.onlyOneMessageCanChange;
					} else {
						// 判断对应数据的状态
						for (var i = 0, lenI = this.statusList.length; i < lenI; ++i) {
							if (this.statusList[i] !== '01') {
								// 调用窗口并给flag赋值
								this.modifySuccess = 2;
								this.cancleConfirmFlag = 0;
								this.showalert = true;
								this.tipMessage = this.i18n.cantComeToRestival;
								flag = false;
								break;
							}
						}
						// 如果为true 弹出弹窗询问是否操作
						if (flag) {
							// 调用窗口并给flag赋值
							this.modifySuccess = 3;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.processedTheSelectedData;
						}
					}
				}
			},
			// 取消操作
			cancelOperation: function() {
				const data = {
					storeId: getApp().globalData.storeId,
					reservateIdList: this.checkList
				};
				http.post('api/stpd/cancelReservate', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收数据
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 1;
							this.showalert = true;
							this.tipMessage = this.i18n.cancleSuccess;
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});

			},
			// 到店操作
			toShopOperation: function(flag) {
				// 选中项的预约id 赋值给a
				var a = this.checkList[0].reservateId;
				const data = {
					storeId: getApp().globalData.storeId,
					reservateId: a
				};
				http.post('api/stpd/finishReservate', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							this.showalert = false;
							// 恢复数据
							this.checkList = [];
							this.statusList = [];
							this.cancleConfirmFlag = 0;
							this.loadOrderData();
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});

			},
			// 读取一览数据
			loadOrderData: function() {
				// 参数
				const data = {
					storeId: getApp().globalData.storeId,
					customerName: this.name,
					telNumber: this.phoneNumber,
					reservateTimeFrom: this.startTime === '' ? '' : this.startTime + ':00',
					reservateTimeTo: this.endTime === '' ? '' : this.endTime + ':59',
					status: this.selectEatMay,
					page: this.page - 1,
					pageCount: this.itemsPerPage
				};
				http.post('api/stpd/getReservateList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 接收数据
							this.reservateList = result.data.reservateList;
							// 可分页数
							this.pages = Math.ceil(result.data.reservateCount / this.itemsPerPage);
							// 清空一览数据
							this.pageList = [];
							// 判断是否含有已选项（不为0代表已选，其他为未选）
							if (this.checkList.length !== 0) {
								for (let x = 0; x < this.reservateList.length; x++) {
									// 用来判断是否一览数据中是否含有已选数据（0：不含有  1：含有）
									let bb = 0;
									for (let y = 0; y < this.checkList.length; y++) {
										// 判断ID是否相同
										if (this.checkList[y].reservateId === this.reservateList[x].reservateId) {
											// 更新数据
											bb = 1;
											// 重新整理数据
											const newDate = {
												checked: true,
												comment: this.reservateList[x].comment,
												courseBuffet: this.reservateList[x].courseBuffet,
												customerCount: this.reservateList[x].customerCount,
												customerName: this.reservateList[x].customerName,
												reservateId: this.reservateList[x].reservateId,
												reservateTime: this.reservateList[x].reservateTime,
												state: this.reservateList[x].state,
												status: this.reservateList[x].status,
												telNumber: this.reservateList[x].telNumber,
												tableName: this.reservateList[x].tableName
											}
											// 将数据 放入一览数组
											this.pageList.push(newDate)
										}
									}
									// 用来判断是否一览数据中是否含有已选数据（0：不含有  1：含有）
									if (bb === 0) {
										// 重新整理数据
										const newDate = {
											checked: false,
											comment: this.reservateList[x].comment,
											courseBuffet: this.reservateList[x].courseBuffet,
											customerCount: this.reservateList[x].customerCount,
											customerName: this.reservateList[x].customerName,
											reservateId: this.reservateList[x].reservateId,
											reservateTime: this.reservateList[x].reservateTime,
											state: this.reservateList[x].state,
											status: this.reservateList[x].status,
											telNumber: this.reservateList[x].telNumber,
											tableName: this.reservateList[x].tableName
										}
										// 将数据 放入一览数组
										this.pageList.push(newDate)
									}
								}
							} else {
								// 重新整理数据
								for (let x = 0; x < this.reservateList.length; x++) {
									// 默认给所有数据重新给个为选中状态
									const newDate = {
										checked: false,
										comment: this.reservateList[x].comment,
										courseBuffet: this.reservateList[x].courseBuffet,
										customerCount: this.reservateList[x].customerCount,
										customerName: this.reservateList[x].customerName,
										reservateId: this.reservateList[x].reservateId,
										reservateTime: this.reservateList[x].reservateTime,
										state: this.reservateList[x].state,
										status: this.reservateList[x].status,
										telNumber: this.reservateList[x].telNumber,
										tableName: this.reservateList[x].tableName
									}
									// 将数据 放入一览数组
									this.pageList.push(newDate)
								}
							}
						} else if (result.data.resultCode === '9001') {
							// 参数校验失败
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.parameterVerificationFailed;
						} else {
							// 系统未知错误
							// 调用窗口并给flag赋值
							this.modifySuccess = 2;
							this.cancleConfirmFlag = 0;
							this.showalert = true;
							this.tipMessage = this.i18n.systemUnknownError;
						}
					}).catch(err => {
						// 网络异常，请求失败
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.networkExceptionRequestFailed;
					});

			},
			// 查询数据
			searchData: function() {
				// 如果endtime为空则直接加载数据
				if (this.endTime === ("")) {
					this.page = 1;
					// 恢复数据
					this.checkList = [];
					this.statusList = [];
					this.cancleConfirmFlag = 0;

					this.loadOrderData();
				} else {
					//starttime大于 endtime则弹报错框
					if (this.startTime > this.endTime) {
						// 调用窗口并给flag赋值
						this.modifySuccess = 2;
						this.cancleConfirmFlag = 0;
						this.showalert = true;
						this.tipMessage = this.i18n.startTimeCannotGreaterThanEndTime;
					} else {
						this.page = 1;
						// 恢复数据
						this.checkList = [];
						this.statusList = [];
						this.cancleConfirmFlag = 0;
						this.loadOrderData();
					}
				}
			},
			// 首页
			firstPage: function() {
				this.page = 1;
				this.loadOrderData();
			},
			// 前一页
			prevPage: function() {
				this.page = this.page - 1;
				this.loadOrderData();
			},
			// 下一页
			nextPage: function() {
				this.page = this.page + 1;
				this.loadOrderData();
			},
			// 尾页
			lastPage: function() {
				this.page = this.pages;
				this.loadOrderData();
			},
			// 确认按钮
			confirmButton: function() {
				// 符合条件 走取消操作
				if (this.cancleConfirmFlag === 0 && this.modifySuccess === 1) {
					this.cancelOperation();
					// 符合条件 走到店操作
				} else if (this.cancleConfirmFlag === 0 && this.modifySuccess === 3) {
					this.toShopOperation();
					//都不符合 重置页面
				} else {
					this.showalert = false;
					// 恢复数据
					this.checkList = [];
					this.statusList = [];
					this.cancleConfirmFlag = 0;
					this.loadOrderData();
				}
			},
			// 取消按钮
			cancelButton: function() {
				this.showalert = false;
			},
			getDate(type) {
				// 获取当前时间
				const date = new Date();
				//年
				let year = date.getFullYear();
				// 月
				let month = date.getMonth() + 1;
				// 日
				let day = date.getDate();
				// 时
				let hour = date.getHours();
				// 分
				let minutes = date.getMinutes();
				// 如果月份小于9则在前面加个0
				month = month > 9 ? month : '0' + month;
				// 如果日期小于9则在前面加个0
				day = day > 9 ? day : '0' + day;
				// 如果小时小于9则在前面加个0
				hour = hour > 9 ? hour : '0' + hour;
				// 如果分钟小于9则在前面加个0
				minutes = minutes > 9 ? minutes : '0' + minutes;
				// 返回拼接后的时间
				return `${year}-${month}-${day} ${hour}:${minutes}`;
			},
			// 点击返回按钮
			returnHomePage: function() {
				uni.reLaunch({
					url: '/pages/homePage/homePage'
				});
			},
			//下拉框
			bindPickerChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.index = e.detail.value;
				// 选择的状态赋值给selectEatMay
				this.selectEatMay = this.eatMayArray[this.index].id;
			},
			// 加载所有信息
			loadAllData:function(){
				// 数据信息
				const data = {
					// 门店id
					storeId: getApp().globalData.storeId,
					// 予約ID
					reservateId: this.reservateId,
					// 语言
					languages: this._i18n.locale
				};
				// 加载所有信息
				http.post('api/stpd/getReservate', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							// 来店时间
							if(result.data.reservateTime !== '' && result.data.reservateTime !== null && result.data.reservateTime !== undefined) {
								this.reservateTimeTwo = result.data.reservateTime;
								this.reservateTimeTwo = this.reservateTimeTwo.substring(0,16);
							}
							// 时长
							if(result.data.useTime !== '' && result.data.useTime !== null && result.data.useTime !== undefined) {
								this.useTime = result.data.useTime;
							}
							// 姓名
							this.customerName = result.data.customerName;
							// 电话号码
							this.telNumber = result.data.telNumber;
							// 人数
							if(result.data.customerCount !== '' && result.data.customerCount !== null && result.data.customerCount !== undefined) {
								this.customerCount = result.data.customerCount;
							}
							// 预约区分
							if(result.data.reservateType !== '' && result.data.reservateType !== null && result.data.reservateType !== undefined) {
								this.reservateType = result.data.reservateType;
							}
							// 要求
							this.comment = result.data.comment;
							// 选中的套餐
							if (result.data.selectCourseList !== null && result.data.selectCourseList !== undefined && 0 < result.data.selectCourseList.length) {
								this.selectCourseList = result.data.selectCourseList;
							}
							// 选中的自助
							if (result.data.selectBuffetList !== null && result.data.selectBuffetList !== undefined && 0 < result.data.selectBuffetList.length) {
								this.selectBuffetList = result.data.selectBuffetList;
							}
							// 选中的桌子
							if (result.data.selectTableList !== null && result.data.selectTableList !== undefined && 0 < result.data.selectTableList.length) {
								this.selectTableList = result.data.selectTableList;
							}
							// 桌子列表
							this.tableList = result.data.tableList;
							// 套餐列表
							this.courseList = result.data.courseList;
							// 自助列表
							this.buffetList = result.data.buffetList;
							// 桌子类型列表
							this.tableTypeList = result.data.tableTypeList;
							// 区域列表
							this.areaList = result.data.areaList;
							// 计算显示就餐区域部分的横向宽度
							this.listWidth = 12.5 * this.areaList.length;
							// 时长 useTimeWenZi没单位，useTimeListWenZi有单位
							for(let i = 0; i < this.useTimeList.length; i++){
								if(this.useTimeList[i] === this.useTime) {
									this.useTimeWenZi = this.useTimeListWenZi[i];
								}
							}
							// 默认选中第一个区域
							if (this.areaList.length > 0) {
								// 获取第一个区域areaId
								this.areaId = this.areaList[0].areaId;
							}
							// 获取用来记录桌子选中状态的列表 tableChoosenFlagList
							for (let i = 0; i < this.tableList.length; i++) {
								// 0为未选中,1为选中
								var chooseFlag = '0';
								for (let j = 0; j < this.selectTableList.length; j++){
									if(this.selectTableList[j].tableId === this.tableList[i].tableId){
										chooseFlag = '1';
									}
								}
								this.tableChoosenFlagList.push(chooseFlag);
							}
							// 用来记录有选中桌子的区域信息 areaSelect
							this.areaSelect = [];
							for(let i = 0; i < this.areaList.length; i++) {
								for(let j = 0; j < this.tableList.length; j++) {
									if(this.tableChoosenFlagList[j] === '1' && this.areaList[i].areaName === this.tableList[j].areaName) {
										this.areaSelect.push({areaId: this.areaList[i].areaId,areaName: this.areaList[i].areaName});
										break;
									}
								}
							}
							// 获取最后一个被选中区域的最后一个被选中的桌子的id lastTableId
							if(this.areaSelect.length > 0) {
								for(let i = 0; i < this.tableList.length; i++) {
									if(this.tableList[i].areaName === this.areaSelect[this.areaSelect.length-1].areaName && this.tableChoosenFlagList[i] === '1'){
										this.lastTableId = this.tableList[i].tableId;
									}
								}
							}
							// 获取选择的套餐信息列表，列表的id，套餐个数，套餐ID，套餐对应在套餐列表中的序号
							for (let j = 0; j < this.courseList.length; j++) {
								for (let i = 0; i < this.selectCourseList.length; i++) {
									if (this.courseList[j].courseId === this.selectCourseList[i].courseId) {
										this.selectCourseInfoList.push({id: this.selectedCourseNumber.toString(),courseNumber: this.selectCourseList[i].courseCount,courseId: this.selectCourseList[i].courseId,courseIndex: j.toString()});
										this.selectedCourseNumber = this.selectedCourseNumber + 1;
									}
								}
							}
							
							// 获取选择的自助信息列表，列表的id，自助个数，自助ID，自助对应在自助列表中的序号
							for (let j = 0; j < this.buffetList.length; j++) {
								for (let i = 0; i < this.selectBuffetList.length; i++) {
									if (this.buffetList[j].buffetId === this.selectBuffetList[i].buffetId) {
										this.selectBuffetInfoList.push({id: this.selectedBuffetNumber.toString(),buffetNumber: this.selectBuffetList[i].buffetCount,buffetId: this.selectBuffetList[i].buffetId,buffetIndex: j.toString()});
										this.selectedBuffetNumber = this.selectedBuffetNumber + 1;
									}
								}
							}
						} else if(result.data.resultCode === '9001'){
							// 参数校验失败
							this.tipShow(this.i18n.parameterVerificationFailed,true,0,0);
						} else {
							// 系统未知错误
							this.tipShow(this.i18n.systemUnknownError,true,0,0);
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.tipShow(this.i18n.networkExceptionRequestFailed,true,0,0);
					});
			},
			// 预约区分选择
			radioChange: function(evt) {
				this.reservateType = evt.target.value.toString();
				// 选中仅座位时
				if(this.reservateType === '01') {
					// 清空套餐和自助区域
					this.selectCourseList = [];
					this.selectCourseInfoList = [];
					this.selectedCourseNumber = 1;
					this.selectBuffetList = [];
					this.selectBuffetInfoList = [];
					this.selectedBuffetNumber = 1;
				}
			},
			// 追加套餐
			addCourse:function() {
				this.selectCourseInfoList.push({id: this.selectedCourseNumber.toString(),courseNumber: 1,courseId: this.courseList[0].courseId,courseIndex: '0'});
				this.selectedCourseNumber = this.selectedCourseNumber + 1;
			},
			// 追加自助
			addBuffet:function() {
				this.selectBuffetInfoList.push({id: this.selectedBuffetNumber.toString(),buffetNumber: 1,buffetId: this.buffetList[0].buffetId,buffetIndex: '0'});
				this.selectedBuffetNumber = this.selectedBuffetNumber + 1;
			},
			// 空席确认
			emptyTableConfirm:function() {
				// 数据信息
				const data = {
					// 门店id
					storeId: getApp().globalData.storeId,
					reservateTime: this.reservateTimeTwo,
					useTime: this.useTime
				};
				// 加载桌子信息
				http.post('api/stpd/getAllTableList', data)
					.then(result => {
						if (result.data.resultCode === '0000') {
							//this.selectTableList = [];
							this.comment = '';
							this.tableChoosenFlagList = [];
							this.tableList = result.data.tableList;
							this.tableChoosenFlagList = [];
							// 获取用来记录桌子选中状态的列表 tableChoosenFlagList
							for (let i = 0; i < this.tableList.length; i++) {
								// 0为未选中,1为选中
								var chooseFlag = '0';
								for (let j = 0; j < this.selectTableList.length; j++){
									if(this.selectTableList[j].tableId === this.tableList[i].tableId){
										chooseFlag = '2';
									}
								}
								this.tableChoosenFlagList.push(chooseFlag);
							}
							// 默认选中第一个区域
							if (this.areaList.length > 0) {
								// 获取第一个区域areaId
								this.areaId = this.areaList[0].areaId;
							}
							this.areaSelect = [];
						} else if(result.data.resultCode === '9001'){
							// 参数校验失败
							this.tipShow(this.i18n.parameterVerificationFailed,true,0,0);
						} else {
							// 系统未知错误
							this.tipShow(this.i18n.systemUnknownError,true,0,0);
						}
					}).catch(() => {
						// 网络异常，请求失败
						this.tipShow(this.i18n.networkExceptionRequestFailed,true,0,0);
					});
			},
			// 删除套餐
			deleteCourse:function(e) {
				this.selectCourseInfoList.splice(e,1);
			},
			// 当前编辑的套餐序号
			currentCourseButton:function(e) {
				this.currentCourse = e;
			},
			// 当前编辑的自助序号
			currentBuffetButton:function(e) {
				this.currentBuffet = e;
			},
			// 删除自助
			deleteBuffet:function(e) {
				this.selectBuffetInfoList.splice(e,1);
			},
			// 套餐下拉框
			courseListChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.indexMeal = e.detail.value;
				// 选择的套餐
				this.courseSelected = this.courseList[this.indexMeal].courseId;
				this.selectCourseInfoList[this.currentCourse].courseId = this.courseSelected;
				this.selectCourseInfoList[this.currentCourse].courseIndex = this.indexMeal;
			},
			// 时长下拉框
			useTimeChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.indexTwo = e.detail.value;
				// 选择的套餐
				this.useTime = this.useTimeList[this.indexTwo];
				this.useTimeWenZi = this.useTimeListWenZi[this.indexTwo];
			},
			// 自助下拉框
			buffetListChange: function(e) {
				//将数组改变索引赋给定义的index变量
				this.indexBuffet = e.detail.value;
				// 选择的自助
				this.buffetSelected = this.buffetList[this.indexBuffet].buffetId;
				this.selectBuffetInfoList[this.currentBuffet].buffetId = this.buffetSelected;
				this.selectBuffetInfoList[this.currentBuffet].buffetIndex = this.indexBuffet;
			},
			// 减少套餐数量
			jianCourseNumber: function(e) {
				if (this.selectCourseInfoList[e].courseNumber !== 1 && this.selectCourseInfoList[e].courseNumber !== '1') {
					// 套餐数量不为1时,将套餐数量减1
					this.selectCourseInfoList[e].courseNumber = (Number(this.selectCourseInfoList[e].courseNumber) - 1).toString();
				}
			},
			// 增加套餐数量
			jiaCourseNumber: function(e) {
				this.selectCourseInfoList[e].courseNumber = (Number(this.selectCourseInfoList[e].courseNumber) + 1).toString();
			},
			// 减少自助数量
			jianBuffetNumber: function(e) {
				if (this.selectBuffetInfoList[e].buffetNumber !== 1 && this.selectBuffetInfoList[e].buffetNumber !== '1') {
					// 自助数量不为1时,将自助数量减1
					this.selectBuffetInfoList[e].buffetNumber = (Number(this.selectBuffetInfoList[e].buffetNumber) - 1).toString();
				}
			},
			// 增加自助数量
			jiaBuffetNumber: function(e) {
				this.selectBuffetInfoList[e].buffetNumber = (Number(this.selectBuffetInfoList[e].buffetNumber) + 1).toString();
			},
			reservateTimeChange(e) {
				this.reservateTimeTwo = e.result;
			},
			// 切换位置
			selectArea: function(e) {
				this.areaId = this.areaList[e].areaId;
				// 用来记录有选中桌子的区域信息areaSelect
				this.areaSelect = [];
				for(let i = 0; i < this.areaList.length; i++) {
					for(let j = 0; j < this.tableList.length; j++) {
						if(this.tableChoosenFlagList[j] === '1' && this.areaList[i].areaName === this.tableList[j].areaName) {
							this.areaSelect.push({areaId: this.areaList[i].areaId,areaName: this.areaList[i].areaName});
							break;
						}
					}
				}
			},
			// 选择桌子
			selectTable: function(e) {
				// item.tableSeatCount
				if(this.tableList[e].useFlag === '2' && this.tableChoosenFlagList[e] !== '1' && this.tableChoosenFlagList[e] !== '2') {
					// 该桌子已被占用
					this.tipShow(this.i18n.tableUsed,true,0,0);
				} else if(this.customerCount === null || this.customerCount === 0 || this.customerCount === '' || this.customerCount === '0') {
					// 请先填写顾客人数
					this.tipShow(this.i18n.enterNumFirst,true,0,0);
				} else if(this.tableChoosenFlagList[e] === '1') {
					this.tableChoosenFlagList[e] = '0';
					this.tableList[e].useFlag = '1'
				} else {
					this.tableChoosenFlagList[e] = '1';
				}
				// 用来记录有选中桌子的区域信息areaSelect
				this.areaSelect = [];
				for(let i = 0; i < this.areaList.length; i++) {
					for(let j = 0; j < this.tableList.length; j++) {
						if(this.tableChoosenFlagList[j] === '1' && this.areaList[i].areaName === this.tableList[j].areaName) {
							this.areaSelect.push({areaId: this.areaList[i].areaId,areaName: this.areaList[i].areaName});
							break;
						}
					}
				}
				// 获取最后一个被选中区域的最后一个被选中的桌子的id lastTableId
				if(this.areaSelect.length > 0) {
					for(let i = 0; i < this.tableList.length; i++) {
						if(this.tableList[i].areaName === this.areaSelect[this.areaSelect.length-1].areaName && this.tableChoosenFlagList[i] === '1'){
							this.lastTableId = this.tableList[i].tableId;
						}
					}
				}
			},
			// 取消按钮
			createCancle: function() {
				// 新增和编辑画面隐藏
				this.showCreatndUpdate = false;
				// 清空数据
				this.selectTableList = [];
				this.comment = '';
				this.customerName = '';
				this.telNumber = '';
				this.customerCount = null;
				this.reservateTimeTwo = '';
				this.useTime = '2';
				this.reservateType = '01';
				this.tableChoosenFlagList = [];
				this.tableList = [];
				this.selectBuffetInfoList = [];
				this.selectBuffetList = [];
				this.selectedBuffetNumber = 1;
				this.selectCourseList = [];
				this.selectCourseInfoList = [];
				this.selectedCourseNumber = 1;
				this.reservateId = null;
				this.courseList = [];
				this.buffetList = [];
				this.cancleConfirmFlag = 0;
				this.isCrmCustomerCount = false;
			},
			// 确定按钮
			checkCreateDataButton: function(e) {
				this.selectTableList = [];
				this.isCrmCustomerCount = false;
				// 选中的桌子
				let selectCustomerCount = 0;
				for(let i = 0; i < this.tableList.length; i++) {
					if(this.tableChoosenFlagList[i] === '1') {
						this.selectTableList.push({tableId: this.tableList[i].tableId});
						selectCustomerCount = selectCustomerCount + this.tableList[i].tableSeatCount;
					}
				}
				if(this.customerName === '' || this.customerName === undefined || this.customerName === null) {
					// 请输入姓名
					this.tipShow(this.i18n.pleaseEnterName,true,0,0);
				} else if(this.telNumber === ''|| this.telNumber === undefined || this.telNumber === null) {
					// 请输入电话号码
					this.tipShow(this.i18n.pleaseEnterTelNum,true,0,0);
				} else if(this.customerCount === null || this.customerCount === 0 || this.customerCount === '' || this.customerCount === '0'|| this.customerCount === undefined || this.customerCount === null) {
					// 请输入顾客人数
					this.tipShow(this.i18n.pleaseEnterCusNum,true,0,0);
				} else if(this.reservateTimeTwo === null || this.reservateTimeTwo === ''|| this.reservateTimeTwo === undefined || this.reservateTimeTwo === null) {
					// 请输入来店时间
					this.tipShow(this.i18n.pleaseEnterReservateTime,true,0,0);
				} else if (this.reservateType === '02' && !this.selectCourseInfoList.length > 0 && !this.selectBuffetInfoList.length > 0) {
					// 请选择コース・放題
					this.tipShow(this.i18n.pleaseChooseCourseBuffet,true,0,0);
				} else if(this.selectTableList.length < 1) {
					// 请选择桌子
					this.tipShow(this.i18n.pleaseChooseTable,true,0,0);
				} else if(selectCustomerCount < Number(this.customerCount)) {
					// 就餐人数大于桌子最大座位数
					this.isCrmCustomerCount = true;
					this.tipShow(this.i18n.numberProblem,true,1,1);
				} else {
					this.createConfirmButton();
				}
			},
			// 确定按钮
			createConfirmButton: function(e) {
				this.selectCourseList = [];
				this.selectBuffetList = [];
				this.selectTableList = [];
				// 选中的套餐
				for(let i = 0; i < this.selectCourseInfoList.length; i++) {
					this.selectCourseList.push({courseId: Number(this.selectCourseInfoList[i].courseId),courseCount: Number(this.selectCourseInfoList[i].courseNumber)});
				}
				// 选中的自助
				for(let i = 0; i < this.selectBuffetInfoList.length; i++) {
					this.selectBuffetList.push({buffetId: Number(this.selectBuffetInfoList[i].buffetId),buffetCount: Number(this.selectBuffetInfoList[i].buffetNumber)});
				}
				// 选中的桌子
				for(let i = 0; i < this.tableList.length; i++) {
					if(this.tableChoosenFlagList[i] === '1') {
						this.selectTableList.push({tableId: this.tableList[i].tableId});
					}
				}
				if(this.customerName === '') {
					// 请输入姓名
					this.tipShow(this.i18n.pleaseEnterName,true,0,0);
				} else if(this.telNumber === '') {
					// 请输入电话号码
					this.tipShow(this.i18n.pleaseEnterTelNum,true,0,0);
				} else if(this.customerCount === null || this.customerCount === 0 || this.customerCount === '' || this.customerCount === '0') {
					// 请输入顾客人数
					this.tipShow(this.i18n.pleaseEnterCusNum,true,0,0);
				} else if(this.reservateTimeTwo === null || this.reservateTimeTwo === '') {
					// 请输入来店时间
					this.tipShow(this.i18n.pleaseEnterReservateTime,true,0,0);
				} else if(this.selectTableList.length < 1) {
					// 请选择桌子
					this.tipShow(this.i18n.pleaseChooseTable,true,0,0);
				} else {
					this.reservateTimeTwo = this.reservateTimeTwo + ':00';
					// 数据信息
					const data = {
						// 门店id
						storeId: getApp().globalData.storeId,
						reservateId: this.reservateId,
						reservateTime: this.reservateTimeTwo,
						useTime: this.useTime,
						customerName: this.customerName,
						telNumber: this.telNumber,
						customerCount: Number(this.customerCount),
						reservateType: this.reservateType,
						selectCourseList: this.selectCourseList,
						selectBuffetList: this.selectBuffetList,
						selectTableList: this.selectTableList,
						comment: this.comment
					};
					// 编辑和新增的确认
					http.post('api/stpd/registReservate', data)
						.then(result => {
							if (result.data.resultCode === '0000') {
								if(this.reservateId === null) {
									// 新建成功
									this.tipShow(this.i18n.createSuccess,true,0,1);
								} else {
									// 修改成功
									this.tipShow(this.i18n.editSuccess,true,0,1);
								}
								// 新增和编辑画面隐藏
								this.showCreatndUpdate = false;
								// 清空数据
								this.selectTableList = [];
								this.comment = '';
								this.customerName = '';
								this.telNumber = '';
								this.customerCount = null;
								this.reservateTimeTwo = '';
								this.useTime = '2';
								this.reservateType = '01';
								this.tableChoosenFlagList = [];
								this.tableList = [];
								this.selectBuffetInfoList = [];
								this.selectBuffetList = [];
								this.selectedBuffetNumber = 1;
								this.selectCourseList = [];
								this.selectCourseInfoList = [];
								this.selectedCourseNumber = 1;
								this.reservateId = null;
								this.courseList = [];
								this.buffetList = [];
								this.isCrmCustomerCount = false;
								// 刷新数据
								this.loadOrderData();
							} else if(result.data.resultCode === '9001'){
								// 参数校验失败
								this.tipShow(this.i18n.parameterVerificationFailed,true,0,0);
							} else {
								// 系统未知错误
								this.tipShow(this.i18n.systemUnknownError,true,0,0);
							}
							this.reservateTimeTwo = this.reservateTimeTwo.substring(0,16);
						}).catch(() => {
							// 网络异常，请求失败
							this.tipShow(this.i18n.networkExceptionRequestFailed,true,0,0);
							this.reservateTimeTwo = this.reservateTimeTwo.substring(0,16);
						});
				}
				this.checkList = [];
				this.statusList = [];
				this.cancleConfirmFlag = 0;
				this.loadOrderData();
			},
			// 提示框
			tipShow:function(m, s, o, f) {
				// tip Message信息
				this.tipMessageTwo = m;
				// 是否显示提示框 false不显示 true显示
				this.showalertTwo = s;
				// 是否显示提示框取消按钮 0不显示 1显示
				this.cancleFlag = o;
				// 显示警告图片0,显示确认图片1
				this.cancleConfirmFlagTwo = f;
			},
			// 提示框取消按钮
			cancelButtonTwo:function() {
				this.isCrmCustomerCount = false;
				this.showalertTwo = false;
			},
			// 提示框确定按钮
			confirmButtonTwo:function() {
				this.showalertTwo = false;
				if (this.isCrmCustomerCount) {
					this.createConfirmButton();
				}
				this.isCrmCustomerCount = false;
			},
			// 预约详细
			detailButton:function(reservateId) {
				// 详细画面显示
				this.showDetail = true;
				// 加载详细画面数据
				this.reservateId = reservateId;
				this.loadAllData();
			},
			checkDetailDataButton:function(e) {
				this.createCancle();
				this.showDetail = false;
			}
		},
		// 时间格式化
		filters: {
			timeString: function(date, fmt) {
				if (fmt === '1') {
					return date.substring(0, 10);
				} else if (fmt === '2') {
					return date.substring(11, date.length);
				}
			}
		}
	}
</script>

<style>
	uni-page-body,
	#app {
		height: 100%;
	}
	.selected1 {
		background-color: #3cb9cc;
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
	.orderPage {
		height: 100%;
	}
	.transferSecondTrContentoOther {
		font-size: 1.5vw;
		color: #000;
		text-align: center;
		float: left;
		display: flex;
		padding: 1.5% 0;
		background-color: #d4e8ff;
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
	.orderList {
		width: 14%;
		height: 100%;
		color: white;
		font-weight: 700;
		background-color: rgb(74, 188, 255);
		overflow: hidden;
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
		background-color: rgba(40, 40, 52, 0.21);
	}
	.transferRightInhand {
		float: left;
		width: 85%;
		height: 100%;
		padding-left: 1%;
	}
	.topSearch {
		padding-top: 3%;
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
		float: left;
		font-size: 1.5vw;
		display: flex;
		height: 6%;
	}
	.transferSecondTro {
		background-color: #4e759b;
		color: #fff;
		float: left;
		font-size: 1.5vw;
		display: flex;
	}
	.transferSecondTh {
		padding: 1.3% 1%;
		border-right: 1px solid #fff;
		text-align: center;
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
		float: left;
		display: flex;
		padding: 1.5% 0;
	}
	.fontPositions {
		margin: auto 0;
		padding: 0% 1%;
		overflow: hidden;
		text-overflow: ellipsis;
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
		width: 100%;
		height: 8%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.paginationn {
		width: 100%;
		height: 46%;
		float: right;
		display: flex;
		align-items: center;
		border-radius: 4px;
		font-size: 2vw;
		bottom: 0;
	}
	.paginationn>li {
		display: inline;
	}
	.paginationn>li>a {
		position: relative;
		float: left;
		padding: 6px 12px;
		margin-left: -1px;
		line-height: 1.42857143;
		color: #337ab7;
		text-decoration: none;
		background-color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
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
		width: 55%;
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
		background-color: #3987e4;
		font-size: 1.5vw;
		border-radius: 0.6vw;
		color: #fff;
		border: 0;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
	}
	.table-search-input {
		width: 67%;
		height: 100%;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5vw;
		border-radius: 4px;
		color: #555;
		border: 1px solid #3987e4;
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
		width: 67%;
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
		width: 33%;
		height: 100%;
		float: left;
	}
	.textLabel {
		font-size: 1.7vw;
		float: left;
		width: 32%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.textLabell {
		    text-align: left;
		    display: flex;
		    align-items: center;
		    font-size: 1.7vw;
		    float: left;
		    width: 32%;
		    height: 100%;
	}
	.detailButton {
		width: 11%;
		margin: 0.7% 0.5% 0.7% 0.5%;
		background-color: #3987e4;
		color: #fff;
		border-radius: 0.5vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.creatndUpdateDiv {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(41, 39, 39, 0.8);
	}
	.wholeDiv {
		width: 85%;
		height: 85%;
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		margin: auto;
		right: 0px;
		background-color: rgb(255, 255, 255);
	}
	.containerTwo {
		width: 100%;
	    height: 100%;
	    float: left;
		overflow: hidden;
		overflow-y: auto;
	}
	.body {
		height: 96%;
		width: 96%;
		margin: 2% 2% 2% 2%;
	}
	.firstLine {
		height: 8%;
		width: 100%;
		align-items: center;
		display: flex;
		margin-bottom: 1%;
	}
	.firstLineOne {
		height: 100%;
		width: 30%;
		display: flex;
		align-items: center;
		margin-left: 5%;
	}
	.firstLineText {
		width: 30%;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 6%;
		font-weight: bold;
		font-size: 1.7vw;
	}
	.firstLineInput {
		width: 60%;
		float: right;
		height: 100%;
		font-size: 1.5vw;
	}
	.lableClass {
		width: 11%;
		font-size: 1.7vw;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.reservateTimeClass {
		font-size: 1.5vw;
		width: 18%;
		height: 100%;
		border: 1px solid rgb(57, 135, 228);
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;
		border-radius: 5px;
	}
	.distinctRadio {
		font-size: 1.5vw;
		width: 50%;
	}
	.uni-input {
		border: 1px solid rgb(57, 135, 228);
		display: block;
		font-size: 1.5vw;
		height: 100%;
		overflow: hidden;
		text-align: center;
		border-radius: 5px;
	}
	.uni-list-cell {
		width: 50%;
		display: flex;
	}
	.uni-list-cell-dbTwo {
		font-size: 1.7vw;
		text-align: center;
		white-space: nowrap;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.addButton {
		font-size: 1.5vw;
		width: 7%;
		height: 80%;
		background-color: rgb(57, 135, 228);
		align-items: center;
		justify-content: center;
		text-align: center;
		color: white;
		display: flex;
		border-radius: 5px;
	}
	.courseClass {
		display: flex;
		height: 4vw;
		margin-bottom: 1%;
	}
	.courseListClassOne {
		border: 1px solid rgb(57, 135, 228);
		width: 25%;
		margin-left: 11%;
		border-radius: 3px;
	}
	.courseListClass {
		border: 1px solid rgb(57, 135, 228);
		width: 54%;
		margin-left: 1%;
		border-radius: 3px;
	}
	.jiaJianNumberClass {
		width: 19%;
		font-size: 1.5vw;
		margin-left: 7%;
		display: flex;
		background-color: rgb(57, 135, 228);
		color: white;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 5px;
	}
	.jiaJianClass {
		width: 30%;
		font-size: 2vw;
	}
	.numberClass {
		width: 40%;
	}
	.tableColorInfoListClass {
		width: 95%;
		height: 100%;
		font-size: 1.5vw;
		margin-left: 1.5%;
	}
	.tableColorInfoClass {
		flex: 1;
		height: 80%;
		display: flex;
		position: relative;
		align-items: center;
		float: left;
		margin-right: 2%;
	}
	.tableColorInfoClassOne {
		width: 4.5%;
		height: 80%;
		display: flex;
		position: relative;
		align-items: center;
		float: left;
	}
	.tableColorInfoClassOneText {
		width: 50%;
		height: 50%;
	}
	.tableColorClass {
		width: 10.5%;
		height: 43%;
		margin-right: 10%;
	}
	.tableInfos {
		width: 96%;
		height: 33%;
		font-size: 1.5vw;
		margin-left: 1.5%;
		overflow-y: auto;
	}
	.tableClass {
		width: 10.5vw;
		height: 40%;
		display: flex;
		position: relative;
		align-items: center;
		margin: 0% 2.0vw 1% 0%;
		justify-content: center;
		text-align: center;
		float: left;
		color: white;
		border-radius: 5px;
	}
	.tableInfosBottom {
		width: 95%;
		height: 13%;
		display: flex;
		margin: 0% 4% 0% 1.5%;
	}
	.tableInfosScroll {
		width: 100%;
		margin: auto;
		width: 100%;
		height: 100%;
	}
	.areaList {
		margin: auto 0;
		height: 100%;
		float: left;
		overflow-x: auto;
		width: 
	}
	.bottomTab {
		display: flex;
		float: left;
		text-align: center;
		width: 10.5vw;
		height: 100%;
		font-size: 2vw;
		background-color: rgb(57, 135, 228);
		margin: 0 2.0vw 0 0vw;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 5px;
	}
	.bottomTabOther {
		display: flex;
		float: left;
		text-align: center;
		width: 10.5vw;
		height: 100%;
		font-size: 2vw;
		background-color: #191970;
		margin: 0 2.0vw 0 0vw;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 5px;
	}
	.bottomTabFront {
		float: left;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
		font-size: 1.5vw;
	}
	.tableSelected {
		width: 96%;
		height: 19%;
		margin: 0% 4% 0% 1.5%;
		font-size: 1.5vw;
		font-weight: bold;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		overflow: hidden;
	}
	.buttonClass {
		width: 12%;
		height: 55%;
		background-color: rgb(57, 135, 228);
		color: white;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;
		border-radius: 5px;
	}
	.useTimeClass {
		height: 100%;
		font-size: 1.5vw;
		align-items: center;
		justify-content: center;
		text-align: center;
		display: flex;
	}
	.overLong {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.justSeat {
		overflow: hidden;
		width: 84%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}
	.borderClass {
		border: 1px solid #efeff4;
		height: 14%;
		box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
		margin-bottom: 1.5%;
	}
	.disabled {
		background-color: #adadad;
		border: none;
	}
</style>
