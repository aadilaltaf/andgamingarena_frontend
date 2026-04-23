<template>
  <q-page class="bg-wrapper lg:q-px-xl">
    <div class="text-h5  text-white q-mb-md text-center text-weight-light q-pt-lg q-pb-sm">
      🏆 AGA Tournaments 🏆
    </div>

    <!-- Tabs -->
    <q-tabs
      v-model="activeTab"
      dense
      class="bg-black col-12 text-white q-py-sm"
      indicator-color="white"
      align="justify"
    >
      <q-tab name="upcoming" label="Upcoming" icon="mdi-clock-fast" class="text-green-14"
        ><q-badge color="green" floating class="">{{ upcomingTournaments.length }}</q-badge></q-tab
      >
      <q-tab name="ended" label="Ended" class="text-red" icon="mdi-clock-check-outline"
        ><q-badge color="red" floating class="">{{ endedTournaments.length }}</q-badge></q-tab
      >
    </q-tabs>

    <q-separator dark />

    <!-- Tab Panels -->
    <q-tab-panels v-model="activeTab" animated class="tab-wrapper">
      <q-tab-panel name="upcoming">
        <div class="row justify-center">
          <div v-if="upcomingTournaments.length === 0" class="text-center q-pa-lg">
            <q-icon name="event_busy" size="40px" color="black" />
            <div class="text-h6 text-white q-mt-md">No upcoming tournaments</div>
            <div class="text-subtitle1 text-grey-3">Stay tuned for announcements!</div>
          </div>
          <div v-else class="row justify-center q-mx-lg">
            <TournamentCard
              v-for="tournament in upcomingTournaments"
              :key="tournament._id"
              :tournament="tournament"
              class="my-card col-12 col-sm-6 col-md-6 col-lg-3 q-my-lg q-mx-md"
            />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="ended">
        <div class="row justify-center">
          <TournamentCard
            v-for="tournament in endedTournaments"
            :key="tournament._id"
            :tournament="tournament"
            class="my-card col-12 col-sm-6 col-md-4 col-lg-3 q-my-lg q-mx-md"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Loading spinner -->
    <q-dialog v-model="loading" persistent seamless backdrop-filter="blur(4px)">
      <div class="q-pa-xl flex flex-center">
        <q-spinner color="white" size="150px" />
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getTournaments } from '@/services/tournaments.js'
import TournamentCard from '@/components/TournamentCard.vue'

const tournaments = ref([])
const loading = ref(false)
const activeTab = ref('upcoming')

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getTournaments()
    if (data.success) {
      tournaments.value = data.data
    }
  } catch (err) {
    console.error('Error fetching tournaments', err)
  } finally {
    loading.value = false
  }
})

const upcomingTournaments = computed(() => tournaments.value.filter((t) => t.status === 'upcoming'))
const endedTournaments = computed(() => tournaments.value.filter((t) => t.status === 'ended'))
</script>

<style scoped>
.bg-wrapper {
  background: radial-gradient(circle at center, #0049aa, #000c21);
  min-height: 100vh;
}
.tab-wrapper {
  background: radial-gradient(circle at center, #8fa7c7, #3f5072);
}
</style>
