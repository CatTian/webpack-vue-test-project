<template>
  <div>
    <section :class="[$style.filterBox, cname]">
      <div :class="$style.displayCon">
        <div :class="$style.btnCon">
          <ul>
            <li
              :class="[filterActive, displayClass]"
              v-for="(item, id) in feague"
              v-show="$store.state.filterArr.indexOf(id) > -1"
              :league-id="id"
              :key="item.Cn + '1'"
              @click="selectLeague($event, id)"
            >
              {{ item.Cn }}
            </li>
          </ul>
        </div>
        <div :class="$style.toggleBtn" @click="showFlag = true"></div>
      </div>
      <transition name="filter-slide-fade">
        <div v-show="showFlag" :class="$style.btnStore">
          <ul>
            <li
              :class="[
                $store.state.filterArr.indexOf(id) > -1 ? filterActive : '',
                storeClass
              ]"
              v-for="(item, id) in feague"
              :league-id="id"
              :key="item.Cn + '2'"
              @click="selectLeague($event, id)"
            >
              {{ item.Cn }}
            </li>
          </ul>
          <div :class="$style.submit" @click="showFlag = false">确定</div>
        </div>
      </transition>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    cname: String,
    feague: {}
  },
  data() {
    return {
      showName: "",
      showFlag: false,
      displayClass: "filter-btnDisplay-btn",
      filterActive: "filter-active",
      displayHide: "filter-btnCon-hide",
      storeClass: "filter-btnStore-btn"
    };
  },
  // 默认为全部显示，所以需要在渲染前收集到所有赛事id
  mounted() {
    const $FilterArr = this.$store.state.filterArr;
    if (
      $FilterArr.length !==
      document.querySelectorAll(".filter-btnDisplay-btn").length
    ) {
      for (let item in this.feague) {
        if (this.feague.hasOwnProperty(item)) {
          $FilterArr.push(item);
        }
      }
    }
  },
  methods: {
    selectLeague: function(e, lid) {
      if (this.$store.state.betFlag) {
        // 改变投注框显示状态
        this.$store.commit("changeBetFlag", false);
        if (document.querySelector(".oddsBtnBox .active")) {
          document
            .querySelector(".oddsBtnBox .active")
            .classList.remove("active");
        }
      }
      const $FilterArr = this.$store.state.filterArr;
      const isActive = e.currentTarget.classList.contains(this.filterActive);

      if (isActive) {
        $FilterArr.splice($FilterArr.indexOf(lid), 1);
      } else {
        $FilterArr.push(lid);
      }
    }
  }
};
</script>
<style lang="css">
/* 动画 */
.filter-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.filter-slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.filter-slide-fade-enter, .filter-slide-fade-leave-to
/* .filter-slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-100%);
  /* opacity: 0; */
}
/* 按钮状态 */
.filter-active {
  position: relative;
  color: #3285fa;
}
.filter-btnDisplay-btn::after {
  content: "";
}
.filter-btnCon-hide {
  display: none;
}
</style>
<style lang="scss" module>
@import "@/assets/css/element.scss";
@import "@/assets/css/layout.scss";
.filterBox {
  $height: 64px;
  $c-White: #fff;
  $f-size: 28px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 24px 20px;
  background-color: #f0f0f2;
  .btnPubStyle {
    height: $height;
    padding: 0 10px;
    background-color: $c-White;
    border-radius: 4px;
    line-height: $height;
    font-size: $f-size;
    letter-spacing: 1px;
  }
  .displayCon {
    @include flex($direction: flex, $justify: space-around);
    height: $height;
    overflow: hidden;
    width: 100%;
    .btnCon {
      width: 84%;
      height: 100%;
      overflow: hidden;
      ul {
        @include flex($direction: flex, $justify: flex-start);
        flex-wrap: nowrap;
        height: 100%;
        width: 400%;
        li {
          @extend .btnPubStyle;
          position: relative;
          min-width: 5.7%;
          margin-right: 0.625%;
          &::after {
            $A-height: 18px;
            // content: '';
            position: absolute;
            top: 4px;
            right: 4px;
            height: $A-height;
            width: $A-height;
            background: {
              size: 100%;
              position: center;
              repeat: no-repeat;
              image: url("@/assets/img/bet-filter-close.png");
            }
          }
        }
      }
    }
    .toggleBtn {
      width: 14%;
      height: $height;
      border-radius: 4px;
      background: {
        size: 48px;
        repeat: no-repeat;
        position: center;
        image: url("@/assets/img/bet-filter-normal.png");
        color: $c-White;
      }
    }
  }
  .btnStore {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 40px 0 30px;
    background-color: #f0f0f2;
    box-shadow: 0 2px 24px 0 rgba(21, 21, 21, 0.55);
    z-index: 1;
    ul {
      @include flex($direction: flex, $justify: flex-start);
      flex-wrap: wrap;
      margin-bottom: 100px;
      li {
        @extend .btnPubStyle;
        min-width: 22%;
        margin: 1.5%;
      }
    }
    .submit {
      @include submitBtn(
        $height: 88px,
        $width: auto,
        $lineHeight: 88px,
        $fontsize: 32px,
        $color: #fff,
        $backgroundColor: #f25562,
        $borderRadius: 0
      );
      margin: 0 1.5%;
    }
  }
}
</style>
