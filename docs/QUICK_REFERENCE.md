# Quick Reference Card

## 🚀 Getting Started (5 minutes)

### 1. Create `.env` file
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Ensure backend is running
```bash
cd server && node src/server.js
```

### 3. Run frontend
```bash
cd client && npm run dev
```

---

## 📚 Documentation Map

| Document | Purpose | Read First? |
|----------|---------|-------------|
| **README.md** | Overview & summary | ✅ YES |
| **QUICK_START.md** | Setup & troubleshooting | ✅ YES |
| **USING_COPILOT.md** | How to use Copilot | ✅ YES |
| **COPILOT_PROMPTS.md** | Ready-to-use prompts | ✅ YES |
| **AUTH_SETUP.md** | Full auth explanation | For deep understanding |
| **RBAC_GUIDE.md** | Role-based access | For RBAC details |

---

## 💻 Implementation Checklist

### Phase 1: Authentication (Start here)
- [ ] Update `src/pages/Login.jsx` - Use prompt #1
- [ ] Update `src/pages/Register.jsx` - Use prompt #2
- [ ] Update `src/components/nav/NavBar.jsx` - Use prompt #7

### Phase 2: Route Protection
- [ ] Update `src/routing/UserLayout.jsx` - Use prompt #4
- [ ] Update `src/routing/AdminLayout.jsx` - Use prompt #5
- [ ] Update `src/routing/AppRouter.jsx` - Use prompt #6

### Phase 3: User Features
- [ ] Update `src/components/user-dashboard/UserProfile.jsx` - Use prompt #3

---

## 🎯 Core Features Already Implemented

```
✅ JWT Authentication
✅ Automatic Token Refresh
✅ 1-Hour Auto-Logout
✅ RBAC Support
✅ Protected Routes
✅ Token Persistence
✅ Error Handling
✅ Loading States
```

---

## 📂 File Structure

**Core Auth Files (Created):**
```
src/
├── store/authStore.js           ✅ Zustand state
├── services/
│   ├── api.js                   ✅ Axios with interceptors
│   └── authService.js           ✅ API methods
├── hooks/useAuth.js             ✅ Custom hook
└── components/auth/
    └── ProtectedRoute.jsx       ✅ Route protection
```

**Files to Update (7 files):**
```
src/
├── pages/
│   ├── Login.jsx                🔄 Needs update
│   └── Register.jsx             🔄 Needs update
├── components/
│   ├── nav/NavBar.jsx           🔄 Needs update
│   └── user-dashboard/
│       └── UserProfile.jsx      🔄 Needs update
└── routing/
    ├── UserLayout.jsx           🔄 Needs update
    ├── AdminLayout.jsx          🔄 Needs update
    └── AppRouter.jsx            🔄 Needs update
```

---

## 🔗 Using Copilot

**Step 1:** Open file in VS Code
**Step 2:** Open Copilot Chat: `Ctrl + Shift + I`
**Step 3:** Copy prompt from COPILOT_PROMPTS.md
**Step 4:** Paste into chat and hit Enter
**Step 5:** Review suggestions and apply

**Detailed Guide:** See `docs/USING_COPILOT.md`

---

## ⚡ Quick Hook Usage

### In Any Component:
```jsx
import { useAuth } from '../hooks/useAuth'

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, error } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.fullname}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  )
}
```

---

## 🛡️ Protected Route Usage

### In AppRouter.jsx:
```jsx
import ProtectedRoute from '../components/auth/ProtectedRoute'

<Route 
  path="/user/dashboard" 
  element={
    <ProtectedRoute 
      element={<Dashboard />} 
      requiredRole="user"
    />
  } 
/>
```

---

## 🔐 Available Auth Methods

```javascript
// useAuth() provides:

// Data
user              // { id, fullname, username, email, role }
token             // JWT token
isAuthenticated   // Boolean
isLoading         // Boolean
error             // String or null

// Methods
login()           // (email, password)
register()        // (fullname, username, email, password, repeatPassword)
logout()          // ()
updateProfile()   // (userData)
forgotPassword()  // (email)
resetPassword()   // (token, password)
clearError()      // ()
```

---

## 🧪 Quick Test Commands

### Test Login
```
1. Go to http://localhost:5173/login
2. Enter valid credentials
3. Should redirect to /user/dashboard
4. Check localStorage for auth-storage
```

### Test Protected Route
```
1. Go to http://localhost:5173/user/dashboard
2. Without login → should redirect to /login
3. After login → should show dashboard
```

### Test Auto-Logout
```
1. Open DevTools → Storage → localStorage
2. Login, note expiry time (1 hour from now)
3. Wait 1 hour of inactivity
4. Should auto-logout and redirect to /login
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Token not sending | Check api.js interceptor, verify localStorage |
| CORS error | Ensure backend CORS enabled, check API URL in .env |
| Login page blank | Check for console errors, run npm install |
| Route not protected | Verify ProtectedRoute is imported, requiredRole set |
| Auto-logout not working | Check browser console, verify timer setup |
| Profile not loading | Verify GET /api/auth/me returns user data |

See `docs/QUICK_START.md` for full troubleshooting.

---

## 📝 Checklist Before Submission

- [ ] `.env` file created with VITE_API_URL
- [ ] Backend running on port 5000
- [ ] npm run dev works without errors
- [ ] Login works with valid credentials
- [ ] Register works and creates user
- [ ] Token appears in localStorage
- [ ] Protected routes redirect when not authenticated
- [ ] User dashboard loads after login
- [ ] User profile shows correct data
- [ ] Logout clears auth state
- [ ] NavBar shows user info when logged in
- [ ] Admin routes block non-admin users
- [ ] No console errors in DevTools

---

## 🎓 Learning Resources

### Zustand
- Docs: https://github.com/pmndrs/zustand
- Focus: Persist middleware

### Axios
- Docs: https://axios-http.com/
- Focus: Interceptors

### React Router
- Docs: https://reactrouter.com/
- Focus: Protected routes

### JWT
- Docs: https://jwt.io/
- Focus: Token structure

---

## 📞 Support

1. **Error in component?** → Check console error + Network tab
2. **Copilot not working?** → Try rephrasing, add context with @mentions
3. **Backend issues?** → Check server/docs/ folder
4. **State not updating?** → Verify useAuth hook is called
5. **Still stuck?** → Review `QUICK_START.md` troubleshooting section

---

## ⏭️ Next Step

**👉 Read:** `docs/USING_COPILOT.md` for step-by-step implementation guide

**Then:** Copy first prompt from `docs/COPILOT_PROMPTS.md` and start with Login.jsx!

---

**Project Status:** Infrastructure ✅ | Implementation with Copilot 🚀
