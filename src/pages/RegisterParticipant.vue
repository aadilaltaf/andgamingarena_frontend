<template>
  <q-page padding class="row justify-center q-mx-sm">
    <div class="q-mx-auto" style="max-width: 600px; width: 100%">
      <!-- Go Back Button -->
      <div class="row q-mb-md">
        <q-btn
          flat
          dense
          color="white"
          icon="arrow_back"
          label="Back to Tournaments"
          class="text-primary"
          @click="router.push('/tournaments')"
        />
      </div>

      <q-card class="my-card" flat bordered>
        <!-- Header with Game Image + Tournament Info -->
        <q-card-section class="row justify-center no-wrap items-center bg-primary text-white">
          <!-- Game Image -->
          <q-img
            v-if="tournament?.game"
            :src="tournament.game.coverImage"
            :alt="tournament.game.gameName"
            class="q-mx-md game-cover"
          />

          <!-- Tournament Name + Dates -->
          <div v-if="tournament" class="justify-center text-center">
            <div class="register-title text-weight-bold">Register for {{ tournament.name }}</div>
            <q-chip color="black" text-color="white" class="q-pa-md q-px-lg q-my-md">
              <div class="text-subtitle2 q-mt-xs text-center">
                {{ formatDate(tournament.tournamentDate) }}
              </div>
            </q-chip>
          </div>
        </q-card-section>

        <!-- Registration Form -->
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
            <q-input
              v-model="form.firstName"
              label="First Name"
              outlined
              required
              dense
              :rules="[(val) => !!val || 'First Name is required']"
              prepend-icon="person"
            />
            <q-input
              v-model="form.lastName"
              label="Last Name"
              outlined
              required
              :rules="[(val) => !!val || 'Last Name is required']"
              dense
              prepend-icon="badge"
            />
            <q-input
              v-model="form.phoneNo"
              label="Phone Number"
              outlined
              required
              dense
              type="tel"
              inputmode="numeric"
              prepend-icon="phone"
              :rules="[
                (val) => !!val || 'Phone Number is required',
                (val) => /^[0-9]+$/.test(val) || 'Only digits allowed',
                (val) => (val && val.length >= 10) || 'Phone Number Invalid',
              ]"
              @input="form.phoneNo = form.phoneNo.replace(/[^0-9]/g, '')"
            />
            <q-input
              v-model="form.address"
              label="Address"
              outlined
              type="textarea"
              :rules="[(val) => !!val || 'Address is required']"
              autogrow
              required
              dense
              prepend-icon="home"
            />
            <!-- <div v-if="tournament" class="row justify-center q-mb-lg">
              <q-chip color="blue" text-color="white" class="q-pa-lg text-subtitle2" style="border-radius: 30px;">
                <span class="text-h6 text-bold">Entry Fee:</span> <span class="text-h6 text-bold q-ml-xs"><q-icon
                    name="mdi-currency-rupee" size="sm"></q-icon>{{
                      tournament.entryFee }} </span>
              </q-chip>
            </div> -->
            <div
              class="row justify-center text-center text-subtitle1 text-red-10 q-mt-sm"
            >
              Entry fee to be paid at the arena on match day.
            </div>
            <div class="row justify-center">
              <q-btn
                label="Submit"
                color="green"
                glossy
                size="lg"
                rounded
                type="submit"
                :loading="loading"
                class="q-px-xl text-capitalize"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { createRegistration } from '@/services/registrations'
import { getSingleTournaments } from '@/services/tournaments.js'

const route = useRoute()
const router = useRouter()
const tournamentId = route.params.id

const tournament = ref(null)
const form = ref({
  firstName: '',
  lastName: '',
  phoneNo: '',
  address: '',
  tournament: tournamentId,
})

const loading = ref(false)

onMounted(async () => {
  try {
    const { data } = await getSingleTournaments(tournamentId)
    if (data.success) {
      tournament.value = data.data
    }
  } catch (err) {
    console.error('Error fetching tournament', err)
    Notify.create({
      type: 'negative',
      message: 'Failed to load tournament details',
    })
  }
})

async function handleSubmit() {
  loading.value = true
  try {
    await createRegistration(form.value)
    Notify.create({
      type: 'positive',
      timeout: 10000,
      message: 'Registration successful! 🎉',

    })
    router.push('/tournaments')
  } catch (err) {
    console.error(err)
    Notify.create({
      type: 'negative',
      message: err.response?.data?.error || 'Failed to register. Please try again.',
    })
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.game-cover {
  max-width: 140px;
  aspect-ratio: 9/12;
  border-radius: 10px;
  object-fit: cover;
}

/* Responsive title font sizes */
.register-title {
  font-size: 1.5rem;
  /* default for desktops */
}

@media (max-width: 768px) {
  .register-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .register-title {
    font-size: 1rem;
  }
}
</style>
