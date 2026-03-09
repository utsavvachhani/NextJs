# 🚀 Premium Authentication UI System for Next.js

A high-end, production-ready authentication UI library featuring 10 unique designs built with Next.js 15+, Tailwind CSS 4, Framer Motion, and TypeScript.

## ✨ Features

- **10 Unique UI Designs:** Simple, Glassmorphism, Video Background, Animated Gradient, Split Screen, Neumorphism, Corporate Army, Dark Premium SaaS, Floating Label, and 3D Interactive.
- **Dark & Light Mode:** Seamless transition with persistent state.
- **Custom Toast System:** Multiple styles (Modern, Glass, Premium, Minimal, Slide-in).
- **Responsive Architecture:** Mobile-first designs that look stunning on all devices.
- **Functional API Routes:** Ready-to-use mock endpoints for Sign In, Sign Up, and Logout.
- **Smooth Animations:** Powered by Framer Motion for a premium feel.
- **Type-Safe:** Built entirely with TypeScript and Zod for form validation.

## 🛠️ Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Validation:** React Hook Form + Zod
- **Theming:** Next-Themes
- **Utilities:** clsx, tailwind-merge

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd 02_AuthenticationProject
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

## 📂 Folder Structure

```text
/src
  /app
    /api/auth     # Mock API endpoints
    /auth         # 10 Different UI Pages
    /dashboard    # Protected dashboard example
    layout.tsx    # Root layout with providers
    page.tsx      # Showcase homepage
  /components
    /auth         # Reusable auth components
    /toast        # Custom toast notification system
    /ui           # Base UI components (Theme Toggle, etc.)
  /data           # JSON data for UI types
  /lib            # Auth logic, toast store, and utils
  /styles         # Global CSS with Tailwind 4
  /sources        # Assets and images
```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**:

1. Push your code to GitHub.
2. Link your repository in Vercel.
3. Vercel will automatically detect Next.js and deploy.

## 📋 Copy Code Feature

Each UI page includes a "Copy Page Code" and "Download UI" button in the bottom-right corner. This allows developers to quickly integrate specific designs into their own projects.

---

Built with ❤️ by Antigravity (Senior Developer @ Google Deepmind)
