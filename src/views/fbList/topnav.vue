<template>
<Panel :class="[$style.panel, cname]">
  <template v-slot:content>
    <div :class="$style.content">
      <router-link :to="{ name: '', params: {} }">{{ $t("Match.nav.balance", {money: userBalance}) }}</router-link>
      <router-link :to="{ name: '', params: {} }">{{ $t("Match.nav.drawing") }}</router-link>
      <router-link :to="{ name: '', params: {} }">{{ $t("Match.nav.record") }}</router-link>
      <router-link :to="{ name: '', params: {} }">{{ $t("Match.nav.help") }}</router-link>
    </div>
  </template>
</Panel>
</template>

<script>
import Panel from "@/core/panel.vue"
export default {
  props: {
    cname: {
      type: String,
      default: ""
    }
  },
  components: {
    Panel
  },
  computed:{
    userBalance() {
      return this.$store.state.user.balance
    }
  }
}
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";
@import "@/assets/css/layout.scss";
.panel {
    @include panel;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    .content {
        $border: 2px solid #D7D7D7;
        @include flex($direction:flex,$justify:flex-start);
        background-color: #fff;
        border-top: $border;
        border-bottom: $border;
        > a {
            flex-grow: 1;
            height: 96px;
            line-height: 40px;
            padding-top: 30px;
            color: #050505;
            font-size: 28px;
            text-decoration: none;
            border-left: $border;
            &:first-child {
                border: 0;
            }
        }
    }
}
</style>
