<template>
	<div class="page showAll">
		<div class="title">
			<div>简介</div>
			<div @click="close">
				<img src="./../img/close.png"/>
			</div>
		</div>
		<div class="body">
			<div class="body-info">
				<p v-if="profile.director">导演：{{profile.director}}</p>
				<p v-if="profile.actor">主演：{{profile.actor}}</p>
				<p v-if="profile.category">类型：{{profile.category}}</p>
				<p v-if="profile.release">更新：{{profile.release}}</p>
			</div>
			<div class="body-cont">
				<p v-if="profile.description">
					{{profile.description}}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { decode, base64_encode } from './../js/getPlayUrl';
	import BSscroll from "better-scroll"
	export default {
		name: "detail",
		data() {
			return {
				profile:{}
			}
		},
		created() {
			console.log("详细信息", this.$route.params.mediaDetail);
			this.profile = this.$route.params.mediaDetail;
		},
		methods: {
			close() {
				history.back();
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background: #EAEAEA;
	}
	
	.showAll {
		height: 100%;
		width: 100%;
		overflow-y: scroll;
    	 overflow-x: hidden;
		padding-top: 11.25rem;
		position: fixed;
		top: 0;
		z-index: 1;
		color: #7F8C8D;
	}
	.showAll::-webkit-scrollbar{
		width: 0px;
		height: 0px;
	}
	.showAll .title{
		display: flex;
		padding: 0.1rem 0.4rem;
		border-bottom: 1px solid #7F8C8D;
		line-height: 1.8rem;
		justify-content: space-between;
	}
	.showAll .title div{
		height: 1.7rem;
	}
	.showAll .title img{
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.3rem;
	}
	.showAll .body{
		padding: 0.8rem 0.4rem 0;
		text-align: left;
		font-size: 0.8rem;
	}
	.showAll .body .body-info{
		line-height: 1.1rem;
		margin-bottom: 0.8rem;
	}
	.showAll .body .body-cont{
		text-indent:2em;
		line-height: 1rem;
	}
</style>