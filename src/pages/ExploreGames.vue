<template>
  <q-page class="games-page">
    <div>
      <!-- Title -->
      <div class="text-h4 text-white q-mb-md text-center text-weight-light q-py-lg q-px-lg">
        Available Games to Play in Our Arena
      </div>

      <!-- Search Input -->
      <div class="row justify-center q-mb-lg">
        <q-input v-model="search" outlined debounce="300"
          :placeholder="$q.screen.lt.md ? '🔍 Search by complete names' : '🔍 Search by complete names e.g, Grand Theft Auto'"
          bg-color="white" color="primary" rounded class="search-input col-10 col-sm-6">
          <template v-slot:append>
            <q-icon name="search" />
          </template>

        </q-input>
      </div>

      <!-- Games Grid -->
      <div class="row justify-center q-mx-xl">
        <q-card v-for="game in filteredGames" :key="game._id" class="q-my-md q-mx-lg" flat bordered>
          <q-img :src="game.coverImage" :alt="game.gameName" class="game-cover" width="300px" height="360px">
            <!-- Top-left badges -->
            <div class="row text-center absolute-top">
              <q-badge :color="game.readyToPlay ? 'green' : 'orange'"
                :label="game.readyToPlay ? 'Ready to Play' : 'On Demand'" class="col-auto q-mx-md" />
              <q-badge v-for="platform in game.availableOnPlatforms" :key="platform"
                :color="platform === 'PS5' ? 'blue' : platform === 'PS4' ? 'deep-orange' : 'grey'" :label="platform"
                class="col-auto q-mx-md" />
            </div>

            <!-- Bottom game name -->
            <div class="absolute-bottom q-pa-sm text-center text-white text-bold text-h6">
              {{ game.gameName }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <!-- Loading Spinner -->
    <q-dialog v-model="loading" persistent seamless backdrop-filter="blur(4px)">
      <div class="q-pa-xl flex flex-center">
        <q-spinner color="white" size="150px" />
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { getGames } from '@/services/games'

const $q = useQuasar()
const games = ref([])
const loading = ref(false)
const search = ref('')

const fetchGames = async () => {
  loading.value = true
  try {
    const { data } = await getGames()
    games.value = data.data
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Failed to load games' })
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchGames)

// Computed filter
const filteredGames = computed(() =>
  games.value.filter(g =>
    g.gameName.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped>
.game-cover {
  transition: transform 0.3s ease;
}

.game-cover:hover {
  transform: scale(1.05);
}

.games-page {
  background-image: radial-gradient(circle at center, #0049aa, #000c21);
}

.search-input {
  border-radius: 12px;
}

/* Target the real input inside q-input */
.search-input .q-field__native::placeholder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
