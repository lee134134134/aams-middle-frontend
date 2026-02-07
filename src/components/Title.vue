<template>
	<div style="display:flex;">
		<div class="icon-title"></div>
		<div class="title">
			<h6>
				{{ title }}
			</h6>
			<div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		title: {
			type: String,
			default: "",
		},
	});
</script>

<style scoped lang="scss">
	.icon-title{
		height: 20px;
		width:5px;
		border-radius: 5px;
		background-color: #2173F7;
	}
	.title {
		height: 20px;
		// border-left: 6px solid #3071c3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0px 0px 12px 0px;
		padding-left: 3px;
		box-sizing: border-box;

		h6 {
			font-size: 16px;
			font-weight: 600;
			line-height: 30px;
		}

		div {
			display: flex;
			align-items: center;
			height: 100%;
			font-size: 14px;
			color: #787878;
		}
	}
</style>