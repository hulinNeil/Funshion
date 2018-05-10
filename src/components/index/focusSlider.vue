<template>
	<div class="slide-content" :tab-id="tabNum">
		<slide ref="slide" :initTime="initTime" @parentIsScroll="_setParentScroll">
			<div v-for="item in items" :data-id="item.name" @click="toDetail(item)">
				<a>
					<img :src="item.banner">
				</a>
			</div>
		</slide>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Slide from './../slide/slide.vue'

	export default {
		data() {
			return {
				items: [],
				initTime: false
			}
		},
		props: {
			tabId: {
				type: String,
				default: '1'
			},
			pageDate: {
				type: Object,
				default: {}
			},
			pagesIsScroll:{
				tyte:Boolean,
				default:true
			},
			tabNum:{
				tyte:Number,
				default:0
			}
		},
		watch:{
			"pageDate":function(val){
				console.log("pageDateb变化后数据",val);
				this.items = val.contents;
				this.initTime = true;
			}
		},
		created() {
			this.items = this.pageDate.contents;
			this.initTime = true;
		},
		methods:{
			_setParentScroll:function(e){
				this.$emit('parentIsScroll',e);//传输局给父级页面
			},
			toDetail:function(e){
				this.$router.push('/detail?mid='+e.mid+'&template='+e.template);
			}
		},
		components: {
			Slide
		}
	}
</script>
<style>
	.slide-wrapper {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 40%;
		overflow: hidden;
	}
	
	.slide-wrapper .slide-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>