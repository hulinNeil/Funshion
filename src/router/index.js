import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/index/indexPage'
import Detail from '@/components/detail/detail'
import ShowAll from '@/components/detail/showAll'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'indexPage',
			component: indexPage,
			children: [{
					path: 'detail',
					component: Detail,
					children: [{
							path: 'showAll',
							name:"showAll",
							component: ShowAll
						}
					]
				}
			]
		}
	]
})