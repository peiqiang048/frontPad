<!-- 数字键盘 -->
<template>
	<view  class="digit-keyboard" :style="{'top':keyBoardTop+'px','left':keyBoardLeft+'px'}" >
		<view class="digit-keyboard_bg" @tap="hide"></view>
		<view class="digit-keyboard_area">
			<view class="input-area">
				<view class="item">
					<input :placeholder="inputVal" v-model="val" class="input" disabled />
				</view>
				<view class="item">
					<img src="static/button_x.png" @tap="hide()"></image>
				</view>
			</view>
			<view class="number-area">
				<view class="item" @tap="modifyNum(1)">1</view>
				<view class="item" @tap="modifyNum(2)">2</view>
				<view class="item" @tap="modifyNum(3)">3</view>
				<view class="item" @tap="modifyNum(4)">4</view>
				<view class="item" @tap="modifyNum(5)">5</view>
				<view class="item" @tap="modifyNum(6)">6</view>
				<view class="item" @tap="modifyNum(7)">7</view>
				<view class="item" @tap="modifyNum(8)">8</view>
				<view class="item" @tap="modifyNum(9)">9</view>
				<view class="item" style = "flex: 0 0 65%;" @tap="modifyNum('clear')">C</view>
				<view class="item" @tap="modifyNum(0)">0</view>
				<view class="item" style = "flex: 0 0 100%;background-color: #000000;color: #FFFFFF;"  @tap="confirm">OK
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import NP from '@/components/keybord/numberPrecision.js'
	export default {
		props: {
			inputVal: {
				type: [String],
				default: ''
			},
			label:{
				type:String,
				default:''
			},
			keyBoardTop: {
				type: Number,
				default: 0
			},
			keyBoardLeft: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				val: ''
			};
		},
		created() {
	 
		},
		methods: {
			//隐藏
			hide(){
				this.$emit('cancel');
			},
			confirm(){
				let val =this.val;
				let valNew = val.slice(-1);
				if(valNew == '.'){
					val= val.slice(0,-1);
				}
				this.$emit('confirm',val);
			},
			modifyNum(sign) {
				let {
					val
				} = this;
				//删除
				if (sign == 'del') {
					if (val.length > 0) {
						let valNew = val.slice(0, -1);
						if (valNew.length == 0) {
							val = '';
						} else {
							val = valNew;
						}
					}
				} else if (sign == 'add') { //加1
					val = NP.plus(Number(val), 1) + '';
				} else if (sign == 'minus') { //减1
					val = NP.minus(Number(val), 1) + '';
				} else if (sign == 'clear') { //清除
					val = '';
				} else if (sign == '-') { //代表负数
					if (val.indexOf('-') == -1) {
						val = '-' + val;
					}
				} else if (sign == '.') { //点符号
					if (val.indexOf('.') == -1 && val.length > 0) {
						val = val + '.';
					}
				} else {
					if ((val == '0' && sign == '0') || (val == '-0' && sign == '0') || (val == '0' && sign != '.') || (val == '-0' && sign != '.')) {
						return;
					}
					val = val + sign;
				}
				//小数点大于3位不赋值
				let arr = val.split('.');
				if (arr.length == 2 && arr[1].length > 3) {
					return;
				}
				this.val = val;
			}
		}
	}
</script>


<style lang="scss" scoped>
	.digit-keyboard {
		position: absolute;
		left: 0;
		top: 0;
		width: 20%;
		height: 30%;
		z-index: 999;
	}

	// .digit-keyboard_bg {
	// 	width: 100%;
	// 	height: 50%;
	// 	background: rgba($color: #000000, $alpha: 0.5);
	// }

	.digit-keyboard_area {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #efefef;
	}

	.input-area {
		display: flex;
		align-items: center;
		padding: 10upx;
		background: #FFFFFF;

		.item {
			font-size: 14upx;
			&:nth-of-type(2) {
				flex: 1 0 auto;
				padding-right: 5upx;
			}

			&:nth-of-type(3) {
				font-size: 0;
			}
		}

		.input {
			background: #eeeeee;
			text-indent: 10upx;
			font-size: 20upx;
			height: 10upx;
		}
	}

	.number-area {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		text-align: center;

		.item {
			color: #007AFF;
			margin-top: 4upx;
			flex: 0 0 32%;
			background: #FFFFFF;
			line-height: 25upx;
			font-size: 20upx;
			font-weight: bold;
		}
	}
</style>
