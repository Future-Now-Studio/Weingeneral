<script setup>
import TheNavigation from '~/components/TheNavigation.vue';
import TheTopBar from '~/components/TheTopBar.vue';
</script>

<template>
  <v-app>
    <TheTopBar />
    <TheNavigation />
    
    <v-main>
      <slot />
    </v-main>

    <v-footer class="bg-grey-darken-4 text-white py-16">
      <v-container>
        <v-row>
          <!-- Company Info -->
          <v-col cols="12" md="3">
            <h3 class="text-h5 font-weight-bold mb-6">DER WEINGENERAL</h3>
            <p class="text-grey-lighten-1 footer-link">
              Ihr stilvoller Showroom für erlesene Weine, edle Spirituosen und 
              passende Ausstattungstechnik.
            </p>
          </v-col>

          <!-- Quick Links -->
          <v-col cols="12" md="3">
            <h3 class="text-h5 font-weight-bold mb-6">Quick Links</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item
                v-for="item in [
                  { title: 'Startseite', to: '/' },
                  { title: 'Über uns', to: '/#ueber-uns' },
                  { title: 'Produkte', to: '/produkte' },
                  { title: 'Kontakt', to: '/kontakt' },
                ]"
                :key="item.title"
                :to="item.to"
                class="text-grey-lighten-1 footer-link"
              >
                {{ item.title }}
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Contact Info -->
          <v-col cols="12" md="3">
            <h3 class="text-h5 font-weight-bold mb-6">Kontakt</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item class="text-grey-lighten-1 footer-link">Geschmacksdestille UG (haftungsbeschränkt)</v-list-item>
              <v-list-item class="text-grey-lighten-1 footer-link">Dammtordamm 2</v-list-item>
              <v-list-item class="text-grey-lighten-1 footer-link">20354 Hamburg</v-list-item>
              <v-list-item class="text-grey-lighten-1 footer-link">Tel.: +49 151 235 396 36</v-list-item>
              <v-list-item class="text-grey-lighten-1 footer-link">E-Mail: info@geschmacksdestille.de</v-list-item>
            </v-list>
          </v-col>

          <!-- Social Media -->
          <v-col cols="12" md="3">
            <h3 class="text-h5 font-weight-bold mb-6">Folgen Sie uns</h3>
            <div class="d-flex gap-6">
              <v-btn
                icon
                variant="text"
                color="white"
                href="#"
                class="social-btn"
              >
                <v-icon size="28">mdi-instagram</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                color="white"
                href="#"
                class="social-btn"
              >
                <v-icon size="28">mdi-facebook</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-12"></v-divider>

        <div class="text-center text-grey-lighten-1">
          <p class="text-body-2">&copy; {{ new Date().getFullYear() }} DER WEINGENERAL. Alle Rechte vorbehalten.</p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.footer-link {
  transition: all 0.3s ease;
  padding: 8px 0;
}

.footer-link:hover {
  color: white !important;
  transform: translateX(5px);
}

.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
