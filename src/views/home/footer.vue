<template>
  <Panel :class="$style.panel">
    <template v-slot:content>
      <div :class="$style.content">
        <p>@ Royal Genghis International Dev’t Inc. All rights reserved.</p>
        <p>
          Unit 4A, Jose Isidora Bldg, 2212 Nakar St.,<br />San Andres Bukid,
          Manila, Philippine.
        </p>
        <p>+632-253-5723</p>
        <p>rgidinc@gmail.com</p>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/core/panel.vue";
export default {
  components: {
    Panel
  }
};
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";
.panel {
  @include panel;
  padding: 64px 60px 81px;
  background-color: #2e2e2e;
  text-align: left;
  line-height: 30px;
  .content {
    p {
      font: {
        family: SFUIText-Regular;
        size: 26px;
      }
      color: #ffffff;
      letter-spacing: 0;
      @for $index from 1 through 4 {
        &:nth-child(#{$index}) {
          @if $index==1 {
            margin-bottom: 60px;
          } @else {
            padding-left: 56px;
            background: {
              size: 32px;
              repeat: no-repeat;
              position: left top;
            }
            @if $index== 2 {
              margin-bottom: 32px;
              background-image: url("@/assets/img/icon-Location.png");
            } @else if $index==3 {
              margin-bottom: 32px;
              background-image: url("@/assets/img/icon-Phone.png");
            } @else {
              background-image: url("@/assets/img/icon-Mail.png");
            }
          }
        }
      }
    }
  }
}
</style>
