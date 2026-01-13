<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 base-font">{{ error }}</p>
      <v-btn 
        color="primary"
        class="mt-4 display-font"
        @click="fetchProduct"
      >
        Erneut versuchen
      </v-btn>
    </div>

    <template v-else>
      <!-- Product Header Section -->
      <div class="container-fluid">
        <div class="max-w-[1140px] mx-auto">
          <v-row>
            <!-- Left Column - Image Gallery -->
            <v-col cols="12" md="6" class="product-gallery">
              <div class="d-flex">
                <!-- Thumbnail Gallery -->
                <div class="thumbnails-container d-flex flex-column gap-4">
                  <div
                    v-for="(image, index) in product?.images"
                    :key="index"
                    class="thumbnail-wrapper"
                    @click="currentImage = image.src"
                  >
                    <v-img
                      :src="image.src"
                      :alt="'Product image ' + (index + 1)"
                      width="80"
                      height="80"
                      contain
                      class="thumbnail"
                      :class="{ 'active': currentImage === image.src }"
                    ></v-img>
                  </div>
                </div>

                <!-- Main Image -->
                <div class="main-image-container flex-grow-1">
                  <v-img
                    :src="currentImage"
                    :alt="product?.name"
                    height="600"
                    class="main-image"
                    contain
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>
              </div>
            </v-col>

            <!-- Right Column - Product Info -->
            <v-col cols="12" md="6" class="product-info pl-md-8">
              <h1 class="text-h3 mb-4 display-font">{{ product?.name }}</h1>
              
              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <span class="text-h4 font-weight-bold">{{ formatPrice(product.price) }}</span>
                  <div class="text-caption text-grey-darken-1">zzgl. MwSt.</div>
                </div>
                <v-btn
                  color="#9a1915"
                  variant="flat"
                  size="large"
                  class="px-8"
                  v-motion
                  whileHover="{ scale: 1.02 }"
                  whileTap="{ scale: 0.98 }"
                >
                  Anfragen
                </v-btn>
              </div>

              <div class="text-caption text-grey-darken-1 mt-1" v-if="product?.price">
                ({{ calculatePricePerLiter(product.price, product.meta_data) }} € / 1 L)
              </div>

              <div class="short-description base-font mb-6" v-if="product?.short_description" v-html="sanitizeHtml(product.short_description)"></div>

              <v-btn
                color="primary"
                size="x-large"
                block
                class="inquiry-btn display-font mb-12"
                :to="{ 
                  path: '/kontakt',
                  query: { 
                    product: product?.name,
                    type: 'inquiry',
                    message: `Ich interessiere mich für ${product?.name}.\n\nPreis: ${formatPrice(product?.price)}\n\nBitte senden Sie mir weitere Informationen zu diesem Produkt.`
                  }
                }"
                v-motion
                whileHover="{ scale: 1.02 }"
                whileTap="{ scale: 0.98 }"
              >
                Jetzt anfragen
              </v-btn>

              <!-- Product Details Tabs -->
              <div class="product-tabs-section">
                <v-tabs
                  v-model="activeTab"
                  color="primary"
                  class="product-tabs mb-8"
                >
                  <v-tab value="description" class="display-font text-h6 px-0 me-8">Beschreibung</v-tab>
                  <v-tab value="details" class="display-font text-h6 px-0">Produktdetails</v-tab>
                </v-tabs>

                <v-window v-model="activeTab">
                  <v-window-item value="description">
                    <div class="base-font product-description" v-if="product?.description" v-html="sanitizeHtml(product.description)"></div>
                  </v-window-item>

                  <v-window-item value="details">
                    <div class="product-details">
                      <table class="details-table w-100" v-if="product?.attributes?.length">
                        <tbody>
                          <tr v-for="attr in product.attributes" :key="attr.id" class="details-row">
                            <td class="py-3 pr-8 base-font">{{ attr.name }}</td>
                            <td class="py-3 base-font">{{ attr.options.join(', ') }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </v-window-item>
                </v-window>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWooCommerce } from '~/composables/useWooCommerce';
import DOMPurify from 'isomorphic-dompurify';

const route = useRoute();
const { getProduct } = useWooCommerce();

const product = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const currentImage = ref('');
const activeTab = ref('description');

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const slug = route.params.slug as any;
    product.value = await getProduct(slug);
    if (product.value?.images?.[0]?.src) {
      currentImage.value = product.value.images[0].src;
    }
  } catch (e) {
    error.value = 'Fehler beim Laden des Produkts. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching product:', e);
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(parseFloat(price));
};

const calculatePricePerLiter = (price: string, metaData: any[]) => {
  // Find volume in meta_data and calculate price per liter
  const volume = 0.75; // Default to 0.75L if not found
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) return '0.00';
  return (priceNumber / volume).toFixed(2);
};

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: []
  });
};

const handleInquiry = (product: any) => {
  // TODO: Implement inquiry functionality
  console.log('Inquiry for product:', product);
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.max-w-\[1140px\] {
  max-width: 1140px;
}

.gallery-container {
  position: relative;
  width: 100%;
}

.product-gallery {
  position: relative;
}

.thumbnails-container {
  width: 80px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-height: 600px;
}

.thumbnails-container::-webkit-scrollbar {
  display: none;
}

.thumbnail-wrapper {
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail {
  opacity: 0.7;
  transition: all 0.3s ease;
  object-fit: contain;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid var(--v-primary-base);
}

.thumbnail-wrapper:hover .thumbnail:not(.active) {
  opacity: 0.9;
}

.main-image-container {
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}

.main-image {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-info {
  height: 100%;
}

.inquiry-btn {
  height: 56px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}

.details-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.details-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.details-row:last-child {
  border-bottom: none;
}

.details-table td:first-child {
  font-weight: 500;
  color: #000000;
  width: 240px;
}

.details-table td {
  vertical-align: top;
  line-height: 1.6;
}

.product-tabs-section {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 2rem;
}

.product-tabs {
  position: relative;
  border: none;
}

:deep(.v-tab) {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-weight: 500;
  opacity: 0.7;
  transition: all 0.3s ease;
  min-width: unset;
}

:deep(.v-tab--selected) {
  color: #000000 !important;
  opacity: 1;
}

:deep(.v-tab:hover) {
  opacity: 1;
}

:deep(.v-tabs__bar) {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.product-description {
  max-width: 800px;
  line-height: 1.8;
  color: #333333;
}

:deep(.product-description p) {
  margin-bottom: 1.5rem;
}

:deep(.product-description h1),
:deep(.product-description h2),
:deep(.product-description h3) {
  font-family: var(--font-family-base);
  margin: 2.5rem 0 1.5rem;
  color: #000000;
}

@media (max-width: 960px) {
  .gallery-container {
    flex-direction: column-reverse;
  }

  .thumbnails-container {
    width: 100%;
    flex-direction: row !important;
    max-height: none;
    overflow-x: auto;
  }

  .thumbnail-wrapper {
    flex: 0 0 80px;
  }

  .main-image-container {
    margin-bottom: 16px;
  }
}
</style> 