<template>
  <view class="article-container">
    <view class="article-title">狼人杀角色攻略：</view>
    <view class="article-section">
      <view class="section-title">好人阵营</view>
      <view class="role-description" v-for="(role, index) in goodRoles" :key="index">
        <view class="role-header" @click="role.show =!role.show">
          <view class="role-name">{{ role.name }}:</view>
          <view class="toggle-icon">{{ role.show? '-' : '+' }}</view>
        </view>
        <view class="role-tips" v-show="role.show">
          <view class="tip" v-for="(tip, tipIndex) in role.tips" :key="tipIndex">{{ tip }}</view>
        </view>
      </view>
    </view>
    <view class="article-section">
      <view class="section-title">狼人阵营</view>
      <view class="role-description" v-for="(role, index) in wolfRoles" :key="index">
        <view class="role-header" @click="role.show =!role.show">
          <view class="role-name">{{ role.name }}:</view>
          <view class="toggle-icon">{{ role.show? '-' : '+' }}</view>
        </view>
        <view class="role-tips" v-show="role.show">
          <view class="tip" v-for="(tip, tipIndex) in role.tips" :key="tipIndex">{{ tip }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodRoles: [
          {
            name: "村民",
            show: false,
            tips: [
              "积极参与：虽然没有特殊技能，但要积极参与讨论和投票，通过分析其他玩家的发言和行为来判断局势。",
              "伪装神职：在必要时可以适当伪装成神职人员，吸引狼人火力，保护真正的神职，但要注意不要过于明显，以免被狼人识破。",
              "配合神职：与预言家、女巫等神职人员密切配合，相信他们的查验和判断，帮助他们传递信息和引导其他好人投票。"
            ]
          },
          {
            name: "预言家",
            show: false,
            tips: [
              "果断上警：预言家是好人阵营的核心信息来源，一定要果断上警竞选警长，争取拿到警徽，以便更好地掌控局势和传递信息。",
              "清晰报验：每晚认真查验一名玩家的身份，并在白天发言时清晰、准确地公布查验结果，包括金水和查杀，让好人阵营能够明确目标。",
              "制定警徽流：在起跳预言家时，要明确说明自己的警徽流，即下一晚或后续几晚打算查验的玩家，以及警徽在不同情况下的传递方式，以便在自己出局后，好人阵营能够继续获取信息。"
            ]
          },
          {
            name: "女巫",
            show: false,
            tips: [
              "谨慎用药：女巫的两瓶药是关键道具，首夜一般不建议轻易用药，要观察局势，判断是否有重要的神职或好人处于危险之中再决定是否使用解药；毒药则要在确定狼人身份的情况下再使用，避免误毒好人。",
              "与预言家配合：关注预言家的查验结果和警徽流，在关键时刻用解药保护预言家或其他关键神职，同时也可以根据预言家的指引，用毒药毒死狼人。",
              "适当暴露身份：在必要时可以适当暴露自己的身份，以表明自己的立场和能力，但要注意自身安全，避免被狼人集火。"
            ]
          },
          {
            name: "猎人",
            show: false,
            tips: [
              "前期低调：猎人在前期应尽量保持低调，避免过早暴露身份，以免成为狼人的首要目标。",
              "关键时刻亮牌：当自己受到狼人威胁或被怀疑时，可以适时亮明身份，威慑狼人，同时也可以让好人阵营更加信任自己。",
              "准确带人：在出局时要谨慎选择带走的玩家，尽量确保带走的是狼人，避免误带好人，给好人阵营带来损失。"
            ]
          },
          {
            name: "守卫",
            show: false,
            tips: [
              "守护关键人物：首夜可以选择空守或自守，之后要根据局势和自己的判断，守护预言家、女巫等关键神职人员，或者是其他被狼人重点攻击的好人。",
              "与女巫配合：注意与女巫的技能配合，避免出现奶穿的情况，即被守护的玩家同时被女巫解药解救，导致两人技能失效。",
              "抿狼刀法：通过观察狼人每晚的猎杀目标和场上的局势，尝试抿出狼人的刀法，提前做好守护准备。"
            ]
          },
          {
            name: "白痴",
            show: false,
            tips: [
              "免疫夜间伤害：白痴在夜里不会被狼人杀害，这使得狼人在选择猎杀目标时会有所顾虑。因为如果狼人误将白痴当作普通村民而在夜里刀杀，白痴不会出局，这相当于浪费了狼人一次宝贵的夜间杀人机会。例如，在游戏前期，狼人难以分辨出谁是白痴谁是普通村民，就不敢轻易下刀，否则可能导致自己的战略布局被打乱。",
              "隐藏身份误导狼人：白痴可以通过自己的发言和行为来伪装成普通村民，让狼人误以为他没有特殊能力。这样可以诱导狼人将更多的精力放在寻找其他神职人员上，从而为神职阵营和好人阵营争取更多的生存空间。",
              "在白天避免被放逐出局后的特殊能力：当白痴被投票出局时，他可以翻牌自证身份，然后不会真正死亡，而是继续留在场上可以发言，但是失去投票权。这一功能在关键时刻非常有用。比如，在场上好人阵营和狼人阵营僵持不下，好人阵营可能因为误判而要放逐白痴时，白痴翻牌自证身份后可以继续为好人阵营提供信息，帮助好人阵营重新梳理思路，纠正投票方向。他的发言能够让其他好人玩家重新审视场上局势，分辨出真正的狼人，避免好人阵营因为误投而走向劣势。"
            ]
          }
        ],
        wolfRoles: [
          {
            name: "悍跳预言家",
            show: false,
            tips: [
              "在警长竞选环节，安排一狼悍跳预言家，与真预言家对跳，争夺警徽。悍跳狼要模仿预言家的发言方式和逻辑，编造合理的查验结果，尽量让好人相信自己是真预言家。"
            ]
          },
          {
            name: "团队协作",
            show: false,
            tips: [
              "狼人之间要通过眼神、手势等方式进行沟通和协作，统一行动目标和策略。在白天发言时，要相互配合，为悍跳狼打掩护，或者误导好人的投票方向。"
            ]
          },
          {
            name: "屠边策略",
            show: false,
            tips: [
              "根据场上的局势和好人阵营的情况，选择屠边策略，即优先攻击平民或神职人员。如果好人阵营中神职人员较多，可以先刀平民，减少好人的投票力量；如果平民较多，可以先刀神职，削弱好人的特殊能力。"
            ]
          },
          {
            name: "隐藏身份",
            show: false,
            tips: [
              "在游戏过程中，狼人要尽量隐藏自己的身份，避免暴露自己的狼人特征和行为。发言时要保持冷静和自然，不要过于紧张或激动，以免被好人识破。"
            ]
          },
          {
            name: "利用规则",
            show: false,
            tips: [
              "熟悉游戏规则，合理利用规则中的漏洞和特殊情况为自己谋利。例如，在适当的时候选择自爆，终止当前环节，打乱好人的节奏；或者利用空刀、掰刀等策略，制造混乱和迷惑好人。"
            ]
          }
        ]
      };
    },
    methods: {
      openArticle(url) {
        this.articleUrl = url;
      }
    }
  };
</script>

<style>
 .article-container {
    padding: 20px;
    background-color: #222;
    color: #fff;
    font-family: Arial, sans-serif;
  }
 .article-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #FFA500;
  }
 .article-section {
    margin-bottom: 30px;
  }
 .section-title {
    font-size: 20px;
    font-weight: bold;
    color: #FFD700;
    margin-bottom: 10px;
    border-bottom: 2px solid #FFD700;
    padding-bottom: 5px;
  }
 .role-description {
    margin-bottom: 20px;
  }
 .role-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
 .role-name {
    font-size: 18px;
    font-weight: bold;
    color: #00BFFF;
    margin-bottom: 5px;
  }
 .toggle-icon {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
 .role-tips {
    margin-left: 20px;
  }
 .tip {
    margin-bottom: 5px;
    line-height: 1.5;
  }
 .cu-btn {
    width: 300px;
    position: absolute;
    top: 50%;
    left: calc(50% - 150px);
  }
 .name {
    color: wheat;
  }
</style>