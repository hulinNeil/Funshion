<template>
	<div id="app">
		<div class="nav" ref="wrapper">
			<ul ref="slider">
				<li v-for='(item,index) in tabs' @click="changeTab(index)">{{item.name}}</li>
			</ul>
		</div>
		<router-view class="view" :pageIndex="pageIndex" :tab="tabs"></router-view>
	</div>
</template>

<script>
	import BSscroll from "better-scroll"
	export default {
		name: 'app',
		data() {
			return {
				logoMsg: "my name is vue!",
				name: "",
				tabs: [],
				pageIndex:0
			}
		},
		watch:{
			"pageIndex":function(val){
				console.log("pageIndex发生变化",val);
				let children = this.$refs.slider.children,
					length = children.length;
				for (let i = 0;i<length;i++) {
					children[i].removeAttribute('class');
				}
				children[val].setAttribute('class','active');
			}
		},
		created() {
			this.$http.get('http://po.funshion.com/v7/config/channel').then(function(e) {
				var n = ["cmedia", "cstill", "cvariety", "csiterec"],
					o = e.body.channels.filter(function(t) { //得到影视页面的tab的东西，template为cvideo是短视频的东西
						return n.indexOf(t.template) > -1
					});
				this.tabs = o;
				this.$nextTick(function() {
					this._setStyle();
					this._initScrollX();
				})
			})
		},
		methods: {
			_initScrollX: function() {
				console.log('初始化scroll');//初始化组件不能整到template的第一个节点
				this.slider = new BSscroll(this.$refs.wrapper,{
					starX:0,
					scrollX:true,
					click:true
				})
			},
			_setStyle:function(){//设置nav的width和li的color
				let nav = this.$refs.slider,
					children = this.$refs.slider.children,
					widths = 0;
				for (let i = 0;i<children.length;i++) {
					if(i == 0){
						children[i].setAttribute('class','active')
					}
					let width = children[i].clientWidth;
					widths += width;
				}
				nav.style.width = widths + 'px';
			},
			changeTab:function(index){
				this.pageIndex = index;
			},
			getMsg: function(msg) {
				sonsole.log('上个页面传过来的数据', msg);
				this.name = msg;
			}
		}
	}
</script>

<style>
	body{
		padding: 0;
		margin: 0;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	.nav {
		height: auto;
		line-height: 2.1rem;
		height: 2.1rem;
		border: 1px solid #EAEAEA;
		overflow: hidden;
	}
	.nav ul{
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.nav li{
		padding: 0 10px;
		float: left;
	}
	.nav li.active{
		color: red;
	}
</style>