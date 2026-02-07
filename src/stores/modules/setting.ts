//小仓库:loading组件相关配置仓库
import { defineStore } from "pinia";

let settingStore = defineStore('settingStore', {
    state: () => {
        return {
           loading:false
        }
    }
})

export default settingStore;