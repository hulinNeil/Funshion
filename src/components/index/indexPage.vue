<template>
	<div id="sliderPage">
		<transition name="slide-left">
			<router-view></router-view>
        </transition>
		<slide ref="slide" :initTime="initTime" :autoPlay="auto" :loop="auto" :showDot="auto" :isScroll="isScroll" :pageIndex="pageIndex" @setParentIndex="_changeTab">
			<div class="slider" v-for="(item,index) in tabContent">
				<div ref="scrollY" class="aa">
					<div ref="scrollYC">
						<div class="card" v-if="pageContent[index].blocks" v-for="block in pageContent[index].blocks">
							<div v-if="block.template == 'focus'">
								<focus-slider :pageDate="block" :pagesIsScroll="isScroll" :tabNum="index" @parentIsScroll="_isScroll"></focus-slider>
							</div>
							<div v-if="block.template == 'still'">
								<still :pageDate="block"></still>
							</div>
							<div v-if="block.template == 'poster'">
								<poster :pageDate="block"></poster>
							</div>
						</div>
					</div>
				</div>
			</div>
		</slide>
	</div>
</template>
<script>
	import BSscroll from "better-scroll"
	import Slide from './../slide/slide.vue'
	import FocusSlider from './focusSlider.vue'
	import Still from './../module/still.vue'
	import Poster from './../module/poster.vue'
	
	export default {
		data() {
			return {
				tabContent: [], //tabbar的数据
				pageContent: [], //每个tab页面的数据
				initTime: false,
				auto: false,
				isScroll: true,
				da:[1,2,3,4,5,6,7,8,8,8,8,8]
			}
		},
		props: {
			pageIndex: {
				type: Number,
				default: 0
			},
			tab: {
				type: Array,
				default: []
			}
		},
		created() {
			let t = this;
			this._getPageDate(1, 0);
		},
		watch: {
			"pageIndex": function(val) {
				let tab = this.tab,
					pageContent = this.pageContent,
					nextId = val + 1,
					previousId = val - 1;
				if(!pageContent[val] || !pageContent[val].blocks) {//加载当前页面
					this._getPageDate(tab[val].nav_id, val);
				} else {
					console.log("这个页面有数据，不要init了~");
				}
				if(previousId>0 && !pageContent[previousId].blocks){//加载上一个页面的数据
					this._getPageDate(tab[previousId].nav_id, previousId);
				}
				if(nextId<pageContent.length && !pageContent[nextId].blocks){//加载下一个页面的数据
					this._getPageDate(tab[nextId].nav_id, nextId);
				}
			},
			"tab": function(val) {
				let t = this,
					tabs = this.tab;
				this.tabContent = tabs;
				let a = new Array(tabs.length);
				for(let i = 0, length = a.length; i < length; i++) {
					if(!a[i]) {
						a[i] = {}
					}
				}
				this.pageContent = a;
				console.log("tab数据闯过来了", tabs);
				this._getPageDate(tabs[1].nav_id, 1);
				this.$nextTick(function() {
					this.initTime = true;
				})
			}
		},
		methods: {
			_initScrollY: function(tabIndex) {//初始化应该在滑动翻页的时候，不应该在创建的时候，只有第一个是在创建的时候，就像判断，是否init数据一样，卸载
				console.log('初始化第‘'+tabIndex+'’个pages的scrollY');//初始化组件不能整到template的第一个节点
//				this._initHeight(tabIndex);
				let w = window.innerWidth,
					h = window.innerHeight,
					ceil = h-2.1*w/20,
					scrollY = this.$refs.scrollY[tabIndex];
				scrollY.style.height = ceil +'px';
				this.pageScrollY = new BSscroll(scrollY,{
					scrollY:true,
					click:true
				})
			},
			_initHeight: function(tabIndex) {
				console.log('初始化第‘'+tabIndex+'’个pages的height');
				console.log(this.$refs.scrollYC[tabIndex].clientHeight)
				let scrollYC = this.$refs.scrollYC[tabIndex],
					scrollYchild = this.$refs.scrollYC[tabIndex].children,
					heights = 0;
				for(let i=0,length=scrollYchild.length;i<length;i++){
					let height = scrollYchild[i].clientHeight;
					heights += height
				}
				console.log(heights);
				scrollYC.style.height=heights+"px";
				console.log(this.$refs.scrollYC[tabIndex].clientHeight)
			},
			_changeTab: function(e) {
				this.$parent.pageIndex = e;
			},
			_getPageDate: function(navId, tabIndex) {
				window.aa = this;
				let t = this;
				this.$http.get("http://po.funshion.com/v6/config/channelhome?nav_id=" + navId).then(function(e) {
					t.pageContent.splice(tabIndex, 1, e.body);
					console.log("t.pageContent=", t.pageContent);
					this.$nextTick(function() {
						this._initScrollY(tabIndex);
					})
				})
			},
			_isScroll: function(e) {
				if(!e) { //还得判断一下，当前显示页面是否是投票、页面
					console.log("不嫩滑动")
					this.isScroll = false;
				} else {
					console.log("可以滑动了");
					this.isScroll = true;
				}
			}
		},
		components: {
			FocusSlider,
			Still,
			Poster,
			Slide
		}
	}
</script>
<style>
	.card{
		margin-bottom: 0.3rem;
		background: #fff;
	}
	#sliderPage>div {
		width: 100%;
		overflow: hidden;
	}
	
	.slider {
		float: left;
		overflow: hidden;
		background: #EAEAEA;
	}
	.slide .slide-group .slide-item img{
		width: 20rem;
		height: 8rem;
	}
	.slide-left-enter-active, .slide-left-leave-active {
	  transition: all .3s
	}
	.slide-left-enter, .slide-left-leave-to{
	  transform: translateX(20rem);
	}
</style>