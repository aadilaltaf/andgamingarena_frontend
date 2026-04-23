<template>
  <q-page class="text-white home-page">
    <div class="row justify-center items-center q-px-xl">
      <div class="text-center q-pt-sm">

        <!-- Responsive font size -->
        <div class="hero-title text-bold q-my-md">
          AND
          <br class="lt-md">
          Ga<q-img src="~assets/controller.png" class="hero-controller q-mx-xs" fit />ing Arena
        </div>

        <div class="text-subtitle1">
          Where every game becomes an experience.
        </div>
      </div>
    </div>

    <div>
      <div class="row justify-center q-pt-lg">
        <q-btn label="Games to Play" color="black" size="lg" class="q-ma-md q-px-xl q-py-md text-white" to="/games"
          style="border-radius: 15px; padding: 18px 51px" glossy>
          <q-icon name="sports_esports" class="q-ml-sm" color="blue-9" />
        </q-btn>

        <q-btn label="Book a Session" color="black" size="lg" class="q-ma-md q-px-xl q-py-md text-white" to="/bookings"
          style="border-radius: 15px;  padding: 17px 44px" glossy>
          <q-icon name="mdi-receipt-text-plus" class="q-ml-sm" color="green-9" />
        </q-btn>

        <q-btn label="🏆 Tournaments" color="black" size="lg" class="q-ma-md q-py-md text-white" to="/tournaments"
          style="border-radius: 15px; padding: 17px 38px" glossy>
          <q-icon name="mdi-tournament" class="q-ml-sm" color="red-9" />
        </q-btn>
      </div>
    </div>

    <div>
      <FeaturedGames />
    </div>
  </q-page>
</template>

<script setup>
import FeaturedGames from "src/components/FeaturedGames.vue";
</script>

<style scoped>
.home-page {
  background-image: radial-gradient(circle at 50% 50%, #0049aa, #000c21);
}

/* Responsive title font sizes */
.hero-title {
  font-size: 7rem;
  /* default for desktops */
}

.hero-controller {
  width: 106px;
  height: 70px;
  vertical-align: middle;
  /* aligns nicely with text */
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 6rem;
    line-height: 100px;
  }

  .hero-controller {
    width: 85px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 3.8rem;
    line-height: 75px;
  }

  .hero-controller {
    width: 60px;
    height: 40px;
  }
}
</style>
