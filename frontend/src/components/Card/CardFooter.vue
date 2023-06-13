<template>
  <v-card-actions>
    <v-btn rounded text @click="clickTimeLine">
      {{ timeLineShown ? 'Hide' : 'Show' }} Time Line
    </v-btn>
    <v-btn rounded text @click="clickDetails">
      {{ detailsShown ? 'Hide' : 'Show' }} Details
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: 'CardFooter',
  props: { id: String , timeLineShown: Boolean, detailsShown: Boolean},
  methods: {
    clickTimeLine() {
      if (this.detailsShown) {
        this.clickDetails();
      }
      this.$store.commit('toggleTimeline', this.id);
    },
    clickDetails() {
      if (this.timeLineShown) {
        this.clickTimeLine();
      }
      this.$store.commit('toggleDetails', this.id);
    },
  }
}
</script>