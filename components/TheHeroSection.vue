
!-- components/TheHeroSection.vue -->
<template>
  <section class="hero-section">
    <!-- Background video -->
    <video
      class="hero-video"
      src="/images/14580488_1920_1080_24fps.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
    <!-- Gradient overlay for readability -->
    <div class="hero-overlay"></div>

    <!-- Foreground content -->
    <v-container class="h-100 d-flex align-center">
      <div class="content-wrapper">
        <div
          class="content-inner"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <h1 class="heading-text text-h2 mb-8">
            Ihr Partner für exklusive Weine, Spirituosen und Ausstattung
          </h1>
          <p class="body-text text-h6 mb-8">
            In unserem Showroom erleben Sie eine Auswahl feinster Tropfen und hochwertiger Präsentationslösungen, perfekt abgestimmt auf anspruchsvolle Genießer und professionelle Gastgeber.
            Ob für private Sammlungen oder gewerbliche Projekte – bei Weingeneral verbinden wir Genuss, Ästhetik und Technik auf höchstem Niveau.
          </p>
          <v-btn
            color="primary"
            size="x-large"
            class="body-text text-button"
            to="/produkte"
            v-motion
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Jetzt entdecken
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
<!--  -->
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.25) 100%);
}

.content-wrapper {
  width: 100%;
  max-width: 700px;
  position: relative;
  z-index: 2;
}

.content-inner {
  max-width: 600px;
}

.heading-text {
  color: #ffffff;
  font-weight: 800;
}

.body-text {
  color: rgba(255,255,255,0.92);
}

@media (max-width: 960px) {
  .hero-section {
    height: 100vh;
    min-height: 80vh;
  }

  .content-wrapper {
    text-align: center;
    padding: 0;
  }

  .content-inner {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 0 16px;
  }
}
</style> 