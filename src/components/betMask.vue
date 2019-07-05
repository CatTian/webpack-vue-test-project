<template>
  <div>
    <transition name="bet-slide-fade">
      <Panel v-if="betFlag" :class="[$style.panel, 'betMask']">
        <div :class="$style.title">
          <p>{{ teamName.home }} VS {{ teamName.away }}</p>
          <b @click.prevent="closeBet"></b>
        </div>
        <div :class="$style.betInfo">
          {{
            $t("Match.winAward", {
              pool: teamName.pool,
              odds: params.Value,
              money: (
                this.$store.state.betParams.Value *
                this.$store.state.betParams.Score
              ).toFixed(2)
            })
          }}
        </div>
        <ul>
          <li
            v-for="m in money"
            :key="m"
            score="m"
            @click.prevent="moneyBtnEvent($event, m)"
          >
            {{ m }}
          </li>
          <li :class="inputWrapClass" socre="">
            <label :for="inputClass">{{ $t("Match.customAmount") }}</label>
            <input
              :id="inputClass"
              type="number"
              name=""
              value=""
              @click.prevent="imitatePlaceholder($event)"
              @input.prevent="moneyCustomEvent($event)"
              @blur.prevent="blurInput($event)"
            />
          </li>
        </ul>
        <div :class="$style.balance">
          {{ $t("Match.userBalance", { money: userBalance }) }}
        </div>
        <div
          :class="[$style.submitBtn, submitBtnStates ? '' : submitBtnDisabled]"
          @click.prevent="submitEvent"
        >
          {{ $t("Match.submit") }}
        </div>
      </Panel>
    </transition>
  </div>
</template>

<script>
import Panel from "@/core/panel.vue";

