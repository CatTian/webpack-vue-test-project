<template>
<Panel :class="$style.panel">
  <template v-solt:content>
    <article :class="$style.content">
      <i18n path="Index.introduction" tag="p">
        <br place="br" />
      </i18n>
    </article>
  </template>
</Panel>
</template>

<script>
import Panel from "@/core/panel.vue"
export default {
  components: {
    Panel
  }
}
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";
.panel {
    @include panel;
    .content {
        padding: 40px 70px;
        background-color: #4A4A4A;
        font: {
            family: SFUIText-Regular;
            size: 26px;
        }
        color: #FFFFFF;
        letter-spacing: -1px;
        text-align: left;
        line-height: 34px;
    }
}
</style>
