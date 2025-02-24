<script setup lang="ts">
import {defineProps, defineEmits} from "vue";
import type {Image} from "../types.ts";

const props = defineProps<{
  image: Image;
}>();

const emit = defineEmits<{
  (event: "flip", image: Image): void;
}>();


function handleClick() {
  emit("flip", props.image);
}
</script>

<template>
  <div
      @click="handleClick"
      class="w-36 h-36 flex items-center justify-center rounded cursor-pointer transform transition-all duration-300"
      :class="[
      image.isFlipped ? 'bg-cover bg-center rotate-180' : 'bg-gray-300',
    ]"
      :style="{
      rotate: '180deg',
      backgroundImage: image.isFlipped ? `url(${image.url})` : 'none',
    }"
  >
  </div>
</template>