
<template style="height: 100%;">
	<!-- <image src="/static/bg/main3.jpg"></image> -->

	<view class="bg-img" style="min-height: 100%;
    position: relative;">
		
	<getID v-if="enterGetID" @getChild1 = "handleGetIDEvent"></getID>
	<game v-if="enterGame" @getgame = "handleGetGameEvent"></game>
	<view v-if="(!enterGetID)&&(!enterGame)">
	
		<view class="solid-bottom text-lg padding-xs margin-xs-sm">
			<text class="text-white text-center">请设置玩家人数（不包含法官）以及角色</text>
		</view>
		
		
		<view class="radio"style="background-color: rgba(0,0,0,0);">
			<radio-group @change="radioChange">
				<label class="radiochoose" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value+''" :checked="item.value==baseNum " />
					</view>
					<view class="name "style="color:#c4eeff;">&nbsp;{{item.name}}</view>
				</label>
			</radio-group>
			
		</view>
		<view class="cu-list grid col-2 no-border" >
			<view class="cardimg" style="text-align: left;margin-bottom: 10px;" v-for="(item, index) in baseConfig" :key="item.value">
				<!-- <image class="icon" :src="sqlConfig[item.value].icon"></image> -->
				<view class=" clear"></view>
			
				<label class="input_name text-cut" style= color: wheat>{{item.name}}  {{item.base+'位'}}</label>
			
				<view class=" clear"></view>
				<view class="num" >
					<view class="add" :id="item.value" @click="inputAdd">+</view>
					<view class="less" :id="item.value" @click="inputLess">-</view>
				</view>
			</view>
		</view>
		<view class=" clear"></view>
		<view class="solid-bottom text-xl text-center ">
			<text class="text-red">点击加号或减号修改不同身份的数量</text>
				</view>
			
		<view class="solid-bottom text-xxl text-center margin-top-xl">
			<text class="text-red">剩余未选择角色数：{{unChooseNum}}</text>
		</view>
		<view class="footer" >
			<button class="cu-btn bg-red cg block"style="margin:0 auto;width: 100px;" @click="engterGame" v-show="unChooseNum==0">开始游戏</button>
		</view>
			
	</view>
		
		
		<!-- <van-button type="danger" @click="tryAdd">test cloud</van-button> -->
		
	</view>

</template>

