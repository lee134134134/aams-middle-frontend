export let rule1 = {
	priAccountName: [{
		required: true,
		message: '请输入父账户名称',
		trigger: 'blur'
	},],
	secAccountNameOne: [{
		required: true,
		message: '请输入账户名称(子1)',
		trigger: 'blur'
	},],
	secAccountNameTwo: [{
		required: true,
		message: '请输入账户名称(子2)',
		trigger: 'blur'
	},],
}
export let rule2 = {
	priAccountName: [{
		required: true,
		message: '请输入父账户名称',
		trigger: 'blur'
	},]
}

export let getTableList = (pageNo, pageSize, list) => {
	const start = (pageNo - 1) * pageSize;
	const end = pageNo * pageSize;
	return list?.slice(start, end)
}