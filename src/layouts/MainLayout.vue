<template>
  <q-layout view="lHh Lpr lFf" class="bg-wrapper">
    <q-header elevated class="q-py-sm q-pt-md bg-black" :class="$q.platform.is.ios ? 'header-ios' : 'header-android'">
      <q-toolbar class="row justify-between">

        <img class="col-1 q-ml-sm" alt="Logo" src="~assets/andgamingarena_logo.png"
          style="width: 50px; height: 50px; border-radius: 100px" />
        <q-toolbar-title class="col-6 col-xs-8  " :class="$q.screen.lt.md ? 'text-h6' : 'text-h4'">AND Gaming
          Arena</q-toolbar-title>
        <!-- <q-space /> -->
        <q-btn class="col-1 gt-md" flat label="Home" to="/home" icon="mdi-home" />
        <q-btn class="col-1 gt-md" flat label="About" to="/about" icon="mdi-information" />
        <q-btn class="col-1 gt-md" flat label="Contact" to="/contact" icon="mdi-phone-outline" />


        <!-- <q-btn v-if="isAuthenticated()" flat icon="logout" size="xl" aria-label="Logout" @click="logout"
          class="col-1 q-mr-sm gt-md" /> -->
        <q-btn flat icon="menu" size="xl" aria-label="Menu" @click="toggleRightDrawer" class="col-1 q-mr-md" />
      </q-toolbar>

    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <q-item clickable v-ripple to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/games">
          <q-item-section avatar>
            <q-icon name="sports_esports" />
          </q-item-section>
          <q-item-section>Games</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/bookings">
          <q-item-section avatar>
            <q-icon name="mdi-receipt-text-plus" />
          </q-item-section>
          <q-item-section>Bookings</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/tournaments">
          <q-item-section avatar>
            <q-icon name="mdi-tournament" />
          </q-item-section>
          <q-item-section>Tournaments</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/about">
          <q-item-section avatar>
            <q-icon name="mdi-information" />
          </q-item-section>
          <q-item-section>About Us</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/contact">
          <q-item-section avatar>
            <q-icon name="mdi-phone-outline" />
          </q-item-section>
          <q-item-section>Contact Us</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout" v-if="isAuthenticated()">
          <q-item-section avatar>
            <q-icon name="mdi-logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container class="overlay">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { isAuthenticated } from "../utils/auth.js";

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}
</script>

<style>
.bg-wrapper {
  background-image: radial-gradient(circle at center, #0049aa, #000c21);
  background-size: cover;
  background-position: center;
}

.header-ios {
  padding-top: env(safe-area-inset-top);
}

.footer-ios {
  padding-bottom: env(safe-area-inset-bottom);
  border-radius: 20px 20px 0 0;
}

.header-android {
  padding-top: 10px;
}

.footer-android {
  padding-bottom: 2px;
  border-radius: 20px 20px 0 0;
}
</style>
