<template>
  <v-col width="480">
    <v-combobox label="Model" v-model="value" :items="items" variant="underlined"/>
    <MovementArrive v-if="value == 'Arrive'" />
    <SteeringComponent v-if="value == 'Kinetic'" />
    <v-tooltip activator="parent" location="top">
      <p v-if="value == 'Arrive'">Arrive</p>
      <p v-if="value == 'Kinetic'">Kinetic</p>
    </v-tooltip>

  </v-col>
</template>
<script>
import MovementArrive from '../components/Demo/MovementArrive.vue'
import SteeringComponent from '../components/Demo/SteeringComponent.vue'
export default {
  name: 'ProjectDemo',
  components: {
    MovementArrive,
    SteeringComponent
  },
  data: () => ({
    items: ['Kinetic', 'Arrive', 'fizz', 'buzz'],
    value: 'Kinetic',
  }),

}
</script>
