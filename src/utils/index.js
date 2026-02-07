import exportFile from "@/utils/exportFile.js";
import exportFilePost from "@/utils/exportFilePost.js";
import exportFilePost1 from "@/utils/exportFilePost1.js";
import exportFilePostScore from "@/utils/exportFilePostScore.js";
import _ from "lodash"
export {
	exportFile,
	exportFilePost,
	exportFilePost1,
	exportFilePostScore
};

// 表格列排序 按照拼音顺序排列
export const sortEnglishName = (a, b, key, isCn = true) => {
	if (!isCn) {
		// 钱币 带逗号  排序
		const _a = MoneyNoFormat(a[key]);
		const _b = MoneyNoFormat(b[key]);
		return _a - _b;
	} else {
		return sortCNOrder(a, b, key);
	}
};

/* 
  中文字母数字混合按ASCCI值排序
  排序规则：数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
*/

function searchFirstLetter(word) {
	//中文首字转换成字母
	/* if(!String.prototype.localeCompare)
	  return 0; */
	let temp = "";
	let letters = "*abcdefghjklmnopqrstwxyz".split("");
	let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");
	letters.forEach((letter, i) => {
		if (
			(!zh[i - 1] || zh[i - 1].localeCompare(word, "zh") <= 0) &&
			word.localeCompare(zh[i], "zh") == -1
		) {
			temp = letter.toUpperCase();
		}
	});
	return temp;
}

function getChartType(char) {
	// 获取类型
	// 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
	if (/^[\u4e00-\u9fa5]$/.test(char[0])) {
		return ["zh", char];
	} else if (/^[a-zA-Z]$/.test(char[0])) {
		return ["en", char];
	} else if (/^[0-9]$/.test(char[0])) {
		return ["number", char];
	} else {
		return ["others", char];
	}
}

function filterCode(val, places) {
	// 转换ASCCI值
	if (val[1].length < places) {
		return getEstimateNum(val[0], val[1]);
	} else {
		//首字符相同, 比较第places位, 进行分组排序
		return countNum(val[1], places, val[0]);
	}
}

function countNum(str, places, type) {
	let i = 1,
		num = getEstimateNum(type, str[0]) + ".";
	do {
		num += getEstimateNum(type, str[
			i]); //1位格式：168， 2位格式：168.113， 3位格式：168.113102
		i++;
	} while (i < places);
	return Number(num);
}

function getZH(str) {
	//获取中文 ASCCI值
	return searchFirstLetter(str).charCodeAt() +
		100; // + 100 是为了跟[a-z]的ASCCI值重复，中文首字符拼音取最大值
}

function getEN(str) {
	//获取英文和数字 ASCCI值
	// console.log("str", str);
	return str.charCodeAt();
}

function getEstimateNum(type, val) {
	//获取对应类型最终计算用来排序的ASCCI值（不是字符原生的ASCCI值）
	return type === "zh" ? getZH(val) : getEN(val);
}

/* 
  str1: 除最后一列，从上到下
  str2: 从下到上，除第一列
  排序次数：  总列数-1
*/

export function sortCNOrder(str1, str2, param) {
	let res = 0; // 排序值
	let Places = 4; // 比较前几位
	const char1 = str1[param];
	const char2 = str2[param];
	if (!char1 || !char2) {
		//空值处理
		res = char1 && !char2 ? -1 : 0; //空值分组
	} else {
		const value1 = getChartType(char1);
		const value2 = getChartType(char2);
		res = filterCode(value1, Places) - filterCode(value2, Places);
	}
	return res;
}

// 表格头部颜色
export function TableRowStyle({
	row,
	column,
	rowIndex,
	columnIndex
}) {
	return {
		background: "#f5f7fa"
	};
}

// 点击下载
export function download(fileName, filePath) {
	// console.log(fileName, filePath)
	var link = document.createElement("a");
	link.href = filePath;
	link.download = fileName;
	link.click();
	//释放内存
	window.URL.revokeObjectURL(link.href);
}

// 表格 合并行
export const getSpanArr = (data, spanKey) => {
	let spanArr = [];
	let pos = "";
	for (let i = 0; i < data?.length; i++) {
		if (i === 0) {
			spanArr.push(1);
			pos = 0;
		} else {
			// 判断当前元素与上一个元素是否相同
			if (data[i][spanKey] === data[i - 1][spanKey]) {
				spanArr[pos] += 1;
				spanArr.push(0);
			} else {
				spanArr.push(1);
				pos = i;
			}
		}
	}
	return spanArr;
};

