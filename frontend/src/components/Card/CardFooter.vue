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
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'CardFooter',
  props: { id: String },
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
  },
  setup(props) {
    const store = useStore();
    const timeLineShown = computed(() => {
      if (props.id === "hw") {
        return store.state.hwTimeLineShown
      }
      else if (props.id === "cst") {
        return store.state.cstTimeLineShown
      }
      else {
        return store.state.fsTimeLineShown
      }
    });
    const detailsShown = computed(() => {
      if (props.id === "hw") {
        return store.state.hwDetailsShown
      }
      else if (props.id === "cst") {
        return store.state.cstDetailsShown
      }
      else {
        return store.state.fsDetailsShown
      }
    });
    return { timeLineShown, detailsShown };
  }
}
</script>