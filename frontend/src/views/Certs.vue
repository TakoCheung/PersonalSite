<template>
  <div>
    <!-- <PDFViewer source=../../assets/Certificate_9865283_08282024.pdf style="height: auto; width: auto" /> -->
    <v-row >
      <v-col >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</v-col>
      <v-col cols="12">
        <PDF src="../../assets/Certificate_9865283_08282024.pdf" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import PDFViewer from 'pdf-viewer-vue'
import PDF from "pdf-vue3";
export default {
  name: 'certificate-s',
  components: {
    PDF,
  },
}
</script>