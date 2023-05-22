<template>
  <v-card
    :style="{ height: getDetailsShown ? 480 + 'px' : getTimeLineShown ? 256 + 'px' : 'auto', marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="380">
    <template v-slot:title>
      <span class="text-overline mb-4" style="color:#ef3124">Honeywell</span>
    </template>
    <template v-slot:subtitle>
      <span class="text-h5 mb-4">Software Developer (CO-OP)</span>
    </template>
    <template v-slot:append>
      <v-avatar size="80" image="../../assets/hw.jpeg" />
    </template>
    <v-list-item three-line>
      <v-list-item-subtitle>
        Requirement Analysis:
        <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>
      </v-list-item-subtitle>
    </v-list-item>
    <CardFooter id="hw" />

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal">
        <CardFooter id="hw" />
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="honeywellChartData"
          :options="honeywellChartOptions" />
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal">
        <v-card-text class="pb-0">Requirement Analysis:
          <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>
          <p>Design:</p>
          <p>• Eliminated the possibility of OS injection and improved the performance by using Ajax to upload the file,
            parsing the file into binary without saving the file on the server.</p>
          <p>• Cleaner and easier to maintain by following MVC for both frontend and backend</p>
          <p>Implementation:</p>
          <p>• Saved company about $100,000 by Implementing a single step firmware upgrade.</p>
          <p>Testing:</p>
          <p>• Speeded up the building process by 20% after Postman became the tool of integration testing.</p>
          <p>Maintenance:</p>
          <p>• Prevented introducing new implementation bug by integrating Fortify SCA scanning process into Gradle and
            the Gradle script into the Jenkins pipeline.</p>
          <p>• Reduced the deployment time by 50% by modifying the existing batch script.</p>
        </v-card-text>
        <CardFooter id="hw" />
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
  name: 'HoneywellExpCard',
  components: {
    CardFooter,
    GChart
  },
  data: () => ({
    chartsLib: null,
    honeywellChartData: [
      ['Organization', 'Start', 'End'],
      ['Honeywell', new Date(2016, 12, 14), new Date(2018, 4, 14)]
    ],
  }),
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  },
  setup() {
    const store = useStore();
    const honeywellChartOptions = computed(() => {
      return ({
        colors: ['#ef3124']
      })
    });
    const getDetailsShown = computed(() => {
      return store.state.hwDetailsShown
    });
    const getTimeLineShown = computed(() => {
      return store.state.hwTimeLineShown
    });
    return { honeywellChartOptions, getDetailsShown, getTimeLineShown }
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