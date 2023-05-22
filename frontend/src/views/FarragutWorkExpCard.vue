<template>
  <v-card
    :style="{ height: getDetailsShown ? 282 + 'px' : getTimeLineShown ? 256 + 'px' : 185 + 'px', marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="380">
    <template v-slot:title>
      <span class="text-overline mb-4" style="color:#d7332c">Farragut Systems</span>
    </template>
    <template v-slot:subtitle>
      <span class="text-h5 mb-4">Software Developer</span>
    </template>
    <template v-slot:append>
      <v-avatar size="80" image="../../assets/farragut.jpeg" />
    </template>
    <v-list-item three-subtitle>
      <v-list-item-subtitle>
        • Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring.
      </v-list-item-subtitle>
    </v-list-item>
    <CardFooter id="fs" />

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="fsChartData" :options="fsChartOptions" />
        <CardFooter id="fs" />
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-card-text class="pb-0">• Integrated Jenkins with MS Team to enable real-time notification for better CI
          monitoring.
          <p>• Converted an Angular component into React component.</p>
          <p>• Made a Message Box component in React so that the Message Box is reusable within the App.</p>
          <p>• Write the code in the cloud with Cloud9, CloudFormation, CloudWatch, Lambda, Step Function, S3, EC2 in AWS
          </p>
        </v-card-text>
        <CardFooter id="fs" />
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CardFooter from './CardFooter'
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'FarragutWorkExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    fsChartData: [
      ['Organization', 'Start', 'End'],
      ['Farragut Systems', new Date(2020, 12, 4), Date.now()]
    ],
  }),
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  setup() {
    const store = useStore();
    const getDetailsShown = computed(() => {
      return store.state.fsDetailsShown
    });
    const getTimeLineShown = computed(() => {
      return store.state.fsTimeLineShown
    });
    const fsChartOptions = computed(()=> {
      return ({
        colors: ['#d7332c']
      })
    });
    return { getDetailsShown, getTimeLineShown, fsChartOptions }
  }
}
</script>