<script>
	import getID from "../../wxcomponents/game/getID.vue";
	import game from "../../wxcomponents/game/game.vue";
	export default {
		data() {
			return {
				title: 'Hello',
				items: [{
						value: 5,
						name: '5人',
						checked: 'true'
					},
					{
						value: 6,
						name: '6人'
					},
					{
						value: 7,
						name: '7人'
					},
					{
						value: 8,
						name: '8人'
					},
					{
						value: 9,
						name: '9人'
					},
					{
						value: 10,
						name: '10人'
					},
					{
						value: 11,
						name: '11人'
					},
					{
						value: 12,
						name: '12人'
					}
				],
				role: [{
						num: 5,
						config: [{
								value: 1,
								name: '狼人',
								base: 2
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
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 0
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 6,
						config: [{
								value: 1,
								name: '狼人',
								base: 2
							},
							{
								value: 2,
								name: '猎人',
								base: 0
							},
							{
								value: 3,
								name: '平民',
								base: 3
							},
							{
								value: 4,
								name: '预言家',
								base: 0
							},
							{
								value: 5,
								name: '丘比特',
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 7,
						config: [{
								value: 1,
								name: '狼人',
								base: 2
							},
							{
								value: 2,
								name: '猎人',
								base: 0
							},
							{
								value: 3,
								name: '平民',
								base: 3
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
							},
							{
								value: 6,
								name: '女巫',
								base: 0
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 8,
						config: [{
								value: 1,
								name: '狼人',
								base: 3
							},
							{
								value: 2,
								name: '猎人',
								base: 1
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
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 9,
						config: [{
								value: 1,
								name: '狼人',
								base: 3
							},
							{
								value: 2,
								name: '猎人',
								base: 1
							},
							{
								value: 3,
								name: '平民',
								base: 3
							},
							{
								value: 4,
								name: '预言家',
								base: 1
							},
							{
								value: 5,
								name: '丘比特',
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 10,
						config: [{
								value: 1,
								name: '狼人',
								base: 3
							},
							{
								value: 2,
								name: '猎人',
								base: 1
							},
							{
								value: 3,
								name: '平民',
								base: 4
							},
							{
								value: 4,
								name: '预言家',
								base: 1
							},
							{
								value: 5,
								name: '丘比特',
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 11,
						config: [{
								value: 1,
								name: '狼人',
								base: 3
							},
							{
								value: 2,
								name: '猎人',
								base: 1
							},
							{
								value: 3,
								name: '平民',
								base: 5
							},
							{
								value: 4,
								name: '预言家',
								base: 1
							},
							{
								value: 5,
								name: '丘比特',
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 0
							}
						]
					},
					{
						num: 12,
						config: [{
								value: 1,
								name: '狼人',
								base: 4
							},
							{
								value: 2,
								name: '猎人',
								base: 1
							},
							{
								value: 3,
								name: '平民',
								base: 4
							},
							{
								value: 4,
								name: '预言家',
								base: 1
							},
							{
								value: 5,
								name: '丘比特',
								base: 0
							},
							{
								value: 6,
								name: '女巫',
								base: 1
							},
							{
								value: 7,
								name: '守卫',
								base: 0
							},
							{
								value: 8,
								name: '白痴',
								base: 1
							}
						]
					}
				],
				baseConfig: [{
						value: 1,
						name: '狼人',
						base: 2
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
						base: 0
					},
					{
						value: 6,
						name: '女巫',
						base: 0
					},
					{
						value: 7,
						name: '守卫',
						base: 0
					},
					{
						value: 8,
						name: '白痴',
						base: 0
					}
					
				],
				unChooseNum: 0, //未选择数
				baseNum: 5, //总数
				sqlConfig:null,
				enterGetID:false,
				enterGame:false,
			}

		},
		components:{
				getID,game
			},
		onLoad() {
			this.sqlConfig=getApp().globalData.sqlConfig;
		},
		onShareAppMessage(e) {  
		}, 
		onShow() {
		    try {
		        const value = uni.getStorageSync('refresh');
		        if (value) {
		            console.log(value);
					this.enterGame=false;
					this.enterGetID=false;
		            try {
		                uni.removeStorageSync('refresh');
		            } catch(e) {
		                // error
		            }
		        }
		    } catch(e) {
		        // error
		    }
		},
		methods: {
			radioChange: function(evt) {
				this.baseNum = parseInt(evt.target.value);
				for (let i = 0; i < this.role.length; i++) {
					if (this.role[i].num == evt.target.value) {
						this.baseConfig = this.role[i].config;
						break;
					}
				}
				this.inputChange();
			},
			inputChange: function() {
				let sum = 0;
				for (var i = 0; i < this.baseConfig.length; i++) {
					sum += parseInt(this.baseConfig[i].base);
				}
				this.unChooseNum = this.baseNum - sum;

			},
			inputAdd: function(evt) {
				console.log("go",evt.target );
				if (this.unChooseNum > 0) {
					for (var i = 0; i < this.baseConfig.length; i++) {
						if (evt && evt.target.id == this.baseConfig[i].value) {
							if(this.baseConfig[i].value!=1&&this.baseConfig[i].value!=3){
								if(this.baseConfig[i].base>0){
									break;
								}
							}
							this.baseConfig[i].base++;
								this.inputChange();
							break;
						}
					}
				
				}
			},
			inputLess: function(evt) {
					for (var i = 0; i < this.baseConfig.length; i++) {
						if (evt && evt.target.id == this.baseConfig[i].value) {
							if(this.baseConfig[i].base>0){
								this.baseConfig[i].base--;
								this.inputChange();
								break;
							}
							
						}
					}
					
			},
			engterGame:function(evt){
				if(this.unChooseNum>0){
					uni.showModal({
							title: '',
							content:"角色未分配完",
							showCancel:false,
							success: function(res) {
							if (res.confirm) {
							
							} else {
								console.log('点击了取消')
							}
						}
					})
					return ;
				}
			getApp().globalData.playerNum=this.baseNum;
			getApp().globalData.playerConfig=this.baseConfig;
			this.enterGetID=true;
			},
			handleGetIDEvent(){
				this.enterGame=true;//进入黑夜
				this.enterGetID=false;//隐藏获取身份环节
				console.log("收到了,跳到game");
			},
			handleGetGameEvent(){
				this.enterGame=false;
				this.enterGetID=false;
				console.log("收到了,跳到首页");
			},
			
		 tryAdd() {
		      let db = wx.cloud.database({evn:'main-3gaj9gsz2c577e76'})
		      let userBaseCollection = db.collection('user_base')
		      userBaseCollection.add({
		        data:{
		          name:'哈哈哈'
		        },
		        success: (res) => {
		          console.log(`这个是成功的回复`);
		          console.log(res);
		        }
		      })
		    }
		}
	}
</script>

<style>

	.title {
		margin: 10px 30px 10px 20px;
	}
.text-black{
	    font-weight: 900;
}
	.rest {
		float: right;
	}
	.num{
		width: 80px;
		height: 50px;
		  display: flex;
		    justify-content: space-between;
	}
	.clear {
		content: "020";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.radio {
		float: left;
		width: 100px;
		padding: 8px 0;
	}

	radio-group {
		width: 90px;
		margin-left: 10px;
	}

	radio {
		margin-right: 10px;
		float: left;
		
	}
	.radiochoose{
		width: 100%;
	vertical-align: middle;
		line-height: 30px;
	}
.name{
	font-weight: 900;
	float: left;
	width: 40px;
}
	.name:after {
		content: "020";
		display: block;
		height: 5px;
		clear: both;
		visibility: hidden;
	}
	.icon{
		width: 64px;
		height: 64px;
	}
	.inputbox {
		margin: 30px 0;
		float: right;
		width: 200px;
	}

	.inputlist {
		float: left;
		width: 50%;
		margin: 20px 0;
	}
	 .cardimg{
		 background: url("/static/bg/card.png") ;
		background-size:  100% 100%;
	 background-repeat: no-repeat; /* 防止图片重复 */
	  display: flex;
	     flex-direction: column;
	     align-items: center;
	     justify-content: space-between;
		   width: 100%;
		     min-height: 120px; /* 根据实际子元素高度调整 */
		
	} 
.input_name{
	margin: 20rpx 20rpx 0;
}
	.input_name {
	    margin: 20rpx 20rpx 0;
	    font-weight: 900;
	    /* 移除float，因为在flex布局下不需要 */
	}
	.inputlist input {
		float: left;
		/* width: 50px; */
		   font-weight: 900;
		
	}
.cu-list.grid {
    background:none;
    text-align: center;
}
	.inputlist input {
		margin-left: 5px;
		width: 20px;
		border-bottom: 1px solid #000;
	}

	.add,
	.less {
		margin: 5px ;
		color: #ff7a00;
		font-size: 20px;
		
		border: 1px solid;
		border-radius: 50%;
		text-align: center;
		width: 28px;
		height: 28px;
		line-height: 25px;
		transition: transform 0.3s ease; /* 添加变换动画 */
		  transform: scale(1); /* 初始大小 */
	}
	.add:active,
	.less:active  {
  transform: scale(1.1); /* 点击时放大1.1倍 */
}
	.less {
		
	}
	
</style>
