# GebetaQR — Customer-Facing Web App & Digital Menu

> **Modern Hospitality, Rooted in Tradition**  
> Commercial QR-Code Digital Menu & Food Ordering Platform for Ethiopian Hotels, Restaurants, and Cafés.

---

## Overview

This is the customer-facing frontend of **GebetaQR**, built using React, Vite, plain CSS design tokens, and modern web standards. It enables restaurant patrons to scan table QR codes and access full digital menus in their mobile browser without downloading an app or creating an account.

---

## Key Features Implemented (Phase 2)

- **Brand Design System:** Imperial Forest Green (`#143D2B`), Warm Ivory background (`#FAF8F5`), and Harvest Gold (`#C69234`), with Plus Jakarta Sans and Inter typography.
- **Demonstration Restaurant:** "Buna & Bite Kitchen" featuring authentic Ethiopian dishes (Special Shekla Tibs, Doro Wat, Beyaynetu, Tegabino Shiro), Breakfast, Specialty Coffee (Jebena Buna, Macchiato), Fresh Juices (Spris), and Desserts.
- **View-Only Mode Support:** Secondary demonstration venue (`/r/buna-view-only`) demonstrating digital menu browsing without online order dispatch.
- **Table QR Preservation:** Automatic capture of `?t=DEMO-TABLE-04` or `?table=...` parameters, preserved across browsing, cart, and order placement.
- **Food Card & Customization Modal:** Full-color imagery, dietary badges (Tsom/Vegan, House Special), required single-select and optional multi-select modifier groups, and prep notes.
- **Localized ETB Currency:** Consistent formatting in Ethiopian Birr (`formatETB`).
- **Persistent Cart:** Scoped LocalStorage storage per restaurant (`gebeta_cart_${slug}`) preventing cross-venue cart contamination.
- **Manual Payment Flow:** Clear guidance on settling payment via Cash, Telebirr, or CBE Birr directly with waitstaff upon delivery.
- **Order Confirmation & Tracker:** Simulated local order service (`GB-0101`) with clear demonstration disclaimer and live progress states (Received ➔ Preparing ➔ Served).
- **Public Product Marketing Page (`/`):** Explaining the SaaS product to Ethiopian restaurant and hotel owners, interactive mobile preview, pricing packages, and working local enquiry form.

---

## Directory Structure

```
client/
├── public/                # Static assets, SVG favicons
├── src/
│   ├── assets/            # Brand imagery
│   ├── components/
│   │   ├── common/        # Button, Badge, LoadingSpinner, EmptyState, ErrorMessage, Modal
│   │   ├── menu/          # RestaurantHeader, CategoryNav, FoodCard, FoodItemModal, SearchInput
│   │   ├── cart/          # StickyCartBar, CartItemRow
│   │   └── marketing/     # Navbar, Footer, EnquiryForm
│   ├── context/
│   │   └── CartContext.jsx# Restaurant-scoped cart state & LocalStorage sync
│   ├── data/
│   │   └── demoRestaurant.js # Realistic Ethiopian restaurant data & menu items
│   ├── pages/
│   │   ├── MarketingPage.jsx # Public SaaS homepage (/)
│   │   ├── MenuPage.jsx      # Digital Menu (/r/:restaurantSlug)
│   │   ├── CartPage.jsx      # Cart & Table Confirmation (/r/:slug/cart)
│   │   ├── OrderConfirmationPage.jsx # Order receipt (/r/:slug/order/:id)
│   │   └── NotFoundPage.jsx  # 404 handler
│   ├── services/
│   │   ├── restaurantService.js # Ready to swap to Express API in Prompt 3/4
│   │   └── orderService.js      # Local simulated order handler
│   ├── styles/
│   │   ├── tokens.css     # CSS custom properties (colors, typography, radii, shadows)
│   │   └── global.css     # CSS reset and accessibility focus rules
│   ├── utils/
│   │   ├── currency.js    # ETB currency formatting & calculations
│   │   └── idempotency.js # Order submission double-click prevention
│   ├── App.jsx            # Router and restaurant cart scope
│   └── main.jsx           # App entrypoint
├── index.html             # HTML shell with Google Fonts
├── package.json           # React 19, Vite, React Router, Lucide React
└── vite.config.js
```

---

## Running the Application Locally

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open in your browser:
   - **Marketing Landing Page:** `http://localhost:5173/`
   - **Dine-In Demo Menu (Table 04):** `http://localhost:5173/r/buna-bite?t=DEMO-TABLE-04`
   - **View-Only Demo Menu:** `http://localhost:5173/r/buna-view-only`

---

## Connecting to Future Express REST API

In subsequent prompts, the local services in `src/services/` will replace in-memory data with live REST endpoints:
- `restaurantService.getRestaurantBySlug(slug)` ➔ `GET /api/v1/public/restaurants/:slug`
- `orderService.submitDemoOrder(payload)` ➔ `POST /api/v1/public/orders`
- `orderService.getOrderById(id)` ➔ `GET /api/v1/public/orders/:id`
