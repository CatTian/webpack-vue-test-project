<template>
<transition name="toast-fade">
  <Panel v-if="tips.states" :class="$style.panel">
    <p>{{ tips.value }}</p>
  </Panel>
</transition>
</template>

<script>
import Panel from "@/core/panel.vue"
export default {
  components: {
    Panel
  },
  computed:{
    tips(){
      return this.$store.state.tips
    }
  }
}
</script>
<style lang="css">
/* 动画 */
.toast-fade-enter-active {
  animation: toastAni .3s ease;
}
.toast-fade-leave-active {
  /* 限定3s后动画开始 */
  animation: toastAni .2s cubic-bezier(1.0, 0.5, 0.8, 1.0) 2s 1 reverse;
}
@keyframes toastAni {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>
<style lang="scss" module>
.panel {
    position: fixed;
    top: 25%;
    transform: translateX(75%);
    z-index: 100;
    width: 40%;
    padding: 60px 20px;
    border-radius: 12px;
    background-color: rgba(0,0,0,.8);
    p {
        font-size: 32px;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }
}
</style>
