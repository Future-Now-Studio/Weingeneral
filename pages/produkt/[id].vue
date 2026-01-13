<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container d-flex justify-center align-center min-h-[400px]">
      <v-progress-circular 
        indeterminate 
        color="primary" 
        size="64"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 500 } }"
      ></v-progress-circular>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <v-alert 
        type="error" 
        class="mb-4"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >{{ error }}</v-alert>
      <v-btn 
        color="primary" 
        @click="fetchProduct"
        v-motion
        whileHover="{ scale: 1.05 }"
        whileTap="{ scale: 0.95 }"
      >Erneut versuchen</v-btn>
    </div>

    <template v-else>
      <v-container class="py-16">
        <v-row>
          <!-- Product Images -->
          <v-col cols="12" md="6" class="product-gallery">
            <div class="d-flex gap-4">
              <!-- Thumbnail Gallery -->
              <div class="thumbnails-container d-flex flex-column gap-4">
                <div
                  v-for="(image, index) in product.images"
                  :key="index"
                  class="thumbnail-wrapper"
                  @click="currentImage = image.src"
                  v-motion
                  :initial="{ opacity: 0, x: -20 }"
                  :enter="{ opacity: 1, x: 0, transition: { delay: index * 100 } }"
                  whileHover="{ scale: 1.05 }"
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
                  :alt="product.name"
                  height="600"
                  class="main-image"
                  contain
                  v-motion
                  :initial="{ opacity: 0, scale: 0.95 }"
                  :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
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

          <!-- Product Info -->
          <v-col cols="12" md="6" class="product-info pl-md-8">
            <div class="product-content">
              <h1 
                class="text-h3 mb-6 display-font"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
              >{{ product.name }}</h1>
              
              <div 
                class="price-container mb-6"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              >
                <div class="d-flex align-center">
                  <span class="text-h4 font-weight-medium display-font mr-2">{{ formatPrice(product.price) }}</span>
                  <span class="text-caption text-grey-darken-1">zzgl. MwSt.</span>
                </div>
                <div class="text-caption text-grey-darken-1 mt-1" v-if="product.price">
                  ({{ calculatePricePerLiter(product.price, product.meta_data) }} € / 1 L)
                </div>
              </div>

              <div 
                class="short-description base-font mb-8" 
                v-if="product.short_description" 
                v-html="sanitizeHtml(product.short_description)"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              ></div>

              <v-btn
                color="error"
                size="x-large"
                block
                class="inquiry-btn display-font mb-12"
                :to="{ 
                  path: '/kontakt',
                  query: { 
                    product: product.name,
                    type: 'inquiry',
                    message: `Ich interessiere mich für ${product.name}.\n\nPreis: ${formatPrice(product.price)}\n\nBitte senden Sie mir weitere Informationen zu diesem Produkt.`
                  }
                }"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
                whileHover="{ scale: 1.02 }"
                whileTap="{ scale: 0.98 }"
              >
                Jetzt anfragen
              </v-btn>

              <!-- Product Details Tabs -->
              <div 
                class="product-tabs-section"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
              >
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
                    <div class="base-font product-description" v-if="product.description" v-html="sanitizeHtml(product.description)"></div>
                  </v-window-item>

                  <v-window-item value="details">
                    <div class="product-details">
                      <table class="details-table w-100" v-if="product.attributes?.length">
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
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';
import DOMPurify from 'isomorphic-dompurify';

const { getProduct } = useWooCommerce();
const route = useRoute();
const product = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const currentImage = ref('');
const activeTab = ref('description');

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    product.value = await getProduct(Number(id));
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

// Add watch for route changes
watch(() => route.params.id, () => {
  fetchProduct();
});

onMounted(() => {
  if (!product.value) {
    fetchProduct();
  }
});

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
  const pricePerLiter = priceNumber / volume;
  return pricePerLiter.toFixed(2);
};

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: []
  });
};

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.product-detail-page {
  background-color: #fafafa;
}

.loading-container {
  min-height: 400px;
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
  border-radius: 8px;
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

.thumbnail-wrapper:hover .thumbnail,
.thumbnail-wrapper .thumbnail.active {
  opacity: 1;
}

.main-image-container {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}

.main-image {
  transition: transform 0.3s ease;
  object-fit: contain;
}

.main-image:hover {
  transform: scale(1.02);
}

.product-info {
  position: relative;
}

.product-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.price-container {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.inquiry-btn {
  height: 56px !important;
  font-size: 1.1rem !important;
  letter-spacing: 0.5px;
  border-radius: 12px;
  text-transform: none;
}

.product-tabs {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.product-description {
  line-height: 1.8;
  color: #4a4a4a;
}

.details-table {
  border-collapse: separate;
  border-spacing: 0 8px;
}

.details-row td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.details-row:last-child td {
  border-bottom: none;
}

:deep(.product-description p) {
  margin-bottom: 1rem;
}

:deep(.product-description p:last-child) {
  margin-bottom: 0;
}

:deep(.product-description ul) {
  margin: 1rem 0 1rem 1.5rem;
}

:deep(.product-description li) {
  margin-bottom: 0.5rem;
}

:deep(.product-description strong) {
  color: #1d1d1f;
  font-weight: 600;
}

:deep(.product-description em) {
  font-style: italic;
}

@media (max-width: 960px) {
  .product-content {
    padding: 1.5rem;
  }

  .main-image {
    height: 400px !important;
  }

  .thumbnails-container {
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  .product-content {
    padding: 1rem;
  }

  .main-image {
    height: 300px !important;
  }

  .thumbnails-container {
    max-height: 300px;
  }

  .inquiry-btn {
    height: 48px !important;
  }
}
</style> 