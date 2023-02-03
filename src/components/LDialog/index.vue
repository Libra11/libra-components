<template>
  <div>
    <transition name="fade">
      <div class="modal-overlay" v-if="visible" @click="handleClose"></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-if="visible" ref="modal">
        <div class="header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
          <!-- 拖拽区域 -->
          header
        </div>
        <h1>Vue Transitions</h1>
        <p>The <code>&lt;transition&gt;</code> component in Vue can create wonderful animated entrances and exits.</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>import { reactive, ref } from 'vue';

defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 300,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  x: 0,
  y: 0,
  isDragging: false,
});

const emit = defineEmits(["update:visible"]);

function handleClose() {
  emit("update:visible", false);
}


const modal = ref<HTMLElement>();
function handleMouseDown(event: MouseEvent) {
  state.isDragging = true;
  state.x = event.offsetX;
  state.y = event.offsetY;
  document.addEventListener("mousemove", handleMouseMove);
}

function handleMouseMove(event: MouseEvent) {
  if (!modal.value) return;
  if (state.isDragging) {
    modal.value.style.left = `${event.clientX - state.x}px`;
    modal.value.style.top = `${event.clientY - state.y}px`;
  }
}

function handleMouseUp() {
  state.isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 999;
  transform: none;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

.pop-enter-to,
.pop-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>