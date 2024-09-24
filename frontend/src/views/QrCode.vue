<template>
  <div>
    <h1>QR Code Generator with Image</h1>
    
    <input v-model="inputText" placeholder="Enter text for QR Code" />

    <!-- Dropdown to select available images -->
    <div>
      <label for="imageDropdown">Choose an image:</label>
      <select v-model="selectedImage" id="imageDropdown">
        <option v-for="(img, index) in imageList" :key="index" :value="img.data">{{ img.name }}</option>
      </select>
    </div>
    <br /><br />
    <!-- Input to upload an image file -->
    <div>
      <input type="file" @change="handleImageUpload" accept="image/*" />
    </div>

    <!-- Display the QR code -->
    <br /><br />
    <button @click="generateQRCode">Generate QR Code</button>
    <div id="qrcode"></div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  data() {
    return {
      inputText: "",
      selectedImage: null,
      imageList: [],
    };
  },
  mounted() {
    this.loadPredefinedImages();
    this.loadImagesFromLocalStorage();
  },
  methods: {
    loadPredefinedImages() {
      const predefinedImages = [
        {
          name: "Facebook",
          data: require("@/../public/assets/facebook.png"),
        },
        {
          name: "Instagram",
          data: require("@/../public/assets/Instagram.png"),
        },
        {
          name: "Yelp",
          data: require("@/../public/assets/yelp.png"),
        },
        {
          name: "X",
          data: require("@/../public/assets/x.png"),
        },
        {
          name: "LinkedIn",
          data: require("@/../public/assets/linkedin.png"),
        },
        // Add more predefined images here
      ];

      this.imageList = [...predefinedImages]; 
    },
    loadImagesFromLocalStorage() {
      const userImages = JSON.parse(localStorage.getItem("imageList")) || [];
      this.imageList = [...this.imageList, ...userImages];
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          this.saveImageToLocalStorage(file.name, imageUrl);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file.");
      }
    },
    saveImageToLocalStorage(name, imageUrl) {
      let images = JSON.parse(localStorage.getItem("imageList")) || [];
      images.push({ name, data: imageUrl });
      localStorage.setItem("imageList", JSON.stringify(images));
      this.loadImagesFromLocalStorage();
    },
    generateQRCode() {
      const qrcodeDiv = document.getElementById("qrcode");
      qrcodeDiv.innerHTML = "";

      if (this.inputText) {
        QRCode.toCanvas(this.inputText, { errorCorrectionLevel: "H", width: 300 }, (error, canvas) => {
          if (error) {
            console.error(error);
          } else {
            const ctx = canvas.getContext("2d");
            if (this.selectedImage) {
              const image = new Image();
              image.src = this.selectedImage;

              image.onload = () => {
                const imgSize = 80;
                const centerX = (canvas.width - imgSize) / 2;
                const centerY = (canvas.height - imgSize) / 2;
                ctx.drawImage(image, centerX, centerY, imgSize, imgSize);
              };
            }
            qrcodeDiv.appendChild(canvas);
          }
        });
      } else {
        alert("Please enter some text to generate the QR code.");
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
