<template>
  <v-card
    :style="{ height: getDetailsShown ? 286 + 'px' : getTimeLineShown ? 256 + 'px' : 'auto', marginBottom: 8 + 'px' }"
    class="mx-auto" max-width="380">
    <template v-slot:title>
      <span class="text-overline mb-4" style="color:#ef4b24">CentralSquare Techolgies</span>
    </template>
    <template v-slot:subtitle>
      <span class="text-h5 mb-4">Software Developer III</span>
    </template>
    <template v-slot:append>
      <v-avatar size="80" image="../../assets/cst.jpeg" />
    </template>
    <v-list-item three-line>
      <v-list-item-subtitle>
        • Implemented a secured web API using
        HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT
        authorization.
      </v-list-item-subtitle>
    </v-list-item>
    <CardFooter id="cst" />

    <v-expand-transition>
      <v-card v-if="getTimeLineShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <CardFooter id="cst" />
        <GChart :settings="{ packages: ['timeline'] }" type="Timeline" :data="cstChartData" :options="cstChartOptions" />
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="getDetailsShown" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-card-text class="pb-0">• Implemented a secured web API using
          HttpListener(https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener) with JWT
          authorization.
          <p>• Designed and implemented an event-driven software which will send a request to the middle-tier server with
            JWT authentication, and fetch the data back to the client.</p>
          <p>• Transformed an XML file to another XML file with the different formats by using XSLT and XPath.</p>
          <p>• Implemented a Field Change Extension which allows the developer to configure it by a single JSON file.</p>
        </v-card-text>
        <CardFooter id="cst" />
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CardFooter from '@/components/Card/CardFooter.vue'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { GChart } from 'vue-google-charts'
export default {
  name: 'CstWorkExpCard',
  components: {
    CardFooter,
    GChart
  },
  data: () => ({
    cstChartData: [
      ['Organization', 'Start', 'End'],
      ['CentralSquare Technolgies', new Date(2018, 4, 30), new Date(2020, 12, 2)]
    ],
  }),
  setup() {
    const store = useStore();
    const cstChartOptions = computed(() => {
      return ({
        colors: ['#ef4b24']
      })
    });
    const getDetailsShown = computed(() => {
      return store.state.cstDetailsShown
    });
    const getTimeLineShown = computed(() => {
      return store.state.cstTimeLineShown
    });
    return { cstChartOptions, getDetailsShown, getTimeLineShown }
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