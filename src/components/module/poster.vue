<template>
	<div class="poster">
		<div class="title">
			<div style="width: 0.7rem;height: 0.7rem;display: inline-block;background: red;border-bottom-left-radius: 100%;border-top-right-radius: 100%;"></div>
			<div style="display: inline-block;">{{data.name}}</div>
		</div>
		<div class="flex">
			<div class="cart" v-for="item in data.contents" @click="toDetail(item)">
				<div class="cart-img">
					<img :src="item.poster"/>
				</div>
				<div class="cart-name">
					<div class="name">{{item.name}}</div>
					<div class="aword">{{item.aword}}</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		name:"poster",
		data(){
			return {
				data:{}
			}
		},
		props: {
			pageDate: {
				type: Object,
				default: {}
			}
		},
		created(){
			let arrayDate = this.pageDate;
			var x=0;
			while (arrayDate.contents.length%3 != 0){
				console.log("不能整除3，删除数组最后一个元素");
				arrayDate.contents.pop();
			}
			this.data=arrayDate;
		},
		methods:{
			toDetail:function(e){
				this.$router.push('/detail?mid='+e.mid+'&template='+e.template);
			}
		}
	}
</script>

<style>
	.poster>.title{
		height: 2.1rem;
		line-height: 2.1rem;
		text-align: left;
   		margin-left: 0.1rem;
	}
	.poster .flex>.cart{
		flex:0 0 6rem;
		margin:0 0.3rem 0.3rem 0;
	}
	.poster .flex>.cart img{
		width: 6rem;
		height: 8.4rem;
	}
</style>