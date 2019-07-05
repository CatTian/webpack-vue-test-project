<template>
  <!-- 没有包裹层 div 不能添加两个以上的组件 -->
  <div :class="$style.content">
    <Banner></Banner>
    <Second></Second>
    <Three></Three>
    <Introduction></Introduction>
    <Fooder></Fooder>
  </div>
</template>

<script>
import "@/assets/css/reset.scss";
import Banner from "./banner.vue";
import Second from "./second.vue";
import Three from "./three.vue";
import Introduction from "./introduction.vue";
import Fooder from "./footer.vue";

export default {
  name: "home",
  components: {
    Banner,
    Second,
    Three,
    Introduction,
    Fooder
  }
};
</script>

<style lang="scss" module>
.content {
  padding-top: 60px;
}
</style>
