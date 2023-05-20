<template>
  <v-card
    :style="{ height: getDetailsShown ? 282 + 'px' : getTimeLineShown ? 256 + 'px' : 200 + 'px', marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="344" append-avatar="../../assets/farragut.jpeg">
    <!-- <template v-slot:append-avatar > -->
      
    <!-- </template> -->
    <template v-slot:title >
      <span class="text-overline mb-4" style="color:#d7332c">Farragut Systems</span>
      <!-- <v-avatar size="80" height="40" image="../../assets/farragut.jpeg"></v-avatar> -->
    </template>
    <v-list-item three-line>
      <v-list-item>
        <v-list-item-title class="text-h5 mb-4">
          Software Developer
        </v-list-item-title>
        <v-list-item-subtitle>
          • Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring.
        </v-list-item-subtitle>
      </v-list-item>
    </v-list-item>
    <CardFooter id="fs" />

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="cstChartData" :options="cstChartOptions" />
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
export default {
  name: 'FarragutWorkExpCard',
  components: {
    CardFooter,
  },
  data: () => ({
    chartsLib: null,
    cstChartData: [
      ['Organization', 'Start', 'End'],
      ['Farragut Systems', new Date(2020, 12, 4), Date.now()]
    ],
  }),
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  computed: {
    cstChartOptions() {
      return ({
        colors: ['#d7332c']
      })
    },
    getDetailsShown() {
      return this.$store.fsDetailsShown
    },
    getTimeLineShown() {
      return this.$store.fsTimeLineShown
    }
  }
}
</script>
