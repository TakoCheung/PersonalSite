<template>
  <v-container class="my-5">
    <v-row>
      <v-col>
        <h2>Video to GIF Converter (All Formats)</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- Accept all video formats -->
        <v-file-input
          label="Select Video"
          prepend-icon="mdi-video"
          accept="video/*"
          @change="handleFile"
          :disabled="loading"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- FPS DROPDOWN -->
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedFps"
          :items="fpsOptions"
          label="Frames per second"
          prepend-icon="mdi-timer"
          :disabled="loading"
        />
      </v-col>

      <!-- SCALE DROPDOWN -->
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedScale"
          :items="scaleOptions"
          label="Width (pixels)"
          prepend-icon="mdi-resize"
          :disabled="loading"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- CONVERT BUTTON -->
      <v-col>
        <v-btn
          color="primary"
          :disabled="!videoFile || !ffmpeg || loading"
          @click="convertToGif"
        >
          {{ loading ? 'Converting...' : 'Convert' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- VIDEO PREVIEW -->
      <v-col>
        <video
          v-if="videoUrl"
          :src="videoUrl"
          controls
          style="max-width: 100%; margin-top: 10px"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- GIF PREVIEW -->
      <v-col>
        <img
          v-if="gifUrl"
          :src="gifUrl"
          alt="Generated GIF"
          ref="gifPreview"
          style="max-width: 100%; margin-top: 10px"
        />
      </v-col>
    </v-row>

    <v-row v-if="gifUrl">
      <!-- DOWNLOAD BUTTON -->
      <v-col>
        <v-btn color="success" @click="downloadGif">
          Download GIF
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FFmpeg } from "@ffmpeg/ffmpeg";

export default {
  name: "VideoToGifConverter",
  data() {
    return {
      ffmpeg: null,
      videoFile: null,
      videoUrl: "",
      gifUrl: "",
      gifBlob: null,
      loading: false,
      videoDuration: null,  // <--- New property for storing video duration

      // Dropdown data
      fpsOptions: [5, 10, 15, 24, 30, 60],
      scaleOptions: [240, 320, 480, 640, 720, 1080],

      // Selected values
      selectedFps: 10,
      selectedScale: 320,
    };
  },
  async mounted() {
    // Create and load FFmpeg
    this.ffmpeg = new FFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@latest/dist/ffmpeg-core.js"
    });

    if (!this.ffmpeg.loaded) {
      try {
        await this.ffmpeg.load();
        console.log("FFmpeg loaded successfully.");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
      }
    }
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.videoFile = file;
        this.videoUrl = URL.createObjectURL(file);

        // Extract video duration using HTMLVideoElement
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = this.videoUrl;
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          this.videoDuration = video.duration || 5;
          console.log('Video duration:', this.videoDuration);
        };
        video.onerror = () => {
          console.error('Error loading video metadata');
        };
      }
    },

    async convertToGif() {
      if (!this.videoFile || !this.ffmpeg?.loaded) return;
      this.loading = true;

      try {
        // 1) Use MIME type to guess extension, fallback to "video"
        let extension = "video";
        if (this.videoFile.type.includes("/")) {
          const [type, subType] = this.videoFile.type.split("/");
          if (type === "video" && subType) {
            // e.g. "mp4", "webm", "x-msvideo" (AVI), etc.
            extension = subType;
          }
        }

        // Avoid any weird chars in subType (like "x-msvideo"), but usually works
        extension = extension.replace(/[^a-z0-9]/gi, "") || "video";

        const inputName = `input.${extension}`;

        // 2) Write input video into FFmpeg memory
        const fileData = new Uint8Array(await this.videoFile.arrayBuffer());
        await this.ffmpeg.writeFile(inputName, fileData);

        console.log(`Video Duration: ${this.videoDuration}s`);

        // 5) Convert entire duration to GIF
        const outputName = "output.gif";
        await this.ffmpeg.exec([
          "-i", inputName,
          "-t", `${this.videoDuration}`,
          "-vf", `fps=${this.selectedFps},scale=${this.selectedScale}:-1:flags=lanczos`,
          "-gifflags", "-offsetting",
          outputName
        ]);

        // 6) Read the GIF from memory
        const gifData = await this.ffmpeg.readFile(outputName);
        this.gifBlob = new Blob([gifData.buffer], { type: "image/gif" });
        this.gifUrl = URL.createObjectURL(this.gifBlob);

        // 7) Scroll to GIF preview
        this.$nextTick(() => {
          this.$refs.gifPreview?.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 300);
        });

      } catch (error) {
        console.error("Conversion error:", error);
        alert("Conversion failed. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    downloadGif() {
      if (this.gifBlob) {
        const link = document.createElement("a");
        link.href = this.gifUrl;
        link.download = "converted.gif";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  },
};
</script>

<style scoped>
.converter {
  text-align: center;
}
</style>