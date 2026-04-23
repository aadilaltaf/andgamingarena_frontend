<template>
  <q-page padding class="contact-bg">
    <!-- Title -->
    <div class="text-h4 text-white text-center q-mb-md q-py-lg">
      <span class="text-white">📞 Contact Us</span>
    </div>

    <!-- Shop Image + Map Section -->
    <div class="row justify-center q-mx-xl q-mb-xl q-gutter-y-lg">
      <!-- Shop Image -->
      <div class="col-12 col-md-5 flex flex-center  q-mx-xl">
        <q-img src="~assets/arena_shop.jpg" alt="AND Gaming Arena Shop"
          style="width: 100%; max-width: 620px; border-radius: 16px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4)" fit />
      </div>

      <!-- Map Card -->
      <div class="col-12 col-md-5 ">
        <q-card class="contact-card" flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6 text-purple-5 q-mb-sm">📍 Location</div>
            <div class="text-body1 text-grey-8 q-mb-md">
              AND Gaming Arena - Shop no 1, Sharifa Square Complex,
              Marble Chowk Zakura - 190006, Srinagar India
            </div>
            <!-- Google Maps Embed -->
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d170994.45619754307!2d74.91063567704734!3d34.14510047884877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x38e1851ac40483c1%3A0x2d181151e336d35c!2sShop%20No.%2001%2C%20Sharifa%20Square%20Complex%2C%20Marble%20Chowk%2C%20opposite%20Bilal%20Colony%2C%20zakura%2C%20Srinagar%2C%20Jammu%20and%20Kashmir%20190006!3m2!1d34.1629527!2d74.82925089999999!5e0!3m2!1sen!2sin!4v1756203204367!5m2!1sen!2sin"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Social Media Section -->
    <div class="row justify-center">
      <q-card class="contact-card col-10 col-md-8 q-mx-md" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h6 text-purple-5 q-mb-md">📲 Follow Us</div>
          <div class="row justify-center q-gutter-md">
            <q-btn round color="green" icon="mdi-whatsapp" size="lg"
              href="https://whatsapp.com/channel/0029Vb68EhgG3R3pT3qsKO0x" target="_blank" />
            <q-btn round color="pink" icon="mdi-instagram" size="lg" href="https://www.instagram.com/andgamingarena"
              target="_blank" />
          </div>
          <div class="text-body2 text-grey-7 q-mt-sm">
            Connect with us on WhatsApp and follow us on Instagram for updates!
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Call Info -->
    <div class="row justify-center">
      <q-card class="contact-card col-10 col-md-8 q-mx-md q-mt-xl" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h6 text-purple-5 q-mb-md">📞 Call Us</div>
          <div class="row justify-center">
            <div class="col-10 col-md-4 text-body1 text-grey-8 q-mb-md">
              <a href="tel:+918714739555" class="text-primary text-bold">+91 8714739555</a>
            </div>
            <div class="col-10 col-md-4 text-body1 text-grey-8 q-mb-md">
              <a href="tel:+917051154204" class="text-primary text-bold">+91 7051154204</a>
            </div>
            <div class="col-10 col-md-4 text-body1 text-grey-8 q-mb-md">
              <a href="tel:+917006256047" class="text-primary text-bold">+91 7006256047</a>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.contact-bg {
  background-image: radial-gradient(circle at center, #0049aa, #000c21);
  min-height: 100vh;
}

.contact-card {
  border-radius: 20px;
  background: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
}

.map-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
