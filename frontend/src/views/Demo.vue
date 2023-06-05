<template>
  <v-row>
    <v-col cols="12" align="center" dense>
      <v-combobox label="Model" v-model="value" :items="items" variant="underlined" />
    </v-col>
    <v-col align="center" dense>
      <MovementArrive v-if="value == 'Arrive'" />
      <SteeringComponent v-if="value == 'Kinetic'" />
      <MovementWander v-if="value == 'Wander'" />
      <MovementFlock v-if="value == 'Flock'" />
    </v-col>

    <v-tooltip activator="parent" location="bottom">
      <div v-if="value == 'Arrive'">
        <p>Please click anywhere on the canvas, and the boid will land and</p>
        <p>stop where you just click.</p>
      </div>
      <div v-if="value == 'Kinetic'">
        <p>Please click anywhere on the canvas. The boid will go to where</p>
        <p>you just click and back to keep moving.</p>
      </div>
      <div v-if="value == 'Wander'">
        <p>Click anywhere inside the canvas to turn on/off the visualization,</p>
        <p>and press any key to change different way to wander.</p>
      </div>
      <div v-if="value == 'Flock'">
        <p>Flock,</p>
        <p>Flock</p>
      </div>
    </v-tooltip>

  </v-row>
</template>
<script>
import MovementArrive from '../components/Demo/MovementArrive.vue'
import SteeringComponent from '../components/Demo/SteeringComponent.vue'
import MovementWander from '../components/Demo/MovementWander.vue'
import MovementFlock from '../components/Demo/MovementFlock.vue'
export default {
  name: 'ProjectDemo',
  components: {
    MovementArrive,
    SteeringComponent,
    MovementWander,
    MovementFlock
  },
  data: () => ({
    items: ['Kinetic', 'Arrive', 'Wander', 'Flock'],
    value: 'Kinetic',
  }),

}
</script>
