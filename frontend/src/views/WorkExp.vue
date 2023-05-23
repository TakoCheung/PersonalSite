<template>
  <v-row dense>
    <v-col cols="12">
      <ExpCard color-of-org="#d7332c" organization="Farragut Systems" detail-card-height="226" :end="{ now }" :start="{start}"/>
    </v-col>
    <v-col cols="12">
      <FarragutWorkExpCard />
    </v-col>
    <v-col cols="12">
      <CstWorkExpCard />
    </v-col>
    <v-col cols="12">
      <HoneywellExpCard />
    </v-col>
  </v-row>
</template>

<script>
import HoneywellExpCard from './HoneywellExpCard'
import CstWorkExpCard from './CstWorkExpCard'
import FarragutWorkExpCard from './FarragutWorkExpCard'
import ExpCard from '@/components/Card/ExpCard.vue';
export default {
  name: 'WorkExp',
  components: {
    HoneywellExpCard,
    CstWorkExpCard,
    FarragutWorkExpCard,
    ExpCard
  },
  setup(){
    const now = Date.now();
    const start = new Date(2020, 12, 4);
    return {start,now}
  }
}
</script>
