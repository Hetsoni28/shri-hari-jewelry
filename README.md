<div align="center">
  <img src="public/images/og-image.svg" alt="Shri Hari Jewellers Logo" width="200" />
  <h1>Shri Hari Jewellers</h1>
  <p><strong>Exquisite Precious Masterpieces Crafted For Generations.</strong></p>
  <p>An enterprise-grade luxury e-commerce platform for fine jewelry, built with modern web technologies to deliver a premium shopping experience.</p>

  <div>
    <a href="https://shri-hari-jewellers-eta.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Live_Preview-View_Site-goldenrod?style=for-the-badge&logo=vercel" alt="Live Preview" /></a>
  </div>
</div>

---

## ✨ Features

- **Enterprise-Grade Dynamic Pricing**: Live integration with real-time Gold (24KT, 22KT, 18KT) & Silver market rates to dynamically calculate and update jewelry prices on the fly without storing fixed selling prices.
- **Premium Design System**: Tailored luxury aesthetics, smooth micro-animations powered by Framer Motion, and a highly responsive, modern interface.
- **Dynamic Content Management**: Fully powered by Sanity CMS, allowing seamless updates to products, categories (including bespoke segments like Antique and Diamond), and collections.
- **WhatsApp Commerce Integration**: Direct-to-WhatsApp purchasing flow, embedding dynamic pricing and product specifics right into the message.
- **Catalog PDF Generation**: Instant generation of branded, high-quality PDF catalogs using `@react-pdf/renderer`.
- **Intelligent Wishlist**: Persistent client-side state management for saving and curating favorite pieces.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **CMS (Headless)**: [Sanity](https://www.sanity.io/)
- **Deployment**: [Vercel](https://vercel.com/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.17 or later) and npm/yarn/pnpm installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hetsoni28/shri-hari-jewelry.git
   cd shri-hari-jewelry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root of your project and add your Sanity environment variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-06-08"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗃️ CMS Structure (Sanity)

To manage your inventory, categories, and site data, log in to your Sanity Studio. 
The database is structured to calculate prices based on:
- `netWeight` (e.g. 45g)
- `makingCharge` (Flat Amount or Per Gram)
- `metalType` (Gold or Silver)

Access your studio locally (when the dev server is running) at `http://localhost:3000/studio` or via your deployed production link.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. 

Make sure to add your `NEXT_PUBLIC_SANITY_...` variables to your Vercel Environment Settings before deploying.

---
<div align="center">
  <p>Built with precision and elegance for <b>Shri Hari Jewellers</b>.</p>
</div>
