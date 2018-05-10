<template>
	<div class="page detail" ref="detail">
		<img @click="back" class="back" src="./../img/back2.png">
		<video-player :videoUrl="videoUrl"></video-player>
		<div class="title detailCart">
			<div class="playNum">
				播放： {{mediaDetail.vv}}
			</div>
			<div class="mediaTitle">
				<div class="mediaName">{{mediaDetail.name}}</div>
				<div class="mediaDetail" @click="showDetail" v-if="template!=='vplay'">详情 ></div>
			</div>
		</div>
		<transition name="slide-left">
			<router-view></router-view>
        </transition>
		<div class="selections detailCart" v-if="playList.length>1">
			<div class="mediaTitle">
				<div style="flex:1;text-align: left;font-size: 0.9rem;">选集</div>
				<div class="mediaDetail" @click="showAll">更新至{{playList.length}}集</div>
			</div>
			<div style="padding: 0.3rem 0;overflow: hidden;" ref="selectionScroll">
				<div class="selection" ref="selection">
					<div v-for="(item,index) in playList" :class="index == 0 ? 'active' : ''" @click="selectNum(item.id,index)">{{item.num}}</div>
				</div>
			</div>
		</div>
		<div class="otherVideo">
			<div class="detailCart" v-for="item in otherVideo">
				<div class="mediaTitle">
					<div style="flex:1;text-align: left;">{{item.name}}</div>
					<div class="mediaDetail" @click="showAll">{{item.contents.length}}</div>
				</div>
				<div style="padding: 0.3rem 0;overflow: hidden;" ref="selectionScroll">
					<div class="otherList">
						<div class="cart" v-for="(list,index) in item.contents" @click="toDetail(list.id,list.template)">
							<div class="cart-img" >
								<img :src="list.still"/>
							</div>
							<div class="cart-name">
								<div class="name">{{list.name}}</div>
								<div class="aword">{{list.aword}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { decode, base64_encode } from './../js/getPlayUrl.js';
	import BSscroll from "better-scroll"
	import videoPlayer from './../module/videoPlayer.vue'
	export default {
		name: "detail",
		components: {
			videoPlayer
		},
		data() {
			return {
				data: {},
				quality: "dvd",
				hashId: "",
				playRequestParam: {},
				filename: "",
				videoUrl: "",
				mediaDetail: {},
				playList: [],
				otherVideo:[],
				template:""
			}
		},
		props: {},
		watch:{
			"playList":function(){
				this.$nextTick(function(){
					//this._initPlayList();
				})
			}
		},
		created() {
			console.log(this.$route);
			var mediaId = this.$route.query.mid;
			this.template = this.$route.query.template;
			this._initPlayDetail(mediaId);
		},
		methods: {
			back() {
				history.back();
			},
			showDetail() {
				this.$router.push({name:'showAll',params: { mediaDetail: this.mediaDetail }});
			},
			toDetail(id,template){
				this.template = template;
				this._initPlayDetail(id);
				var a = this.$refs.detail;
				a.scrollTop = 0;
			},
			showAll() {
				console.log('显示所有剧集！')
			},
			selectNum(id,index){
				console.log('选择集数~',id,index);
				this._getPlayId(id);
				let clickElement = document.querySelectorAll('.selections .selection div')[index];
				if(clickElement.className != "active"){
					document.querySelector('.selections .selection .active').removeAttribute("class");
					clickElement.setAttribute("class","active");
				}
				
			},
			_initPlayDetail(mediaId){
				if(mediaId) {
					if(this.template == 'vplay'){
						this._getPlayId(mediaId);
					}else{
						this.$http.get("http://pm.funshion.com/v5/media/episode?id=" + mediaId).then(function(e) {
							console.log("这里是detail模块,得到连续集的详情", e.body);
							var id = e.body.episodes[0].id
							this._getPlayId(id);
							this.playList = e.body.episodes;
						})
					}
					this._getMediaMsg(mediaId);
					this._getOtherVideo(mediaId);
				} else {
					this.videoUrl = "no id";
				}
			},
			_initPlayList(){
				let selection = this.$refs.selection,
					children = this.$refs.selection.children,
					widths = 0;
//				for (let i = 0;i<children.length;i++) {
					let width = (2.7*window.innerWidth/20+2)*children.length;
					widths += width;
//				}
				selection.style.width = widths + 'px';
				this.slider = new BSscroll(this.$refs.selectionScroll,{
					starX:0,
					scrollX:true,
					click:true
				})	
			},
			_getOtherVideo(id) {
				this.$http.get("http://pm.funshion.com/v6/media/relate?id=" + id).then(function(e) {
					console.log("这里是detail模块,得到相关视频的列表", JSON.parse(e.bodyText));
					this.otherVideo = JSON.parse(e.bodyText).relates;
				})
			},
			_getMediaMsg(id) {
				if(this.template == 'vplay'){
					this.$http.get("http://pv.funshion.com/v5/video/profile?id=" + id).then(function(e) {
						console.log("这里是detail模块,得到播放的视频的信息详情", e.body);
						this.mediaDetail = e.body;
					})
				}else{
					this.$http.get("http://pm.funshion.com/v5/media/profile?id=" + id).then(function(e) {
						console.log("这里是detail模块,得到播放的视频的信息详情", e.body);
						this.mediaDetail = e.body;
					})
				}
			},
			_getPlayId(id) {
				console.log("即将去拿play的id" + id);
				if(this.template == 'vplay'){//短视频
					this.$http.get("http://pv.funshion.com/v7/video/play/?id=" + id).then(function(e) {
						console.log("这里是detail模块,得到播放的视频的信息详情", e.body);
						this._initPlayData(e.body.playlist), this._getCdnInfo();
					})
				}else{//连续集/电影
					this.$http.get("http://pm.funshion.com/v7/media/play/?id=" + id).then(function(e) {
						console.log("这里是detail模块,得到播放的视频的详情", e.body);
						this._initPlayData(e.body.playlist), this._getCdnInfo();
					})
				}
			},
			_getPlayUrl() {
				var url = '',
					param = this.playRequestParam,
					urlSearch = '?';
				if(param) {
					for(var i in param) {
						urlSearch = urlSearch + i + '=' + param[i] + '&';
					}
				}
				url = this.ipAdress + urlSearch;
				this.videoUrl = url;
				console.log('播放地址是', url);
			},
			_initPlayData(t) {
				var e = [],
					i = this.quality,
					r = {
						tv: 1,
						dvd: 2,
						hd: 3,
						sdvd: 4
					};
				t.forEach(function(t) {
					t.playinfo.forEach(function(i) {
						"h.264" == i.codec && (t.playinfo = i, e.push(t))
					})
				}), e.sort(function(t, e) {
					var i = t.playinfo,
						r = e.playinfo;
					return i.filesize = parseInt(i.filesize), r.filesize = parseInt(r.filesize), i.filesize > r.filesize ? -1 : i.filesize == r.filesize ? 0 : 1
				});
				var n = !1,
					s = e[e.length - 1];
				e.forEach(function(t) {
					n || r[t.code] <= r[i] && (s = t, n = !0)
				});
				console.log(s);
				var t = s && s.playinfo;
				console.log("t==", t);
				var p = this._getHashData(t);
				console.log("p==", p);
				p && (this.hashId = p.hashid, this.playRequestParam = {
					token: base64_encode(p.token),
					vf: t.vf
				}, t.filename && (this.filename = t.filename));
			},
			_getHashData(t) {
				console.log("得到hashid，参数为", t);
				if(t) {
					for(var e, i, r = 0; !e && r < 2;) {
						if(e = decode(t.infohash), 41 == e.length && /^[0-9a-f]*$/gi.test(e)) {
							for(var o = (e.substr(0, 40), 0), n = 0, a = e.length - 1; n < a; n++) o += parseInt(parseInt(e.substr(n, 1), 16), 10);
							var s = 15 & o;
							s.toString(16).toUpperCase() == e.substr(40) && (i = {
								hashid: e.substr(0, 40),
								token: decode(t.token)
							})
						}
						i || (e = null, t.infohash = t.infohash_prev, t.token = t.token_prev), r++
					}
					return i
				}
			},
			_getCdnInfo() {
				this.$http.get("http://jobsfe.funshion.com/query/v1/mp4/" + this.hashId + ".json").then(function(e) {
					console.log("这里是detail模块,得到播放的视频的ip地址：", JSON.parse(e.bodyText));
					let data = JSON.parse(e.bodyText);
					if(data.return && data.return == 'error'){
						alert("没得啊哦");
					}else{
						this.ipAdress = data.playlist[0].urls[0];
						this._getPlayUrl()
					}
				})
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
	#sliderPage>div.page.detail{
		 overflow-y: scroll;
    	 overflow-x: hidden;
	}
	.back {
		width: 1.5rem;
		height: 1.5rem;
		position: fixed;
		left: 0.4rem;
		top: 0.4rem;
		z-index: 10;
	}
	
	
	.detailCart {
		background: #fff;
		padding: 0.4rem 0.7rem;
		margin-bottom: 0.3rem;
	}
	
	.playNum {
		font-size: 0.7rem;
		color: #7f8c8d;
		line-height: 1.25rem;
		text-align: left;
	}
	
	.mediaTitle {
		display: flex;
		display: -webkit-flex;
		line-height: 1.5rem;
	}
	
	.mediaName {
		font-weight: 800;
		font-size: 0.9rem;
		text-align: left;
		flex: 1;
	}
	
	.mediaDetail {
		font-size: 0.7rem;
		color: #7F8C8D;
		width: 4rem;
		text-align: right;
	}
	/*.selection{
		height: 1.5rem;
	}*/
	.selection,.otherList{
	    overflow-x: scroll;
    	overflow-y: hidden;
    	white-space: nowrap;
    	text-align: left;
	}
	.selection>div {
		border: 1px solid #eee;
		padding: 0 1rem;
		display: inline-block;
		/*width: 2.4rem;
		float: left;*/
		height: 1.5rem;
		text-align: center;
		line-height: 1.5rem;
		margin-right: 0.3rem;
	}
	.selection .active{
		color: red;
	}
	.otherList>div{
		width: 8rem;
		margin-right: 0.3rem;
		display: inline-block;
	}
	.otherList>div img{
		width:8rem ;
		height: 4.42rem;
	}
	.otherList .cart-name{
		height: 2.2rem;
		line-height: 1.1rem;
	}
	.selection::-webkit-scrollbar,.otherList::-webkit-scrollbar,.page.detail::-webkit-scrollbar{
		width: 0px;
		height: 0px;
	}
</style>