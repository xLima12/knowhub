<template>
  <footer class="footer">
    <span
      >Copyright <strong>Code Noir</strong> &copy; 2024-{{ currentYear }}</span
    >
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>
