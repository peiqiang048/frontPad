<template>
	<view>
		<!-- ios扫码速度快于安卓 -->
	</view>
</template>
<script>
	var barcode = null;
	export default {
		// 引入多语言文件
		computed: {
			i18n () {
				return this.$t('message')  
			}
		}, 
		data() {
			return {
				// 是否打开摄像头
				flash: false,
			};
		},
		onLoad(d) {
			// getCurrentPages() 函数用于获取当前页面栈的实例
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			// 设置应用是否全屏显示
			plus.navigator.setFullscreen(true);
			// $getAppWebview() 可以得到当前webview的对象实例，从而实现对 webview 更强大的控制。
			let currentWebview = page.$getAppWebview();
			// 创建二维码窗口
			this.createBarcode(currentWebview);
			// 创建界面
			this.createView(currentWebview);
			// #endif
		},
		methods: {
			// 从相册中选择图片
			galleryImg() {
				let _this=this
				plus.gallery.pick(function(path) {
					// 成功选择
					_this.scanImg(path)
				}, function(e) {
					// 用户取消选择
					_this.tip(_this.i18n.cancel)
					// 开始扫码识别
					 barcode.start();
				}, {
					filter: "image"
				});
			},

			// 从图片中扫码识别 
			scanImg(path) {
				let _this=this
				plus.barcode.scan(path, function(type, result) {
					// 扫码成功回调
					_this.onmarked(type, result)
				}, function(e) {
					_this.tip(_this.i18n.error)
					// 识别失败后ios会卡住，重启扫码
					barcode.start();
				});
			},

			// 扫码成功回调
			onmarked(type, result) {
				let text = this.i18n.unknown;
				switch (type) {
					case plus.barcode.QR:
						text = 'QR: ';
						break;
					case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
					case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
				}
				// 关闭全屏显示 
				plus.navigator.setFullscreen(false);
				uni.navigateBack({
					// 返回到上一页
					delta: 1
				});
				this.$eventHub.$emit("scanResult", {
					// 发送数据
					result: result
				});
				// 窗口关闭
				barcode.close();
			},
			// 创建二维码窗口
			createBarcode(currentWebview) {
				// 创建扫码识别控件对象
				barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
					top: '0',
					left: '0',
					width: '100%',
					height: '100%',
					scanbarColor: '#1DA7FF',
					position: 'static',
					frameColor: '#1DA7FF'
				});
				// 扫码成功回调
				barcode.onmarked = this.onmarked;
				// 操作闪光灯
				barcode.setFlash(this.flash);
				// 把扫码控件添加到页面
				currentWebview.append(barcode);
				// 开始扫码识别
				barcode.start();
			},
			// 创建操作按钮及tips
			createView(currentWebview) {
				// nativeObj管理系统原生对象
				// 创建返回原生按钮
				let _this = this;
				let backView = new plus.nativeObj.View('backView', {
						top: '0px',
						left: '0px',
						height: '40px',
						width: '40px'
					},
					[{
						tag: 'img',
						id: 'backBar',
						src: 'static/backLeft.png',
						position: {
							top: '10px',
							left: '10px',
							width: '35px',
							height: '35px'
						}
					}]);
				// 创建打开相册按钮
				let albumView = new plus.nativeObj.View('albumView', {
						top: '0px',
						left: '85%',
						height: '40px',
						width: '15%'
					},
					[{
						tag: 'font',
						id: 'openAlbum',
						// 相册
						text: _this.i18n.album,
						textStyles: {
							size: '18px',
							color: '#ffffff'
						},
						position: {
							top: '10px',
							left: '10px',
							width: '100%',
							height: '40px',
							margin: 'auto'
						}
					}]);
				// 创建文本内容
				let content = new plus.nativeObj.View('content', {
						top: '0px',
						left: '0px',
						height: '100%',
						width: '100%'
					},
					[{
							tag: 'font',
							id: 'scanTitle',
							// 扫码
							text: _this.i18n.scanCode,
							textStyles: {
								size: '18px',
								color: '#ffffff'
							},
							position: {
								top: '10px',
								left: '0px',
								width: '100%',
								height: '40px'
							}
						},
						{
							tag: 'font',
							id: 'scanTips',
							// 将二维码放入框内
							text: _this.i18n.putQRcodeIntoBox,
							textStyles: {
								size: '14px',
								color: '#ffffff',
								whiteSpace: 'normal'
							},
							position: {
								top: '90px',
								left: '10%',
								width: '80%',
								height: 'wrap_content'
							}
						}

					]);
				// 是否拦截View控件的触屏事件
				backView.interceptTouchEvent(true);
				// 添加内容到页面
				currentWebview.append(content);
				currentWebview.append(backView);
				currentWebview.append(albumView);
				// 给返回按钮添加事件监听
				backView.addEventListener("click", function(e) {
					uni.navigateBack({
						// 返回上一级
						delta: 1
					});
					// 关闭扫码
					barcode.close();
					// 关闭全屏显示
					plus.navigator.setFullscreen(false);

				}, false);
				// 给打开相册按钮添加事件监听
				albumView.addEventListener("click", function(e) {
					_this.galleryImg()
				}, false);
				
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			// 返回时退出全屏
			barcode.close();
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onUnload() {
			plus.navigator.setFullscreen(false);
		}


	};
</script>

<style scoped>
</style>
