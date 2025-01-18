<template name="getID">
	<view class="bg-img">
	<view class="restart"@click="restart">重新开始</view>
	<view class="tip text-white" @click="returnHome">{{tip}}</view>
	
	<view class="box">
	  <view class="left">
	   <view class="co" @click="openIcon" v-for="(item, index) in Math.ceil(playerList.length/2) "  :key="item" :id="index" >
			<view class="icon":class="[choose_class(index)]" :style="{backgroundPosition:iconPos[index]}"></view>
			<view class="name text-white">玩家{{index+1}}</view>
	   </view>
	  </view>
	  <view class="right">
	   <view class="co" @click="openIcon" v-for="(item, index) in playerList.length" v-if="index>=Math.ceil(playerList.length/2)" :key="item" :id="index" >
	  		
				<view class="icon":class="[choose_class(index)]" :style="{backgroundPosition:iconPos[index]}"></view>
				<view class="name text-white">玩家{{index+1}}</view>
	   </view>
	  </view>
	</view>
	<view   v-show="radioStop">
			<button class="cu-btn bg-red cg block"style="margin:0 auto;width: 100px;" @click="enterNext">确定操作</button>
	</view>
	<view  v-show="radioFinish">
			<button class="cu-btn bg-red cg block"style="margin:0 auto;width: 100px;" @click="start">进入黑夜</button>
	</view>
	<!-- <button v-show="radioStop" @click="enterNext">确定操作</button>
	<button v-show="radioFinish" @click="start">进入黑夜</button> -->
	</view>
	
</template>

