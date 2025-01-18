<script>
	export default {
		//1、首先行动的是盗贼、丘比特，只能在首夜行动，然后行动的是情侣、野孩子，以上四个是只有第一个夜晚才能行动的。

// 2、每晚都能行动的顺序是守卫、狼人，注意特殊技能狼人需要手势示意，然后是狼美人、女巫、预言家，最后是驯熊师、禁言长老、猎人。

// 3、隐狼也是仅首夜行动的，但它的行动顺序在狼人之后
		globalData: {
			sqlConfig: {
				1: {
					name: "狼人",
					icon: "/static/icon/lang.jpg",
					pos:"-8px -4px",
					explain: "天黑杀死一个人"
				},
				2: {
					name: "猎人",
					icon: "/static/icon/lieren.jpg",
					pos:"-71px -7px",
					explain: "被投票出局可带走一个人，被毒药毒死不能发动技能"
				},
				3: {
					name: "平民",
					icon: "/static/icon/pingmin.jpg",
					pos:"-139px -4px",
					explain: "没有任何特殊能力，天黑时闭着眼睛"
				},
				4: {
					name: "预言家",
					icon: "/static/icon/yuyanjia.jpg",
					pos:"-205px -4px",
					explain: "天黑可以查验一个人的身份"
				},
				5: {
					name: "丘比特",
					icon: "/static/icon/qiubite.jpg",
					pos:"-8px -72px",
					explain: "第一个晚上，指定两人成为情侣，一个人死去，另一个人也会出局。当其中一个人为狼人时，情侣需要杀死其他所有玩家才能获胜"
				},
				6: {
					name: "女巫",
					icon: "/static/icon/nvwu.jpg",
					pos:"-71px -72px",
					explain: "拥有一瓶解药和毒药"
				},
				7: {
					name: "守卫",
					icon: "/static/icon/shouwei.jpg",
					pos:"-139px -72px",
					explain: "每晚守卫指定一个玩家，该玩家当晚会受到保护，不会被狼人杀害，但不能连续两晚守卫同一个人"
				},
				8: {
					name: "白痴",
					icon: "/static/icon/baichi.jpg",
					pos:"-205px -72px",
					explain: "白痴在夜里不会被狼人杀害！被投票出局时，可以继续游戏而不被淘汰，但失去了投票资格"
				},
			},
			iconpos:["-8px -4px","-71px -7px","-139px -4px","-205px -4px",
			"-8px -72px","-71px -72px","-139px -72px","-205px -72px",
			"-8px -140px","-71px -140px","-139px -140px","-205px -140px",
			],
			playerList: [1, 2, 3], //分配出来的顺序
			playerNum: 7,
			playerConfig: [{
					value: 0,
					name: '狼人',
					base: 2
				},
				{
					value: 1,
					name: '女巫',
					base: 1
				},
				{
					value: 2,
					name: '猎人',
					base: 0
				},
				{
					value: 3,
					name: '平民',
					base: 2
				},
				{
					value: 4,
					name: '预言家',
					base: 1
				},
				{
					value: 5,
					name: '丘比特',
					base: 1
				}
			]
		},
		onLaunch: function() {
			// if (!wx.cloud) {
			// 	console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			// } else {
			// 	wx.cloud.init({
			// 		env: 'main-3gaj9gsz2c577e76',
			// 		traceUser: true
			// 	})
			// 	console.log('App Launch')
			// }
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	page{
		background-color:rgb(3, 20, 48);
	}
	
	.footer {
	       position: fixed;
	       left: 0;
	       bottom: 50px;
	       width: 100%;
	       height: 40px;
	   }
</style>
