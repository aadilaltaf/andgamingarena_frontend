<template>
  <q-page class="bg-grey-10 text-white">
    <!-- Header -->
    <div class="text-center q-pa-md">
      <h1 class="text-h4">⚙️ Admin Portal</h1>
      <p class="text-subtitle2">Manage Games, Tournaments, and Registrations</p>
    </div>

    <!-- Tabs Navigation -->
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-primary text-white shadow-2 "
      active-color="yellow"
      indicator-color="yellow"
    >
      <q-tab name="games" label="Games" icon="sports_esports" />
      <q-tab name="tournaments" label="Tournaments" icon="emoji_events" />
      <q-tab name="registrations" label="Registrations" icon="how_to_reg" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels
      v-model="tab"
      animated
      class="bg-grey-9 text-white q-pa-md"
    >
      <q-tab-panel name="games">
        <ManageGames />
      </q-tab-panel>

      <q-tab-panel name="tournaments">
        <ManageTournaments />
      </q-tab-panel>

      <q-tab-panel name="registrations">
        <ManageRegistrations />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from "vue"

// Import management components
import ManageGames from "@/components/ManageGames.vue"
import ManageTournaments from "@/components/ManageTournaments.vue"
import ManageRegistrations from "@/components/ManageRegistrations.vue"

// Default selected tab
const tab = ref("games")
</script>

<style scoped>

</style>
