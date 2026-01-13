<script setup>
import { ref } from 'vue'
import Logo from '@/assets/WG_Logo25.svg'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isProductsMenuOpen = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})

const navItems = [
  { title: 'Startseite', to: '/' },
  { title: 'Über uns', to: '/#ueber-uns' },
  { 
    title: 'Produkte', 
    children: [
      { title: 'Wein & Schaumweine', to: '/wein-schaumweine' },
      { title: 'Spirituosen', to: '/spirituosen' },
      { title: 'Ausstattung', to: '/ausstattung' }
    ]
  },
  { title: 'Kontakt', to: '/kontakt' }
]
</script>

<template>
  <nav class="navigation" :class="{ 'scrolled': isScrolled }">
    <!-- Desktop Navigation -->
    <v-app-bar
      elevation="0"
      class="desktop-nav"
      v-motion
      :initial="{ opacity: 0, y: -100 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
    >
      <v-container class="d-flex align-center">
        <NuxtLink to="/" class="text-decoration-none">
          <img :src="Logo" alt="Logo" class="logo" />
        </NuxtLink>

        <div class="flex-grow-1 d-flex justify-center">
          <div 
            v-for="item in navItems" 
            :key="item.title"
            class="nav-item mx-6"
            v-motion
            :initial="{ opacity: 0, y: -20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            <template v-if="item.children">
              <v-menu
                v-model="isProductsMenuOpen"
                :close-on-content-click="false"
                location="bottom"
                class="products-menu"
                open-on-hover
                offset="8"
                transition="slide-y-transition"
                scrim="false"
              >
                <template v-slot:activator="{ props }">
                  <div
                    class="nav-link d-flex align-center cursor-pointer text-nav"
                    v-bind="props"
                  >
                    <span>{{ item.title }}</span>
                    <v-icon 
                      :icon="isProductsMenuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      class="ml-2"
                      size="20"
                    ></v-icon>
                  </div>
                </template>

                <v-list class="menu-list py-4 px-2" rounded="lg">
                  <v-list-item
                    v-for="child in item.children"
                    :key="child.title"
                    :to="child.to"
                    class="text-decoration-none menu-item"
                    rounded="lg"
                  >
                    <v-list-item-title class="text-nav">{{ child.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <NuxtLink 
              v-else 
              :to="item.to" 
              class="text-decoration-none text-black nav-link text-nav"
            >
              <span>{{ item.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <v-btn
          icon
          @click="isMenuOpen = !isMenuOpen"
          class="d-lg-none"
          v-motion
          whileHover="{ scale: 1.1 }"
          whileTap="{ scale: 0.9 }"
        >
          <v-icon>{{ isMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation -->
    <v-navigation-drawer
      v-model="isMenuOpen"
      temporary
      class="mobile-nav"
      v-motion
      :initial="{ x: '-100%' }"
      :enter="{ x: 0, transition: { duration: 300 } }"
    >
      <v-list class="py-4">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
          class="mobile-menu-item"
        >
          <template v-if="item.children">
            <v-list-item
              @click="isProductsMenuOpen = !isProductsMenuOpen"
              class="cursor-pointer"
            >
              <v-list-item-title class="text-nav">{{ item.title }}</v-list-item-title>
              <template v-slot:append>
                <v-icon 
                  :icon="isProductsMenuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  v-motion
                  :animate="{ rotate: isProductsMenuOpen ? 180 : 0 }"
                  transition="{ duration: 0.3 }"
                ></v-icon>
              </template>
            </v-list-item>

            <v-expand-transition>
              <v-list
                v-if="isProductsMenuOpen"
                class="pl-6"
                v-motion
                :initial="{ opacity: 0, y: -10 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
              >
                <v-list-item
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.to"
                  class="text-decoration-none mobile-submenu-item"
                  v-motion
                  whileHover="{ x: 10 }"
                  transition="{ duration: 0.2 }"
                >
                  <v-list-item-title class="text-nav">{{ child.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expand-transition>
          </template>
          <NuxtLink 
            v-else 
            :to="item.to" 
            class="text-decoration-none text-black"
            v-motion
            whileHover="{ x: 10 }"
            transition="{ duration: 0.2 }"
          >
            <v-list-item-title class="text-nav">{{ item.title }}</v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<style scoped>
.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navigation.scrolled {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo {
  height: 52px;
  width: auto;
  padding: 8px 0;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 28px;
}

.nav-link {
  position: relative;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--v-primary-base);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.text-nav {
  font-family: var(--font-family-base);
  font-size: 1.35rem;
  letter-spacing: 0.5px;
}

.products-menu {
  margin-top: 8px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.menu-item {
  padding: 16px 24px;
  transition: all 0.3s ease;
  position: relative;
  display: block;
  width: 100%;
  border-radius: 8px;
  margin: 4px 0;
}

.menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 24px;
  width: 0;
  height: 2px;
  background-color: #9a1915;
  transition: width 0.3s ease;
}

.menu-item:hover::after {
  width: calc(100% - 48px);
}

.menu-item:hover {
  background-color: rgba(154, 25, 21, 0.05);
}

.mobile-nav {
  border-radius: 0 0 0 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.mobile-menu-item {
  padding: 16px 24px;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 24px;
  width: 0;
  height: 2px;
  background-color: #9a1915;
  transition: width 0.3s ease;
}

.mobile-menu-item:hover::after {
  width: calc(100% - 48px);
}

.mobile-submenu-item {
  padding: 12px 24px;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-submenu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 24px;
  width: 0;
  height: 2px;
  background-color: #9a1915;
  transition: width 0.3s ease;
}

.mobile-submenu-item:hover::after {
  width: calc(100% - 48px);
}
.desktop-nav{
  border-bottom: solid #e4e4e4 2px;
}
@media (max-width: 960px) {
  .desktop-nav {
    display: none;
  }
}

@media (min-width: 961px) {
  .mobile-nav {
    display: none;
  }
}

:deep(.v-menu) {
  border-radius: 12px;
  z-index: 101;
}

:deep(.v-overlay__content) {
  background: transparent !important;
  box-shadow: none !important;
}

:deep(.v-overlay__scrim) {
  opacity: 0 !important;
  background-color: transparent !important;
}

.products-menu {
  background: transparent !important;
}

:deep(.menu-list) {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  min-width: 200px;
  margin-top: 8px !important;
  overflow: hidden;
}

:deep(.menu-item) {
  margin: 4px;
  transition: all 0.3s ease;
}

:deep(.menu-item:hover) {
  background-color: rgba(154, 25, 21, 0.05) !important;
  transform: translateX(4px);
}

:deep(.v-list-item-title) {
  transition: color 0.3s ease;
}

:deep(.menu-item:hover .v-list-item-title) {
  color: var(--v-primary-base) !important;
}
</style> 