<script setup>
import pageData from '@/data/index.json'
import Joshua from '@/assets/DSC05513.jpg'
import Christian from '@/assets/Bildschirmfoto 2025-04-30 um 19.00.50.png'
import Phil from '@/assets/J68A0009.jpg'

const page = ref(pageData)

const featuredProducts = [
  {
    title: 'Weine & Schaumweine',
    description: 'Entdecken Sie unsere handverlesene Auswahl an Premium-Weinen',
    image: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Jetzt entdecken',
    to: '/wein-schaumweine'
  },
  {
    title: 'Spirituosen',
    description: 'Erlesene Spirituosen für den perfekten Genuss',
    image: 'https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Jetzt entdecken',
    to: '/spirituosen'
  },
  {
    title: 'Ausstattungstechnik',
    description: 'Professionelle Ausstattung für Ihre Weinbar',
    image: 'https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Jetzt entdecken',
    to: '/ausstattung'
  }
]

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <TheHeroSection />

    <!-- Featured Products -->
    <v-container class="py-16">
      <div class="text-center">
        <h2 class="heading-2 section-title d-inline-block w-100"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <div class="title-background w-100">
            <div class="title-content">
              <span>
                UNSERE 3 SPEZIALITÄTEN
              </span>
            </div>
          </div>
        </h2>
      </div>
      <v-row class="mt-12">
        <v-col
          v-for="(product, index) in featuredProducts"
          :key="product.title"
          cols="12"
          md="4"
          class="d-flex"
        >
          <NuxtLink :to="product.to" class="text-decoration-none d-flex w-100">
            <v-card
              rounded="lg"
              elevation="0"
              class="product-card d-flex flex-column w-100 h-100"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 200 } }"
            >
              <v-img
                :src="product.image"
                height="250"
                width="100%"
                cover
                class="product-media"
              >
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey-lighten-5" />
                  </v-row>
                </template>
              </v-img>

              <v-card-text class="pa-6">
                <h3 class="product-title mb-3" style="font-size: 2.5em !important;">{{ product.title }}</h3>
                <p class="product-desc mb-0">{{ product.description }}</p>
              </v-card-text>

              <v-card-actions class="px-6 pb-6 pt-0">
                <v-btn
                  color="primary"
                  size="large"
                  block
                  class="product-cta"
                  :to="product.to"
                  v-motion
                  whileHover="{ scale: 1.03 }"
                  whileTap="{ scale: 0.98 }"
                >
                  {{ product.cta }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>

    <!-- About Section -->
    <v-container class="py-16" id="ueber-uns">
      <div class="about-section">
        <h2 class="heading-2 section-title d-inline-block w-100"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <div class="title-background w-100">
            <div class="title-content">
              <span>
                ÜBER DEN WEINGENERAL
              </span>
            </div>
          </div>
        </h2>
        <div class="logo-subtitle-container">
          <span class="logo-subtitle mt-1">
            EXKLUSIV. ERLESEN. EINFACH GENIESSEN.
          </span>
        </div>
        <div class="about-text-container">
          <p class="body-1 mb-8 mt-8">
            Der Weingeneral ist kein Händler für Wein und Ausstattung – er ist das Ergebnis gebündelter Expertise aus Gastronomie, Gestaltung und operativer Exzellenz. Hinter der Marke stehen drei erfahrene Köpfe aus der Branche, die ihr Wissen und ihr Netzwerk in eine Auswahl von Produkten einfließen lassen, die durch Qualität und Anspruch überzeugen.
            <br><br>
            Als Teil der "Geschmacksdestille" ermöglicht der Weingeneral den Zugang zu exklusiven Gastronomieprodukten - vom Wein bis zur passenden Ausstattung - immer mit Blick auf Genuss, Funktionalität und Stil.
          </p>
        </div>
      </div>

      <!-- Founders Section -->
      <v-row class="mt-16">


        <v-col
          cols="12"
          md="4"
          class="d-flex"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        >
          <div class="founder-card-modern" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }">
            <div class="founder-image-frame">
              <div class="founder-image-bg"></div>
              <img :src="Phil" alt="Phil P. Lebedicker" class="founder-img-modern" />
              <div class="founder-name-tag">
                PHIL
                <span class="founder-job-title">Projektleiter</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        >
          <div class="founder-card-modern" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }">
            <div class="founder-image-frame">
              <div class="founder-image-bg"></div>
              <img :src="Christian" alt="Kristian Zrno" class="founder-img-modern" />
              <div class="founder-name-tag">
                KRISTIAN
                <span class="founder-job-title">Geschäftsführer</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 0 } }"
        >
          <div class="founder-card-modern" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 0 } }">
            <div class="founder-image-frame">
              <div class="founder-image-bg"></div>
              <img :src="Joshua" alt="Joshua Baron" class="founder-img-modern" />
              <div class="founder-name-tag">
                JOSH
                <span class="founder-job-title">Verkauf & Marketing</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    
  </div>
