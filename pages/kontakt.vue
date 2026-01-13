<template>
  <div class="contact-page">
    <!-- Header Section -->
    <div class="page-header section-spacing-sm">
      <v-container class="content-container">
        <div class="text-center">
          <h1 class="text-h2 section-title display-font">
            <span>Kontakt</span>
          </h1>
          <p class="text-subtitle-1 base-font max-w-[700px] mx-auto text-grey-darken-1">
            Wir freuen uns darauf, von Ihnen zu hören und Sie bei der Auswahl der perfekten Weine zu beraten.
          </p>
        </div>
      </v-container>
    </div>

    <!-- Contact Section -->
    <div class="section-spacing">
      <v-container class="content-container">
        <v-row>
          <!-- Left Column - Contact Form -->
          <v-col cols="12" md="7" class="pe-md-8">
            <div class="contact-form-container">
              <h2 class="text-h4 section-title display-font">
                <span>Schreiben Sie uns</span>
              </h2>
              
              <div class="persuasive-text mb-12 base-font">
                <p class="mb-4">
                  Ob Sie auf der Suche nach dem perfekten Wein für einen besonderen Anlass sind, 
                  eine individuelle Weinberatung wünschen oder Fragen zu unseren exklusiven Weinen haben – 
                  wir sind für Sie da.
                </p>
                <p>
                  Unser erfahrenes Team antwortet in der Regel innerhalb von 24 Stunden und 
                  freut sich darauf, Sie persönlich zu beraten.
                </p>
              </div>

              <v-form ref="form" v-model="isFormValid" @submit.prevent="handleSubmit">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.name"
                      :rules="[rules.required]"
                      label="Name*"
                      variant="outlined"
                      class="base-font"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      :rules="[rules.required, rules.email]"
                      label="E-Mail*"
                      variant="outlined"
                      class="base-font"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.phone"
                      label="Telefon (optional)"
                      variant="outlined"
                      class="base-font"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.message"
                      :rules="[rules.required]"
                      label="Ihre Nachricht*"
                      variant="outlined"
                      rows="5"
                      class="base-font"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <p class="text-caption mb-6 text-grey-darken-1">* Pflichtfelder</p>
                    <v-btn
                      type="submit"
                      color="primary"
                      size="x-large"
                      :loading="isSubmitting"
                      :disabled="!isFormValid"
                      class="display-font"
                      v-motion
                      :initial="{ y: 20, opacity: 0 }"
                      :enter="{ y: 0, opacity: 1 }"
                    >
                      Nachricht senden
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-col>

          <!-- Right Column - Additional Info -->
          <v-col cols="12" md="5">
            <div class="contact-info-container pl-md-8">
              <div class="info-box p-8 rounded-lg mb-8" style="background-color: #F8F8F8;">
                <h3 class="text-h4 section-title display-font">
                  <span >Warum uns kontaktieren?</span>
                </h3>
                <ul class="benefit-list base-font">
                  <li class="mb-4 d-flex align-start">
                    <v-icon color="primary" class="me-4 mt-1">mdi-check-circle</v-icon>
                    <span>Persönliche Weinberatung von erfahrenen Experten</span>
                  </li>
                  <li class="mb-4 d-flex align-start">
                    <v-icon color="primary" class="me-4 mt-1">mdi-check-circle</v-icon>
                    <span>Maßgeschneiderte Empfehlungen für Ihren Geschmack</span>
                  </li>
                  <li class="mb-4 d-flex align-start">
                    <v-icon color="primary" class="me-4 mt-1">mdi-check-circle</v-icon>
                    <span>Schnelle und kompetente Antworten auf Ihre Fragen</span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="primary" class="me-4 mt-1">mdi-check-circle</v-icon>
                    <span>Individuelle Beratung für besondere Anlässe</span>
                  </li>
                </ul>
              </div>

              <div class="contact-details base-font mb-8">
                <h3 class="text-h5 mb-4 display-font">Kontaktinformationen</h3>
                <div class="contact-info">
                  <p class="mb-2">
                    <strong>Geschmacksdestille UG (haftungsbeschränkt)</strong>
                  </p>
                  <p class="mb-2">Dammtordamm 2</p>
                  <p class="mb-2">20354 Hamburg</p>
                  <p class="mb-2">
                    <v-icon color="primary" size="small" class="me-2">mdi-phone</v-icon>
                    Tel.: +49 151 235 396 36
                  </p>
                  <p class="mb-4">
                    <v-icon color="primary" size="small" class="me-2">mdi-email</v-icon>
                    E-Mail: <a href="mailto:info@geschmacksdestille.de" class="text-primary">info@geschmacksdestille.de</a>
                  </p>
                </div>
              </div>

              <div class="trust-indicators base-font">
                <p class="mb-4">
                  <v-icon color="primary" class="me-2">mdi-clock-outline</v-icon>
                  Antwort innerhalb von 24 Stunden
                </p>
                <p>
                  <v-icon color="primary" class="me-2">mdi-shield-check</v-icon>
                  Ihre Daten werden vertraulich behandelt
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card class="pa-6">
        <div class="text-center">
          <v-icon color="primary" size="48" class="mb-4">mdi-check-circle</v-icon>
          <h3 class="text-h5 mb-4 display-font">Nachricht gesendet!</h3>
          <p class="base-font mb-6">Vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden.</p>
          <v-btn
            color="primary"
            @click="showSuccessDialog = false"
            class="display-font"
          >
            Schließen
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="showErrorDialog" max-width="400">
      <v-card class="pa-6">
        <div class="text-center">
          <v-icon color="error" size="48" class="mb-4">mdi-alert-circle</v-icon>
          <h3 class="text-h5 mb-4 display-font">Fehler</h3>
          <p class="base-font mb-6">{{ errorMessage }}</p>
          <v-btn
            color="primary"
            @click="showErrorDialog = false"
            class="display-font"
          >
            Schließen
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useContact } from '~/composables/useContact';

