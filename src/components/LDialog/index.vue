<template>
  <div class="modal-container">
    <transition name="fade">
      <div class="modal-overlay" v-show="visible" @click="handleClose"></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-show="visible" ref="modal">
        <div class="header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
          <!-- 拖拽区域 -->
          header
        </div>
        <div class="body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const props = defineProps({
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
  width: `${props.width}px`,
  height: `${props.height}px`,
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

<style scoped lang="scss">
.modal {
  // 居中
  position: fixed;
  top: calc(50% - v-bind('state.height') / 2);
  left: calc(50% - v-bind('state.width') / 2);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 15px $shadow-color;
  background: $white-color;
  z-index: 2;
  width: v-bind('state.width');
  height: v-bind('state.height');
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    width: 100%;
    height: 2rem;
    background: $black-color;
    cursor: move;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba($color: $black-color, $alpha: 0.2);
  backdrop-filter: blur(20px);
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