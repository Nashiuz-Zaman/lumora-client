# 🌙 Lumora Client

A modern eCommerce frontend built with **Next.js**, **Redux Toolkit**, **Firebase**, and **TailwindCSS** — designed for performance, scalability, and a clean, fluid UI experience.

---

## 🚀 Tech Stack

- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **Redux Toolkit**
- **TailwindCSS 4**
- **Firebase Authentication**
- **GSAP** for animations
- **React Hook Form** for powerful form handling
- **Axios** for API communication

---

## 🧩 Features

### ✅ Customer Features

- Email & social authentication (Local and Firebase Both)
- Manage profile information & shipping and billing addresses
- View all products and categories
- Filter & search products
- Detailed product pages with reviews & related products
- Add to cart & place orders
- Cancel orders, request returns
- Write reviews on products
- Customer dashboard with:
  - Order history
  - Filter & search own orders
  - Order tracking
  - Invoice download

---

### 🛠️ Admin Features

- Admin dashboard
- **Advanced analytics**, including:
- Total Revenue
- Average Order Total
- Total Customers
- Total Products Sold
- Completed / Cancelled / Returned orders breakdown
- Sales Breakdown by Category
- Placed vs Cancelled Orders Chart
- Payment vs Refund Comparison
- Revenue Growth
- Customer Growth
- **Payment & Refund Management**
- Issue full or partial refunds
- View transaction history (payments & refunds)
- **Product Management**
- Create new products
- Edit existing products
- Manage variations
- Clone products
- Manage product collections on homepage (CMS)
- **Coupon System**
- Create & edit coupons
- Percentage or flat discount
- Expiration date
- Usage limits
- **Order Management**
- Manage all orders
- Update order statuses (Processing → Shipped → Delivered → Returned → Cancelled)
- Review customer order requests and accept or reject based on admin judgment

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Nashiuz-Zaman/lumora-client.git
cd lumora-client
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create `.env.local` in the project root:

```env
# API Server
NEXT_PUBLIC_SERVER=https://example-server.com/api/v1

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_OWN_VALUE
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Open your browser:  
🔗 **http://localhost:3000**

---

## 📝 Notes

- This project connects to the **Lumora backend API** (`NEXT_PUBLIC_SERVER`).
- Firebase handles **Google & social logins**.
- Ensure your `.env.local` is properly configured before running the app.

---

## 💻 Author

Developed by **Nashiuz Zaman**
