<template>
  <div :class="$style.con">
    <div :class="$style.conBox">
      <h1>尝试使用mock.js模拟接口</h1>
      <article v-for="item in msg" :key="item.name">
        <h2 :class="$style.title">
          <img :src="item.pic" alt="" />
          {{ item.title }}
        </h2>
        <p :class="$style.msg">{{ item.article }}</p>
        <p :class="$style.littleTails">{{ item.name }} {{ item.date }}</p>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      msg2: "",
      pollingTimer: null
    };
  },
  created() {
    this.getListData();
    // this.pollingTimer = setInterval(this.getListData, 5000)
  },
  methods: {
    getListData: function() {
      let vm = this;
      this.$axios
        .get("abc.json", {
          s: 123
        })
        .then(res => {
          vm.msg = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeDestroy() {
    // 手动释放轮询资源
    // clearInterval(this.pollingTimer)
  }
};
</script>

<style lang="scss" module>
.con {
  text-align: left;
  .conBox {
    margin-top: 100px;
    font-size: 32px;
    padding: 0 40px;
    h1{
      font-size: 40px;
      text-align: center;
      padding-bottom: 30px;
    }
    article{
      padding-bottom: 40px;
    }
    .title{
      padding: 20px 0;
      font-size: 32px;
      line-height: 40px;
      display: flex;
      font-weight: bold;
      > img{
        margin-right: 20px;
      }
    }
    .msg{
      line-height: 48px;
      font-size: 28px;
    }
    .littleTails {
      text-align: right;
      padding: 20px 0;
      font-size: 24px;
    }
  }
}
</style>
