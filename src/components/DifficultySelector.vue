<script setup lang="ts">
import {defineProps} from 'vue';
import {Level} from "@/types.ts";

const props = defineProps<{
  setDifficulty: (level: Level) => void;
}>();

const buttonClasses = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Chose difficulty level</h1>
    <div class="flex space-x-4">
      <button
          v-for="(level, index) in Object.values(Level)"
          :key="index"
          @click="setDifficulty(level)"
          :class="buttonClasses[level]"
          class="px-4 py-2 text-white rounded first-letter:uppercase"
      >
        {{ level }}
      </button>
    </div>
  </div>
</template>
