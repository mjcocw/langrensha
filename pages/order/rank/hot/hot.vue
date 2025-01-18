<template>
	<view class="bg">
		<view class="title">排行榜</view>
		<div class="hot-card ">
			<div v-for="(item,index) in rankList" class="list">
					<div class="fl" :class="index<3?'list-num1':'list-num'">{{item.rank}}.</div>
					<p style="color:blue">{{item.name}}</p>
					<p class="small">{{item.type}}</p>
			</div>

		</div>

		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankList: [{
						rank: 1,
						name: "王权骰铸：第一季重掷版",
						type: "2020 / 竞争 / 卡牌"
					},
					{
						rank: 2,
						name: "小城大案：罪恶都市",
						type: "2020 / 合作 / 美式"
					},
					{
						rank: 3,
						name: "钢铁大王—卡内基",
						type: "2021 / 混合 / 德式"
					},
					{
						rank: 4,
						name: "幽港迷城：雄狮之颚",
						type: "2020 / 合作 / 美式"
					},
					{
						rank: 5,
						name: "神秘大地：大盒版",
						type: "2019 / 竞争 / 德式"
					},
					{
						rank: 6,
						name: "超级梦幻大乱斗",
						type: "2019 / 竞争 / 美式"
					},
					{
						rank: 7,
						name: "名律对决",
						type: "2021 / 竞争 / 卡牌"
					},
					{
						rank: 8,
						name: "勃根地城堡：豪华版",
						type: "2019 / 混合 / 德式"
					},
					{
						rank: 9,
						name: "拉斯维加斯：豪华版",
						type: "2019 / 竞争 / 家庭"
					},
					{
						rank: 10,
						name: "污痕圣杯：阿瓦隆的陨落",
						type: "2019 / 合作 / 美式"
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style>
.bg{
	background-color: wheat;
	min-height: 100%;
	width: 100%;
	position: absolute;
}
.title{
	text-align: center;
	margin: 10px auto;
}
.list{
	margin: 5px;
	padding: 5px;
	background-color: antiquewhite;
}
.list-num1{
	color: red;
	}
.list-num{
	}
</style>
