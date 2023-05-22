<template>
  <v-row dense>
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
export default {
  name: 'WorkExp',
  components: {
    HoneywellExpCard,
    CstWorkExpCard,
    FarragutWorkExpCard
  }
}
</script>
