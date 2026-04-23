<template>
  <div>
    <!-- Header -->
    <div class="row justify-between ">
      <div class="col-12 col-sm-6 col-md-6 q-mb-sm">
        <span class="text-h6 text-white text-center">🎮 Manage Games</span>
      </div>
      <div class="col-12 col-sm-6 col-md-2 q-mb-sm">
        <!-- Filter: Ready to Play -->
        <q-btn-toggle
          v-model="showReadyOnly"
          :options="[
            { label: 'All', value: false },
            { label: 'Ready to Play', value: true },
          ]"
          color="black"
          toggle-color="positive"
          unelevated
          class="q-mr-md"
        />
      </div>
      <div class="col-12 col-md-2 col-sm-6 q-mb-sm">
        <!-- Filter: Platform -->
        <q-select
          v-model="selectedPlatform"
          :options="platformOptions"
          label="Filter by Platform"
          outlined
          dense
          clearable
          bg-color="white"
          class="q-mr-xl "
        />
      </div>
      <div class="col-12 col-md-2 col-sm-6 q-mb-sm">
        <!-- Add Game -->
        <q-btn label="Add Game" icon-right="mdi-plus" color="primary" @click="openAddDialog" />
      </div>
    </div>

    <!-- Table -->
    <q-table
      :rows="filteredGames"
      :columns="columns"
      row-key="_id"
      flat
      bordered
      :loading="loading"
      color="primary"
      :pagination="{ rowsPerPage: 0 }"
    >
      <!-- Serial Column -->
      <template v-slot:body-cell-serial="props">
        <q-td>{{ props.pageIndex + 1 }}</q-td>
      </template>

      <!-- Cover -->
      <template v-slot:body-cell-coverImage="props">
        <q-td>
          <q-img
            :src="props.row.coverImage"
            :alt="props.row.gameName"
            style="width: 80px; height: 80px; object-fit: cover"
          />
        </q-td>
      </template>

      <!-- Platforms -->
      <template v-slot:body-cell-availableOnPlatforms="props">
        <q-td>
          <div>{{ props.row.availableOnPlatforms.join(', ') }}</div>
        </q-td>
      </template>

      <!-- Ready to Play -->
      <template v-slot:body-cell-readyToPlay="props">
        <q-td align="center">
          <q-icon
            :name="props.row.readyToPlay ? 'check_circle' : 'cancel'"
            :color="props.row.readyToPlay ? 'green' : 'red'"
          />
        </q-td>
      </template>

      <!-- Tournament Enabled -->
      <template v-slot:body-cell-enableTournament="props">
        <q-td align="center">
          <q-icon
            :name="props.row.enableTournament ? 'check_circle' : 'cancel'"
            :color="props.row.enableTournament ? 'blue' : 'grey'"
          />
        </q-td>
      </template>

      <!-- Actions -->
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn size="md" color="secondary" label="Edit" @click="openEditDialog(props.row)" />
          <q-btn
            size="md"
            color="negative"
            label="Delete"
            class="q-ml-sm q-px-lg"
            @click="askDeleteGame(props.row._id)"
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
          <div class="text-h6">{{ editMode ? 'Edit Game' : 'Add Game' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.gameName" label="Game Name" outlined />
          <q-input v-model="form.coverImage" label="Cover Image URL" outlined class="q-mt-md" />
          <q-toggle
            v-model="form.readyToPlay"
            label="Ready to Play"
            color="green"
            class="q-mt-md"
          />
          <q-toggle
            v-model="form.enableTournament"
            label="Enable Tournament"
            color="blue"
            class="q-mt-sm"
          />
          <q-select
            v-model="form.availableOnPlatforms"
            label="Available On Platforms"
            multiple
            use-chips
            :options="platformOptions"
            class="q-mt-md"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup size="lg" />
          <q-btn color="primary" label="Save" @click="saveGame" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Dialog -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Delete</div>
          <p>Are you sure you want to delete this game?</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="negative" label="Delete" @click="deleteGameConfirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { getGames, createGame, updateGame, deleteGame } from '@/services/games'

const $q = useQuasar()

const games = ref([])
const dialog = ref(false)
const editMode = ref(false)
const form = ref({
  gameName: '',
  coverImage: '',
  readyToPlay: false,
  enableTournament: false,
  availableOnPlatforms: [],
})
const currentId = ref(null)

const deleteDialog = ref(false)
const deleteId = ref(null)
const loading = ref(false)

// Filters
const showReadyOnly = ref(false)
const selectedPlatform = ref(null)

const platformOptions = ['PS4', 'PS5']

const columns = [
  { name: 'serial', label: '#', field: 'serial', align: 'left' },
  { name: 'gameName', label: 'Name', field: 'gameName', align: 'left' },
  { name: 'coverImage', label: 'Cover', field: 'coverImage', align: 'left' },
  {
    name: 'availableOnPlatforms',
    label: 'Platforms',
    field: 'availableOnPlatforms',
    align: 'left',
  },
  { name: 'readyToPlay', label: 'Ready To Play?', field: 'readyToPlay', align: 'center' },
  {
    name: 'enableTournament',
    label: 'Tournament Enabled?',
    field: 'enableTournament',
    align: 'center',
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

// Computed: filter + sort
const filteredGames = computed(() => {
  let list = [...games.value]

  if (showReadyOnly.value) {
    list = list.filter((game) => game.readyToPlay)
  }

  if (selectedPlatform.value) {
    list = list.filter((game) => game.availableOnPlatforms.includes(selectedPlatform.value))
  }

  return list.sort((a, b) => a.gameName.localeCompare(b.gameName))
})

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

const openAddDialog = () => {
  editMode.value = false
  form.value = {
    gameName: '',
    coverImage: '',
    readyToPlay: false,
    enableTournament: false,
    availableOnPlatforms: [],
  }
  dialog.value = true
}

const openEditDialog = (game) => {
  editMode.value = true
  form.value = {
    gameName: game.gameName,
    coverImage: game.coverImage,
    readyToPlay: game.readyToPlay,
    enableTournament: game.enableTournament,
    availableOnPlatforms: game.availableOnPlatforms || [],
  }
  currentId.value = game._id
  dialog.value = true
}

const saveGame = async () => {
  loading.value = true
  try {
    if (editMode.value) {
      await updateGame(currentId.value, form.value)
      $q.notify({ type: 'positive', message: 'Game updated successfully!' })
    } else {
      await createGame(form.value)
      $q.notify({ type: 'positive', message: 'Game added successfully!' })
    }
    dialog.value = false
    fetchGames()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error saving game: ' + err.response?.data?.error })
    console.error(err)
  } finally {
    loading.value = false
  }
}

const askDeleteGame = (id) => {
  deleteId.value = id
  deleteDialog.value = true
}

const deleteGameConfirm = async () => {
  loading.value = true
  try {
    await deleteGame(deleteId.value)
    $q.notify({ type: 'positive', message: 'Game deleted successfully!' })
    fetchGames()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error deleting game' })
    console.error(err)
  } finally {
    deleteDialog.value = false
    loading.value = false
  }
}
</script>

<style scoped>
.text-white {
  color: white;
}
</style>
