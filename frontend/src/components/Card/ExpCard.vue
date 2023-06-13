<template>
  <v-card
    :style="{ height: getDetailsShown ? detailCardHeight + 'px' : getTimeLineShown ? timeLineCardHeight + 'px' : 'auto', marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="380" min-width="350">
    <template v-slot:title>
      <span class="text-overline mb-4" :style="{ color: colorOfOrg }">{{ organization }}</span>
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
      <CardFooter :id="id" :timeLineShown="getTimeLineShown" :detailsShown="getDetailsShown"/>
    </v-list-item>

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-list-item three-subtitle>
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="chartData" :options="chartOptions" />
        <CardFooter :id="id" :timeLineShown="getTimeLineShown" :detailsShown="getDetailsShown"/>
      </v-list-item>
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-list-item three-subtitle>
          <v-card-text class="pb-0">
            <span v-html="shortDesc + longDesc"></span>
          </v-card-text>
          <CardFooter :id="id" :timeLineShown="getTimeLineShown" :detailsShown="getDetailsShown"/>
        </v-list-item>
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
  props: {
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
    const getTimeLineShown = computed(() => {
      switch (props.id){
				case "hw":
          return store.state.hwTimeLineShown
				case "cst":
          return store.state.cstTimeLineShown
				case "fs":
          return store.state.fsTimeLineShown
				case "wmt":
          return store.state.wmtTimeLineShown
        default:
          return false
			}
    });
    const getDetailsShown = computed(() => {
      switch (props.id){
				case "hw":
          return store.state.hwDetailsShown
				case "cst":
          return store.state.cstDetailsShown
				case "fs":
          return store.state.fsDetailsShown
				case "wmt":
          return store.state.wmtDetailsShown
        default:
          return false
			}
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
    return { getDetailsShown, getTimeLineShown, chartOptions, chartData }
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