export function addData(arr, obj) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id == obj.deptId) {
			obj.label = obj.nickName;
			arr[i].children = arr[i].children || [];
			arr[i].children.push(obj)
		} else {
			if (arr[i].children && arr[i].children.length > 0) {
				addData(arr[i].children, obj)
			}
		}
	}
}

// 递归查看是否存在数据
function findElement(array) {
	let found = false;
	array.some(item => {
		if (Array.isArray(item.children)) {
			found = findElement(item.children); // 递归调用
		} else {
			found = !item.id && !item.children;
		}
		return found; // 如果找到值，中断遍历
	});
	return found;
}

// 递归删除不存在数据得对象
export function changedata(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children && arr[i].children.length > 0) {
			if (!findElement(arr[i].children)) {
				arr.splice(i, 1);
				i--;
			} else {
				changedata(arr[i].children)
			}
		} else {
			if (arr[i].id) {
				arr.splice(i, 1);
				i--;
			}
		}
	}

}

// 递归得到数组最下层数据得ID集合
export function getIdArr(nodes) {
	let ids = [];
	nodes.forEach(node => {
		if (node.children && node.children.length) {
			getLeafIds(node.children, ids);
		} else {
			ids.push(node.authCode);
		}
	});
	return ids;
}
// 查看原数组和权限数组得对应关系   参数：权限数组，原数组得id
export function getOneIdArr(nodes,id){
	let arr = nodes.map(item=>item.authCode)
	return arr.includes(id);
}

// 给数组排序  参数：原数组，权限数组
export function sortArr(nodes,nodes1){
	nodes.sort((a, b) => {
	  if (getOneIdArr(nodes1,a.authCode) && !getOneIdArr(nodes1,b.authCode)) {
	    return -1; // a在前
	  }
	  if (!getOneIdArr(nodes1,a.authCode) && getOneIdArr(nodes1,b.authCode)) {
	    return 1; // b在前
	  }
	  return 0; // 顺序不变
	});
}