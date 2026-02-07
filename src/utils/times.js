export const getMonDayAndSunDay = (datevalue) => {
	let dateValue = formatDate(datevalue);
	let arr = dateValue.split("-");
	//月份-1 因为月份从0开始 构造一个Date对象
	let date = new Date(arr[0], arr[1] - 1, arr[2]);
	let dateOfWeek = date.getDay(); //返回当前日期的在当前周的某一天（0～6--周日到周一）
	let dateOfWeekInt = parseInt(dateOfWeek, 10); //转换为整型
	if (dateOfWeekInt == 0) { //如果是周日
		dateOfWeekInt = 7;
	}
	let aa = 7 - dateOfWeekInt; //当前于周末相差的天数
	let temp2 = parseInt(arr[2], 10); //按10进制转换，以免遇到08和09的时候转换成0
	let sunDay = temp2 + aa; //当前日期的周日的日期
	let monDay = sunDay - 6; //当前日期的周一的日期
	let startDate = new Date(arr[0], arr[1] - 1, monDay);
	let endDate = new Date(arr[0], arr[1] - 1, sunDay);
	let sm = parseInt(startDate.getMonth()) + 1; //月份+1 因为月份从0开始
	let em = parseInt(endDate.getMonth()) + 1;
	let start = startDate.getFullYear() + "-" + sm + "-" + startDate.getDate();
	let end = endDate.getFullYear() + "-" + em + "-" + endDate.getDate();
	let result = [];
	result.push(start);
	result.push(end);

	return result;
}
export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要+1
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

export const  convertToDate = (dateString)=> {
	  const parts = dateString.split(/[年月]/);
	  const year = parseInt(parts[0], 10);
	  const month = parseInt(parts[1], 10) - 1; // JavaScript中的月份是从0开始的
	  return new Date(year, month);
	}