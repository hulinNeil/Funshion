<template>
	<div class="slide" ref="slide">
		<div class="slide-group" ref="slideGroup">
			<slot>
			</slot>
		</div>
		<div v-if="showDot" class="dots">
			<span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
		</div>
	</div>
</template>
<script>
	import { addClass } from './../js/dom'
	import BScroll from 'better-scroll'
	const COMPONENT_NAME = 'slide'

	export default {
		name: COMPONENT_NAME,
		props: {
			initTime: { //新添加了一个值，默认不初始化数据，只有这个值变为true的时候才初始化
				type: Boolean,
				default: false
			},
			isScroll: { //新添加了一个值，默认可以滑动
				type: Boolean,
				default: true
			},
			pageIndex: {//添加pageIndex，作为page跳转
				type: Number,
				default: 0
			},
			loop: {
				type: Boolean,
				default: true
			},
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			},
			showDot: {
				type: Boolean,
				default: true
			},
			click: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dots: [],
				currentPageIndex: 0,
				isSetIsScroll:false
			}
		},
		watch: {
			"initTime": function(val) {
				if(val) {
					this.$nextTick(function() {
						this._setSlideWidth()
						if(this.showDot) {
							this._initDots()
						}
						this._initSlide()

						if(this.autoPlay) {
							this._play()
						}
					})
				}
			},
			"isScroll":function(val){
				this.slide.enable();//isScroll重新恢复事件
			},
			"pageIndex":function(val){
				this.slide.goToPage(val, 0, 0);
			}
		},
		mounted() {
			if(this.initTime) {
				this.$nextTick(function() {
					this._setSlideWidth()
					if(this.showDot) {
						this._initDots()
					}
					this._initSlide()

					if(this.autoPlay) {
						this._play()
					}
				})
			}

			window.addEventListener('resize', () => {
				if(!this.slide || !this.slide.enabled) {
					return
				}
				clearTimeout(this.resizeTimer)
				this.resizeTimer = setTimeout(() => {
					if(this.slide.isInTransition) {
						this._onScrollEnd()
					} else {
						if(this.autoPlay) {
							this._play()
						}
					}
					this.refresh()
				}, 60)
			})
		},
		activated() {
			if(!this.slide) {
				return
			}
			this.slide.enable()
			let pageIndex = this.slide.getCurrentPage().pageX
			if(pageIndex > this.dots.length) {
				pageIndex = pageIndex % this.dots.length
			}
			this.slide.goToPage(pageIndex, 0, 0)
			if(this.loop) {
				pageIndex -= 1
			}
			this.currentPageIndex = pageIndex
			if(this.autoPlay) {
				this._play()
			}
		},
		deactivated() {
			this.slide.disable()
			clearTimeout(this.timer)
		},
		beforeDestroy() {
			this.slide.disable()
			clearTimeout(this.timer)
		},
		methods: {
			refresh() {
				this._setSlideWidth(true)
				this.slide.refresh()
			},
			next() {
				this.slide.next()
			},
			_setSlideWidth(isResize) {
				this.children = this.$refs.slideGroup.children
				let width = 0
				let slideWidth = this.$refs.slide.clientWidth;
				for(let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					addClass(child, 'slide-item')

					child.style.width = slideWidth + 'px'
					width += slideWidth
				}
				if(this.loop && !isResize) {
					width += 2 * slideWidth
				}
				this.$refs.slideGroup.style.width = width + 'px'
			},
			_initSlide() {
				this.slide = new BScroll(this.$refs.slide, {
					scrollX: true,
					momentum: false,
					snap: {
						loop: this.loop,
						threshold: 0.3,
						speed: 400
					},
					click: this.click
				})

				this.slide.on('scrollEnd', this._onScrollEnd)

				this.slide.on('touchend', () => {
					if(this.autoPlay) {
						this._play()
					}
				})
				
				this.slide.on('beforeScrollStart', () => {
					if(!this.isScroll){//如果是false就不让这东西滑动
						this.slide.disable();
					}
					this.isSetIsScroll = true;
					this.$emit('parentIsScroll',false);//传输局给父级页面是否滑动
					if(this.autoPlay) {
						clearTimeout(this.timer)
					}
				})
			},
			_onScrollEnd() {
				let pageIndex = this.slide.getCurrentPage().pageX;
				if(this.isSetIsScroll){//是否是手動出發的華東造成的scrollend
					this.$emit('parentIsScroll',true);//传输局给父级页面---父页面是否可以滑动
					this.$emit('setParentIndex',pageIndex);//传输局给父级页面---父页面的pageIndex改变
					this.isSetIsScroll = false;
				}
				if(this.loop) {
					pageIndex -= 1
				}
				this.currentPageIndex = pageIndex
				if(this.autoPlay) {
					this._play()
				}
			},
			_initDots() {
				this.dots = new Array(this.children.length)
			},
			_play() {
				let pageIndex = this.slide.getCurrentPage().pageX + 1
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.slide.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		}
	}
</script>

<style>
	.slide {
		min-height: 1px;
		position: relative;
	}
	
	.slide .slide-group {
		position: relative;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.slide .slide-group .slide-item {
		float: left;
		box-sizing: border-box;
		overflow: hidden;
		text-align: center;
	}
	
	.slide .slide-group .slide-item a {
		display: block;
		width: 100%;
		overflow: hidden;
		text-decoration: none;
	}
	
	.slide .slide-group .slide-item img {
		display: block;
		width: 100%;
	}
	
	.slide .dots {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 12px;
		transform: translateZ(1px);
		text-align: center;
		font-size: 0;
	}
	
	.slide .dots .dot {
		display: inline-block;
		margin: 0 4px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
	}
	
	.slide .dots .dot.active {
		width: 20px;
		border-radius: 5px;
	}
</style>