<script>
	export default {
	data() {
		return {
			innerAudioContext:null,//语音包
			bgAudioContext:null,
			tip:"游戏开始",//操作提示
			radioStop:false,//出现可操作时暂停语音
			radioFinish:true,//全部语音播放完
			sqlConfig:null,//
			iconPos:[],
			nowNum:1,//当前玩家数
			timer:null,
			night:0,//当前天数
			downTime:0,
			eventId:0,//当前语音id
			radioNeeder:[],//需要播报的语音列表
			playerList:[],
			outList:[],//出局玩家
			dieArray:[],//这一回合出局玩家
			kill_wolf_num:-1,//用于控制点击样式
			kill_nvwu_num:-1,
			help_nvwu_num:-1,
			guard_shouwei_num:-1,
			last_shouwei_num:-1,//上一晚守卫的人
			guard_shot_num:-1,//白天枪杀目标
			vote_num:-1,
			shot_num:-1,
			love1_num:-1,
			love2_num:-1,
			choose_class(a){
				if(this.dieArray.indexOf(a.toString())>-1){
					return 'die';
				}
				if(this.outList.indexOf(a.toString())>-1){
					return 'out';
				}			
				if(a==this.love1_num )
					return 'love';
				if(a==this.love2_num )
					return 'love';
				if(a==this.vote_num ){
					if(a==this.guard_shot_num){
						return 'vote_shot';
					}
					else{
						return 'vote';
					}
				}
				
				if(a==this.shot_num)
					return 'shot';
				
				if(a==this.guard_shouwei_num )
					return 'guard_shouwei';
				if(a==this.kill_nvwu_num )
					return 'kill_nvwu';
				if(a==this.help_nvwu_num )
					return 'help_nvwu';
				if(a==this.kill_wolf_num )
					return 'kill_wolf';
				
					
				return 'defaultchoose';
			},
			gamekill_langren:-1,//操作结束结果
			gamekill_shot:-1,
			gamelove1_qiubite:-1,
			gamelove2_qiubite:-1,
			gamekill_nvwu:-1,
			gamehelp_nvwu:-1,
			gamecheck_yuyanjia:-1,
			gameguard_shouwei:-1,
			nowState:1,//操作状态
			ClickState:{
				'none':1,
				"shouwei":5,
				"langren":2,
				"nvwu":3,
				"yuyanjia":4,
				"qiubite":6,
				"end":7,
				"toupiao":8,
				"doubledie":9,
				"lieren":10,
			},
			radioList:{
				base:{
				des:"天黑请闭眼",
				url:"thqby"
				},
				qbt1:{
					des:"丘比特请睁眼",
					url:"qbtqzy",
					only:1,
				},
				qbt2:{
					des:"丘比特提醒",
					url:"丘比特内容",
					event:'qiubite',
					only:1,
				},
				qbt3:{
					des:"丘比特请闭眼",
					url:"qbtqby",
					only:1
				},
				ql1:{
					des:"情侣请睁眼",
					url:"qlqzy",
					event:'qinglv',
					only:1
				},
				ql2:{
					des:"情侣请闭眼",
					url:"qlqby",
					only:1
				},
				sw1:{
					des:"守卫请睁眼",
					url:"swqzy",
					event:'shouwei'
				},
				sw2:{
					des:"守卫请闭眼",
					url:"swqby"
				},
				lr1:{
					des:"狼人请睁眼",
					url:"lrqzy",
					event:'langren',
				},
				lr2:{
					des:"狼人请闭眼",
					url:"lrqby"
				},
				nw1:{
					des:"女巫请睁眼",
					url:"nwqzy",
					event:'nvwu',
				},
				nw2:{
					des:"女巫请闭眼",
					url:"nwqby"
				},
				yyj1:{
					des:"预言家请睁眼",
					url:"yyjqzy",
					event:'yuyanjia'
				},
				yyj2:{
					des:"预言家请闭眼",
					url:"yyjqby"
				},
				
				lier1:{
					des:"猎人请睁眼",
					url:"lierqzy",
					event:'lieren',
				},
				lier2:{
					des:"猎人请闭眼",
					url:"lierqby"
				},
				
				light:{
					des:"天亮了",
					url:"tll",
					event:"end"
				},
				
				// 13:{
				// 	des:"昨夜死亡的是",
				// 	url:"zyswd",
				// 	event:"die",
					
				// },
				// 14:{
				// 	des:"昨夜是平安夜",
				// 	url:"zyspay",
				// },
			}
		}},
		methods:{
			
			initRadio(){
				console.log("初始化本地音频");
				this.bgAudioContext=uni.createInnerAudioContext();
				this.bgAudioContext.src =require('subpageA/yuyin/ablack.mp3');
				this.bgAudioContext.autoplay = false;
				this.bgAudioContext.loop=true;
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = false;
				
				this.innerAudioContext.onPlay(() => {
				});
			
				//判断下一步的节点，处理下一步的流程
				this.innerAudioContext.onEnded((res)=>{
					this.bgAudioContext.volume=1;
					if(this.radioNeeder[this.eventId].event){
						switch(this.radioNeeder[this.eventId].event){
							case 'qiubite'	:this.tip="丘比特请选择要连的人";break;
							case 'qinglv'	:this.tip="情侣互相确认身份";this.love1_num=this.gamelove1_qiubite;this.love2_num=this.gamelove2_qiubite;break;
							case 'langren'	:this.tip="狼人请选择要杀的人";break;
							case 'nvwu'	:this.tip="女巫请选择使用解药或毒药，绿色框为毒药，紫色框为解药";this.kill_wolf_num=this.gamekill_langren;break;
							case 'yuyanjia'	:this.tip="预言家请选择要查验的人";break;
							case 'lieren':if(this.outList.indexOf(this.playerList.indexOf(2).toString())==-1&&this.playerList[this.gamekill_langren]!=2){
									this.tip="未被枪击，直接点击确认操作";
									break;
							}else{
								this.tip="猎人请选择要枪杀的人";break;
							}
							case 'shouwei'	:this.tip="守卫请选择要保护的人";break;
						}
						this.radioStop=true;
					}
					else{
						this.eventId++;
						while(this.radioNeeder[this.eventId]&&this.radioNeeder[this.eventId].only&&this.night!=1)
						{
							this.eventId++;	
						}
						this.startTimer(0);
					}
					
				});
				this.innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			},
			playRadio(radio){
				
				if(radio.event){
					this.nowState=this.ClickState[radio.event];
					console.log("修改状态",this.nowState);
				}
				console.log(radio.des);
				this.innerAudioContext.src =require('subpageA/yuyin/'+radio.url+'.mp3');
				this.innerAudioContext.play();
				this.bgAudioContext.volume=0.5;//减少背景音
				
			},
			start(){
				console.log("game start");
				this.night++;
				this.radioFinish=false;
				this.startTimer(0);
				
				this.bgAudioContext.src =require('subpageA/yuyin/ablack.mp3');	
				this.bgAudioContext.play();
			},
			updateTime(){
				this.downTime--;
				if(this.downTime<=0){
					clearInterval(this.timer);
					while(this.radioNeeder[this.eventId]&&this.radioNeeder[this.eventId].only&&this.night!=1)
					{
						this.eventId++;	
					}
					if(!this.radioNeeder[this.eventId]){//一轮结束
						this.radioFinish=true;
						
						return;
					}
					console.log("第",this.night,"天");
					this.playRadio(this.radioNeeder[this.eventId]);
					if(this.radioNeeder[this.eventId].event=="end"){
						this.bgAudioContext.stop();
					}
					
					
				}
				 console.log("倒计时：",this.downTime);
			},	
			startTimer(sec){
					if (this.timer != null) {
								clearInterval(this.timer);
							}
					this.downTime=sec;
					this.timer = setInterval(() => {
								this.updateTime();
							}, 1000);
			}
			,
			/*操作玩家*/
			openIcon(evt){
				
				if(!this.radioStop){
					return;
				}
				
				if(this.nowState==this.ClickState.qiubite){
					if(!this.checkOut(evt)){
						uni.showActionSheet({
							itemList: ['姻缘'],
							success: (res)=> {
								switch(res.tapIndex){
									case 0:this.chooseMenuLove(evt);break;
								}
							},
							fail:  (res)=>  {
								this.cancelMenuLove(evt);
							}
						});	
					}
					
				}
				if(this.nowState==this.ClickState.langren){
					if(!this.checkOut(evt)){
					uni.showActionSheet({
						itemList: ['猎杀'],
						success:  (res)=> {
							switch(res.tapIndex){
								case 0:this.chooseMenuKill(evt);break;
							}
						},
						fail: (res)=> {
							this.cancelMenuKill(evt);
						}
					});	
					}
				}
				else if(this.nowState==this.ClickState.nvwu){
					if(this.outList.indexOf(this.playerList.indexOf(6).toString())>-1){//已出局
						console.log("女巫已出局");
						this.tip="已出局，直接点击确认操作";
						return;
					}
					
					if(this.kill_wolf_num==evt.currentTarget.id){
						if(this.gamehelp_nvwu==-1){//判断是否使用过
							if(!this.checkOut(evt)){
							uni.showActionSheet({
							    itemList: ['使用解药'],
							    success:  (res)=>  {
									switch(res.tapIndex){
										case 0:this.chooseMenuHelp(evt);break;
									}
							    },
							    fail:  (res)=> {
									this.cancelMenuDrug(evt);
							    }
							});
							}
						}
						else{
							if(!this.checkOut(evt)){
							uni.showActionSheet({
							    itemList: ['解药已使用过'],
							    success: (res)=> {
									switch(res.tapIndex){
									}
							    },
							    fail: (res)=> {
							    }
							});
							}
						}
					
					}
					else{
						if(this.gamekill_nvwu==-1){
							if(!this.checkOut(evt)){
							uni.showActionSheet({
							    itemList: ['使用毒药'],
							    success: (res)=>  {
									switch(res.tapIndex){
										case 0:this.chooseMenuDrug(evt);break;
									}
							    },
							    fail: (res)=>  {
									this.cancelMenuDrug(evt);
							    }
							});
							}
						}
						else{
							if(!this.checkOut(evt)){
							uni.showActionSheet({
							    itemList: ['毒药已使用过'],
							    success:  (res)=>  {
									switch(res.tapIndex){
										
									}
							    },
							    fail:  (res)=>  {
							    }
							});
							}
							
						}
						
					}
			
				}
				else if(this.nowState==this.ClickState.yuyanjia){
					if(this.gamecheck_yuyanjia<0){//只能查验一次
						if(!this.checkOut(evt)){
						uni.showActionSheet({
							itemList: ['验证身份'],
							success:  (res)=>  {
								switch(res.tapIndex){
									case 0:this.chooseMenuCheck(evt);break;
								}
							},
							fail:  (res)=>  {
								console.log(res.errMsg);
							},
							
						});	
						}
						}
				}
				else if(this.nowState==this.ClickState.shouwei){
					if(this.outList.indexOf(this.playerList.indexOf(7).toString())>-1){//已出局
						console.log("守卫已出局");
						this.tip="已出局，直接点击确认操作";
						return;
					}
					if(!this.checkOut(evt)){
					uni.showActionSheet({
						itemList: ['守卫'],
						success:  (res)=>  {
							switch(res.tapIndex){
								case 0:this.chooseMenuGuard(evt);break;
							}
						},
						fail:  (res)=>  {
							this.cancelMenuGuard(evt);
						}
					});	
					}
				}
				else if(this.nowState==this.ClickState.lieren){
					console.log("猎人dodo",this.playerList.indexOf(2),this.outList.indexOf(this.playerList.indexOf(2)));
					if(this.outList.indexOf(this.playerList.indexOf(2).toString())>-1){
						console.log("猎人已出局");
						this.tip="已出局，直接点击确认操作";
						return;
					}
					else if(this.playerList[this.gamekill_langren]==2){//狼人砍中了猎人触发枪击事件
						if(!this.checkOut(evt)){
						uni.showActionSheet({
							itemList: ['枪击'],
							success:  (res)=>  {
								switch(res.tapIndex){
									case 0:this.chooseMenuShotBlack(evt);break;
								}
							},
							fail:  (res)=>  {
								this.cancelMenuShotBlack(evt);
							}
						});	
						}
					}else{
						console.log("猎人还在，但无法开枪");
						this.tip="未被枪击，直接点击确认操作";
						return;
					}
				
				}
				else if(this.nowState==this.ClickState.toupiao){
					if(!this.checkOut(evt)){
						if(this.playerList.indexOf(2)>-1){
							uni.showActionSheet({
								itemList: ['放逐投票','开枪'],
								success:  (res)=>  {
									switch(res.tapIndex){
										case 0:this.chooseMenuVote(evt);break;
										case 1:this.chooseMenuShotWhite(evt);break;
									}
								},
								fail:  (res)=>  {
									this.cancelMenuVote(evt);
								}
							});	
						}
						else{
						uni.showActionSheet({
							itemList: ['放逐投票'],
							success: (res)=>  {
								switch(res.tapIndex){
									case 0:this.chooseMenuVote(evt);break;
								}
							},
							fail: (res)=> {
								this.cancelMenuVote(evt);
							}
						});		
						}
				
					}
				}
				
			},
			checkOut(evt){
				if(this.outList.indexOf(evt.currentTarget.id )>-1){
					uni.showActionSheet({
						itemList: ['已出局，无法选择'],
						success: (res)=> {
						},
						fail:  (res)=> {
						}
					});	
					return true;
					}
					else{
						return false
					}
			},
			///判断是否白痴神
			checkIsBaichi(index){
				return(this.playerList[parseInt(index)]==8)
			},
			//情侣
			chooseMenuLove(evt){
				if(this.love1_num==evt.currentTarget.id||this.love2_num==evt.currentTarget.id){
					return;
				}
				if(this.love1_num<0){
					this.love1_num=evt.currentTarget.id;
				}
				else{
					this.love2_num=evt.currentTarget.id;
				}
				this.tip="请拍一拍你连接的玩家";
			},
			cancelMenuLove(evt){
				if(this.love1_num==evt.currentTarget.id){
					this.love1_num=-1;
				}
				if(this.love2_num==evt.currentTarget.id){
					this.love2_num=-1;
				}
			},
			//狼杀
			chooseMenuKill(evt){
				
				this.kill_wolf_num=evt.currentTarget.id;
				// evt.class
				// //显示红色框
			},
			cancelMenuKill(evt){
				if(this.kill_wolf_num==evt.currentTarget.id){
					this.kill_wolf_num=-1;
				}
			},
			
			//女巫救
			chooseMenuHelp(evt){
				this.kill_nvwu_num=-1
				this.help_nvwu_num=evt.currentTarget.id;
				//显示紫色框
			},
			//女巫杀
			chooseMenuDrug(evt){
				this.help_nvwu_num=-1
				this.kill_nvwu_num=evt.currentTarget.id;
				//显示绿色框
			},
			cancelMenuDrug(evt){
				if(this.kill_nvwu_num==evt.currentTarget.id){
					this.kill_nvwu_num=-1;
				}
				if(this.help_nvwu_num==evt.currentTarget.id){
					this.help_nvwu_num=-1;
				}
			},
			//预言家验人
			chooseMenuCheck(evt){
				this.gamecheck_yuyanjia=evt.currentTarget.id;
				let name=getApp().globalData.sqlConfig[this.playerList[this.gamecheck_yuyanjia]].name;
				this.tip='玩家'+(parseInt(evt.currentTarget.id)+1)+ '的身份为'+(name=="狼人"?"狼人":"好人");
				//显示绿色框
			},
			//守卫
			chooseMenuGuard(evt){
				console.log(evt.currentTarget.id,"盾牌");
				if(this.last_shouwei_num==evt.currentTarget.id){
					this.tip='不能连续守卫同一个人';
					return;
				}
					this.guard_shouwei_num=evt.currentTarget.id;
				//显示绿色框
			},
			cancelMenuGuard(evt){
				if(this.guard_shouwei_num==evt.currentTarget.id){
					this.guard_shouwei_num=-1;
					this.tip='下一步';
				}
			},
			//投票
			chooseMenuVote(evt){
				
				this.vote_num=evt.currentTarget.id;
				
			},
			///白天猎人枪击
			chooseMenuShotWhite(evt){
				this.guard_shot_num=evt.currentTarget.id;
				
			},
			///晚上猎人枪击
			chooseMenuShotBlack(evt){
				this.shot_num=evt.currentTarget.id;
				
			},
			///取消晚上猎人枪击
			cancelMenuShotBlack(evt){
				this.shot_num=-1;
			},
			///取消白天猎人枪击
			cancelMenuVote(evt){
				if(this.vote_num==evt.currentTarget.id){
					this.vote_num=-1;
				}
				if(this.guard_shot_num==evt.currentTarget.id){
					this.guard_shot_num=-1;
				}
			},
			enterNext() {
			    console.log("当前状态", this.nowState);
			    this.tip = "等待下一步";
			
			    switch (this.nowState) {
			        case this.ClickState.qiubite:
			            if (this.love1_num === -1 || this.love2_num === -1) {
			                uni.showModal({
			                    title: '操作失败',
			                    content: "必须选择两个玩家",
			                    showCancel: false,
			                    success: (res) => {
			                        if (res.confirm) {
			
			                        } else {
			                            console.log('点击了取消');
			                        }
			                    }
			                });
			                return;
			            }
			            this.gamelove1_qiubite = this.love1_num;
			            this.gamelove2_qiubite = this.love2_num;
			            this.love1_num = -1;
			            this.love2_num = -1;
			            break;
			        case this.ClickState.qinglv:
			            this.love1_num = -1;
			            this.love2_num = -1;
			            break;
			        case this.ClickState.langren:
			            this.gamekill_langren = this.kill_wolf_num;
			            this.kill_wolf_num = -1;
			            break;
					case this.ClickState.lieren:
					    this.gamekill_shot = this.shot_num;
					    this.shot_num = -1;
					    break;
			        case this.ClickState.nvwu:
			            this.gamekill_nvwu = this.kill_nvwu_num;
			            this.gamehelp_nvwu = this.help_nvwu_num;
			            this.kill_nvwu_num = -1;
			            this.help_nvwu_num = -1;
			            this.kill_wolf_num = -1;
			            break;
			        case this.ClickState.yuyanjia:
			            // this.gamecheck_yuyanjia = this.guard_shouwei_num;
			            break;
			        case this.ClickState.shouwei:
			            this.gameguard_shouwei = this.guard_shouwei_num;
			            this.guard_shouwei_num = -1;
						this.last_shouwei_num= this.gameguard_shouwei;
			            break;
			        case this.ClickState.end:
			            this.tip = "点击确定查看昨晚死者";
			            //公布结果
			            this.dieArray = [];
			            if (this.gamekill_nvwu > -1) {
			                this.outList.push(this.gamekill_nvwu);
			                this.dieArray.push(this.gamekill_nvwu);
			            }
			            if (this.gameguard_shouwei > -1 && this.gameguard_shouwei === this.gamehelp_nvwu) {//同救同守必死
			                if (this.dieArray.indexOf(this.gameguard_shouwei) === -1) {
			                    this.outList.push(this.gameguard_shouwei);
			                    this.dieArray.push(this.gameguard_shouwei);
			                }
			            }
			            if (this.gameguard_shouwei!== this.gamekill_langren && this.gamehelp_nvwu!== this.gamekill_langren&&this.playerList[parseInt(this.gamekill_langren)]!=8 ) {//被狼人杀害判断守卫女巫白痴
			                if (this.dieArray.indexOf(this.gamekill_langren) === -1) {
			                    this.outList.push(this.gamekill_langren);
			                    this.dieArray.push(this.gamekill_langren);
			                }
			            }
						if (this.dieArray.indexOf(this.gamekill_shot) === -1) {
						    this.outList.push(this.gamekill_shot);
						    this.dieArray.push(this.gamekill_shot);
						}
			            for (var i = 0; i < this.dieArray.length; i++) {
			                if (this.gamelove1_qiubite === this.dieArray[i]) {
			                    if (this.dieArray.indexOf(this.gamelove2_qiubite) === -1) {
			                        this.outList.push(this.gamelove2_qiubite);
			                        this.dieArray.push(this.gamelove2_qiubite);
			                    }
			                }
			                if (this.gamelove2_qiubite === this.dieArray[i]) {
			                    if (this.dieArray.indexOf(this.gamelove1_qiubite) === -1) {
			                        this.outList.push(this.gamelove1_qiubite);
			                        this.dieArray.push(this.gamelove1_qiubite);
			                    }
			                }
			            }
			            console.log("死者", this.dieArray, "出局:", this.outList,"枪击:",this.gamekill_shot,"毒药:",this.gamekill_nvwu);
			            if (this.checkOver()) {
			                return;
			            }
						this.dieArray = this.dieArray.filter(item => item!== -1);
			            if (this.dieArray.length > 0) {
			                this.dieArray.sort();
			                let tip = "昨夜死亡的是";
			                for (var i = 0; i < this.dieArray.length; i++) {
								if(this.dieArray[i]<0){
									continue;
								}
			                    tip += (parseInt(this.dieArray[i]) + 1) + "号 ";
			                }
			                tip += "  请进行放逐投票";
			                this.tip = tip;
			            } else {
			                this.tip = "昨夜是平安夜  请进行放逐投票";
			            }
			            this.nowState = this.ClickState.toupiao;
			            this.radioStop = true;
			            this.eventId++;
			            return;
			        case this.ClickState.toupiao:
			            console.log("投票", this.vote_num, this.guard_shot_num);
			            this.dieArray = [];
					
			            if (this.vote_num > -1 && this.gamelove1_qiubite === this.vote_num) {
			                if (this.outList.indexOf(this.gamelove2_qiubite) === -1) {
			                    this.dieArray = [];
			                   if(!this.checkIsBaichi(this.gamelove1_qiubite)){
								    this.outList.push(this.gamelove1_qiubite); 
									this.outList.push(this.gamelove2_qiubite);
									 this.dieArray.push(this.gamelove2_qiubite);
							   }
								
									
								
			                  
			                }
			                if (this.checkOver()) {
			                    return;
			                }
			                this.nowState = this.ClickState.doubledie;
			                this.radioStop = true;
			                this.eventId++;
			                return;
			            } else if (this.vote_num > -1 && this.gamelove2_qiubite === this.vote_num) {
			                if (this.outList.indexOf(this.gamelove1_qiubite) === -1) {
			                    this.dieArray = [];
								
								if(!this.checkIsBaichi(this.gamelove2_qiubite)){
									 this.outList.push(this.gamelove2_qiubite);
									 this.outList.push(this.gamelove1_qiubite);
									 this.dieArray.push(this.gamelove1_qiubite);
								}
			               
			                }
			                if (this.checkOver()) {
			                    return;
			                }
			                this.nowState = this.ClickState.doubledie;
			                this.radioStop = true;
			                this.eventId++;
			                return;
			            } else if (this.guard_shot_num > -1 && this.gamelove1_qiubite === this.guard_shot_num) {
			                if (this.outList.indexOf(this.gamelove2_qiubite) === -1) {
			                    this.dieArray = [];
								if(!this.checkIsBaichi(this.gamelove1_qiubite)){
									 this.outList.push(this.gamelove1_qiubite);
								}
								
									this.outList.push(this.gamelove2_qiubite);			                   
									this.dieArray.push(this.gamelove2_qiubite);
								
			                   
			                }
			                if (this.checkOver()) {
			                    return;
			                }
			                this.nowState = this.ClickState.doubledie;
			                this.radioStop = true;
			                this.eventId++;
			                return;
			            } else if (this.guard_shot_num > -1 && this.gamelove2_qiubite === this.guard_shot_num) {
			                if (this.outList.indexOf(this.gamelove1_qiubite) === -1) {
			                    this.dieArray = [];
								
									 this.outList.push(this.gamelove1_qiubite);
									  this.dieArray.push(this.gamelove1_qiubite);
								
								
									    this.outList.push(this.gamelove2_qiubite);
								
			                 
			                }
			                if (this.checkOver()) {
			                    return;
			                }
			                this.nowState = this.ClickState.doubledie;
			                this.radioStop = true;
			                this.eventId++;
			                return;
			            }
			            this.gamekill_langren = -1;
			            this.gamecheck_yuyanjia = -1;
			            this.gameguard_shouwei = -1;
			            this.gameguard_shouwei = -1;
						if(!this.checkIsBaichi(this.vote_num)){
							this.outList.push(this.vote_num);
						}
			            this.outList.push(this.guard_shot_num);
			            this.dieArray = [];
			            if (this.checkOver()) {
			                return;
			            }
			            this.vote_num = -1;
			            this.guard_shot_num = -1;
			            this.night++;
			            this.nowState = this.ClickState.none;
			            this.radioStop = true;
			            this.eventId = 0;
			            console.log("全部初始化", this.radioNeeder);
			            this.startTimer(0);
			            return;
			        case this.ClickState.doubledie:
			            this.gamekill_langren = -1;
			            this.gamecheck_yuyanjia = -1;
			            this.gameguard_shouwei = -1;
			            this.gameguard_shouwei = -1;
			            this.dieArray = [];
			            this.vote_num = -1;
			            this.shot_num = -1;
						this.guard_shot_num = -1;
			            this.night++;
			            this.nowState = this.ClickState.none;
			            this.radioStop = true;
			            this.eventId = 0;
			            console.log("全部初始化", this.radioNeeder);
			            this.startTimer(0);
			            return;
			        default: 
			    }
				this.radioStop = false;
				this.eventId++;
				this.startTimer(0);
			},
			checkOver(){
				let wolf=0;
				let restList=[];
				for (let i = 0; i < this.playerList.length; i++) {
					if(this.outList.indexOf(i.toString())==-1&&this.dieArray.indexOf(i.toString())==-1){
						restList.push(this.playerList[i]);
					}
					
				}
			
				
				for (let i = 0; i < restList.length; i++) {
					
					if(restList[i]==1){
						wolf++;
					}
				}
				if(this.playerList[parseInt(this.gamelove1_qiubite)]==1&&this.playerList[parseInt(this.gamelove2_qiubite)]!=1){
					//人狼恋，考虑第三方获胜
					if(this.outList.indexOf(this.gamelove1_qiubite)==-1&&restList.length<=3){
						console.log("第三方获胜");
						uni.showModal({
								title: '',
								content: '第三方阵营获胜',
								showCancel:false,
								success: (res)=> {
								this.$emit("getgame",1);
							}
						}).bind(this);
						return true;
					}
				}
				else if(this.playerList[parseInt(this.gamelove1_qiubite)]!=1&&this.playerList[parseInt(this.gamelove2_qiubite)]==1){
					//人狼恋，考虑第三方获胜
					if(this.outList.indexOf(this.gamelove1_qiubite)==-1&&restList.length<=3){
						console.log("第三方获胜");
						uni.showModal({
								title: '',
								content: '第三方阵营获胜',
								showCancel:false,
								success: (res)=> {
								this.$emit("getgame",1);
							}
						})
							return true;
					}
				}
				if(wolf<=0){
					console.log("好人获胜");
					uni.showModal({
							title: '',
							content: '好人阵营获胜',
							showCancel:false,
							success: (res)=>  {
							this.$emit("getgame",1);
						}
					})
						return true;
					
				}
				else if(wolf==restList.length){
					console.log("狼人获胜");
					uni.showModal({
							title: '',
							content: '狼人阵营获胜',
							showCancel:false,
							success: (res)=> {
								this.$emit("getgame",1);
						}
					})
						return true;
				}
			},
			returnHome(){
				console.log("back");
			// uni.navigateBack({
			//     delta: 2
			// });
			},
			restart(){
				
				uni.showModal({
						title: '退出',
						content: '是否重新选择角色配置',
						  success: (res) => {  
						                    if(res.confirm) {  
						                       console.log("跳转")
						                       try {
						                           uni.setStorageSync('refresh', '1');
						                       } catch (e) {
						                           // error
						                       }
											   this.bgAudioContext.stop();
						                       this.$emit("getgame",1); 
						                    } else {  
						                    }  
						                } 
				});
			}
		},
		
		beforeMount() {
			//逻辑判断需要哪些语音
			this.playerList=getApp().globalData.playerList;
			this.sqlConfig=getApp().globalData.sqlConfig;
			this.iconPos=getApp().globalData.iconpos;
			console.log("当前配置",this.playerList);
			for (let key in this.radioList) {
				if(key.indexOf("base")>=0){
					this.radioNeeder.push( this.radioList[key]);
				}
				if(key.indexOf("qbt")>=0||key.indexOf("ql")>=0){
					if(this.playerList.indexOf(5)>=0){//丘比特
						this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("nw")>=0){
					if(this.playerList.indexOf(6)>=0){//女巫
						this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("yyj")>=0){
					if(this.playerList.indexOf(4)>=0){//预言家
						this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("sw")>=0){
					if(this.playerList.indexOf(7)>=0){//守卫
						this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("lr")>=0){
					if(this.playerList.indexOf(1)>=0){//狼人
						this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("lier")>=0){
					if(this.playerList.indexOf(2)>=0){//猎人
					this.radioNeeder.push( this.radioList[key]);
					}
				}
				if(key.indexOf("light")>=0){
						this.radioNeeder.push( this.radioList[key]);
				}
			}
				console.log("添加的语音有",this.radioNeeder);
			this.initRadio();
			},
			beforeDestroy() {
				clearInterval(this.timer);
			},
			
		
		}
</script>

<style>
	.tip{
		height: 50px;
		margin: 10px 0 0 20px;
	}
	.box {
	  display: flex;
	  flex-direction: row;
	  align-items: flex-start;
	  box-sizing: border-box;
	}
	
	.left {
	  width: 50%;
	  display: flex;
	  flex-direction: column;
	  margin: 2px;
	}
	
	.right {
	  width: 50%;
	  display: flex;
	  flex-direction: column;
	  margin: 2px;
	}
	.restart{
		text-align: right;
		margin: 10px 10px 0;
		color: white;
	}
	.icon{
		background: url("/static/icon/sx1.jpg") no-repeat  -140px -20px;
		background-size: 500%;
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		/* border: 5px solid #FFFFFF; */
	}
	.co{
		width: 150px;
	}
	.name{
		float: right;
		margin: 10px;
		line-height: 64px;
	}
	.defaultchoose{
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		 border: 5px solid #ffffff; 
	}
	.kill_wolf{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #EE0A24;
	}
	.kill_nvwu{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #07C160;
	}
	.help_nvwu{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #1900ff;
	}
	.guard_shouwei{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #19ff00;
	}
	.vote{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #000000;
	}
	.vote_shot{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border-style: solid;
		border-width: 5px;
		border-color: #EE0A24 #000000 #EE0A24 #000000;
	}
	.shot{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #EE0A24;
	}
	.love{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #eea8e5;
	}
	.die{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #EE0A24;
	}
	.out{
		float: left;
		width: 64px;
		height: 64px;
		margin: 10px 0px 10px 20px;
		border: 5px solid #55557f;
		background: url("/static/icon/sx2.jpg") ;
		background-size: 500%
	}
	.footer{
		bottom:0;
		}
</style>
