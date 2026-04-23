<template>
  <div>
    <div class="row items-center justify-between">
      <div class="col-12 col-sm-6 col-md-4 q-mb-sm">
        <span class="text-h6">📝 Manage Registrations</span>
      </div>
      <div class="col-12 col-sm-6 col-md-4 q-mb-sm">
        <q-select
          v-model="selectedTournament"
          :options="[
            { label: 'All Tournaments', value: null },
            ...tournamentOptions.map((t) => ({ label: t.name, value: t._id })),
          ]"
          label="Filter by Tournament"
          outlined
          dense
          emit-value
          map-options
          bg-color="white"
        />
      </div>
      <div class="col-12 col-md-3 col-sm-6 md:q-mx-xl q-mb-sm">
        <q-btn
          label="Add Registration"
          color="primary"
          icon-right="mdi-plus"
          @click="openAddDialog"
        />
      </div>
    </div>

    <!-- Tournament Filter -->
    <div class="row q-mb-md"></div>

    <q-table
      :rows="filteredRegistrations"
      :columns="columns"
      row-key="_id"
      flat
      bordered
      color="primary"
      :loading="loading"
      :pagination="{ rowsPerPage: 0 }"
    >
      <!-- Serial No slot -->
      <template v-slot:body-cell-serial="props">
        <q-td align="center">
          {{ props.pageIndex + 1 }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            size="md"
            color="secondary"
            label="Edit"
            class="q-mr-sm"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            size="md"
            color="negative"
            label="Delete"
            @click="deleteRegistrationConfirm(props.row)"
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
          <div class="text-h6">
            {{ editMode ? 'Edit Registration' : 'Add Registration' }}
          </div>
        </q-card-section>

        <q-card-section>
          <!-- First Name -->
          <q-input v-model="form.firstName" label="First Name" outlined class="q-mb-md" />

          <!-- Last Name -->
          <q-input v-model="form.lastName" label="Last Name" outlined class="q-mb-md" />

          <!-- Phone -->
          <q-input v-model="form.phoneNo" label="Phone Number" outlined class="q-mb-md" />

          <!-- Address -->
          <q-input v-model="form.address" label="Address" outlined class="q-mb-md" />

          <!-- Tournament Selection -->
          <q-select
            v-model="form.tournament"
            :options="tournamentOptions"
            option-label="name"
            option-value="_id"
            emit-value
            map-options
            label="Tournament"
            outlined
            class="q-mb-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveRegistration" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="text-h6">Confirm Delete</q-card-section>
        <q-card-section>
          Are you sure you want to delete registration of
          <b>{{ deleteTarget?.firstName }} {{ deleteTarget?.lastName }}</b
          >?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="negative" label="Delete" @click="deleteRegistration" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import {
  getRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration as deleteRegistrationApi,
} from '@/services/registrations'
import { getTournaments } from '@/services/tournaments'

const $q = useQuasar()

const registrations = ref([])
const tournaments = ref([])
const tournamentOptions = ref([])
const selectedTournament = ref(null)

const dialog = ref(false)
const deleteDialog = ref(false)
const editMode = ref(false)
const form = ref({
  firstName: '',
  lastName: '',
  phoneNo: '',
  address: '',
  tournament: null,
})
const currentId = ref(null)
const deleteTarget = ref(null)
const loading = ref(false)

const columns = [
  { name: 'serial', label: 'S.No', field: 'serial', align: 'center' },
  { name: 'firstName', label: 'First Name', field: 'firstName', align: 'left' },
  { name: 'lastName', label: 'Last Name', field: 'lastName', align: 'left' },
  { name: 'phoneNo', label: 'Phone No', field: 'phoneNo', align: 'left' },
  { name: 'address', label: 'Address', field: 'address', align: 'left' },
  {
    name: 'tournament',
    label: 'Tournament',
    field: (row) => row.tournament?.name || '—',
    align: 'left',
  },
  { name: 'actions', label: 'Actions', align: 'center' },
]

// ✅ Computed filtered list
const filteredRegistrations = computed(() => {
  if (!selectedTournament.value) return registrations.value
  return registrations.value.filter((r) => r.tournament?._id === selectedTournament.value)
})

const fetchRegistrations = async () => {
  loading.value = true
  try {
    const res = await getRegistrations()
    registrations.value = res.data.data || []
  } catch (err) {
    console.error('Error fetching registrations:', err)
    $q.notify({ type: 'negative', message: 'Failed to load registrations' })
  } finally {
    loading.value = false
  }
}

const fetchTournaments = async () => {
  try {
    const res = await getTournaments()
    tournaments.value = res.data.data || []
    tournamentOptions.value = tournaments.value
  } catch (err) {
    console.error('Error fetching tournaments:', err)
  }
}

const openAddDialog = () => {
  editMode.value = false
  form.value = { firstName: '', lastName: '', phoneNo: '', address: '', tournament: null }
  dialog.value = true
}

const openEditDialog = (registration) => {
  editMode.value = true
  form.value = {
    firstName: registration.firstName,
    lastName: registration.lastName,
    phoneNo: registration.phoneNo,
    address: registration.address,
    tournament: registration.tournament?._id,
  }
  currentId.value = registration._id
  dialog.value = true
}

const saveRegistration = async () => {
  try {
    dialog.value = false
    if (editMode.value) {
      await updateRegistration(currentId.value, form.value)
      $q.notify({ type: 'positive', message: 'Registration updated successfully!' })
    } else {
      await createRegistration(form.value)
      $q.notify({ type: 'positive', message: 'Registration added successfully!' })
    }
    fetchRegistrations()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error saving registration' })
    console.error(err)
  }
}

const deleteRegistrationConfirm = (registration) => {
  deleteTarget.value = registration
  deleteDialog.value = true
}

const deleteRegistration = async () => {
  try {
    await deleteRegistrationApi(deleteTarget.value._id)
    $q.notify({ type: 'positive', message: 'Registration deleted successfully!' })
    fetchRegistrations()
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Error deleting registration' })
    console.error(err)
  } finally {
    deleteDialog.value = false
  }
}

onMounted(() => {
  fetchRegistrations()
  fetchTournaments()
})
</script>
