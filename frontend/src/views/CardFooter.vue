<template>
  <v-card-actions>
    <v-btn rounded text @click="clickTimeLine">
      {{timeLineShown() ? 'Hide' : 'Show'}} Time Line
    </v-btn>
    <v-btn rounded text @click="clickDetails">
      {{detailsShown() ? 'Hide' : 'Show'}} Details
    </v-btn>
  </v-card-actions>
</template>

<script>
  export default {
    name: 'CardFooter',
    props: {id:String},
    methods:{
      clickTimeLine(){
        if(this.detailsShown()){
          this.clickDetails();
        }
        if(this.id === "hw") {
          this.$store.commit('toggleHwTimeLine');
        }
        else if(this.id === "cst") {
          this.$store.commit('toggleCstTimeLine');
        }
        else if(this.id === "fs") {
          this.$store.commit('toggleFsTimeLine');
        }
      },
      clickDetails(){
        if(this.timeLineShown()){
          this.clickTimeLine();
        }
        if(this.id === "hw") {
          this.$store.commit('toggleHwDetails');
        }
        else if(this.id === "cst") {
          this.$store.commit('toggleCstDetails');
        }
        else if(this.id === "fs") {
          this.$store.commit('toggleFsDetails');
        }
      },
      timeLineShown(){
        if(this.id === "hw") {
          return this.$store.hwTimeLineShown
        }
        else if(this.id === "cst") {
          return this.$store.cstTimeLineShown
        }
        else if(this.id === "fs") {
          return this.$store.fsTimeLineShown
        }
      },
      detailsShown(){
        if(this.id === "hw") {
          return this.$store.hwDetailsShown
        }
        else if(this.id === "cst") {
          return this.$store.cstDetailsShown
        }
        else if(this.id === "fs") {
          return this.$store.fsDetailsShown
        }
      }
    }
  }
</script>
