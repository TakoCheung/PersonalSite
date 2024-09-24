<template>
  <div>
    <!-- <PDFViewer source=../../assets/KWAN_HO_TAKO_CHEUNG.pdf style="height: auto; width: auto" /> -->
    <v-row>
      <v-col cols="12">
        <PDF src="../../assets/KWAN_HO_TAKO_CHEUNG.pdf" />
        <transition name="fade" mode="out-in">
          <button @click="toggle('inPlace')" v-if="!isHidden('inPlace')" key="first">
            Download
          </button>
          <button @click="toggle('inPlace')" v-else key="second">
            Downloaded!
          </button>
        </transition>
        <!-- <button @click="downloadPDF">Download</button> -->
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
    // PDFViewer
  },
  methods: {
    downloadPDF() {
      const pdfUrl = '../../assets/KWAN_HO_TAKO_CHEUNG.pdf'; // Replace with your PDF file URL
      const fileName = 'Resume.pdf';

      // Create a link element
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;

      // Programmatically click the link to trigger the download
      link.click();
      // this.toggle(this);
    },
    toggle(type) {
      if (this.isHidden(type)) {
        this.hidden = this.hidden.filter(v => v !== type);
      } else {
        this.downloadPDF();
        this.hidden.push(type);
      }
    }
  },
  data() {
    return {
      hidden: []
    };
  },
  computed: {
    isHidden() {
      return type => this.hidden.includes(type);
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce 0.3s;
}

.bounce-leave-active {
  animation: bounce 0.3s reverse;
}

button {
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    /* background-color: #fff; */
    color: #000000;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #000000;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    font-weight: bold;
  }

  button:hover {
    color: #ffffff;
    background-color: #4fc08d;
    border: 1px solid #ffffff;
  }

@keyframes bounce {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  60% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>