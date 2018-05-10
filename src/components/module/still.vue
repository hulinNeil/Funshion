<template>
	<div class="still">
		<div class="title">
			<div style="width: 0.7rem;height: 0.7rem;display: inline-block;background: red;border-bottom-left-radius: 100%;border-top-right-radius: 100%;"></div>
			<div style="display: inline-block;">{{data.name}}</div>
		</div>
		<div class="flex">
			<div class="cart" v-for="(item,index) in data.contents" @click="toDetail(item)">
				<div class="cart-img" >
					<img :src="item.still" />
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
		name:"still",
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
			if(arrayDate.contents.length%2 != 0){
				console.log("是奇数，删除数组最后一个元素");
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
	.flex{
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		padding: 0 0.4rem 0 0.7rem;
	}
	.still>.title{
		height: 2.1rem;
		line-height: 2.1rem;
		text-align: left;
   		margin-left: 0.1rem;
	}
	.still .flex>.cart{
		flex:0 0 9.15rem;
		margin:0 0.3rem 0.3rem 0;
	}
	.still .flex>.cart img{
		width: 9.15rem;
		height: 5.146875rem;
	}
	.cart-name{
		height: 2.5rem;
		line-height: 1.25rem;
		margin: 0.3rem 0;
		text-align: left;
		overflow: hidden;
	}
	.name{
		font-size: 0.8rem;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.aword{
		font-size: 0.7rem;
		color: #7f8c8d;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>