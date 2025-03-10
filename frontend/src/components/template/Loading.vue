<template>
  <div class="loading">
    <ProgressSpinner
      style="width: 50px; height: 50px"
      strokeWidth="5"
      fill="transparent"
      animationDuration="2s"
      aria-label="Loading"
    />
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";

export default {
  name: "Loading",
  components: { ProgressSpinner },
};
</script>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
