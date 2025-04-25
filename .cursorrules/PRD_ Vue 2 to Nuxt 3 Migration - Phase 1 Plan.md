# **Product Requirements Document (PRD) \- UPDATE**

## **Vue 2 to Nuxt 3 Migration Project**

Document Version: 1.1 (Updated for Phase 1 Plan)  
Last Updated: April 24, 2025  
Status: Draft  
*Sections 1-4 remain largely the same as v1.0, outlining the overall goals and requirements. The key updates based on codebase analysis are reflected in the refined Phase 1 plan below.*

## **5\. Migration Strategy (Updated for Phase 1 Detail)**

### **5.1 Approach (Phase 1 Focus)**

Phase 1 focuses on **structural migration and core adaptation** with minimal code rewriting. The primary goal is to get the application running within the Nuxt 3 framework, preserving existing logic (including Vue 2 Options API) wherever possible.

**Key Principles for Phase 1:**

1. **Structure First:** Prioritize reorganizing files and directories to match Nuxt 3 conventions.  
2. **Minimal Code Change:** Only modify code when essential for compatibility with Nuxt 3 (e.g., adapting router, store, entry points). Avoid refactoring component logic (Options API to Composition API) or data fetching patterns (axios to useFetch) unless strictly necessary for basic functionality.  
3. **Leverage Nuxt Defaults:** Utilize Nuxt's built-in features like file-based routing, auto-imports, and configuration (nuxt.config.ts).  
4. **Functional Equivalence:** Ensure the core application structure boots up and basic navigation/rendering works, paving the way for full functional migration in subsequent phases.

### **5.2 Migration Path (Detailed Phase 1 Plan)**

**Phase 1: Initial Structural Migration & Core Adaptation**

* **Goal:** Create a functional Nuxt 3 application shell containing the migrated structure and core adapted services (routing, state, styles, basic plugins) from the Vue 2 codebase. Retain Options API in components.  
* **Estimated Duration:** 1-2 weeks (assuming 1-2 FTEs, complexity seems manageable).

**Detailed Steps for Phase 1:**

1. **Project Setup:**  
   * \[Task 1.1\] Create a new Nuxt 3 project: npx nuxi@latest init nuxt3-app.  
   * \[Task 1.2\] Install essential dependencies identified in package.json:  
     * Add @pinia/nuxt for state management.  
     * Add sass for SCSS support.  
     * Add contentful SDK.  
     * *Note:* Vue Router and Vuex are replaced by Nuxt's built-ins and Pinia. Vue CLI is replaced by Vite/Nitro (Nuxt defaults).  
   * \[Task 1.3\] Configure basic nuxt.config.ts.  
2. **File Structure Reorganization:**  
   * \[Task 2.1\] **Components:** Move files from src/components/ (assuming location) to the Nuxt /components/ directory. Nuxt 3 auto-imports them. Keep Options API syntax.  
   * \[Task 2.2\] **Pages (Views):** Move files from src/views/ (assuming location) to the Nuxt /pages/ directory. Rename files/folders according to Nuxt's file-based routing conventions (see Step 3). Keep Options API syntax.  
   * \[Task 2.3\] **Static Assets:** Move files from public/ (like browserconfig.xml, favicons, images not processed by build) to the Nuxt /public/ directory.  
   * \[Task 2.4\] **Build Assets:** Move files from src/assets/ (like images, fonts meant to be processed) to the Nuxt /assets/ directory.  
   * \[Task 2.5\] **Utilities:** Move src/utils.js and src/getList.js to a new Nuxt /utils/ directory. Nuxt can auto-import from here if configured, or they can be explicitly imported. *Defer refactoring getList.js data fetching logic for Phase 2\.*  
   * \[Task 2.6\] **Styles:** Move SCSS files from src/style/ to /assets/scss/.  
