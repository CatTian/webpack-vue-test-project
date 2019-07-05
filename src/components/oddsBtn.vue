<template>
  <div class="oddsBtnBox" :class="['oddsBtn-' + pool + mid, cname]">
    <dl
      v-for="(odd, i) in odds"
      :key="i"
      :class="[oddsStatus[i] != 'Open' ? 'disabled' : '']"
      @click.prevent="
        oddsBtnEvent(
          $event,
          odd,
          mid,
          live,
          type[i],
          pool,
          home,
          away,
          label[i],
          line
        )
      "
    >
      <dt>{{ label[i] }}</dt>
      <dd>{{ odd ? odd : "-" }}</dd>
    </dl>
  </div>
</template>

<script>
import scrollSmoothTo from "@/assets/js/scroll"
export default {
  props: {
    cname: String,
    btnNum: {
      type: Number,
      default: 3
    },
    odds: Array,
    label: Array,
    mid: null,
    live: {
      type: [String, Number],
      default: '-'
    },
    line: {
      type: [String, Number],
      default: '-'
    },
    type: Array,
    pool:null ,
    home: null,
    away: null,
    oddsStatus: Array
  },
  data() {
    return {
      oddsDisabled: 'disabled',
      oddsActive: 'active',
      oddsUp: 'odds-up',
      oddsDown: 'odds-down'
    }
  },
  watch: {
    odds(newV, oldV) {
      // 考虑到single页面是单场赛事mid统一，所以添加pool来区分玩法按钮
      const obj = document.querySelector('.oddsBtn-' + this.pool + this.mid).querySelectorAll('dl')
      for (let i = 0; i < oldV.length; i++) {
        // 如有【选中】且【停止下注】则关闭投注栏并初始化 order 参数
        if (this.oddsStatus[i] !== 'Open' && obj[i].classList.contains('active')) {
          this.$store.commit('changeBetFlag', false)
          this.$store.commit('initParams')
        }
        if (oldV[i] == newV[i]) {
          continue
        }
        if (oldV[i] > newV[i]) {
          obj[i].classList.remove(this.oddsUp)
          obj[i].classList.add(this.oddsDown)
        } else {
          obj[i].classList.remove(this.oddsDown)
          obj[i].classList.add(this.oddsUp)
        }
        // 如有【选中】的 odds 则同步 store 里的赔率
        if (obj[i].classList.contains('active')) {
          this.$store.state.betParams.Value = newV[i]
        }
      }
    }
  },
  methods: {
    oddsBtnEvent: function(e, odds, mid, live, type, pool, home, away, poolName, line) {
      const $Store = this.$store.state
      if (e.currentTarget.classList.contains(this.oddsDisabled)) {
        return
      }
      // 未登录
      if (!$Store.user.id || $Store.token) {
        this.$store.commit('setTips', '请登陆')
        return
      }
      const obj = e.currentTarget
      const activeName = this.oddsActive
      const isActive = obj.classList.contains(activeName)

      // 按钮样式交互
      if (isActive) {
        obj.classList.remove(activeName)
        this.$store.commit('changeBetFlag', false)
        // 初始化 store 订单参数
        this.$store.commit('initParams')
        return
      }
      const haveActiveBtn = document.querySelector('.' + activeName)

      // 同步 store 订单参数
      $Store.betParams.s = 'LiveTicket'
      $Store.betParams.Value = odds
      $Store.betParams.Mid = mid
      $Store.betParams.Key = type
      $Store.betParams.Pool = pool
      $Store.betParams.Live = live
      $Store.betParams.Line = line
      $Store.teamName.home = home
      $Store.teamName.away = away
      $Store.teamName.pool = poolName

      if (haveActiveBtn) {
        haveActiveBtn.classList.remove(activeName)
      }
      obj.classList.add(activeName)
      if (!$Store.betFlag) {
        // 调起投注框
        this.$store.commit('changeBetFlag', true)
        this.$nextTick(function() {
          const pageY = e.pageY
          const betMaskHeight = document.querySelector('.betMask').scrollHeight
          // 留给投注栏足够的底部空间
          document.body.style.paddingBottom = betMaskHeight + 'px'
          if (pageY > document.body.scrollHeight-(betMaskHeight+100)) {
            scrollSmoothTo(document.body.scrollHeight+betMaskHeight)
          }
        })
      }
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/css/layout.scss";
@import "@/assets/css/element.scss";
body {
  transition: padding 200ms ease-in;
}
.oddsBtnBox {
  @include flex($direction: flex, $justify: center);
  width: 100%;
  align-items: center;
  // border-bottom: 2px solid #F0F0F2;
  dl {
    padding: 32px 0;
    dt {
      font-size: 28px !important;
      color: #151515;
      text-align: center;
      line-height: 34px;
    }
    & dd::after {
      position: absolute;
      right: -16px;
      top: 50%;
      margin-top: -10px;
    }
    &.active {
      background-color: #f25562;
      dd,
      dt {
        color: #fff !important;
      }
    }
    &.disabled {
      dd,
      dt {
        color: #c2c3cc !important;
      }
    }
    &.odds-up {
      dd::after {
        content: "";
        background-image: url("../assets/img/bet-odds-up.png");
      }
    }
    &.odds-down {
      dd::after {
        content: "";
        background-image: url("../assets/img/bet-odds-down.png");
      }
    }
  }
  dl {
    @include oddsBtn(
      $dtFontSize: 28px,
      $dtColor: #151515,
      $dtLineHeight: 34px,
      $ddColor: #424866,
      $ddLineHeight: 28px,
      $ddFontSize: 24px,
      $dtMargin: 14px
    );
  }
}
</style>

  function newFunction() {
    return ' ';
  }