// 加逗号
export const MoneyFormat = (str) => {
	var sum = str
		.substring(0, str.indexOf("."))
		.replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
	var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
	var ret = sum + dot;
	return ret;
};
// 万元改亿元
export const formatNumber = (num) => {
	// 首先除以10000并保留两位小数
	let result = (num / 10000).toFixed(2);

	// 使用Intl.NumberFormat来添加千分位分隔符
	return new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(parseFloat(result));
}

// 去掉逗号
export const MoneyNoFormat = (str) => {
	if (str && str.includes(',')) {
		return str.replace(/\,/g, "");
	} else {
		return str
	}
};

// 是否为数字
export const isNumber = (str) => {
	return isNaN(Number(str));
};

// 数据类型
export const isType = (data, type) => {
	return Object.prototype.toString.call(data) === `[object ${type}]`
}

// 截取字符串
export const subStr = (str) => {
	if (str) {
		return str.substr(str.lastIndexOf('/') + 1)
	} else {
		return str
	}

}


export const getAllValues = (arr, list) => {
	let values = [];

	function dfs(nodes) {
		nodes.forEach(node => {
			if (node.children && node.children.length) {
				dfs(node.children);
			} else {
				if (list) {
					list.forEach(ele => {
						if (node.label == ele.value) {
							values.push(node.value);
						}
					})
				} else {
					values.push(node.value);
				}
			}
		});
	}
	dfs(arr);
	return values;
}

// 过滤险种中的资本金，其他
export const getAllValues1 = (arr, list) => {
	let values = [];

	function dfs(nodes) {
		nodes.forEach(node => {
			if (node.children && node.children.length) {
				dfs(node.children);
			} else {
				if (list) {
					list.forEach(ele => {
						if (node.label == ele.value) {
							values.push(node.value);
						}
					})
				} else {
					let isFilter = ['资本金', '其他']
					if (!isFilter.includes(node.label)) {
						values.push(node.value);
					}
				}
			}
		});
	}
	dfs(arr);
	return values;
}

export const isFixedIncomeAdmin = (arr1 = [], arr2) => {
	// arr2 = arr2 || ['fixedIncome-roadshow-admin', 'equities-roadshow-admin',
	// 	'capital-roadshow-admin', 'credit-roadshow-admin',
	// 	'metalsmith-roadshow-admin', "ROLE_ADMIN"
	// ];
	arr2 = arr2 || ['CR_ROADSHOW_ADMIN', 'MW_ROADSHOW_ADMIN',
		'AR_ROADSHOW_ADMIN', 'EM_ROADSHOW_ADMIN',
		'FIM_ROADSHOW_ADMIN', "ROLE_ADMIN"
	];
	for (let i = 0; i < arr1.length; i++) {
		if (arr2.includes(arr1[i])) {
			return true;
		}
	}
	return false;
}
// 获取key
export const getNames = (arr) => {
	let nameArr = [];
	arr.forEach(item => {
		if (item.child && item.child.length) {
			nameArr = [...nameArr, ...item.child]
		}
	})
	let namesArr = ['a', 'b'];
	nameArr.forEach(item => {
		namesArr = [...namesArr, item.nameKey]
	})
	namesArr.push('total'); // 总和
	return namesArr;
}
// 分页
export const getContentList = (pageNo, pageSize, list) => {
	const start = (pageNo - 1) * pageSize;
	const end = pageNo * pageSize;
	return list?.slice(start, end)
}
// 千位分隔符排序
export const removeThousandSeparator = (str) => {
	if (str) {
		return str.replace(/,/g, '')
	} else {
		return str;
	}
}
// infoType
export const infoType = (str) => {
	if (str === '路演') {
		return '1'
	} else {
		return '2'
	}
}
export const infoType1 = (str) => {
	if (str === '内部路演') {
		return '1-1'
	} else if (str === '外部路演') {
		return '1-2'
	} else if (str === '债券行权' || str === '行权') {
		return '2-1'
	} else if (str === '可转债提示' || str === '可转债') {
		return '2-2'
	} else if (str === '持有人会议' || str === '持有人') {
		return '2-3'
	} else if (str === '持仓舆情' || str === '舆情') {
		return '2-4'
	}
}
export const infoTypeClass = (str) => {
	if (str.length === 2) {
		return str.charAt(0) + '\xa0\xa0\xa0\xa0' + str.charAt(1)
	} else {
		return str;
	}
}
// infoTypeStyle
export const infoTypeStyle = (str) => {
	if (str === '舆情') {
		return '#00adff'
	} else if (str === '行权') {
		return '#a644ff'
	} else if (str === '可转债') {
		return '#f02d1d'
	} else if (str === '持有人') {
		return '#0260ff'
	} else if (str === '1') {
		return '#ff8d00'
	} else if (str === '2') {
		return '#14b574'
	} else {
		return "0260ff"
	}
}
// 打分数据是否更改
export const findSaveBool = (arr, arr1) => {
	if (!arr.length) return true;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].score != arr1[i].score) {
			return false
		}
	}
	return true;
}
// 打分状态回退权限
export const scoreBack = (arr) => {
	return arr.includes('ROLE_ADMIN') || arr.includes('IR_SUPER_ADMIN');
}

