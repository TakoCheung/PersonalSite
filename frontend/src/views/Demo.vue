<template>
  <MovementArrive />
  <SteeringComponent/>
</template>
<script>
import MovementArrive from '../components/Demo/MovementArrive.vue'
import SteeringComponent from '../components/Demo/SteeringComponent.vue'
export default {
  name: 'ProjectDemo',
  components: {
    MovementArrive,
    SteeringComponent
  }
}
</script>
