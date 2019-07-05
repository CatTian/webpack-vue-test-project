<template>
  <Panel :class="$style.panel">
    <template v-slot:content>
      <div :class="$style.teamName">{{ home }}</div>
      <span :class="$style.logo"
        ><img :src="imgUrl + '/football/team/' + hMid + '.png'"
      /></span>
      <div :class="$style.score">
        <p>{{ status != "NSY" ? hFull + ":" + aFull : time }}</p>
        <i> {{ status != "NSY" ? statusTime : date }}</i>
      </div>
      <span :class="$style.logo"
        ><img :src="imgUrl + '/football/team/' + aMid + '.png'"
      /></span>
      <div :class="$style.teamName">{{ away }}</div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/core/panel.vue";
import Base from "@/axios/base";
export default {
  props: {
    time: String,
    date: String,
    hMid: String,
    aMid: String,
    home: String,
    away: String,
    hFull: String,
    aFull: String,
    status: String,
    statusTime: String
  },
  components: {
    Panel
  },
  data() {
    return {
      imgUrl: Base.img
    };
  }
};
</script>

<style lang="scss" module>
@import "@/assets/css/layout.scss";
@import "@/assets/css/element.scss";
.panel {
  $border: 2px solid #f0f0f2;
  @include flex($direction: flex, $justify: space-between);
  align-items: center;
  height: 100px;
  padding: 12px 0 8px;
  border-top: $border;
  background-color: #fff;
  .teamName {
    line-height: 44px;
    color: #080808;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0;
    width: 180px;
    &:first-child {
      text-align: right;
    }
    &:last-child {
      text-align: left;
    }
  }
  .score {
    @include flex($justify: center);
    align-items: center;
    color: #3285fa;
    text-align: center;
    width: 150px;
    p {
      line-height: 48px;
      font-size: 40px;
      color: #3285fa;
      letter-spacing: 2.5px;
      margin-bottom: 4px;
      font-weight: 600;
    }
    i {
      line-height: 28px;
      font-size: 20px;
      color: #3285fa;
      letter-spacing: 0;
    }
  }
  .logo {
    $height: 68px;
    height: $height;
    width: $height;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
