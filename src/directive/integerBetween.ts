// 自定义指令 v-integer-between
const integerBetween = {
  // 当被绑定的元素挂载到 DOM 中时……
  beforeMount(el, binding) {
    // 解析指令参数（即0,100），并转换为数字
    const [min, max] = [0,100];
    // 为输入框添加 input 事件监听器
    el.addEventListener('input', (event) => {
      // 获取输入框的当前值
      const inputValue = event.target.value;
      // 尝试将输入值转换为整数
      const numericValue = parseInt(inputValue, 10);

      // 检查值是否为NaN或者超出范围
      if (isNaN(numericValue) || numericValue < min || numericValue > max) {
        // 如果值无效，则阻止输入或将其设置为范围内的值
        event.preventDefault(); // 阻止默认行为
        // 这里可以设置为最小值或最大值，或者直接清空
        event.target.value = numericValue >= min ? (numericValue <= max ? numericValue : max) : min;
      }
    });
  },
  // 当指令与元素解绑时
  unmounted(el) {
    // 移除事件监听器
    el.removeEventListener('input');
  }
};


const integer = {
  install: function (app: any) {
    app.directive('integer', integerBetween)
  }
};
export default integer;
