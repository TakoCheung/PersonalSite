<template>
  <p ref="containerRef">
    <span 
      v-for="(word, index) in words" 
      :key="index" 
      class="word" 
      :style="{
        animationName: startAnimation ? 'fadeInUp' : '',  // Apply animation conditionally
        animationFillMode: 'forwards',
        animationDuration: `${animationDuration}s`,
        animationDelay: `${index * delayBetweenWords}s`,
        opacity: startAnimation ? 1 : 0  // Ensure opacity changes when animation starts
      }"
    >
      {{ word }}&nbsp;
    </span>
  </p>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  text: String,
  animationDuration: {
    type: Number,
    default: 0.5,
  },
  delayBetweenWords: {
    type: Number,
    default: 0.2,
  },
});

const containerRef = ref(null);
const startAnimation = ref(false);

const words = computed(() =>
  props.text.split(' ')
);

const observerCallback = (entries) => {
  if (entries[0].isIntersecting) {
    startAnimation.value = false;
  } else {
    startAnimation.value = true;
  }
};

const observerOptions = {
  rootMargin: '0px',
  threshold: 0.5,
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, observerOptions);
  if (containerRef.value) {
    observer.observe(containerRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.word {
  display: inline-block;
  animation-name: fadeInUp;
  animation-fill-mode: forwards;
}
</style>
