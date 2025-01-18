<template name="getID">
	<view class="bg-img" >
		<view class="solid-bottom text-lg padding">
			<text class="text-white">当前局内玩家数：{{playerNum}}</text>
		</view>
		<view class="solid-bottom text-lg padding" v-if="!finish">
			<text class="text-white">请玩家{{nowNum}}领取身份牌</text>
		</view>
		
		<view class="footer" >
				<button class="cu-btn bg-red cg block"style="margin:0 auto;width: 100px;" @click="getID">领取</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "getID",
		props: {
				"ff": {
					type: String,//属性类型
					value: "值"
				},
			},
		data() {
			return {
				playerNum:6,
				nowNum:1,//当前玩家数
				finish:false,
				playerConfig:[],
				randomList:[]
				
			}},
			methods:{
				getConfig(){
					let namedan=""
					for (let i = 0; i < this.playerConfig.length; i++) {
						for (let j = 0; j <parseInt(this.playerConfig[i].base) ; j++) {
							this.randomList.push(parseInt(this.playerConfig[i].value)); 
						
						}
					}
					  var len = this.randomList.length;
					    for (var i = 0; i < len - 1; i++) {
					        var index = parseInt(Math.random() * (len - i));
					        var temp = this.randomList[index];
					        this.randomList[index] = this.randomList[len - i - 1];
					        this.randomList[len - i - 1] = temp;
							
					    }
						for(let d=0;d<this.randomList.length;d++){
								namedan+=((d+1)+"号"+getApp().globalData.sqlConfig[this.randomList[d]].name+',');
						}
						console.log(this.randomList);
						console.log(namedan);
					    // return arr;
					 // this.randomList.sort(function(){
					 //             return Math.random()-0.5;
					 // });
				},
				getID(){
					let that=this;
					uni.showModal({
							title: '玩家'+that.nowNum+ '你的身份为',
							content:getApp().globalData.sqlConfig[that.randomList[that.nowNum-1]].name ,
							showCancel:false,
							success: function(res) {
							if (res.confirm) {
								if(that.nowNum==that.playerNum){
									that.finish=true;
									that.entergame();
									return;
								}
								that.nowNum++;
							} else {
								console.log('点击了取消')
							}
						}
					})
				
				},
				entergame(){
					getApp().globalData.playerList=this.randomList;
					uni.showModal({
							title: '',
							content: '全部游戏身份领取结束，进入游戏阶段',
							showCancel:false,
							success: function(res) {
							if (res.confirm) {
								console.log('点击了确认')
								this.$emit("getChild1");
								
							} else {
								console.log('点击了取消')
							}
						}.bind(this) // 确保回调函数中的 this 指向 Vue 实例
					}) 
				}
				
			},
			updated(){
			
			},
				beforeMount() {
					console.log("getid页面获取配置");
					this.playerNum=getApp().globalData.playerNum;
					this.playerConfig=getApp().globalData.playerConfig;
					this.getConfig();
					},
			
			}

</script>

<style>
</style>
