<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {type Image, Level} from '../types.ts'
import ImageCard from "@/components/ImageCard.vue";
import shuffleImages from "@/utils/shuffleImages.ts";


const props = defineProps<{
  difficulty: Level;
}>();
const emit = defineEmits(["restart"]);
const matchedTiles = computed(() => gameBoard.value.filter(tile => tile.isMatched).length);
const clickCounter = ref(0);
const gameBoard = ref<Image[]>([] as Image[]);
const isProcessing = ref(false);

const generateBoard = (level: Level) => {
  let boardSize = 0;
  let imageCount = 0;
  clickCounter.value = 0;

  switch (level) {
    case Level.easy:
      boardSize = 8;
      imageCount = 4;
      break;
    case Level.medium:
      boardSize = 14;
      imageCount = 7;
      break;
    case Level.hard:
      boardSize = 20;
      imageCount = 10;
      break;
  }


  const shuffledImages = shuffleImages(imageCount, boardSize);
  gameBoard.value = shuffledImages;
};


const flipTile = (clickedTile: Image) => {
  if (isProcessing.value || clickedTile.isFlipped || clickedTile.isMatched) return;
  gameBoard.value.forEach((tile) => {
    if (tile.id === clickedTile.id) {
      tile.isFlipped = !tile.isFlipped;
    }
  });
  const tile = gameBoard.value.filter((t) => t.isFlipped && !t.isMatched);
  if (tile.length === 2) {
    isProcessing.value = true;
    handleMatch(tile[0], tile[1]);
  }
};
const handleMatch = (tile1: Image, tile2: Image) => {
  if (tile1.url === tile2.url) {
    tile1.isMatched = true;
    tile2.isMatched = true;
    isProcessing.value = false;
  } else {
    setTimeout(() => {
      tile1.isFlipped = false;
      tile2.isFlipped = false;
      isProcessing.value = false;
    }, 1000);
  }

};
const resetGame = () => {
  console.log("restart")
  emit("restart");
};

onMounted(() => {
  generateBoard(props.difficulty);
});
</script>

<template>
  <div class="mb-4 font-bold text-2xl"> Click count {{ clickCounter }}</div>
  <div class="grid grid-cols-4 gap-4">
    <ImageCard
        v-for="(image) in gameBoard"
        :key="image.id"
        :image="image"
        @click="clickCounter++"
        @flip="(image) => flipTile(image)"
    />

  </div>
  <button v-if="matchedTiles === gameBoard.length" @click="resetGame"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
    Restart Game
  </button>
</template>
