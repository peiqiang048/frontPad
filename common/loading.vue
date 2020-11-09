<template>
	<view class="request-loading-view" v-show="loadingShow">
		<view class="loading-view"><view class="loading"></view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		//计算属性判断vuex中的显示状态
		loadingShow() {
			return this.$store.state.requestLoading;
		}
	}
};
</script>

<style scoped>
.request-loading-view {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 198903060;
	background-color: rgba(0, 0, 0, 0.001);
	display: flex;
	justify-content: center;
	align-items: center;
}
.loading-view {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.41);
	display: flex;
	justify-content: center;
	align-items: center;
}

/* 动画样式 */
.loading {
	border: 13px solid rgba(0, 0, 0, 0.01);
	border-radius: 50%;
	border-top: 10upx solid #fff;
	border-right: 10upx solid #fff;
	border-bottom: 10upx solid #fff;
	width: 3vw;
	height: 3vw;
	-webkit-animation: spin 1.4s linear infinite;
	animation: spin 1.4s linear infinite;
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
