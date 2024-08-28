<template>
  <div>
    <!-- <PDFViewer source=../../assets/Certificate_9865283_08282024.pdf style="height: auto; width: auto" /> -->
    <PDF src="../../assets/Certificate_9865283_08282024.pdf"/>
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