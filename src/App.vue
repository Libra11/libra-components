<template>
  <div>
    <l-dialog
      :width="800"
      :height="400"
      :visible="showDialog"
      @update:visible="close"
    >
      <div>dialog content</div>
      <button @click="close">close</button>
    </l-dialog>
    <button @click="handleShowDialog">show dialog</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LDialog } from "./components";

const showDialog = ref(false);

const handleShowDialog = () => {
  showDialog.value = true;
};
const close = () => {
  showDialog.value = false;
};
</script>

<style scoped></style>