export default {
  components: {
    Panel
  },
  data() {
    return {
      money: [10, 20, 50, 100, 500],
      moneyActive: "bet-money-active",
      labelHide: "bet-label-hide",
      inputClass: "bet-input-class",
      inputWrapClass: "bet-input-wrap-class",
      submitBtnDisabled: "bet-submit-btn-disabled",
      expectReward: "",
      tips: "",
      submitBtnStates: true
    };
  },
  computed: {
    params() {
      // 预计奖金
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.expectReward = ;
      // 返回订单参数
      return this.$store.state.betParams;
    },
    teamName() {
      return this.$store.state.teamName;
    },
    betFlag() {
      return this.$store.state.betFlag;
    },
    userBalance() {
      return this.$store.state.user.balance;
    }
  },
  methods: {
    // 金额选择区
    moneyBtnEvent(e, money) {
      const obj = e.currentTarget;
      const activeName = this.moneyActive;
      const isActive = obj.classList.contains(activeName);
      if (isActive) {
        return;
      }
      this.removeOtherActive();
      obj.classList.add(activeName);
      // 同步 store 订单投注金额
      this.$store.state.betParams.Score = money;
    },
    // 模拟 input placeholder 效果
    imitatePlaceholder(e) {
      const label = e.currentTarget.parentNode.querySelector("label");
      const isHide = label.classList.contains(this.labelHide);
      if (isHide) {
        if (e.currentTarget.value) {
          this.removeOtherActive();
          e.currentTarget.classList.add(this.moneyActive);
          // 同步 store 订单投注金额
          this.$store.state.betParams.Score = e.currentTarget.value;
        }
        return;
      }
      label.classList.add(this.labelHide);
    },
    // blur input
    blurInputn(e) {
      const label = e.currentTarget.parentNode.querySelector("label");
      if (!e.currentTarget.value) {
        label.classList.remove(this.labelHide);
        e.currentTarget.classList.remove(this.moneyActive);
      }
    },
    // 金额输入区
    moneyCustomEvent(e) {
      const obj = e.currentTarget;
      const activeName = this.moneyActive;
      const isActive = obj.classList.contains(activeName);
      if (!isActive) {
        this.removeOtherActive();
        obj.classList.add(activeName);
      }

      obj.value = obj.value.replace(/[^\d.]/g, "");
      //验证第一个字符是数字而不是字符
      obj.value = obj.value.replace(/^\./g, "");
      //只保留第一个.清除多余的
      obj.value = obj.value.replace(/\.{2,}/g, ".");
      obj.value = obj.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两位个小数
      // eslint-disable-next-line no-useless-escape
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      // 去掉整数位最前面前多余的0（这里总是留有一个0，比如 01244.12）
      obj.value = obj.value.replace(/^0+/, "0");
      // 在>=1时再去一次整数位前多余的0
      if (obj.value >= 1) {
        obj.value = obj.value.replace(/^0+/, "");
      }
      // 同步 store 订单投注金额
      this.$store.state.betParams.Score = obj.value;
    },
    // 移除按钮多余的 active
    removeOtherActive() {
      const haveActiveBtn = document.querySelector(`.${this.moneyActive}`);
      if (haveActiveBtn) {
        haveActiveBtn.classList.remove(this.moneyActive);
      }
    },
    closeBet() {
      // 改变投注框显示状态
      this.$store.commit("changeBetFlag", false);
      // 初始化 store 订单参数
      this.$store.commit("initParams");
      // 取消按钮选中状态 呃目前默认这个 calss
      if (document.querySelector(".oddsBtnBox .active")) {
        document
          .querySelector(".oddsBtnBox .active")
          .classList.remove("active");
      }
    },
    submitEvent() {
      const vm = this;
      const $Store = this.$store;
      const score = $Store.state.betParams.Score;
      // 禁止频繁提交表单
      if (!this.submitBtnStates) {
        return;
      }
      // 检测下注金额
      if (!score || score < 1) {
        $Store.commit("setTips", this.$i18n.t("Match.minBetMoney"));
        return;
      }
      // 检测余额
      if ($Store.state.user.balance < score) {
        $Store.commit("setTips", this.$i18n.t("Match.recharge"));
        return;
      }
      // 提交表单
      let api = "";
      // 本地模拟接口
      if (process.env.NODE_ENV == "development") {
        api = "order.json";
      }
      vm.submitBtnStates = false;
      // post 行不通，，，好吧，先用 get 返回本地数据吧，无奈。。。
      vm.$axios
        .get(api, $Store.state.betParams)
        .then(res => {
          vm.submitBtnStates = true;
          if (res.data.Result) {
            $Store.commit("setTips", res.data.Reason);
            $Store.commit("updataBalance", res.data.Score);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="css">
/* 动画 */
.bet-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.bet-slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.bet-slide-fade-enter, .bet-slide-fade-leave-to
/* .bet-slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
  /* opacity: 0; */
}
/* 按钮状态 */
.bet-money-active {
  color: #fff !important;
  background-color: #f25562 !important;
}
.bet-label-hide {
  display: none !important;
}
.bet-submit-btn-disabled {
  color: #c2c3cc !important;
  background-color: #f0f0f2 !important;
}
</style>

<style lang="scss" module>
@import "@/assets/css/layout.scss";
@import "@/assets/css/element.scss";
.panel {
  @include flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 20px 30px;
  box-shadow: 0 -2px 24px 0 rgba(21, 21, 21, 0.35);
  .title {
    @include flex($direction: flex, $justify: space-between);
    $t-height: 50px;
    height: $t-height;
    line-height: $t-height;
    font-size: 36px;
    text-align: left;
    b {
      $b-height: 48px;
      height: $b-height;
      width: $b-height;
      background: {
        size: 100%;
        repeat: no-repeat;
        position: center;
        image: url("@/assets/img/bet-bet-close.png");
      }
    }
  }
  .betInfo {
    $i-height: 40px;
    height: $i-height;
    line-height: $i-height;
    font-size: 28px;
    margin-top: 16px;
    text-align: left;
    color: #424866;
  }
  > ul {
    @include flex($direction: flex, $justify: flex-start);
    height: 76px;
    $border: 2px solid #f0f0f2;
    border: $border;
    margin-top: 20px;
    > li {
      $li-height: 76px;
      height: $li-height;
      line-height: $li-height - 4;
      width: 15%;
      font-size: 32px;
      border-left: $border;
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        position: relative;
        width: 25%;
        label {
          position: absolute;
          top: 0;
          left: 0;
          height: $li-height - 4;
          width: 100%;
          text-align: center;
          font-size: 28px;
          background: transparent;
          color: #c2c3cc;
        }
        input {
          height: $li-height - 4;
          width: 100%;
          text-align: center;
          border: 0;
          display: block;
          padding: 16px 10px;
          color: #151515;
          font-size: 32px;
          line-height: 44px;
        }
      }
    }
  }
  .balance {
    $b-height: 50px;
    height: $b-height;
    line-height: $b-height;
    margin-top: 30px;
    text-align: left;
    font-size: 32px;
  }
  .submitBtn {
    @include submitBtn($width: auto);
    margin-top: 30px;
  }
}
</style>
