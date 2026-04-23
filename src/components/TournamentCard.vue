<template>
  <q-card bordered flat class="my-card">
    <!-- Header -->
    <q-card-section class="row items-center bg-primary text-white">
      <q-img
        :src="tournament.game?.coverImage"
        :alt="tournament.game?.name"
        style="width: 90px; height: 130px; border-radius: 10px; object-fit: cover"
        class="q-mr-md"
      />
      <div class="column items-center col">
        <div class="text-h6 text-center">{{ tournament.name }}</div>
        <q-chip color="black" text-color="white" class="q-pa-md q-px-lg q-m y-sm">
          <div class="text-subtitle2 q-mt-xs text-center">
            {{ formatDate(tournament.tournamentDate) }}
          </div>
        </q-chip>
      </div>
    </q-card-section>

    <q-separator dark />

    <!-- Body -->
    <q-card-section>
      <div class="row justify-center text-body2 text-grey-9 q-mb-sm text-center">
        {{ tournament.description }}
      </div>

      <!-- Winner -->
      <div class="row justify-center q-my-sm">
        <q-chip
          v-if="tournament.status === 'ended' && tournament.winner"
          color="green-9"
          text-color="white"
          class="winner-chip"
        >
          <div class="chip-inner">
            <q-icon name="emoji_events" size="20px" />
            <div class="winner-text">
              <div class="">Winner -</div>
              <div class="text-bold q-mx-sm">
                {{ tournament.winner.firstName }} {{ tournament.winner.lastName }}
              </div>
            </div>
          </div>
        </q-chip>

        <q-chip v-else color="blue-9" text-color="white" class="winner-chip">
          <div class="chip-inner">
            <q-icon name="emoji_events" size="20px" />
            <div class="winner-text">
              <div class="">Winner -</div>
              <div class="text-bold q-mx-sm">To Be Announced</div>
            </div>
          </div>
        </q-chip>
      </div>

      <q-separator />

      <!-- Status + Fee -->
      <div class="row justify-center items-center">
        <q-chip
          :color="getStatusColor(tournament.status)"
          text-color="white"
          icon="event"
          class="q-pa-md q-mt-sm text-capitalize text-subtitle2"
          style="padding: 15px 30px"
        >
          {{ tournament.status }}
        </q-chip>

        <div v-if="tournament.status === 'upcoming'" class="column items-center">
          <q-chip color="red-10" text-color="white" class="q-pa-md q-px-lg q-mt-sm text-subtitle2">
            <span>Entry Fee:</span>
            <span class="q-ml-xs">
              <q-icon name="mdi-currency-rupee" size="xs" />
              {{ tournament.entryFee }}
            </span>
          </q-chip>
        </div>
      </div>
      <div
        v-if="tournament.status === 'upcoming'"
        class="row justify-center text-center text-subtitle2 text-black q-mt-sm"
      >
        Entry fee to be paid at the arena on match day
      </div>

      <!-- Buttons -->
      <div class="row justify-center">
        <q-btn
          v-if="tournament.status === 'upcoming'"
          color="black"
          label="Register"
          square
          glossy
          push
          padding="sm"
          icon="mdi-account-plus"
          class="q-mt-sm"
          :to="`/register/${tournament._id}`"
        />

        <q-btn
          v-else-if="tournament.highlights?.length"
          color="indigo"
          outline
          label="Highlights"
          class="q-px-md q-mt-sm"
          icon="mdi-play-circle"
          @click="showHighlights = true"
        />
      </div>
    </q-card-section>

    <!-- Highlights Dialog -->
    <q-dialog v-model="showHighlights" persistent>
      <q-card style="max-width: 900px; width: 95vw; border-radius: 0px">
        <!-- Header -->
        <q-card-section class="highlights-header bg-primary text-white">
          <div class="text-h6">Tournament Highlights</div>
          <q-btn icon="close" flat round dense v-close-popup class="close-btn" />
        </q-card-section>

        <!-- Carousel -->
        <q-card-section class="q-pa-none">
          <q-carousel
            v-model="activeSlide"
            animated
            arrows
            swipeable
            control-color="white"
            navigation
            class="highlights-carousel"
          >
            <q-carousel-slide
              v-for="(img, index) in tournament.highlights"
              :key="index"
              :name="index"
            >
              <q-img :src="`/highlights/${img}`" fit="contain" class="highlight-img" />
            </q-carousel-slide>
          </q-carousel>

          <!-- Instagram button -->
          <div v-if="tournament.instagramLink" class="text-center q-pa-md">
            <q-btn
              color="teal"
              icon="mdi-instagram"
              label="View Highlights Video"
              type="a"
              target="_blank"
              :href="tournament.instagramLink"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tournament: {
    type: Object,
    required: true,
  },
})

const showHighlights = ref(false)
const activeSlide = ref(0)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getStatusColor(status) {
  switch (status) {
    case 'upcoming':
      return 'green-9'
    case 'started':
      return 'blue-8'
    case 'ended':
      return 'red-8'
    default:
      return 'grey'
  }
}
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}
.my-card:hover {
  transform: translateY(-6px);
}
.winner-chip {
  width: 100%;
  box-sizing: border-box;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  border-radius: 0 !important;
}
.winner-chip .chip-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
}
.winner-text {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.winner-text .text-caption {
  font-size: 0.85rem;
  opacity: 0.95;
}

.highlights-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
}

.close-btn {
  position: absolute;
  right: 8px;
  top: 8px;
}

.highlights-carousel {
  width: 100%;
  /* adaptive height depending on viewport */
  height: 60vh; /* responsive to screen */
  max-height: 600px;
  min-height: 280px;
  background: black; /* for better contrast */
}

.highlight-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
}
</style>
