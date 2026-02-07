<template>
	<el-config-provider :locale="locale">
		<div class="nav" v-if="isShow">
			<span v-for="(item, i) in $router.options.routes" :key="i">
				<router-link :to="{ name: item.name }">{{ i + 1 }}：{{ item.meta.title }}</router-link>
				<br v-if="i===17">
			</span>
		</div>
		<router-view v-slot="{ Component }">
			<KeepAlive>
				<component :is="Component" :key="$route.meta.name" v-if="$route.meta?.keepAlive"></component>
			</KeepAlive>
			<component :is="Component" v-if="!$route.meta?.keepAlive"></component>
		</router-view>
	</el-config-provider>
</template>

<script>
	import {
		RouterView
	} from "vue-router";
	import {
		ElConfigProvider
	} from "element-plus";
	import zhCn from "element-plus/es/locale/lang/zh-cn";
	import userInfor from "@/utils/user.js";

	export default {
		data() {
			return {
				isShow: ["local", "dev"].includes(import.meta.env.VITE_APP_NODE_ENV),
			};
		},
		components: {
			ElConfigProvider,
		},
		setup() {
			return {
				locale: zhCn,
			};
		},
		created() {
			userInfor();
		},
	};
</script>
<style lang="scss">
	:deep(#app .boxx) {
		width: 360px !important;
	}

	.nav {
		padding-top: 5px;

		a {
			margin: 5px;
		}

		a.active,
		.router-link-active {
			color: #fff;
			background-color: #3071c3;

			&:hover {
				background-color: #3071c3 !important;
				color: #fff;
			}
		}
	}

	.custom-box {
		z-index: 3100 !important;
	}

	// .el-dialog:not(.is-fullscreen) {
	//   margin-top: 10vh !important;
	// }
	
</style>