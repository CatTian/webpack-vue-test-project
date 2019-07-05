<template>
  <section :class="[$style.empty, cname]">
    <div :class="$style.bg"></div>
    <p>{{ msg }}</p>
  </section>
</template>

<script>
export default {
  props: {
    cname: {
      tyle: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" module>
@import "@/assets/css/layout.scss";
.empty {
  @include flex;
  .bg {
    height: 206px;
    width: 100%;
    background: {
      size: auto 100%;
      repeat: no-repeat;
      position: center;
      image: url("@/assets/img/record-nodata.png");
    }
  }
  > p {
    margin-top: 40px;
    line-height: 40px;
    font-size: 24px;
    color: #424866;
  }
}
</style>
