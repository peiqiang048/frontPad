let main = plus.android.runtimeMainActivity();  
//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
plus.runtime.quit = function(){  
	main.moveTaskToBack(false);  
};  
//重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast  
plus.nativeUI.toast = (function(str){  
	if(str == '再按一次退出应用'){  
		main.moveTaskToBack(false);  
		return false;  
	}else{  
		uni.showToast({  
			title:str,  
			icon:'none',  
		})  
	}  
});