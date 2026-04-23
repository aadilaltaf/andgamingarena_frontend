<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <span class="text-h6">🏆 Manage Tournaments</span>
      <q-btn label="Add Tournament" color="primary" icon-right="mdi-plus" @click="openAddDialog" />
    </div>

    <q-table
      :rows="tournaments"
      :columns="columns"
      row-key="_id"
      flat
      bordered
      color="primary"
      :loading="loading"
      :pagination="{ rowsPerPage: 0 }"
    >
      <!-- Game -->
      <template v-slot:body-cell-game="props">
        <q-td>
          <q-chip v-if="props.row.game" color="primary" text-color="white" size="sm">
            {{ props.row.game.gameName }}
          </q-chip>
        </q-td>
      </template>

      <!-- Entry Fee -->
      <template v-slot:body-cell-entryFee="props">
        <q-td>₹ {{ props.row.entryFee }}</q-td>
      </template>

      <!-- Winner -->
      <template v-slot:body-cell-winner="props">
        <q-td>
          <span v-if="props.row.winner">
            <q-chip color="positive" text-color="white" size="md" class="q-px-md">
              {{ props.row.winner.firstName }} {{ props.row.winner.lastName }}</q-chip
            >
          </span>
          <span v-else>-</span>
        </q-td>
      </template>

      <!-- Status -->
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-chip
            :color="statusColor(props.row.status)"
            text-color="white"
            size="sm"
            class="text-capitalize"
          >
            {{ props.row.status }}
          </q-chip>
        </q-td>
      </template>

      <!-- Highlights -->
      <template v-slot:body-cell-highlights="props">
        <q-td>
          <div v-if="props.row.highlights?.length" class="column ">
            <q-chip
              v-for="(file, idx) in props.row.highlights"
              :key="idx"
              color="indigo-13"
              text-color="white"
              size="sm"
              class="q-pl-md"
            >
              {{ file }}
            </q-chip>
          </div>
          <span v-else>-</span>
        </q-td>
      </template>

      <!-- Instagram Link -->
      <template v-slot:body-cell-instagramLink="props">
        <q-td align="center">
          <q-btn
            v-if="props.row.instagramLink"
            dense
            flat
            round
            color="pink"
            icon="mdi-instagram"
            type="a"
            target="_blank"
            :href="props.row.instagramLink"
          />
          <span v-else>-</span>
        </q-td>
      </template>

      <!-- Actions -->
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            size="md"
            color="secondary"
            label="Edit"
            class="q-mr-sm q-px-lg"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            size="md"
            color="negative"
            label="Delete"
            @click="deleteTournamentConfirm(props.row)"
          />
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <!-- Add/Edit Dialog -->
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Edit Tournament' : 'Add Tournament' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Tournament Name" outlined class="q-mb-md" />
          <q-input
            v-model="form.description"
            label="Description"
            type="textarea"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="form.tournamentDate"
            label="Tournament Date"
            type="date"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model.number="form.entryFee"
            label="Entry Fee (₹)"
            type="number"
            outlined
            class="q-mb-md"
          />

          <!-- Status select -->
          <q-select
            v-model="form.status"
            :options="statusOptions"
            label="Status"
            outlined
            class="q-mb-md"
          />

          <!-- Game select -->
          <q-select
            v-model="form.game"
            :options="games"
            option-value="_id"
            option-label="gameName"
            label="Select Game"
            outlined
            emit-value
            map-options
            class="q-mb-md"
            @update:model-value="loadParticipantsForTournament"
          />

          <!-- Winner select -->
          <q-select
            v-model="form.winner"
            :options="participants"
            option-value="_id"
            option-label="fullName"
            label="Select Winner"
            outlined
            emit-value
            map-options
            clearable
            class="q-mb-md"
            :disable="!editMode"
          />

          <!-- Highlights input -->
          <q-input
            v-model="highlightsText"
            label="Highlights (comma separated filenames)"
            outlined
            class="q-mb-md"
            hint="e.g. final1.jpg, trophy.png"
          />
          <!-- Instagram URL input -->
          <q-input
            v-model="form.instagramLink"
            label="Instagram Post/Reel URL"
            outlined
            class="q-mb-md"
            hint="Paste Instagram link here"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveTournament" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Dialog -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="text-h6">Confirm Delete</q-card-section>
        <q-card-section>
          Are you sure you want to delete <b>{{ deleteTarget?.name }}</b
          >?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="negative" label="Delete" @click="deleteTournament" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import {
  getTournaments,
  createTournament,
  updateTournament,
  deleteTournament as deleteTournamentApi,
} from '@/services/tournaments'
import { getGames } from '@/services/games'
import { getRegistrationsByTournament } from '@/services/registrations.js'

