<template>
  <div>
    <l-dialog :width="400" :height="300" title="我是标题" :visible="showDialog" @update:visible="close">
      <div>dialog content</div>
      <button @click="close">close</button>
    </l-dialog>
    <button @click="handleShowDialog">show dialog</button>
    <div class="ball"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LDialog } from "@/components";

const showDialog = ref(false);

const handleShowDialog = () => {
  showDialog.value = true;
};
const close = () => {
  showDialog.value = false;
};
</script>

<style scoped>
.ball {
  width: 800px;
  height: 800px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
