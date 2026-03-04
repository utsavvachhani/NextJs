# Fitnezz - Application Flow & Architecture

This document explains the core structure and operational flow of the **Fitnezz** application, starting from the entry point.

## 1. Root Entry Point: `app/layout.tsx`

Every page in the application is wrapped by this layout. It's responsible for setting up the foundational structure:

- **`Providers`**: Wraps the entire application with the Redux `Provider` for global state management.
- **`AuthGuard`**: A critical component that monitors the user's authentication status across all pages.
- **`CustomAlert`**: Displays global notifications (success/error) based on state.
- **`Navbar`**: The universal navigation bar.

## 2. Global State Management: `store.ts` & `action/`

The app uses **Redux Toolkit** to manage state centrally:

- **`store.ts`**: Configures the main store with `auth` and `alert` reducers.
- **`authSlice.ts`**:
  - Manages `user`, `loading`, and `isAuthenticated` state.
  - Contains **Async Thunks** (`signin`, `signup`, `fetchCurrentUser`) that call backend APIs.
- **`alertSlice.ts`**: Controls the visibility and content of the `CustomAlert` component.

## 3. The Authentication Lifecycle: `components/AuthGuard.tsx`

This component ensures the application stays secure:

1. **On Mount**: It checks if a user exists in the Redux state. If not, it dispatches `fetchCurrentUser()`.
2. **Route Protection**: It contains a list of `publicRoutes`. If a user attempts to access a route NOT in that list (like `/dashboard`) without being authenticated, it automatically redirects them back to `/signin`.

## 4. API Communication: `api/authApi.ts`

All backend communication happens here using a pre-configured **Axios Instance**:

- **Automatic Token Refresh**: The instance has a response interceptor. If a request fails with a `401 Unauthorized` (expired session), it automatically:
  1. Pauses other outgoing requests.
  2. Calls `/auth/refresh-token` to get a new session.
  3. Retries the original failed request once the session is refreshed.
  4. If refresh fails, it logs the user out and clears the local state.

## 5. Application Routing: `app/` folder

The app follows the Next.js App Router pattern:

- **Public Pages**: `/signin`, `/signup`, `/forgot-password`, and the landing page (`/`).
- **Private Pages**: `/dashboard`, `/profile`. These require a valid session and are protected by the `AuthGuard`.

---

### Execution Flow Summary:

1. **User opens the app** → `layout.tsx` loads.
2. **Redux Store initializes** via `Providers`.
3. **`AuthGuard` triggers** → Checks session via `GET /auth/me`.
4. **Backend responds** (e.g., `401 Unauthorized` because token is expired).
5. **Axios Interceptor** catches `401` → Calls `/auth/refresh-token`.
6. **Token Refreshed** → `GET /auth/me` is retried and succeeds.
7. **Redux state updates** → User is authenticated, dashboard becomes accessible.
