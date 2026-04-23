<template>
  <section class="featured-games q-px-xl q-py-xl">
    <!-- Title -->
    <div class="text-h5 text-bold text-center q-mb-lg">
      Available Games to Play in Our Arena
    </div>

    <!-- Game Cards with transition -->
    <transition-group name="fade-scale" tag="div" class="row justify-center">
      <q-card v-for="game in featuredGames" :key="game._id" class="game-card q-my-md q-mx-lg" flat bordered>
        <q-img :src="game.coverImage" :alt="game.gameName" width="300px" height="360px" class="rounded-borders">
          <!-- Top-left badges -->
          <div class="row text-center absolute-top">
            <q-badge :color="game.readyToPlay ? 'green' : 'orange'"
              :label="game.readyToPlay ? 'Ready to Play' : 'On Demand'" class="col-auto q-mx-md" />
            <q-badge v-for="platform in game.availableOnPlatforms" :key="platform"
              :color="platform === 'PS5' ? 'blue' : platform === 'PS4' ? 'deep-orange' : 'grey'" :label="platform"
              class="col-auto q-mx-md" />
          </div>
          <div class="absolute-bottom text-white text-center q-pa-sm game-title">
            {{ game.gameName }}
          </div>
        </q-img>
      </q-card>
    </transition-group>

    <!-- Loading Spinner (centered between games and CTA) -->
    <div v-if="loading" class="q-my-xl flex flex-center">
      <q-spinner color="white" size="80px" />
    </div>

    <!-- CTA -->
    <div class="row justify-center q-mt-lg">
      <q-btn label="View All Games" color="primary" to="/games" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getGames } from "@/services/games"; // adjust path

const featuredGames = ref([]);
const allGames = ref([]);
const loading = ref(false);
let shuffleInterval = null;

function getRandomSubset(arr, size) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function shuffleGames() {
  if (allGames.value.length) {
    featuredGames.value = getRandomSubset(allGames.value, 5);
  }
}

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await getGames();
    allGames.value = data.data;
    shuffleGames();

    // Refresh every 10 seconds
    shuffleInterval = setInterval(shuffleGames, 5000);
  } catch (err) {
    console.error("Error fetching featured games:", err);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  if (shuffleInterval) clearInterval(shuffleInterval);
});
</script>

<style scoped>
.featured-games {
  background: transparent;
}

.game-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.game-title {
  background: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border-radius: 0 0 8px 8px;
}

/* Transition animations */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.6s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(2);
}
</style>
