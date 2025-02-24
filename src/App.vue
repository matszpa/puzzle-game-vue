<script lang="ts">
import {defineComponent, ref} from "vue";
import DifficultySelector from "./components/DifficultySelector.vue";
import {Level} from "@/types.ts";
import GameBoard from "@/components/GameBoard.vue";

export default defineComponent({
  components: {
    GameBoard,
    DifficultySelector,
  },
  setup() {
    const difficulty = ref<Level | null>(null);

    const setDifficulty = (level: Level) => {
      difficulty.value = level;
    };
    const restartGame = () => {
      difficulty.value = null;
    };
    return {
      difficulty,
      Level,
      setDifficulty,
      restartGame
    };
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">

    <DifficultySelector v-if="!difficulty" :setDifficulty="setDifficulty"/>
    <GameBoard v-if="difficulty" :difficulty="difficulty" @restart="restartGame"/>
  </div>
</template>

