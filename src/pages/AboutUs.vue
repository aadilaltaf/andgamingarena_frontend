<template>
  <q-page padding class="about-bg">
    <!-- Title -->
    <div class="text-h4 text-white text-center q-mb-md q-pt-lg">
      <span class="text-white">About Us</span>
    </div>

    <div class="row justify-center q-mx-xl">
      <!-- Our Mission -->
      <q-card class="about-card col-12 col-md-5 q-ma-lg " flat bordered>
        <q-card-section class="text-center">
          <div class="text-h5 text-purple-6 q-mb-sm">🚀 Our Mission</div>
          <div class="text-body1 text-grey-8">
            At <b>AND Gaming Arena</b>, we bring together passionate gamers and competitive players
            under one roof. Our mission is to create a community-driven space where everyone can
            <span class="text-bold">compete, connect, and have fun</span>.
          </div>
        </q-card-section>
      </q-card>

      <!-- Who We Are -->
      <q-card class="about-card col-12 col-md-5 q-ma-lg " flat bordered>
        <q-card-section class="text-center">
          <div class="text-h5 text-purple-6 q-mb-sm">👾 Who We Are</div>
          <div class="text-body1 text-grey-8">
            We are gamers just like you! Our arena is built by a team of
            <span class="text-bold">dedicated gaming enthusiasts</span> who wanted to provide the
            ultimate hub for both casual and competitive play.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- What We Offer -->
    <div class="row justify-center q-mx-xl">
      <q-card class="about-card col-12 col-md-3 q-ma-lg" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h6 text-purple-6 q-mb-sm">🏆 Tournaments</div>
          <p class="text-grey-8 text-subtitle1">
            Weekly and monthly competitive tournaments across multiple games.
          </p>
        </q-card-section>
      </q-card>

      <q-card class="about-card col-12 col-md-3 q-ma-lg" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h6 text-purple-6 q-mb-sm">🎉 Events</div>
          <p class="text-grey-8 text-subtitle1">Exciting community gaming events and fun challenges.</p>
        </q-card-section>
      </q-card>

      <q-card class="about-card col-12 col-md-3 q-ma-lg" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h6 text-purple-6 q-mb-sm">🕹️ Play Games</div>
          <p class="text-grey-8 text-subtitle1">
            Come hang out and play your favorite games with friends anytime.
          </p>
        </q-card-section>
      </q-card>
    </div>

    <!-- Vision Section -->
    <div class="row justify-center q-ma-lg q-mx-xl ">
      <q-card class="about-card col-12 col-md-10 q-pb-md" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h5 text-purple-6 q-mb-sm">🌟 Our Vision</div>
          <div class="text-body1 text-grey-8">
            We envision <b>AND Gaming Arena</b> as the ultimate destination for gamers — a place
            where <span class="text-bold">skill, passion, and community</span>
            come together to celebrate the spirit of gaming.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.about-bg {
  background-image: radial-gradient(circle at center, #0049aa, #000c21);
  min-height: 100vh;
}

.about-card {
  border-radius: 20px;
  background: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease;
}

.about-card:hover {
  transform: translateY(-8px);
}
</style>