</template>

<style scoped>
.max-width-600 {
  max-width: 600px;
}

.hero-section {
  height: 100vh;
  overflow: hidden;
}

.hero-image, .hero-content {
  width: 50%;
}

@media (max-width: 960px) {
  .hero-section {
    flex-direction: column;
    height: auto;
  }
  
  .hero-image, .hero-content {
    width: 100%;
    height: 50vh;
  }
}

.section-title {
  position: relative;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.title-text {
  position: relative;
  z-index: 2;
  padding: 12px 24px;
  color: white;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: var(--font-family-base);
}

.v-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.v-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.product-card {
  border: 1px solid rgba(0,0,0,0.06);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.12) !important;
}

.product-media {
  width: 100% !important;
  height: 250px !important;
  min-height: 250px !important;
  max-height: 250px !important;
  object-fit: cover !important;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  flex-shrink: 0;
}

.product-title {
  font-size: var(--font-size-text);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.8px;
  color: #1f2937;
  text-transform: uppercase;
}

.product-desc {
  font-size: 1rem;
  color: rgba(0,0,0,0.72);
}

.product-cta {
  font-weight: 700;
  letter-spacing: 0.5px;
  width: 100%;
  min-height: 56px !important;
  padding: 1.1rem 1.5rem !important;
  border-radius: 8px;
  font-size: 1rem !important;
}

.v-card-text {
  position: relative;
}

.clickable-btn {
  pointer-events: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.v-btn.v-btn--variant-outlined {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.custom-btn {
  transition: all 0.3s ease !important;
}

.custom-btn:hover {
  background-color: white !important;
  color: #9a1915 !important;
  border: 2px solid #9a1915 !important;
}

@media (max-width: 960px) {
  .v-card-text {
    padding: 24px !important;
  }
  
  .v-card-actions {
    padding: 0 24px 24px !important;
  }
}

.about-logo-aligned {
  width: 100%;
}

.founder-card-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  box-shadow: none;
  border-radius: 0;
  margin-bottom: 2rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.founder-image-frame {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto 1.5rem auto;
  aspect-ratio: 9/16;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.founder-image-frame:hover {
  transform: scale(1.05);
}

.founder-image-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #9a1915;
  z-index: 1;
  border-radius: 0;
  transform: translate(16px, -16px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.founder-image-frame:hover .founder-image-bg {
  transform: translate(20px, -20px);
}

.founder-img-modern {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.founder-image-frame:hover .founder-img-modern {
  transform: scale(1.05);
}

.founder-name-tag {
  position: absolute;
  bottom: unset;
  top: 66%;
  right: 0;
  background: #9a1915;
  color: #fff;
  font-weight: 900;
  font-size: 2.1rem;
  padding: 0.35em 1.5em 0.25em 1.5em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 3;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  line-height: 1.1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.founder-image-frame:hover .founder-name-tag {
  transform: translateX(-10px);
}

.founder-job-title {
  font-size: 1.05rem;
  font-weight: 400;
  color: #fff;
  opacity: 0.85;
  text-transform: none;
  letter-spacing: 0.01em;
  margin-top: 0.15em;
  margin-bottom: 0;
}

.founder-bio-modern {
  margin-top: 0.5rem;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}

.logo-subtitle-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  padding-top: 0;
}

.logo-subtitle {
  color: #9a1915;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-align: right;
  display: block;
  margin-top: 0;
  padding-top: 0;
}

.heading-2 {
  margin-bottom: 0 !important;
}

.title-background {
  background-color: #9a1915;
  padding: 0.5rem 0;
  width: 100%;
  display: block;
}

.title-content {
  max-width: 360px;
  margin: 0 auto;
  text-align: center;
}

.title-background span {
  color: white;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: var(--font-family-base);
  font-size: var(--font-size-text);
}

.about-text-container {
  text-align: left;
}

.about-section {
  width: 100%;
}

/* Global button styles */
:deep(.v-btn) {
  background-color: #9a1915 !important;
  color: white !important;
  transition: all 0.3s ease !important;
}

:deep(.v-btn:hover) {
  background-color: white !important;
  color: #9a1915 !important;
  border: 2px solid #9a1915 !important;
}

/* Remove old button styles */
.clickable-btn {
  pointer-events: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.v-btn.v-btn--variant-outlined {
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Button styles */
.v-btn {
  background-color: #9a1915 !important;
  color: white !important;
  transition: all 0.3s ease !important;
}

.v-btn:hover {
  background-color: white !important;
  color: #9a1915 !important;
  border: 2px solid #9a1915 !important;
}
</style>
