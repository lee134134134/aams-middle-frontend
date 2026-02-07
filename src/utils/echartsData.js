export function _getMaxValue(arr) {
	if(arr==null){
		return null
	}else{
		const max = Math.max(...arr);
		// 这样处理是为了不让最大值刚好到坐标轴最顶部
		return Math.ceil(max / 9.5) * 10;
	}
}

export function _getMinValue(arr) {
	if(arr==null){
		return null
	}else{
		const min = Math.min(...arr);
		// 这样处理是为了不让最大值刚好到坐标轴最底部
		return Math.floor(min / 12) * 10;
	}
}