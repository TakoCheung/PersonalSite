<template>
  <v-card
    :style="{ height : getDetailsShown ? detailCardHeight +'px':getTimeLineShown ? timeLineCardHeight +'px':'auto',marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="380">
    <template v-slot:title>
      <span class="text-overline mb-4" :style="{color:colorOfOrg}">{{ organization }}</span>
    </template>
    <template v-slot:subtitle>
      <span class="text-h5 mb-4">{{ positionTitle }}</span>
    </template>
    <template v-slot:append>
      <v-avatar size="80" :image="pathToLogo" />
    </template>
    <v-list-item three-subtitle>
      <v-list-item-subtitle>
        <span v-html="shortDesc"></span>
      </v-list-item-subtitle>
    </v-list-item>
    <CardFooter :id="id" />

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <CardFooter id="fs" />
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="chartData" :options="chartOptions" />
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-card-text class="pb-0">
          <span v-html="shortDesc + longDesc"></span>
        </v-card-text>
        <CardFooter :id="id" />
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CardFooter from './CardFooter'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { GChart } from 'vue-google-charts'
export default {
  components: {
    CardFooter,
    GChart
  },
  props:{
    organization: String,
    start: Date,
    end: Date,
    detailCardHeight: Number,
    timeLineCardHeight: Number,
    positionTitle: String,
    shortDesc: String,
    longDesc: String,
    pathToLogo: String,
    colorOfOrg: String,
    id: String
  },
  setup(props) {
    const store = useStore();
    const getDetailsShown = computed(() => {
      return store.state.fsDetailsShown
    });
    const getTimeLineShown = computed(() => {
      return store.state.fsTimeLineShown
    });
    const chartOptions = computed(() => {
      return ({
        colors: [props.colorOfOrg]
      })
    });
    const chartData = [
      ['Organization', 'Start', 'End'],
      [props.organization, props.start, props.end]
    ]
    return { getDetailsShown, getTimeLineShown, chartOptions,chartData }
  }
}
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>