# 🌙 Lumora Client

A modern eCommerce frontend built with **Next.js**, **Redux Toolkit**, **Firebase**, and **TailwindCSS**.  
Designed for performance, clean code, and smooth UI animations.

---

## 🚀 Tech Stack
- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **Redux Toolkit**
- **TailwindCSS 4**
- **Firebase**
- **GSAP** for animations
- **React Hook Form** for form handling
- **Axios** for API communication

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/lumora-client.git
cd lumora-client
npm install

# API Server
NEXT_PUBLIC_SERVER=https://example-server.com/api/v1

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_OWN_VALUE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_OWN_VALUE

📝 Notes

This project connects to the Lumora backend API (NEXT_PUBLIC_SERVER) and uses Firebase for social authentication.
Make sure your .env.local is properly configured before starting.

npm run dev

Then open your browser and go to:
👉 http://localhost:3000

💻 Author
Developed by Nashiuz Zaman