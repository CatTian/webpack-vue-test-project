<!--
1. 下一步该做刷新数据了
2. 页面翻译
3. 赛事筛选
4. 赛事模块折叠
-->

<template>
  <div :class="$style.content">
    <Topnav :cname="'topnavPosition'"></Topnav>
    <Empty
      v-if="!Object.keys(matchList).length"
      :msg="$t('Match.noMatch')"
      :cname="'empty'"
    ></Empty>
    <section v-else>
      <Fliter :feague="matchLeague" :cname="'fliterPosition'"></Fliter>
      <List :list="matchList"></List>
      <Betmask></Betmask>
      <Toast></Toast>
    </section>
  </div>
</template>

<script>
import Topnav from "./topnav.vue";
import Empty from "@/components/empty.vue";
import Fliter from "@/components/filter_league.vue";
import List from "./list.vue";
import Betmask from "@/components/betMask.vue";
import Toast from "@/components/toast.vue";
export default {
  components: {
    Topnav,
    Empty,
    Fliter,
    List,
    Betmask,
    Toast
  },
  data() {
    return {
      matchList: "",
      matchLeague: "",
      pollingTimer: null
    };
  },
  created() {
    this.getListData();
    this.getUser();
    // 实际更新生产接口跟初始化接口是同一个接口
    this.pollingTimer = setTimeout(this.updataListData, 5000);
    // this.pollingTimer = setInterval(this.getListData, 5000);
  },
  methods: {
    getUser() {
      this.$axios
        .get('user.json')
        .then(res => {
          if (res.data.Result) {
            this.$store.commit("initUser", {
              id: res.data.id,
              balance: res.data.usd,
              token: res.data.token
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getListData() {
      this.$axios
        .get('fbList.json', {
          s: "Matchlist"
        })
        .then(res => {
          if (res.data.Result) {
            if (res.data.List) {
              this.matchList = res.data.List;
            }
            if (res.data.League) {
              this.matchLeague = res.data.League;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updataListData() {
      this.$axios
        .get('/fbList_up.json', {
          s: "Matchlist"
        })
        .then(res => {
          if (res.data.Result) {
            this.matchList = res.data.List;
            this.matchLeague = res.data.League;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeDestroy() {
    // 手动释放轮询资源
    clearTimeout(this.pollingTimer);
    // clearInterval(this.pollingTimer);
  }
};
</script>
<style lang="css">
.topnavPosition {
  top: 60px !important;
}
.fliterPosition {
  top: 160px !important;
}
.empty {
  margin-top: 100px !important;
}
</style>
<style lang="scss" module>
.content {
  padding-top: 272px;
}
</style>
