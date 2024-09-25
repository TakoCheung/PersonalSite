<template>
  <div class="center-content">
    <div class="form-group">
      <h1>QR Code Generator with Image</h1>
      <br />

      <input v-model="inputText" placeholder="Enter text for QR Code" />
      <br /><br />

      <br />
      <!-- Input to upload an image file -->
      <label for="fileUpload">Upload File To The List:</label>
      <input type="file" id="fileUpload" @change="handleImageUpload" accept="image/*" />
      <select v-model="selectedImage" id="imageDropdown">
        <option v-for="(img, index) in imageList" :key="index" :value="img.data">{{ img.name }}</option>
      </select>

      <!-- Display the QR code -->
      <br />
      <button @click="generateQRCode">Generate QR Code</button>
    </div>
    <div id="qrcode">
      <span v-if="!qrCodeGenerated">Your QR Code will appear here</span>
    </div>
    <button v-if="qrCodeGenerated" @click="downloadQRCode">Download QR Code</button>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  data() {
    return {
      qrCodeGenerated: false,
      qrCodeCanvas: null,
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
      this.selectedImage = imageUrl;
    },
    generateQRCode() {
      this.qrCodeGenerated = true;
      this.$nextTick(() => {
        const qrcodeDiv = document.getElementById("qrcode");
        if (qrcodeDiv) {
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
                this.qrCodeCanvas = canvas;
              }
            });
          } else {
            alert("Please enter some text to generate the QR code.");
          }
        } else {
          console.error("QR Code div not found!");
        }
      });
    },
    downloadQRCode() {
      if (this.qrCodeCanvas) {
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = this.qrCodeCanvas.toDataURL("image/png");
        link.download = "qrcode.png"; // Default filename for the QR code

        // Simulate a click on the link to trigger the download
        link.click();
      }
    }
  },
};
</script>

<style scoped>
body {
  background-color: rgba(32, 77, 72, 0.5);
  /* The background color from your request */
  font-family: 'Arial', sans-serif;
  color: #f0f0f0;
  /* Light text for contrast */
  text-align: center;
}

h1 {
  color: #000000;
  /* Darker header for contrast */
  font-size: 2em;
  font-weight: bold;
}

select {
  padding: 8px;
  border: 2px solid rgba(32, 77, 72, 0.8);
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #204d48;
  font-size: 1em;
}

button {
  background-color: rgba(32, 77, 72, 0.8);
  color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(32, 77, 72, 1);
}

input[type="file"] {
  display: none;
  /* Hide the default file input */
}

input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(32, 77, 72, 0.8);
  /* Make the placeholder more visible */
}

input[type="text"] {
  padding: 8px;
  border: 2px solid rgba(32, 77, 72, 0.8);
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #204d48;
  font-size: 1em;
  margin-bottom: 20px;
  width: 60%;
}

label {
  font-size: 1.2em;
  color: #f0f0f0;
  /* Matching the text color */
}

label[for="fileUpload"] {
  background-color: rgba(32, 77, 72, 0.8);
  color: #f0f0f0;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  display: inline-block;
}

label[for="fileUpload"]:hover {
  background-color: rgba(32, 77, 72, 1);
}

.file-label {
  margin-top: 10px;
  font-size: 1em;
  color: #204d48;
}

input[type="text"],
select {
  margin-bottom: 20px;
  /* Add more spacing below inputs */
}

button {
  margin-top: 20px;
  /* Add more spacing before the button */
  margin-bottom: 20px;
}

#qrcode {
  margin-top: 40px;
  /* Make space for the QR code section */
  /* padding: 2px; */
  border: 2px solid rgba(32, 77, 72, 0.8);
  width: 304px;
  /* Set fixed width to match the generated QR code */
  height: 304px;
  display: block;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* Vertically center the content */
}

.form-group {
  width: 100%;
  max-width: 400px;
}
</style>