const $q = useQuasar()

const tournaments = ref([])
const games = ref([])
const participants = ref([])
const dialog = ref(false)
const deleteDialog = ref(false)
const editMode = ref(false)
const highlightsText = ref('')

const form = ref({
  name: '',
  description: '',
  tournamentDate: '',
  game: null,
  entryFee: 0,
  status: 'upcoming',
  winner: null,
  highlights: [],
  instagramLink: '',
})

const currentId = ref(null)
const deleteTarget = ref(null)
const loading = ref(false)

const statusOptions = ['upcoming', 'started', 'ended']

const columns = [
  { name: 'name', label: 'Tournament', field: 'name', align: 'left' },
  { name: 'game', label: 'Game', field: 'game', align: 'left' },
  { name: 'entryFee', label: 'Entry Fee', field: 'entryFee', align: 'left' },
  {
    name: 'tournamentDate',
    label: 'Tournament Date',
    field: (row) => row.tournamentDate?.slice(0, 10),
    align: 'left',
  },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'winner', label: 'Winner', field: 'winner', align: 'left' },
  { name: 'highlights', label: 'Highlights', field: 'highlights', align: 'left' },
  { name: 'instagramLink', label: 'Instagram', field: 'instagramLink', align: 'center' },
  { name: 'actions', label: 'Actions', align: 'center' },
]

const statusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return 'green'
    case 'started':
      return 'blue'
    case 'ended':
      return 'red'
    default:
      return 'grey'
  }
}

const fetchTournaments = async () => {
  loading.value = true
  try {
    const res = await getTournaments()
    tournaments.value = res.data.data || []
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load tournaments' })
  } finally {
    loading.value = false
  }
}

const fetchGames = async () => {
  try {
    const res = await getGames()
    games.value = (res.data.data || []).filter((g) => g.enableTournament)
  } catch (err) {
    console.error(err)
  }
}

const loadParticipantsForTournament = async (tournamentId) => {
  if (!tournamentId) {
    participants.value = []
    return
  }
  try {
    const res = await getRegistrationsByTournament(tournamentId)
    participants.value = (res.data.data || []).map((p) => ({
      _id: p._id,
      fullName: `${p.firstName} ${p.lastName}`,
    }))
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load participants' })
  }
}

onMounted(() => {
  fetchTournaments()
  fetchGames()
})

const openAddDialog = () => {
  editMode.value = false
  form.value = {
    name: '',
    description: '',
    tournamentDate: '',
    game: null,
    entryFee: 0,
    status: 'upcoming',
    winner: null,
    highlights: [],
    instagramLink: '',
  }
  highlightsText.value = ''
  participants.value = []
  dialog.value = true
}

const openEditDialog = (tournament) => {
  editMode.value = true
  form.value = {
    name: tournament.name,
    description: tournament.description,
    tournamentDate: tournament.tournamentDate?.slice(0, 10),
    game: tournament.game?._id || null,
    entryFee: tournament.entryFee || 0,
    status: tournament.status || 'upcoming',
    winner: tournament.winner?._id || null,
    highlights: tournament.highlights || [],
    instagramLink: tournament.instagramLink || '',
  }
  highlightsText.value = (tournament.highlights || []).join(', ')
  currentId.value = tournament._id
  loadParticipantsForTournament(tournament._id)
  dialog.value = true
}

const saveTournament = async () => {
  try {
    form.value.highlights = highlightsText.value
      ? highlightsText.value
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
      : []

    if (editMode.value) {
      await updateTournament(currentId.value, form.value)
      $q.notify({ type: 'positive', message: 'Tournament updated successfully!' })
    } else {
      await createTournament(form.value)
      $q.notify({ type: 'positive', message: 'Tournament added successfully!' })
    }
    dialog.value = false
    fetchTournaments()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error saving tournament' })
  }
}

const deleteTournamentConfirm = (tournament) => {
  deleteTarget.value = tournament
  deleteDialog.value = true
}

const deleteTournament = async () => {
  try {
    await deleteTournamentApi(deleteTarget.value._id)
    $q.notify({ type: 'positive', message: 'Tournament deleted successfully!' })
    fetchTournaments()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error deleting tournament' })
  } finally {
    deleteDialog.value = false
  }
}
</script>
