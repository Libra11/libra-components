<!--
 * @Author: Libra
 * @Date: 2023-02-01 15:14:12
 * @LastEditors: Libra
 * @Description: 
 * @FilePath: /libra-components/src/components/LDialog/index.vue
-->
<template>
  <div class="draggable-modal" v-show="state.isShow" @click.self="handleClose">
    <div class="draggable" ref="draggable">
      <div
        class="draggable-header"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      >
        <!-- 拖拽区域 -->
      </div>
      <div class="draggable-content">
        <!-- 弹窗内容 -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";

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
  isShow: false,
  isDragging: false,
});

watch(
  () => props.visible,
  (visible) => {
    console.log(visible);
    if (draggable.value) {
      if (visible) {
        draggable.value.className =
          "draggable animate__animated animate__fadeInDownBig";
      } else {
        setTimeout(() => {
          if (!draggable.value) return;
          draggable.value.className =
            "draggable animate__animated animate__bounceOut";
        }, 0);
      }
      state.isShow = visible;
    }
  }
);

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
  .draggable {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.3s;
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
}
</style>
