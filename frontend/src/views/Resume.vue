<template>
  <div>
    <!-- <PDFViewer source=../../assets/Certificate_9865283_08282024.pdf style="height: auto; width: auto" /> -->
    <v-row >
      <v-col cols="12">
        <PDF src="../../assets/KWAN_HO_TAKO_CHEUNG.pdf" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import PDFViewer from 'pdf-viewer-vue'
import PDF from "pdf-vue3";
export default {
  name: 'tako-resumes',
  components: {
    PDF,
  },
}
</script>