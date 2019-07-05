<template>
  <Panel :class="$style.panel">
    <template v-slot:content>
      <div :class="$style.content">
        <ul title="1">
          <li>
            <h3>{{ $t("Index.threeScreen.step1.title") }}</h3>
          </li>
          <li v-for="(val, i) in $t('Index.threeScreen.step1.step')" :key="i">
            <p>{{ $t(`Index.threeScreen.step1.step[${i}]`) }}</p>
          </li>
        </ul>
        <ul title="2">
          <li>
            <h3>{{ $t("Index.threeScreen.step2.title") }}</h3>
          </li>
          <li :class="$style.step2">
            <p>{{ $t("Index.threeScreen.step2.step[0]") }}</p>
            <p v-if="locale != 'en'">
              {{ $t("Index.threeScreen.step2.step[1].label") }}<br />
              <i>{{ $t("Index.threeScreen.step2.step[1].OKEx") }}</i>
              <a :href="OKExUrl">{{ OKExUrl }}</a
              ><br />
              <i>{{ $t("Index.threeScreen.step2.step[1].huobi") }}</i>
              <a :href="HuobiUrl">{{ HuobiUrl }}</a>
            </p>
            <p v-if="locale != 'en'">
              {{ $t("Index.threeScreen.step2.step[2]") }}
            </p>
          </li>
        </ul>
        <ul title="finish">
          <li>
            <h3>Finish</h3>
          </li>
        </ul>
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
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";
.panel {
  @include panel;
  .content {
    $c-blue: #4b77fa;
    text-align: left;
    padding: 110px 50px 82px 78px;
    ul {
      border-left: 4px dashed $c-blue;
      padding-left: 68px;
      padding-bottom: 62px;
      &:last-child {
        padding-bottom: 0;
      }
      li {
        h3 {
          font: {
            family: PingFang-SC-Semibold;
            size: 36px;
            weight: 700;
          }
          color: #0d0d0d;
          letter-spacing: 0;
          line-height: 44px;
          margin-bottom: 50px;
        }
        p {
          font: {
            family: SFUIText-Regular;
            size: 26px;
          }
          color: #333333;
          letter-spacing: -1px;
          line-height: 34px;
          padding-bottom: 36px;
          i {
            display: inline-block;
            width: 100px;
          }
          a {
            color: $c-blue;
            text-decoration: none;
          }
        }
        &.step2 p {
          padding-bottom: 16px;
        }

        position: relative;
        // 序号
        &::before {
          $height: 22px;
          position: absolute;
          top: 0;
          left: -86px;
          content: "";
          height: $height;
          width: $height;
          border-radius: 100%;
          border: 4px solid $c-blue;
          background-color: #fff;
        }
      }
      @for $index from 1 through 3 {
        &:nth-child(#{$index}) li:first-child::before {
          @if $index<3 {
            content: "#{$index}";
            $height: 78px;
            height: $height;
            width: $height;
            top: -20px;
            left: -114px;
            border-width: 5px;
            text-align: center;
            line-height: $height;
            font: {
              size: 56px;
              weight: 700;
            }
            color: $c-blue;
          } @else {
            $height: 60px;
            height: $height;
            width: $height;
            border: 0;
            left: -100px;
            background: {
              image: url("@/assets/img/icon-finish.png");
              position: center;
              repeat: no-repeat;
              size: 100%;
            }
            box-shadow: 0 16px 32px 0 rgba(59, 198, 118, 0.5);
          }
        }
      }
    }
  }
}
</style>
