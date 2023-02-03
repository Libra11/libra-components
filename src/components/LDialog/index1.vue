<!-- <!--
 * @Author: Libra
 * @Date: 2023-02-01 15:14:12
 * @LastEditors: Libra
 * @Description: 
 * @FilePath: /libra-components/src/components/LDialog/index.vue
-->
<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="visible"></div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" ref="draggable" v-if="visible">
      <div class="draggable-header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
        <!-- 拖拽区域 -->
        header
      </div>
      <div class="draggable-content">
        <!-- 弹窗内容 -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

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

const emit = defineEmits(["update:visible"]);

const state = reactive({
  x: 0,
  y: 0,
  isDragging: false,
});

const draggable = ref<HTMLElement>();

function handleClose() {
  emit("update:visible", false);
}

function handleMouseDown(event: MouseEvent) {
  state.isDragging = true;
  state.x = event.offsetX;
  state.y = event.offsetY;
  document.addEventListener("mousemove", handleMouseMove);
}

function handleMouseMove(event: MouseEvent) {
  if (!draggable.value) return;
  if (state.isDragging) {
    draggable.value.style.left = `${event.clientX - state.x}px`;
    draggable.value.style.top = `${event.clientY - state.y}px`;
  }
}

function handleMouseUp() {
  state.isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
}
</script>

<style scoped lang="scss">
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

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

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



.draggable-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .5s ease;


}

.draggable {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: v-bind("props.width + 'px'");
  height: v-bind("props.height + 'px'");

  .draggable-header {
    background-color: #ddd;
    cursor: move;
    height: 30px;
    width: 100%;
  }

  .draggable-content {
    flex: 1;
    width: 100%;
    background-color: #fff;
  }
}
</style> -->
