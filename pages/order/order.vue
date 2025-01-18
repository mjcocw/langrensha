<template>
  <view>
    <navigator class="bg-red cg block" style="text-align: center;margin:0 auto;width: 200px;height: 50px;line-height: 50px;" url="rank/hot/hot">热门桌游排名</navigator>
    <view class='mark' style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f0f0f0; padding: 20px; border-radius: 10px;">
      <view style="font-size: 22px; font-weight: bold; color: #333; margin-bottom: 10px;">更新日志</view> 
      <view style="text-align: left; font-size: 16px; color: #666; line-height: 1.5;">2025/1/17----终于完成了第一版的语音小工具。可能还有少量的 bug，希望大家在右上方留言，或者加我微信互相交流，后续会不断提供更多桌游的语音助手的。</view>
      <view style="text-align: left; font-size: 14px; color: #999; margin-top: 20px;">微信号：mjc605354</view>
    </view>
    <!-- 新增微信激励广告的显示区域 -->
    <view class="reward-ad-container" style="margin-top: 20px;" v-if="videoAd">
      <button @click="showRewardedVideoAd">点击观看视频广告将随机解锁更多角色</button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      videoAd: null
    }
  },
  onLoad() {
    // 判断运行环境
    if (typeof window!== 'undefined') {
      console.log('运行在 H5 页面中');
    } else if (typeof wx!== 'undefined') {
      console.log('运行在微信小程序中');
      // 在页面 onLoad 回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-ee2c12a3e5c8ce2b'
        });
        this.videoAd.onLoad(() => {
          console.log('激励视频广告加载成功');
        });
        this.videoAd.onError((err) => {
          console.error('激励视频广告加载失败', err);
        });
        this.videoAd.onClose((res) => {
          if (res && res.isEnded) {
            // 用户完整观看了广告，可以给予奖励
            console.log('用户完整观看了广告，给予奖励');
          } else {
            // 用户未完整观看广告，不给予奖励
            console.log('用户未完整观看广告，不给予奖励');
          }
        });
      }
    } else {
      console.error('无法确定运行环境');
    }
  },
  methods: {
    showRewardedVideoAd() {
      if (this.videoAd) {
        this.videoAd.show().catch(() => {
          // 失败重试
          this.videoAd.load()
         .then(() => this.videoAd.show())
         .catch(err => {
            console.error('激励视频广告显示失败', err);
          });
        });
      }
    }
  }
}
</script>
<style>
.cu-btn{
    position: absolute;
    top: 50%;
    left: calc(50% - 50px);
  }
.mark {
    margin: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #00BFFF;
  }
  /* 激励广告容器的样式 */
.reward-ad-container {
	width: 300px;;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    animation: scaleAnimation 2s infinite alternate; /* 应用动画 */
  }

  /* 定义放大缩小的动画 */
  @keyframes scaleAnimation {
    from {
      transform: translateX(-50%) scale(1);
    }
    to {
      transform: translateX(-50%) scale(1.2);
    }
  }
</style>