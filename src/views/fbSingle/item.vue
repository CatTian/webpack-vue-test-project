<template>
  <Panel>
    <template v-slot:content>
      <h2>
        {{ $t("Match.fb.had.title") }}
        <i v-if="had.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="3"
        :odds="[had.H, had.D, had.A]"
        :label="[
          $t('Match.fb.had.h'),
          $t('Match.fb.had.d'),
          $t('Match.fb.had.a')
        ]"
        :mid="mid"
        :live="live"
        :type="['H', 'D', 'A']"
        pool="HAD"
        :home="home"
        :away="away"
        :odds-status="[had.S, had.S, had.S]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.asian.title", { line: asian.Line }) }}
        <i v-if="asian.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="2"
        :odds="[asian.H, asian.A]"
        :label="[$t('Match.fb.asian.h'), $t('Match.fb.asian.a')]"
        :mid="mid"
        :live="live"
        :line="asian.Line"
        :type="['H', 'A']"
        pool="ASIAN"
        :home="home"
        :away="away"
        :odds-status="[asian.S, asian.S]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.overunder.title", { line: overunder.Line }) }}
        <i v-if="overunder.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="2"
        :odds="[overunder.Over, overunder.Under]"
        :label="[$t('Match.fb.overunder.over'), $t('Match.fb.overunder.under')]"
        :mid="mid"
        :live="live"
        :line="overunder.Line"
        :type="['Over', 'Under']"
        pool="OVERUNDER"
        :home="home"
        :away="away"
        :odds-status="[overunder.S, overunder.S]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.double.title") }}
        <i v-if="double.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="3"
        :odds="[double.HD, double.HA, double.DA]"
        :label="[
          $t('Match.fb.double.hd'),
          $t('Match.fb.double.ha'),
          $t('Match.fb.double.da')
        ]"
        :mid="mid"
        :live="live"
        :type="['HD', 'HA', 'DA']"
        pool="DOUBLE"
        :home="home"
        :away="away"
        :odds-status="[double.S, double.S, double.S]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.both.title") }}
        <i v-if="both.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="2"
        :odds="[both.Yes, both.No]"
        :label="[$t('Match.fb.both.yes'), $t('Match.fb.both.no')]"
        :mid="mid"
        :live="live"
        :type="['Yes', 'No']"
        pool="BOTH"
        :home="home"
        :away="away"
        :odds-status="[both.S, both.S]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.hgoal.title") }}
        <i
          v-if="
            hgoal.S0 != 'Open' &&
              hgoal.S1 != 'Open' &&
              hgoal.S2 != 'Open' &&
              hgoal.S3 != 'Open'
          "
          :class="$style.oddsSuspended"
        ></i>
      </h2>
      <Oddsbtn
        :btn-num="4"
        :odds="[hgoal.No, hgoal.One, hgoal.Two, hgoal.More]"
        :label="[
          $t('Match.fb.hgoal.no'),
          $t('Match.fb.hgoal.one'),
          $t('Match.fb.hgoal.two'),
          $t('Match.fb.hgoal.more')
        ]"
        :mid="mid"
        :live="live"
        :type="['No', 'One', 'Two', 'More']"
        pool="HGOAL"
        :home="home"
        :away="away"
        :odds-status="[hgoal.S0, hgoal.S1, hgoal.S2, hgoal.S3]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.agoal.title") }}
        <i
          v-if="
            agoal.S0 != 'Open' &&
              agoal.S1 != 'Open' &&
              agoal.S2 != 'Open' &&
              agoal.S3 != 'Open'
          "
          :class="$style.oddsSuspended"
        ></i>
      </h2>
      <Oddsbtn
        :btn-num="4"
        :odds="[agoal.No, agoal.One, agoal.Two, agoal.More]"
        :label="[
          $t('Match.fb.agoal.no'),
          $t('Match.fb.agoal.one'),
          $t('Match.fb.agoal.two'),
          $t('Match.fb.agoal.more')
        ]"
        :mid="mid"
        :live="live"
        :type="['No', 'One', 'Two', 'More']"
        pool="AGOAL"
        :home="home"
        :away="away"
        :odds-status="[agoal.S0, agoal.S1, agoal.S2, agoal.S3]"
      ></Oddsbtn>

      <h2>
        {{ $t("Match.fb.oddeven.title") }}
        <i v-if="oddeven.S != 'Open'" :class="$style.oddsSuspended"></i>
      </h2>
      <Oddsbtn
        :btn-num="2"
        :odds="[oddeven.Odd, oddeven.Even]"
        :label="[$t('Match.fb.oddeven.odd'), $t('Match.fb.oddeven.even')]"
        :mid="mid"
        :live="live"
        :type="['Odd', 'Even']"
        pool="ODDEVEN"
        :home="home"
        :away="away"
        :odds-status="[oddeven.S, oddeven.S]"
      ></Oddsbtn>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/core/panel.vue";
import Oddsbtn from "@/components/oddsBtn.vue";
export default {
  props: {
    home: String,
    away: String,
    mid: String,
    live: [String, Number],
    had: {
      type: Object,
      default() {
        return {};
      }
    },
    asian: {
      type: Object,
      default() {
        return {};
      }
    },
    overunder: {
      type: Object,
      default() {
        return {};
      }
    },
    double: {
      type: Object,
      default() {
        return {};
      }
    },
    both: {
      type: Object,
      default() {
        return {};
      }
    },
    hgoal: {
      type: Object,
      default() {
        return {};
      }
    },
    agoal: {
      type: Object,
      default() {
        return {};
      }
    },
    oddeven: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    Panel,
    Oddsbtn
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" module>
.oddsSuspended {
  float: right;
  $height: 64px;
  height: $height;
  width: $height;
  background: {
    size: 24px;
    repeat: no-repeat;
    position: center;
    image: url("@/assets/img/icon-odds-unopen.png");
  }
}
</style>