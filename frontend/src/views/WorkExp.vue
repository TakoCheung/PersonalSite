<template>
  <v-col dense>
    <v-row cols="12">
      <FarragutWorkExpCard />
    </v-row>
    <v-row cols="12">
      <CstWorkExpCard />
    </v-row>
    <v-row cols="12">
      <HoneywellExpCard />
    </v-row>
  </v-col>
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
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
