# Vue 2 to Nuxt 3 Migration - Phase 1 Tasks

## 1. Project Setup
- [ ] Create new Nuxt 3 project: `npx nuxi@latest init nuxt3-app`
- [ ] Install essential dependencies:
  - [ ] @pinia/nuxt
  - [ ] sass
  - [ ] contentful SDK
- [ ] Configure basic nuxt.config.ts

## 2. File Structure Reorganization
- [ ] Components
  - [ ] Move files from src/components/ to /components/
- [ ] Pages
  - [ ] Move files from src/views/ to /pages/
  - [ ] Rename files/folders according to Nuxt routing conventions
- [ ] Static Assets
  - [ ] Move files from public/ to /public/
- [ ] Build Assets
  - [ ] Move files from src/assets/ to /assets/
- [ ] Utilities
  - [ ] Move src/utils.js and src/getList.js to /utils/
- [ ] Styles
  - [ ] Move SCSS files from src/style/ to /assets/scss/

## 3. Routing Migration
- [ ] Analyze src/router.js
- [ ] Map routes to Nuxt file-based structure
- [ ] Update <router-link> to <NuxtLink>
- [ ] Adapt programmatic navigation to navigateTo()
- [ ] Convert route guards to Nuxt middleware

## 4. State Management Migration
- [ ] Create /stores/ directory
- [ ] Convert Vuex store to Pinia:
  - [ ] State → Pinia state()
  - [ ] Getters → Pinia getters
  - [ ] Mutations/Actions → Pinia actions
- [ ] Update components to use Pinia's useStore()

## 5. Global Styles Integration
- [ ] Configure nuxt.config.ts for SCSS
- [ ] Set up SCSS variables
- [ ] Verify global styles application

## 6. Plugin Migration
- [ ] Contentful
  - [ ] Convert setupContentful.js to Nuxt plugin
  - [ ] Set up client/server plugin structure
- [ ] Service Worker
  - [ ] Convert registerServiceWorker.js to client plugin
  - [ ] Add client-side checks
- [ ] Main Entry
  - [ ] Migrate main.js logic to appropriate Nuxt locations

## 7. Configuration Migration
- [ ] Migrate vue.config.js to nuxt.config.ts
- [ ] Handle PostCSS configuration
- [ ] Move HTML meta tags to app.head

## 8. Testing & Verification
- [ ] Run Nuxt dev server
- [ ] Verify build process
- [ ] Test basic navigation
- [ ] Check global styles
- [ ] Debug console errors
- [ ] Verify store functionality
- [ ] Test plugin integrations
