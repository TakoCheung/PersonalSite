<template>
  <div class="page-container">
    <!-- Time Controls at Top -->
    <div class="time-controls">
      <button @click="togglePlayPause">
        <span v-if="isPlaying">⏸️</span>
        <span v-else>▶️</span>
      </button>
      <input 
        type="datetime-local" 
        v-model="selectedDateTime" 
        @input="updateDateTime" 
      />
      <select v-model="simulationSpeed">
        <option value="1">1 day/sec</option>
        <option value="10">10 days/sec</option>
        <option value="30">30 days/sec</option>
        <option value="60">60 days/sec</option>
      </select>
    </div>

    <!-- Solar System Visualization Section -->
    <div class="solar-system-container">
      <div
        v-for="planet in planets"
        :key="planet.name"
        class="planet-orbit"
        :style="getOrbitStyle(planet)"
      >
        <div class="planet" :style="getPlanetStyle(planet)">
          {{ planet.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Helper function to format a Date into YYYY-MM-DDTHH:mm
function formatDate(date) {
  return date.toISOString().slice(0, 16);
}

// 1. Define a reference epoch (date/time) and reference angles for each planet at that epoch.
const REFERENCE_EPOCH = new Date('2000-01-01T12:00:00Z'); // J2000 epoch
const referenceAngles = {
  Mercury: 80,
  Venus: 140,
  Earth: 0,
  Mars: 190,
  Jupiter: 100,
  Saturn: 300,
  Uranus: 220,
  Neptune: 340,
};

// 2. Define each planet's orbital period in days (approx) and orbital distance for visualization.
const planets = ref([
  { name: 'Mercury', distance: 50, period: 87.969 },
  { name: 'Venus', distance: 80, period: 224.701 },
  { name: 'Earth', distance: 110, period: 365.256 },
  { name: 'Mars', distance: 140, period: 686.980 },
  { name: 'Jupiter', distance: 200, period: 4332.589 },
  { name: 'Saturn', distance: 260, period: 10759.22 },
  { name: 'Uranus', distance: 320, period: 30685.4 },
  { name: 'Neptune', distance: 380, period: 60190.03 },
]);

// 3. Manage animation and user-selected date/time
// Combine user input and animated time display into one variable.
const selectedDateTime = ref(new Date().toISOString().slice(0, 16));
const simulationSpeed = ref(1); // days per second
// simulationTimestamp holds the simulation time in milliseconds
const simulationTimestamp = ref(new Date(selectedDateTime.value).getTime());
const isPlaying = ref(true);
let animationFrameId;
let lastTime = performance.now();

// 4. For each planet, we store the 'currentAngle' that updates over time.
const currentAngles = ref({});

// Convert milliseconds to days
function msToDays(ms) {
  return ms / (1000 * 60 * 60 * 24);
}

// Compute planet angles for the given date (simulation time).
function computePlanetAnglesForDate(date) {
  const timeDiffDays = msToDays(date - REFERENCE_EPOCH);
  planets.value.forEach((planet) => {
    const fraction = (timeDiffDays % planet.period) / planet.period;
    const baseAngle = referenceAngles[planet.name] || 0;
    const newAngle = baseAngle + 360 * fraction;
    currentAngles.value[planet.name] = newAngle;
  });
}

// Called when the user changes the datetime input.
// Reset simulation time to the user input and recalc planetary positions.
function updateDateTime() {
  simulationTimestamp.value = new Date(selectedDateTime.value).getTime();
  computePlanetAnglesForDate(new Date(simulationTimestamp.value));
}

// The main animation loop updates the simulation time (and selectedDateTime)
// based on the selected simulation speed.
function animate(currentTime) {
  if (!isPlaying.value) return;
  const deltaTime = (currentTime - lastTime) / 1000; // seconds elapsed
  lastTime = currentTime;

  // Advance simulation time. simulationSpeed is in days per second.
  const simulationDeltaMs = deltaTime * simulationSpeed.value * 86400 * 1000;
  simulationTimestamp.value += simulationDeltaMs;

  // Update selectedDateTime to reflect the new simulation time.
  const simulationDate = new Date(simulationTimestamp.value);
  selectedDateTime.value = formatDate(simulationDate);

  // Recompute planetary angles for the simulation time.
  computePlanetAnglesForDate(simulationDate);

  animationFrameId = requestAnimationFrame(animate);
}

function togglePlayPause() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationFrameId);
  }
}

// 6. Planet styling logic
function getOrbitStyle(planet) {
  return {
    width: `${planet.distance * 2}px`,
    height: `${planet.distance * 2}px`,
    position: 'absolute',
    border: '1px solid #444',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

function getPlanetStyle(planet) {
  const angle = currentAngles.value[planet.name] || 0;
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${planet.distance}px)`,
  };
}

// 7. Lifecycle hooks
onMounted(() => {
  updateDateTime();
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Full viewport height */
}

.solar-system-container {
  flex: 1;
  position: bottom;
  width: auto;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: bottom;
  gap: 10px;
  border-radius: 50%;
  overflow: auto;
}

.planet {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  font-size: 10px;
  color: #fff;
}

.time-controls {
  position: top;
  width: auto;
  height: auto;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: top;
  gap: 10px;
  z-index: 999;
}

.time-controls input[type="datetime-local"] {
  width: auto;
}

.time-controls input[type="text"] {
  width: auto;
  text-align: center;
}
</style>