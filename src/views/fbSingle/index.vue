<template>
  <div :class="$style.content">
    <Empty
      v-if="!Object.keys(matchSingle).length"
      :msg="$t('Match.noMatch')"
      :cname="'empty'"
    ></Empty>
    <div v-else>
      <Score
        :time="matchSingle.Time"
        :date="matchSingle.Date"
        :h-mid="matchSingle.HomeId"
        :a-mid="matchSingle.AwayId"
        :home="matchSingle.Home"
        :away="matchSingle.Away"
        :h-full="matchSingle.HFull"
        :a-full="matchSingle.AFull"
        :status="matchSingle.Status"
        :status-time="matchSingle.StatusTime"
      ></Score>
      <Item
        :home="matchSingle.Home"
        :away="matchSingle.Away"
        :mid="matchSingle.Mid"
        :live="matchSingle.live"
        :had="matchSingle.HAD"
        :asian="matchSingle.ASIAN"
        :overunder="matchSingle.OVERUNDER"
        :double="matchSingle.DOUBLE"
        :both="matchSingle.BOTH"
        :hgoal="matchSingle.HGOAL"
        :agoal="matchSingle.AGOAL"
        :oddeven="matchSingle.ODDEVEN"
      ></Item>
      <Betmask></Betmask>
      <Toast></Toast>
    </div>
  </div>
</template>

<script>
import Empty from "@/components/empty.vue";
import Score from "./score.vue";
import Item from "./item.vue";
import Betmask from "@/components/betMask.vue";
import Toast from "@/components/toast.vue";
export default {
  components: {
    Empty,
    Score,
    Item,
    Betmask,
    Toast
  },
  data() {
    return {
      matchSingle: "",
      pollingTimer: null
    };
  },
  created() {
    this.getSingleData();
    this.pollingTimer = setTimeout(this.getSingleData, 5000);
    // this.pollingTimer = setInterval(this.getSingleData, 5000);
  },
  methods: {
    getSingleData: function() {
      this.$axios
        .get('fbSingle.json', {
          s: "MatchOdds"
        })
        .then(res => {
          if (res.data.Result) {
            this.matchSingle = res.data.List[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    upDataSingleData: function() {
      this.$axios
        .get('fbSingle_up.json', {
          s: "MatchOdds"
        })
        .then(res => {
          if (res.data.Result) {
            this.matchSingle = res.data.List[0];
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

<style lang="scss" module>
.content {
  padding-top: 60px;
}
</style>
