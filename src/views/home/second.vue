<template>
  <Panel :class="$style.panel">
    <template v-slot:content>
      <div :class="$style.content">
        <dl
          v-for="(val, i) in $t('Index.secondScreen')"
          :key="i"
          :class="$style.item"
        >
          <dt v-if="!(i > 3)" :class="$style['icon' + (i + 1)]"></dt>
          <dd>
            <h3>{{ $t(`Index.secondScreen[${i}].title`) }}</h3>
            <p>{{ $t(`Index.secondScreen[${i}].msg`) }}</p>
            <div v-if="i > 3" :class="$style.link">
              <i :class="$style.eg">e.g.</i>
              <div>
                <label v-html="$t('Index.secondScreen[4].huobi')"></label>
                <a :href="HuobiUrl">{{ HuobiUrl }}</a
                ><br />
                <label v-html="$t('Index.secondScreen[4].OKEx')"></label>
                <a :href="OKExUrl">{{ OKExUrl }}</a
                ><br />
                …
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/core/panel.vue";
export default {
  components: {
    Panel
  },
  data() {
    return {
      HuobiUrl: "https://www.huobi.co",
      OKExUrl: "http://wwww.okex.me"
    };
  }
};
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";
@import "@/assets/css/layout.scss";
.panel {
  @include panel;
  .content {
    padding: 80px 40px 0;
    color: #1a1a1a;
    background-color: #f5f5f5;
    overflow: hidden;
    .item {
      text-align: left;
      > dt {
        float: left;
        margin-right: 44px;
        margin-left: -8px;
        height: 160px;
        width: 200px;
        background: {
          position: center;
          size: 100%;
          repeat: no-repeat;
        }
        @each $index, $img in (1: Reward, 2: Privacy, 3: Security, 4: Fairness)
        {
          &.icon#{$index} {
            background-image: url("@/assets/img/icon-#{$img}.png");
          }
        }
      }
      > dd {
        $fontSize: 28px;
        $lineHeight: 34px;
        margin-bottom: 40px;
        > h3 {
          line-height: 42px;
          margin-bottom: 10px;
          font: {
            size: 36px;
            weight: bold;
          }
          color: #0d0d0d;
          letter-spacing: 0;
        }
        > p {
          font-size: $fontSize;
          font-family: SFUIText-Light;
          color: #1a1a1a;
          letter-spacing: -1.08px;
          line-height: $lineHeight;
        }
        .link {
          margin-top: 14px;
          font-size: $fontSize;
          line-height: $lineHeight;
          @include flex($direction: flex, $justify: flex-start);
          i {
            margin-right: 20px;
          }
          a {
            color: #4b77fa;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
