<template>
	<view class="tableLeft">
		<!-- 左侧图标 -->
		<view style="width: 100%;height: 80%;overflow-y: scroll;">
			<block v-for="(item,index) in tabList" :key="index">
				<view class="commonModuleStyleTop"></view>
				<view :class="currentTabIndex === index ? 'leftViewImgStyleOther' : ''" @tap="switchTab(index)">
					<image class="leftTop" :src="item.icon"></image>
					<view class="leftWord" style="">{{item.text}}</view>
				</view>
			</block>
		</view>
		<!-- 返回机能画面 -->
		<view class="leftViewImgStyleBottom" @click="backToHome">
			<image class="pepolepic" :src="pepolepic"></image>
			<!-- <view class="leftViewFrontSize">{{userName}}</view> -->
		</view>
	</view>
</template>
<script>
	export default {
		// 引入多语言文件
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				// menu数组
				tabList: [],
				// 当前选择的menu
				currentTabIndex: this.current,
				// 图片路径
				pepolepic: '../../static/10-17ai-34.png',
			}
		},
		// 挂载到实例上去之后调用
		mounted: function() {
			// 给数组赋值
			this.tabList = [{
					icon: '../../static/leftTop.png',
					text: this.i18n.order,
				}
				
			]
			
			// 客用スマホ使用可能標識１:可の場合表示、以外の場合、表示しない
			if (uni.getStorageSync('smartPhonesAvailableFlag') === "1") {
				// 给数组赋值
				this.smartPhonesAvailable = [{
					icon: '../../static/appointment.png',
					text: this.i18n.reception,
				},
				{
					icon: '../../static/matching.png',
					text: this.i18n.arrangement,
				}]
				this.tabList = this.tabList.concat(this.smartPhonesAvailable)
			}
			// 席解除表示標識　0１の場合表示、以外の場合、表示しない
			if (uni.getStorageSync('beforeAfterPaymentFlag') === "01") {
				// 给数组赋值
				this.seatRemoval = [{
					icon: '../../static/remove.png',
					text: this.i18n.seatRemoval,
				}]
				this.tabList = this.tabList.concat(this.seatRemoval)
			}
		},
		props: {
			current: {
				type: [Number, String],
				default: ''
			},
			userName: {
				type: [Number, String],
				default: uni.getStorageSync('userName')
			},
		},
		methods: {
			// 切换左侧menu
			switchTab(index) {
				this.currentTabIndex = index
				this.$emit('click', index)
			},
			// 返回机能画面
			backToHome() {
				uni.redirectTo({
					url: '/pages/homePage/homePage'
				});
			}
		},
	}
</script>
<style>
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

	.leftWord {
		font-size: 1.7vw;
		color: #fff;
		text-align: center;
	}
</style>