3. **Routing Migration (Vue Router \-\> Nuxt File-Based):**  
   * \[Task 3.1\] Analyze src/router.js. Map each route definition to the corresponding file/directory structure within /pages/.  
     * Example: { path: '/', component: Home } \-\> /pages/index.vue  
     * Example: { path: '/about', component: About } \-\> /pages/about.vue  
     * Example: { path: '/documentaries/:slug', component: DocDetail } \-\> /pages/documentaries/\[slug\].vue  
     * Example: { path: '/:catchAll(.\*)', component: NotFound } \-\> /pages/\[...slug\].vue or use Nuxt error page.  
   * \[Task 3.2\] Update \<router-link\> components to \<NuxtLink\>.  
   * \[Task 3.3\] Adapt programmatic navigation (this.$router.push) to use Nuxt's navigateTo() composable where necessary (minimal changes first).  
   * \[Task 3.4\] Address route guards if any exist in router.js by converting them to Nuxt middleware (place in /middleware/).  
4. **State Management Migration (Vuex \-\> Pinia):**  
   * \[Task 4.1\] Create a /stores/ directory.  
   * \[Task 4.2\] Analyze src/store.js. Convert the Vuex state, getters, mutations, and actions into one or more Pinia stores (e.g., /stores/main.js).  
     * State \-\> Pinia state()  
     * Getters \-\> Pinia getters  
     * Mutations/Actions \-\> Pinia actions  
   * \[Task 4.3\] Update components currently using mapState, mapGetters, mapMutations, mapActions or this.$store to use Pinia's useStore() pattern. *This might require some adaptation even with Options API.*  
5. **Global Styles Integration (SCSS):**  
   * \[Task 5.1\] Configure nuxt.config.ts to include the main SCSS entry point (e.g., /assets/scss/\_app.scss).  
     // nuxt.config.ts  
     export default defineNuxtConfig({  
       css: \['@/assets/scss/\_app.scss'\],  
       // ... other config  
     })

   * \[Task 5.2\] Ensure SCSS variables (/assets/scss/variables/) are correctly imported/available.  
6. **Plugin/Initialization Migration:**  
   * \[Task 6.1\] **Contentful:** Convert src/setupContentful.js into a Nuxt plugin in the /plugins/ directory (e.g., /plugins/contentful.client.js or /plugins/contentful.server.js or just /plugins/contentful.js depending on where it's needed). Inject the Contentful client instance if needed globally using provide.  
   * \[Task 6.2\] **Service Worker:** Convert src/registerServiceWorker.js into a client-side Nuxt plugin (/plugins/registerServiceWorker.client.js). Wrap the registration logic in a check like if (process.client && 'serviceWorker' in navigator). *Defer full PWA module integration.*  
   * \[Task 6.3\] **Main Entry (main.js):** Most logic from src/main.js (like global component registration, Vue.use()) is either handled automatically by Nuxt, moved to plugins, or configured in nuxt.config.ts. Review main.js and ensure necessary initializations are migrated to Nuxt plugins.  
7. **Configuration Migration:**  
   * \[Task 7.1\] Review vue.config.js and postcss.config.js. Migrate necessary configurations (e.g., environment variables, proxy settings, PostCSS plugins) to nuxt.config.ts. Nuxt uses Vite, so Webpack-specific configs need Vite equivalents. PostCSS is usually supported out-of-the-box or via nuxt.config.ts.  
   * \[Task 7.2\] Review public/index.html for custom meta tags, link tags, or scripts and add them to the app.head section in nuxt.config.ts.  
8. **Initial Testing & Verification:**  
   * \[Task 8.1\] Run the Nuxt development server (npm run dev).  
   * \[Task 8.2\] Verify the application builds and runs without critical errors.  
   * \[Task 8.3\] Check basic navigation between migrated pages.  
   * \[Task 8.4\] Verify global styles are applied.  
   * \[Task 8.5\] Check browser console for errors related to store access, routing, or plugins.

**Phase 1 Deliverable:** A runnable Nuxt 3 application reflecting the structure and core services of the original Vue 2 app, using the Options API, ready for detailed component-level functional testing and refactoring in Phase 2\.

*Sections 6-11 from the original PRD remain relevant for the overall project but will be executed primarily in subsequent phases after Phase 1 establishes the foundation.*