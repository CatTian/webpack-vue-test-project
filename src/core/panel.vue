<template>
<section :class="[panelClass, cname]">
  <slot></slot>
  <slot name="title"></slot>
  <slot name="content"></slot>
</section>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      panelClass: 'panel'
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/element.scss";
.panel{
  @include panel;
}
</style>
