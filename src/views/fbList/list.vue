<template>
<div>
  <Panel :class="$style.panel" v-for="(matchs, date) in list" :key="date">
    <template v-slot:title>
      <div :class="$style.title" @click.prevent="slideEvent($event)">{{ date }}</div>
    </template>
    <template v-slot:content>
      <ul>
        <li :class="$style.items" v-for="item in matchs" :key="item.Mid" v-show='$store.state.filterArr.indexOf(item.LeagueId)>-1' :league-id="item.LeagueId">
          <label :class="$style.itemsLabel">
            <span>{{ item.League }}</span>
            <i>{{ item.Time }}</i>
          </label>
          <div :class="$style.itemsName">
            <router-link :to="{name:'fbSingle',params: {lang: locale }}">
              <div :class="$style.itemsInfo">
                <span><img :src="imgUrl + '/football/team/'+ item.HomeId +'.png'" /></span>
                <b>{{ item.Home }}</b>
                <i :class="item.HFull?$style.matchStart:''">{{ !item.HFull?'-':item.HFull }}</i>
              </div>
              <div :class="$style.itemsInfo">
                <span><img :src="imgUrl + '/football/team/'+ item.AwayId +'.png'" /></span>
                <b>{{ item.Away }}</b>
                <i :class="item.AFull?$style.matchStart:''">{{ !item.AFull?'-':item.AFull }}</i>
              </div>
            </router-link>
          </div>
          <Oddsbtn :cname="oddsBtnWidth" :btn-num="3" :odds="[item.H,item.D,item.A]" :label="[$t('Match.fb.had.h'),$t('Match.fb.had.d'),$t('Match.fb.had.a')]" :mid="item.Mid" :live="item.Live" :type="['H','D','A']" pool="HAD" :home="item.Home" :away="item.Away" :odds-status="[item.OddsStatus,item.OddsStatus,item.OddsStatus]"></Oddsbtn>
        </li>
      </ul>
    </template>
  </Panel>
</div>
</template>

<script>
import Panel from "@/core/panel.vue"
import Oddsbtn from "@/components/oddsBtn.vue"
import Base from "@/axios/base"
export default {
  props: {
    list: {}
  },
  components: {
    Panel,
    Oddsbtn
  },
  data() {
    return {
      imgUrl:Base.img,
      oddsBtnWidth:'list-odds-btn-width'
    }
  },
  computed: {
    params() {
      return this.$store.state.betParams;
    },
    locale() {
      return this.$i18n.locale
    },

  },
  methods: {
    slideEvent: function(e) {
      return e
      // const obj = e.currentTarget
      // console.log(obj);
    }
  }
}
</script>
<style lang="scss">
.list-odds-btn-width {
    width: 48%;
}
</style>
<style lang="scss" module>
@import "@/assets/css/layout.scss";
@import "@/assets/css/element.scss";
.panel {
    @include flex;
    $f-color: #424866;
    $b-color: #151515;
    .title {
        $height: 64px;
        height: $height;
        line-height: $height;
        position: relative;
        text-align: left;
        font-size: 24px;
        color: $f-color;
        letter-spacing: 0;
        text-indent: 20px;
        background: #F0F0F2;
        border-bottom: 1px solid #fff;
        &::after {
            @include dot();
            position: absolute;
            top: 26px;
            right: 20px;
        }
    }
    > ul {
        transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        .items {
            @include flex($direction:flex, $justify:flex-start);
            border-bottom: 2px solid #F0F0F2;
            .itemsLabel {
                @include flex($justify: center);
                flex-wrap: wrap;
                align-content: center;
                width: 13%;
                padding: 20px 0;
                font-size: 20px;
                line-height: 28px;
                color: $f-color;
                letter-spacing: 0;
                text-align: center;
                background: #F7F7FA;
                span {
                    margin-bottom: 8px;
                }
            }
            .itemsName {
                padding: 1.5rem 0.5em;
                width: 39%;
                min-height: 36px;
                line-height: 36px;
                font-size: 26px;
                padding: 30px 10px;
                border-right: 2px solid #F0F0F2;
                a {
                    font-size: 24px;
                    color: $b-color;
                    letter-spacing: 0;
                    text-decoration: none;
                    display: block;
                    .itemsInfo {
                        @include flex($direction: flex, $justify: flex-start);
                        align-items: center;
                        span {
                            $height: 36px;
                            height: $height;
                            width: $height;
                            margin-right: 16px;
                            overflow: hidden;
                            img {
                                display: block;
                                width: 100%;
                                height: auto;
                            }
                        }
                        b {
                            width: 156px;
                            text-align: left;
                            margin-right: 30px;
                        }
                        i {
                            color: #C2C3CC;
                            &.matchStart {
                                color: #28C76A;
                            }
                        }
                        &:first-child {
                            margin-bottom: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
