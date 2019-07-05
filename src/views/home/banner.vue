<template>
  <Panel :class="$style.panel">
    <template v-slot:content>
      <div :class="$style.content">
        <div :class="$style.transBtn">
          <span
            v-for="(name, index) in langBtn"
            :key="index"
            @click="transLang($event, index)"
            :class="{ btnActive: locale == index }"
            >{{ name }}</span
          >
          <!-- v-show="locale !== index" -->
        </div>
        <div :class="$style.appInfo">
          <div :class="$style.logo">
            <img :src="logoUrl" alt="logo" />
          </div>
          <h1>Bet 360</h1>
          <h2>{{ $t("Index.banner.slogan1") }}</h2>
          <h3>{{ $t("Index.banner.slogan2") }}</h3>
        </div>
        <div :class="$style.appDisplay"></div>
        <div :class="$style.downloadBtn">
          <a href="#">{{ $t("Index.banner.iosDownBtn") }}</a>
          <a href="#">{{ $t("Index.banner.androidDownBtn") }}</a>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/core/panel.vue";
import LogoImg from "@/assets/img/logo.png";
import docCookies from "@/assets/js/cookies";
export default {
  components: {
    Panel
  },
  data() {
    return {
      logoUrl: LogoImg,
      langBtn: {
        cn: "简",
        tw: "繁",
        en: "English"
      }
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    transLang(e, key) {
      this.$i18n.locale = key;
      // 设置cookies保存用户选择的语言环境
      docCookies.setItem("lang", key);
    }
  }
};
</script>
<style lang="scss">
.btnActive {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

<style lang="scss" module>
@import "@/assets/css/element.scss";
@import "@/assets/css/layout.scss";
.panel {
  $c-White: #fff;
  @include panel;
  .content {
    padding: 30px 0;
    background-image: -webkit-linear-gradient(90deg, #6489fa 0%, #3061f2 100%);
    background-image: linear-gradient(0deg, #6489fa 0%, #3061f2 100%);
    > .transBtn {
      @include flex($direction: flex, $justify: flex-start);
      padding-left: 40px;
      margin-bottom: 26px;
      $border: 2px solid rgba(255, 255, 255, 0.6);
      > span {
        $height: 50px;
        padding: 0 20px;
        height: $height;
        line-height: $height;
        border-top: $border;
        border-bottom: $border;
        border-right: $border;
        color: $c-White;
        font-size: 24px;
        &:first-child {
          border-left: $border;
          border-radius: 12px 0 0 12px;
        }
        &:last-child {
          border-right: $border;
          border-radius: 0 12px 12px 0;
        }
      }
    }
    .appInfo {
      @include flex;
      margin-bottom: 24px;
      .logo {
        height: 170px;
        width: 170px;
        box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.25);
        margin-bottom: 16px;
        border-radius: 34px;
        align-self: center;
        > img {
          width: 100%;
          height: auto;
        }
      }
      > h1 {
        font: {
          size: 36px;
          weight: 500;
        }
        color: $c-White;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
        margin-bottom: 22px;
      }
      > h2 {
        font: {
          family: SFUIText-Semibold;
          size: 42px;
          weight: 700;
        }
        color: $c-White;
        letter-spacing: 0;
        text-align: center;
        line-height: 50px;
        margin-bottom: 4px;
      }
      > h3 {
        font: {
          size: 36px;
          weight: 500;
        }
        color: $c-White;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .appDisplay {
      height: 478px;
      width: 100%;
      background: url("../../assets/img/app-display.png") center / auto 100%
        no-repeat;
      margin-bottom: 18px;
    }
    .downloadBtn {
      @include flex($direction: flex, $justify: space-around);
      padding: 0 20px;
      > a {
        @include flex($direction: flex);
        $height: 96px;
        height: $height;
        line-height: $height;
        min-width: 320px;
        text-decoration: none;
        color: $c-White;
        font-size: 32px;
        letter-spacing: 0;
        padding: 0 50px;
        border: 2px solid $c-White;
        border-radius: 24px;
        align-items: center;
        font-weight: bold;
        &::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          $width: 56px;
          height: $width;
          width: $width;
          background: {
            position: center;
            size: 100%;
            repeat: no-repeat;
          }
          margin-right: 22px;
        }

        &:first-child::before {
          background-image: url("../../assets/img/icon-iOS.png");
        }
        &:last-child::before {
          background-image: url("../../assets/img/icon-android.png");
        }
      }
    }
  }
}
</style>