// 自定义账户树参数筛选
export const getValueArr = (obj, arr) => {
	let arr1 = [];
	obj.forEach(item => {
		if (item.children && item.children.length !== 0) {
			arr1 = [...arr1, ...item.children]
		}
	})
	let finterArr = arr1.filter(item => {
		return arr.find(prop => {
			return prop == item.value;
		})
	})
	let result = finterArr.map(item => {
		let tree = [];
		if (item.codeList && item.codeList.length > 0) {
			tree = item.codeList.map(prop => {
				return prop.value
			})
		}
		if (tree.length) {
			return {
				startTime: item.startTime,
				endTime: item.endTime,
				tree,
				name: item.label,
			}
		} else {
			return null
		}
	})
	let res = result.filter(item => item != null)
	return res;
}


// 自定义账户树参数筛选
export const getValueArr1 = (obj, m) => {
	let arr1 = [];
	let arr = obj.map(parent => {
			if (m.includes(parent.value)) {
				return parent.children.map(child => child.value);
			}
			return []
		})
		.flat();
	obj.forEach(item => {
		if (item.children && item.children.length !== 0) {
			arr1 = [...arr1, ...item.children]
		}
	})
	let finterArr = arr1.filter(item => {
		return arr.find(prop => {
			return prop == item.value;
		})
	})
	let result = finterArr.map(item => {
		let tree = [];
		if (item.codeList && item.codeList.length > 0) {
			tree = item.codeList.map(prop => {
				return prop.value
			})
		}
		if (tree.length) {
			return {
				startTime: item.startTime,
				endTime: item.endTime,
				tree,
				name: item.label,
			}
		} else {
			return null
		}
	})
	let res = result.filter(item => item != null)
	return res;
}
// 周六日数据取周五数据
export const changeArr = (arr = []) => {
	let item = null;
	if (arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] != null) {
				item = arr[i]
			} else {
				if (i == 0) {
					arr[i] = '0'
					item = '0';
				} else {
					arr[i] = item
				}
			}
		}
	}
	return arr
}

// 截取字符串
export const splitMsg = (str, n) => {
	if (str.length) {
		if (n === 'time') {
			return str.substring(str.lastIndexOf(' '))
		} else {
			return str.substring(0, str.lastIndexOf(' '))
		}
	} else {
		return ''
	}
}

export const addParentValueToChildren = (arr) => {
	function recursiveAddParentValue(obj, parentValue) {
		if (Array.isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				recursiveAddParentValue(obj[i], parentValue);
			}
		} else if (typeof obj === 'object') {
			obj.parentValue = parentValue;
			if (obj.children) {
				recursiveAddParentValue(obj.children, obj.value);
			}
		}
	}
	for (let i = 0; i < arr.length; i++) {
		recursiveAddParentValue(arr[i], null);
	}
	return arr;
}


export const findParentValues = (arr, targetValues) => {
	const result = [];

	function recursiveSearch(obj) {
		if (Array.isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				recursiveSearch(obj[i]);
			}
		} else if (typeof obj === 'object') {
			if (Array.isArray(obj.children)) {
				for (let i = 0; i < obj.children.length; i++) {
					recursiveSearch(obj.children[i]);
				}
			}
			if (targetValues.includes(obj.value)) {
				result.push(obj.parentValue);
			}
		}
	}
	recursiveSearch(arr);
	return result;
}

export const filterTree = (tree, values) => {
	return tree.filter(node => {
		let shouldKeep = false;
		if (node.children && Array.isArray(node.children) && node
			.children.length > 0) {
			node.children = filterTree(node.children, values);
			shouldKeep = node.children.length > 0;
		} else {
			shouldKeep = values.includes(node.value);
		}
		return shouldKeep;
	});
}