const route = useRoute();

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const form = ref(null);
const isFormValid = ref(false);
const showSuccessDialog = ref(false);
const showErrorDialog = ref(false);
const errorMessage = ref('');

const { submitContactForm, isSubmitting } = useContact();

const rules = {
  required: (v: string) => !!v || 'Dieses Feld ist erforderlich',
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(v) || 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
  }
};

onMounted(() => {
  // If coming from a product page, pre-fill the message
  if (route.query.type === 'inquiry' && route.query.product) {
    const message = typeof route.query.message === 'string' ? route.query.message : null;
    formData.message = message || `Ich interessiere mich für das Produkt: ${route.query.product}\n\nBitte senden Sie mir weitere Informationen.`;
  }
});

const handleSubmit = async () => {
  const formRef = form.value as any;
  const isValid = await formRef?.validate();
  
  if (isValid?.valid) {
    try {
      await submitContactForm(formData);
      
      // Reset form
      formData.name = '';
      formData.email = '';
      formData.phone = '';
      formData.message = '';
      formRef?.reset();
      
      // Show success message
      showSuccessDialog.value = true;
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage.value = 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.';
      showErrorDialog.value = true;
    }
  }
};
</script>

<style scoped>
.page-header {
  background: linear-gradient(to right, #f8f8f8, #ffffff);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.contact-form-container {
  max-width: 100%;
}

.benefit-list {
  list-style: none;
  padding: 0;
}

:deep(.v-field) {
  border-radius: 8px !important;
}

@media (max-width: 960px) {
  .contact-info-container {
    padding-left: 0 !important;
    margin-top: 2rem;
  }
}

.section-title {
  position: relative;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.title-background {
  background-color: #9a1915;
  height: 34px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.title-text {
  position: relative;
  z-index: 2;
  color: white;
}
</style>
  