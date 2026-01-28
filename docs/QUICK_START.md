# Quick Start Guide for Authentication System

## Setup Steps

### 1. Install Dependencies ✅
```bash
npm install axios zustand
```

### 2. Create .env File

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Or create `.env` manually:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Ensure Backend is Running

Make sure your server is running on port 5000:
```bash
cd ../server
npm install
node src/server.js
# or
npm start
```

### 4. Core Files Created

The following files are now in place:

- ✅ `src/store/authStore.js` - Zustand auth state management
- ✅ `src/services/api.js` - Axios instance with interceptors
- ✅ `src/services/authService.js` - Auth API methods
- ✅ `src/hooks/useAuth.js` - Custom useAuth hook
- ✅ `src/components/auth/ProtectedRoute.jsx` - Route protection component

### 5. Implementation Tasks (Use Copilot for these)

Use the prompts from `docs/COPILOT_PROMPTS.md` to implement:

1. Update `src/pages/Login.jsx` - Add login form
2. Update `src/pages/Register.jsx` - Add registration form  
3. Update `src/components/user-dashboard/UserProfile.jsx` - Add profile view/edit
4. Update `src/routing/UserLayout.jsx` - Protect user routes
5. Update `src/routing/AdminLayout.jsx` - Protect admin routes
6. Update `src/routing/AppRouter.jsx` - Wrap routes with ProtectedRoute
7. Update `src/components/nav/NavBar.jsx` - Add logout functionality

## Documentation Files

Read these for implementation details:

- **[AUTH_SETUP.md](AUTH_SETUP.md)** - Complete auth system overview
- **[RBAC_GUIDE.md](RBAC_GUIDE.md)** - Role-based access control
- **[COPILOT_PROMPTS.md](COPILOT_PROMPTS.md)** - Ready-to-use Copilot prompts

## Key Features Implemented

✅ **JWT Authentication** - Token-based auth with 1-hour expiry
✅ **Automatic Token Refresh** - Session extends with each request
✅ **Auto-Logout** - Logs out after 1 hour of inactivity
✅ **RBAC** - Role-based access control (admin/user)
✅ **Protected Routes** - Routes require authentication and proper role
✅ **Persistent State** - Auth state persists across page refresh
✅ **Axios Interceptors** - Auto token injection and error handling
✅ **Error Handling** - Try-catch with user-friendly error messages

## Architecture Overview

```
┌─────────────────────────────────────┐
│         React Components            │
│  (Login, Register, Dashboard, etc)  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│       useAuth Hook                  │
│  (Zustand store wrapper)            │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    Zustand Auth Store               │
│  - user state                       │
│  - token management                 │
│  - auto-logout timer                │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   Auth Service (authService.js)     │
│  - register()                       │
│  - login()                          │
│  - logout()                         │
│  - updateProfile()                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    Axios Instance (api.js)          │
│  - Request interceptor              │
│  - Response interceptor             │
│  - Token injection                  │
│  - Error handling                   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    Backend API                      │
│  POST /api/auth/register            │
│  POST /api/auth/login               │
│  GET  /api/auth/me                  │
│  POST /api/auth/logout              │
│  PUT  /api/auth/profile             │
└─────────────────────────────────────┘
```

## Flow Diagram

### Login Flow
```
User enters email/password
         ↓
   Call login()
         ↓
   API call via authService
         ↓
   Axios interceptor adds token
         ↓
   Backend validates & returns token
         ↓
   Store token in Zustand + localStorage
         ↓
   Start auto-logout timer (1 hour)
         ↓
   Redirect to /user/dashboard
```

### Protected Route Flow
```
User tries to access /user/dashboard
         ↓
   ProtectedRoute checks isAuthenticated
         ↓
   If false → Redirect to /login
   If true → Check requiredRole
         ↓
   If role matches → Render component
   If not → Redirect to home
```

### Auto-Logout Flow
```
User logs in
         ↓
   Timer set for 1 hour
         ↓
   (If user makes requests)
   Timer resets with each request
         ↓
   (If user inactive for 1 hour)
   Timer expires → Auto-logout
         ↓
   Zustand state cleared
   localStorage cleared
   Redirect to /login
```

## Testing Checklist

Before moving to production:

- [ ] User can register with valid data
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong credentials
- [ ] Token is stored in localStorage
- [ ] Token is sent in Authorization header
- [ ] Protected routes redirect unauthenticated users to /login
- [ ] User dashboard shows authenticated user data
- [ ] Admin routes reject non-admin users
- [ ] Logout clears auth state
- [ ] Session expires after 1 hour of inactivity
- [ ] Active users stay logged in beyond 1 hour
- [ ] User profile can be updated
- [ ] Page refresh maintains login state

## Backend Checklist

Ensure backend has:

- [ ] JWT secret configured in .env
- [ ] Token expiry set to 1 hour
- [ ] Role field in User model
- [ ] Default role 'user' on registration
- [ ] Role middleware for admin routes
- [ ] CORS enabled for frontend URL
- [ ] Password hashing in User.js pre-save hook
- [ ] Role returned in login/register responses

See `../../server/docs/` for backend setup details.

## Troubleshooting

### "Token not being sent to backend"
- Check axios interceptor in `src/services/api.js`
- Verify token is saved in Zustand state
- Check localStorage has 'auth-storage' key

### "Login works but profile page is empty"
- Verify backend is returning user data in login response
- Check `useAuthStore` is persisting user object
- Test GET /api/auth/me endpoint

### "CORS errors"
- Ensure backend has CORS enabled
- Check VITE_API_URL in .env matches backend URL
- Verify backend listens on correct port

### "Auto-logout not working"
- Check browser console for errors
- Verify timer was set (`console.log` in startAutoLogout)
- Check localStorage has auth-storage with token

### "Protected routes not working"
- Verify ProtectedRoute component is imported correctly
- Check user has correct role in state
- Test with browser DevTools: Check auth-storage in localStorage