export const filterTreeArr = (tree) => {
	return tree.filter(node => {
		if ('children' in node) {
			const newChildren = filterTreeArr(node.children);
			if (newChildren.length > 0) {
				node.children = newChildren
			} else {
				delete node.children
			}
			return true
		}
		return false
	})
}
export const getChildrenCode = (tree, arr) => {
	for (let i = 0; i < arr.length; i++) {
		tree = tree.filter(item => item.value == arr[i])[0].children;
	}
	tree.forEach(item => {
		item.leaf = true
	})
	return tree
}
export const compareObject = (obj1, obj2) => {
	if (obj1.treeType == '1') {
		obj1.arr = obj1.sobCodeList.sort();
	} else if (obj1.treeType == '2') {
		obj1.arr = obj1.insuranceType;
	} else if (obj1.treeType == '3') {
		obj1.arr = obj1.accountSet;
	} else if (obj1.treeType == '4') {
		obj1.arr = obj1.selfAcountTree;
	} else {
		obj1.arr = [];
	}
	if (obj2.treeType == '1') {
		obj2.arr = obj2.sobCodeList.sort();
	} else if (obj2.treeType == '2') {
		obj2.arr = obj2.insuranceType;
	} else if (obj2.treeType == '3') {
		obj2.arr = obj2.accountSet;
	} else if (obj2.treeType == '4') {
		obj2.arr = obj2.selfAcountTree;
	} else {
		obj2.arr = [];
	}
	const filterObj1 = _.omit(obj1, ['sobCodeList', 'insuranceType', 'accountSet', 'selfAcountTree'])
	const filterObj2 = _.omit(obj2, ['sobCodeList', 'insuranceType', 'accountSet', 'selfAcountTree'])
	return _.isEqual(filterObj1, filterObj2)
}

export const compareObject1 = (obj1, obj2) => {
	let filterObj1 = {};
	let filterObj2 = {};
	obj1.quarter.sort();
	obj2.quarter.sort();
	if (obj1.accountType == 'O3') {
		filterObj1 = _.omit(obj1, ['insuranceType'])
		filterObj2 = _.omit(obj2, ['insuranceType'])
	} else {
		obj1.insuranceType.sort();
		obj2.insuranceType.sort();
		filterObj1 = obj1;
		filterObj2 = obj2;
	}
	return _.isEqual(filterObj1, filterObj2)
}


export const filterFormArr = (obj, accountSetList, sobCodeListArr, selfAcountTreeList) => {
	let filterForm = {};
	if (obj.treeType == '3') {
		filterForm['1.账户类型'] = '统计账套';
		filterForm['2.账户名称'] = accountSetList.filter(item => obj.accountSet.includes(item.value)).map(item => item
			.label);
	} else if (obj.treeType == '1') {
		filterForm['1.账户类型'] = '投资经理';
		filterForm['2.账户名称'] = sobCodeListArr;
	} else if (obj.treeType == '2') {
		filterForm['1.账户类型'] = '险种';
		filterForm['2.账户名称'] = obj.insuranceType;
	} else if (obj.treeType == '4') {
		filterForm['1.账户类型'] = '自定义账户';
		filterForm['2.账户名称'] = selfAcountTreeList.filter(item => obj.selfAcountTree.includes(item.value)).map(
			item => item.label);
	} else {
		filterForm = {}
	}
	return filterForm;
}

export const getTreeLabel = (array, targetvalue) => {
	let res = [];

	function traverse(arr) {
		arr.forEach(item => {
			if (item.children) {
				traverse(item.children)
			} else {
				if (targetvalue && targetvalue.includes(item.value)) {
					res.push(item.label)
				}
			}
		})
	}
	traverse(array);
	return res;
}

export const isEqualIgnoreArrayOrder = (obj1, obj2) => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// 检查属性名是否一致
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) {
		if (!keys2.includes(key)) return false;
	}

	// 检查每个属性值是否匹配
	for (const key of keys1) {
		const val1 = obj1[key];
		const val2 = obj2[key];

		// 如果是字符串，直接比较
		if (typeof val1 === 'string' && typeof val2 === 'string') {
			if (val1 !== val2) return false;
		}
		// 如果是数组，排序后逐项比较
		else if (Array.isArray(val1) && Array.isArray(val2)) {
			const sorted1 = [...val1].sort();
			const sorted2 = [...val2].sort();

			if (sorted1.length !== sorted2.length) return false;
			for (let i = 0; i < sorted1.length; i++) {
				if (sorted1[i] !== sorted2[i]) return false;
			}
		}
		// 类型不一致
		else {
			return false;
		}
	}

	return true;
}

function areValuesEqual(a, b) {
	const isNullOrEmpty = (val) => val === null || val === undefined || val === '';

	if (isNullOrEmpty(a) && isNullOrEmpty(b)) {
		return true;
	}

	if (isNullOrEmpty(a) || isNullOrEmpty(b)) {
		return false;
	}

	return a === b;
}
export const areObjectsEqual = (obj1, obj2) => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	// 检查对象的键是否完全一致（数量和内容）
	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (!obj2.hasOwnProperty(key)) {
			return false;
		}
	}

	// 比较每个属性的值
	for (const key of keys1) {
		if (!areValuesEqual(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}