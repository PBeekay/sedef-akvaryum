# Sedef Akvaryum - Next.js Migration & Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Sedef Akvaryum from Create React App (CRA) to Next.js App Router, implement a modern minimalist water-themed storefront UI, break down the monolithic 2,720-line AdminPage into modular routes, and ensure zero-downtime deployment compatibility with Render.

**Architecture:** Next.js App Router with Route Groups `(shop)` and `(admin)`. Server Components for fast initial loads, dynamic OpenGraph metadata generation for WhatsApp sharing, `next/image` for image optimization, and Firebase Client SDK for real-time Firestore updates and Auth.

**Tech Stack:** Next.js 15 / 14, React 18/19, TypeScript, Tailwind CSS, Lucide React, Firebase 10.x (Auth, Firestore, Storage).

**Spec:** [docs/superpowers/specs/2026-10-09-nextjs-migration-and-redesign-design.md](file:///c:/Users/Berkay/sedef-akvaryum/docs/superpowers/specs/2026-10-09-nextjs-migration-and-redesign-design.md)

## Global Constraints
- Target platform: Render Web Service (Node.js runtime, `npm run build` and `npm start`).
- Environment variables must use `NEXT_PUBLIC_` prefix for client-accessible Firebase config.
- Existing Firestore collections (`products`, `sliders`) and data schemas must remain 100% backward compatible without data loss.
- Zero TypeScript or lint errors allowed during `npm run build`.
- No broken links or dead routes: keep canonical routes `/category/[slug]`, `/product/[id]`, `/admin/...` and Turkish aliases (`/balik`, `/karides`, etc.).

---

### Task 1: Next.js Foundation & Dependencies Setup

**Files:**
- Modify: `package.json`
- Create: `next.config.mjs`
- Modify: `tsconfig.json`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Working Next.js project configuration and scripts (`npm run dev`, `npm run build`, `npm run start`).

- [ ] **Step 1: Update dependencies in package.json**
Add `next`, `lucide-react`, update `@types/react` and `@types/react-dom`, and update scripts to use `next dev`, `next build`, and `next start`. Remove `react-scripts`.

- [ ] **Step 2: Create next.config.mjs**
Configure image domains for Firebase Storage (`firebasestorage.googleapis.com`) and static rewrites/redirects for Turkish category slugs (`/balik` -> `/category/fish`, `/karides` -> `/category/shrimp`, etc.).

- [ ] **Step 3: Update tsconfig.json**
Configure path aliases (`@/*` pointing to `./*`), `jsx: "preserve"`, and Next.js plugin entries.

- [ ] **Step 4: Install packages and test Next.js CLI**
Run `npm install` and verify `npx next --version`.

- [ ] **Step 5: Commit**
```bash
git add package.json package-lock.json next.config.mjs tsconfig.json .gitignore
git commit -m "chore: setup Next.js foundation and dependencies"
```

---

### Task 2: Core Types & Firebase Client Services

**Files:**
- Create: `types/product.ts`
- Create: `types/slider.ts`
- Create: `types/stock.ts`
- Create: `lib/firebase/client.ts`
- Create: `lib/firebase/services.ts`
- Create: `lib/data/products.ts` (port existing fallback data)

**Interfaces:**
- Produces:
  - `Product`, `SliderData`, `StockItem` types.
  - `getProducts()`, `getProductById(id: string)`, `getSliders()`, `updateStockQuantity(id: string, qty: number)` service methods.
  - Firebase instances: `db`, `auth`, `storage`.

- [ ] **Step 1: Define TypeScript models**
Create `types/product.ts`, `types/slider.ts`, and `types/stock.ts` keeping all fields for fish water parameters, care guides, plant lighting, and stock thresholds.

- [ ] **Step 2: Configure lib/firebase/client.ts**
Initialize Firebase using `NEXT_PUBLIC_FIREBASE_*` environment variables with graceful fallback for local development.

- [ ] **Step 3: Implement lib/firebase/services.ts**
Implement typed Firestore queries for fetching products, filtering by category, listening to real-time changes with `onSnapshot`, and performing CRUD operations.

- [ ] **Step 4: Port fallback product data to lib/data/products.ts**
Move and adapt existing `src/data/products.ts` so the application can render smoothly even if Firebase credentials are temporarily unconfigured.

- [ ] **Step 5: Verify types and imports**
Run `npx tsc --noEmit` to verify all types pass without errors.

- [ ] **Step 6: Commit**
```bash
git add types/ lib/
git commit -m "feat(core): add TypeScript models, fallback data, and Firebase services"
```

---

### Task 3: Base Layout & Design System Components

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Modal.tsx`
- Create: `components/ui/Toast.tsx`

**Interfaces:**
- Produces: Base HTML shell, Google Inter font, Tailwind Aqua/Glass utility classes, and reusable atomic UI primitives.

- [ ] **Step 1: Create app/globals.css**
Include Tailwind directives, glassmorphism utilities (`.glass-nav`, `.glass-card`), subtle aqua gradients, and smooth page transition keyframes.

- [ ] **Step 2: Create root app/layout.tsx**
Setup root `<html>` and `<body>` with metadata template, responsive viewport, and Inter font.

- [ ] **Step 3: Build components/ui primitives**
Create `Button.tsx` (variants: aqua-primary, outline, ghost, danger), `Badge.tsx`, `Modal.tsx`, and `Toast.tsx` with clean accessibility.

- [ ] **Step 4: Verify build with tsc**
Run `npx tsc --noEmit`.

- [ ] **Step 5: Commit**
```bash
git add app/globals.css app/layout.tsx components/ui/
git commit -m "feat(ui): add global layout and atomic UI design components"
```

---

### Task 4: Storefront Shell & Navigation

**Files:**
- Create: `app/(shop)/layout.tsx`
- Create: `components/shop/Navbar.tsx`
- Create: `components/shop/Footer.tsx`
- Create: `components/shop/WhatsAppButton.tsx`

**Interfaces:**
- Produces: Storefront shell wrapping all public routes with frosted glass Navbar, corporate footer, and floating WhatsApp contact button.

- [ ] **Step 1: Create components/shop/Navbar.tsx**
Implement sticky glass navbar with logo, 6 main category quick links (`Balıklar`, `Karidesler`, `Bitkiler`, `Ekipmanlar`, `Sağlık & Bakım`, `Yemler`), search input trigger, and responsive mobile menu drawer.

- [ ] **Step 2: Create components/shop/Footer.tsx**
Implement modern footer with store address in Eskişehir, working hours, phone, WhatsApp direct link, and legal info.

- [ ] **Step 3: Create components/shop/WhatsAppButton.tsx**
Implement floating WhatsApp badge with customizable pre-filled message, pulse animation, and direct click handling (`https://wa.me/905059288126`).

- [ ] **Step 4: Create app/(shop)/layout.tsx**
Wire up Navbar, main content wrapper, Footer, and floating WhatsAppButton.

- [ ] **Step 5: Commit**
```bash
git add app/\(shop\)/layout.tsx components/shop/
git commit -m "feat(shop): implement storefront navigation shell and WhatsApp integration"
```

---

### Task 5: Storefront Home Page & Panoramik Hero Slider

**Files:**
- Create: `app/(shop)/page.tsx`
- Create: `components/shop/HeroSlider.tsx`
- Create: `components/shop/ProductCard.tsx`
- Create: `components/shop/ReviewsSection.tsx`

**Interfaces:**
- Produces: Fresh, high-converting home page featuring panoramic slider, category showcase tabs (Öne Çıkanlar / Yeni Gelenler), and Google Reviews.

- [ ] **Step 1: Create components/shop/HeroSlider.tsx**
Build panoramic slide banner with auto-play, left/right navigation, campaign badge, discount tag, and call-to-action button linking directly to category or WhatsApp.

- [ ] **Step 2: Create components/shop/ProductCard.tsx**
Build modern product card with `next/image`, water parameter chips (Sıcaklık, pH, Bakım Seviyesi), in-stock badge, and single-click "WhatsApp ile Sipariş Ver" action.

- [ ] **Step 3: Create components/shop/ReviewsSection.tsx**
Build Google customer reviews testimonial carousel with verified buyer badges and star ratings.

- [ ] **Step 4: Assemble app/(shop)/page.tsx**
Fetch sliders and featured products from Firebase/fallback data and render the full home experience.

- [ ] **Step 5: Commit**
```bash
git add app/\(shop\)/page.tsx components/shop/HeroSlider.tsx components/shop/ProductCard.tsx components/shop/ReviewsSection.tsx
git commit -m "feat(shop): create modern home page with panoramic hero and product showcase"
```

---

### Task 6: Category & Search Pages

**Files:**
- Create: `app/(shop)/category/[slug]/page.tsx`
- Create: `app/(shop)/search/page.tsx`
- Create: `components/shop/FilterSidebar.tsx`

**Interfaces:**
- Produces: Dynamic category catalog with live parameter filtering and smart keyword search page.

- [ ] **Step 1: Create components/shop/FilterSidebar.tsx**
Build responsive filter drawer/sidebar for filtering by sub-category, difficulty, water requirements, and price range.

- [ ] **Step 2: Create app/(shop)/category/[slug]/page.tsx**
Handle dynamic category slugs (`fish`, `shrimp`, `plants`, `equipment`, `accessories`, `food`). Include dynamic title generation and empty-state handling.

- [ ] **Step 3: Create app/(shop)/search/page.tsx**
Implement client-side and query-based product search with highlight and instant results.

- [ ] **Step 4: Commit**
```bash
git add app/\(shop\)/category/ app/\(shop\)/search/ components/shop/FilterSidebar.tsx
git commit -m "feat(shop): implement dynamic category catalog and live search"
```

---

### Task 7: Product Detail Page & Server-Side OpenGraph Metadata

**Files:**
- Create: `app/(shop)/product/[id]/page.tsx`
- Create: `components/shop/ProductGallery.tsx`
- Create: `components/shop/WaterParametersTable.tsx`

**Interfaces:**
- Produces: High-converting product detail page with dynamic `generateMetadata()` for instant WhatsApp OpenGraph previews and care guides.

- [ ] **Step 1: Implement generateMetadata() in product page**
Export Next.js `generateMetadata({ params })` to fetch product data and populate `title`, `description`, and `openGraph.images` so WhatsApp link sharing displays rich preview cards.

- [ ] **Step 2: Create components/shop/ProductGallery.tsx**
Build image thumbnail gallery with zoom/preview support using `next/image`.

- [ ] **Step 3: Create components/shop/WaterParametersTable.tsx**
Build parameter table for fish/shrimp (sıcaklık, pH, sertlik, akvaryum hacmi, beslenme) and plant requirements (ışık, CO2, büyüme hızı).

- [ ] **Step 4: Assemble app/(shop)/product/[id]/page.tsx**
Assemble gallery, parameters table, stock status, and direct WhatsApp order button with pre-formatted product message.

- [ ] **Step 5: Commit**
```bash
git add app/\(shop\)/product/ components/shop/ProductGallery.tsx components/shop/WaterParametersTable.tsx
git commit -m "feat(shop): implement product detail page with server-side OpenGraph metadata"
```

---

### Task 8: Admin Authentication & Shell Layout

**Files:**
- Create: `app/(admin)/admin/layout.tsx`
- Create: `app/(admin)/admin/login/page.tsx`
- Create: `components/admin/AdminSidebar.tsx`
- Create: `lib/firebase/auth.ts`

**Interfaces:**
- Produces: Secure admin layout with Firebase Auth session validation, protected routes, and sleek dark/glass sidebar.

- [ ] **Step 1: Create lib/firebase/auth.ts**
Implement helper functions for `loginWithEmail(email, password)`, `logoutAdmin()`, and `useAdminAuth()` hook checking admin email authorization.

- [ ] **Step 2: Create app/(admin)/admin/login/page.tsx**
Build modern, secure login form with error alerts and redirect upon successful login.

- [ ] **Step 3: Create components/admin/AdminSidebar.tsx**
Build collapsible admin sidebar with links to Dashboard, Ürünler, Stok, Slider, and Logout button.

- [ ] **Step 4: Create app/(admin)/admin/layout.tsx**
Wrap admin pages with auth guard: redirect unauthorized users to `/admin/login`, render sidebar and header for authenticated admins.

- [ ] **Step 5: Commit**
```bash
git add app/\(admin\)/ components/admin/AdminSidebar.tsx lib/firebase/auth.ts
git commit -m "feat(admin): build admin authentication guard, login, and sidebar layout"
```

---

### Task 9: Modular Admin Dashboard & Fast Stock Management

**Files:**
- Create: `app/(admin)/admin/page.tsx`
- Create: `app/(admin)/admin/stock/page.tsx`
- Create: `components/admin/StockRow.tsx`

**Interfaces:**
- Produces: Executive dashboard and high-speed stock updating interface replacing the stock section of the old 2,720-line AdminPage.

- [ ] **Step 1: Create app/(admin)/admin/page.tsx (Dashboard)**
Display summary metric cards: Total Products, Low Stock Alerts, Active Hero Sliders, and quick-navigation buttons.

- [ ] **Step 2: Create components/admin/StockRow.tsx**
Build table row with inline +/- quantity adjustment buttons, stock threshold badge, and immediate Firestore/local sync.

- [ ] **Step 3: Create app/(admin)/admin/stock/page.tsx**
Build stock management view with instant filter by low stock, search by product name, and bulk status badges.

- [ ] **Step 4: Commit**
```bash
git add app/\(admin\)/admin/page.tsx app/\(admin\)/admin/stock/ components/admin/StockRow.tsx
git commit -m "feat(admin): build modular dashboard and fast stock management"
```

---

### Task 10: Modular Admin Product Management & Media Uploader

**Files:**
- Create: `app/(admin)/admin/products/page.tsx`
- Create: `components/admin/ProductFormModal.tsx`
- Create: `components/admin/ImageUploader.tsx`
- Create: `components/admin/ConfirmDeleteModal.tsx`

**Interfaces:**
- Produces: Complete, clean product CRUD view with category-specific forms and Firebase Storage uploads.

- [ ] **Step 1: Create components/admin/ImageUploader.tsx**
Build drag-and-drop / file picker uploader connecting directly to Firebase Storage with progress bar, preview, and delete capability.

- [ ] **Step 2: Create components/admin/ProductFormModal.tsx**
Build clean multi-section form with tabbed or accordion fields: General info, category-specific specs (Balık/Karides su değerleri, Bitki CO2), and image picker.

- [ ] **Step 3: Create components/admin/ConfirmDeleteModal.tsx**
Build accessible confirmation modal before deleting products.

- [ ] **Step 4: Assemble app/(admin)/admin/products/page.tsx**
Build table view with pagination, search, category filter, edit/delete actions, and "Yeni Ürün Ekle" trigger.

- [ ] **Step 5: Commit**
```bash
git add app/\(admin\)/admin/products/ components/admin/ProductFormModal.tsx components/admin/ImageUploader.tsx components/admin/ConfirmDeleteModal.tsx
git commit -m "feat(admin): build modular product management and Firebase Storage uploader"
```

---

### Task 11: Modular Admin Slider Management

**Files:**
- Create: `app/(admin)/admin/sliders/page.tsx`
- Create: `components/admin/SliderEditorModal.tsx`

**Interfaces:**
- Produces: Hero slider banner manager allowing admin to add, edit, preview, and reorder home page slides.

- [ ] **Step 1: Create components/admin/SliderEditorModal.tsx**
Form for slide title, subtitle, badge, discount tag, button text/link, and slide image upload.

- [ ] **Step 2: Create app/(admin)/admin/sliders/page.tsx**
Grid view of current active slides with preview card, edit button, and delete confirmation.

- [ ] **Step 3: Commit**
```bash
git add app/\(admin\)/admin/sliders/ components/admin/SliderEditorModal.tsx
git commit -m "feat(admin): build modular hero slider and banner manager"
```

---

### Task 12: Production Build, Cleanup & Render Verification

**Files:**
- Modify: `env.example`
- Delete/Archive legacy CRA files (`src/App.tsx`, `src/index.tsx`, `src/pages/AdminPage.tsx`, etc.)
- Verify: `npm run build`

**Interfaces:**
- Produces: Production-ready codebase with zero CRA leftovers, passes `npm run build` cleanly, and ready for Render deploy.

- [ ] **Step 1: Archive/Remove deprecated CRA files**
Safely clean up legacy `src/` files that have been superseded by the Next.js `app/` and `components/` trees.

- [ ] **Step 2: Update env.example**
Document all `NEXT_PUBLIC_FIREBASE_*` variables and Render Web Service configuration.

- [ ] **Step 3: Run production build verification**
Run `npm run build` and ensure exit code is 0 without any TypeScript or Next.js build errors.

- [ ] **Step 4: Commit and Push**
```bash
git add .
git commit -m "chore: complete Next.js migration and cleanup legacy CRA files"
git push origin main
```
