# Implementation Checklist & Testing Guide

## Pre-Implementation Checklist

- [ ] Backend is running on `http://localhost:5000`
- [ ] Frontend dependencies installed: `npm install axios zustand`
- [ ] `.env` file created with `VITE_API_URL=http://localhost:5000/api`
- [ ] All core auth files are present (see below)
- [ ] Documentation read: `AUTH_SETUP.md`, `QUICK_START.md`, `USING_COPILOT.md`

### Core Files Verification

Run these commands in `client/` folder to verify all files are created:

```bash
# Check store
ls -la src/store/authStore.js

# Check services
ls -la src/services/api.js
ls -la src/services/authService.js

# Check hooks
ls -la src/hooks/useAuth.js

# Check components
ls -la src/components/auth/ProtectedRoute.jsx

# Check docs
ls -la docs/
```

---

## Implementation Phase 1: Authentication (3 Components)

### 1.1 Update Login.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#1-update-login-component`

**Checklist:**
- [ ] Open `src/pages/Login.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat (`Ctrl + Shift + I`)
- [ ] Review and apply changes
- [ ] No console errors
- [ ] Form renders correctly
- [ ] Can enter email and password

**Testing:**
```
1. Go to http://localhost:5173/login
2. Enter invalid email/password
3. Verify error message shows
4. Enter valid credentials (from backend test account)
5. Should redirect to /user/dashboard
6. Check localStorage for 'auth-storage' key with token
```

**Success Criteria:**
- ✅ Login form displays
- ✅ Error message shows for invalid credentials
- ✅ Token appears in localStorage after successful login
- ✅ Redirects to /user/dashboard
- ✅ No console errors

---

### 1.2 Update Register.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#2-update-register-component`

**Checklist:**
- [ ] Open `src/pages/Register.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] All form fields render (fullname, username, email, password, repeatPassword)
- [ ] No console errors

**Testing:**
```
1. Go to http://localhost:5173/register
2. Fill with valid data:
   - Fullname: "Test User"
   - Username: "testuser123"
   - Email: "test@example.com"
   - Password: "Test123456"
   - Repeat Password: "Test123456"
3. Click Register
4. Should redirect to /user/dashboard
5. Check if new user created in backend
```

**Success Criteria:**
- ✅ Registration form displays all fields
- ✅ Validates password matches repeatPassword
- ✅ Shows errors for existing email/username
- ✅ Redirects to dashboard after registration
- ✅ Token stored in localStorage
- ✅ No console errors

---

### 1.3 Update NavBar.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#7-update-navbar-with-logout--user-info`

**Checklist:**
- [ ] Open `src/components/nav/NavBar.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] NavBar shows different content when authenticated
- [ ] Logout button appears
- [ ] No console errors

**Testing (After login):**
```
1. Login to application
2. NavBar should show:
   - User's fullname
   - User's role badge
   - Logout button
   - Dashboard link
3. Click Logout
4. Should redirect to home/login
5. NavBar should show Login/Register links
6. Try to access /user/dashboard
7. Should redirect to /login
```

**Success Criteria:**
- ✅ Shows different UI when authenticated vs not
- ✅ Displays user information when logged in
- ✅ Logout button works
- ✅ Clears token from localStorage
- ✅ Prevents access to protected routes
- ✅ No console errors

---

## Implementation Phase 2: Route Protection (3 Files)

### 2.1 Update UserLayout.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#4-update-userlayout-with-authentication-check`

**Checklist:**
- [ ] Open `src/routing/UserLayout.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] Uses useAuth hook
- [ ] Checks authentication
- [ ] Checks user role
- [ ] No console errors

**Testing:**
```
1. Logout (clear token)
2. Try to access http://localhost:5173/user/dashboard
3. Should redirect to /login
4. Login with user account
5. Access /user/dashboard
6. Should display dashboard with MiniDrawer
7. Refresh page
8. Should still be authenticated (persist)
```

**Success Criteria:**
- ✅ Unauthenticated users redirected to /login
- ✅ Authenticated users can access dashboard
- ✅ Non-user roles redirected
- ✅ Shows loading state while checking
- ✅ State persists after refresh
- ✅ No console errors

---

### 2.2 Update AdminLayout.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#5-update-adminlayout-with-authentication--role-check`

**Checklist:**
- [ ] Check if AdminLayout.jsx exists
- [ ] If not, create it: `src/routing/AdminLayout.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] Uses useAuth hook
- [ ] Checks authentication
- [ ] Checks admin role specifically
- [ ] No console errors

**Testing:**
```
1. Logout and clear token
2. Try to access /admin/test1
3. Should redirect to /login
4. Login with regular user (not admin)
5. Try to access /admin/test1
6. Should show "Access Denied" and redirect to /
7. (If you have admin account) Login with admin
8. Can access /admin/test1
```

**Success Criteria:**
- ✅ Unauthenticated users redirected to /login
- ✅ Non-admin users see access denied
- ✅ Admin users can access admin routes
- ✅ Clear error message when access denied
- ✅ Shows loading state while checking
- ✅ No console errors

---

### 2.3 Update AppRouter.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#6-update-approuter-with-protected-routes`

**Checklist:**
- [ ] Open `src/routing/AppRouter.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] All /user/* routes wrapped with ProtectedRoute
- [ ] All /admin/* routes wrapped with ProtectedRoute
- [ ] Public routes remain unchanged
- [ ] No console errors

**Testing:**
```
1. Clear token (logout)
2. Try to access each route:
   - / → Should work (public)
   - /login → Should work (public)
   - /register → Should work (public)
   - /user/dashboard → Should redirect to /login
   - /admin/test1 → Should redirect to /login
3. Login as user
4. Try:
   - /user/dashboard → Should work
   - /admin/test1 → Should redirect to /
5. (If admin) Login as admin
6. Try:
   - /admin/test1 → Should work
   - /user/dashboard → Should work (both roles authenticated)
```

**Success Criteria:**
- ✅ Public routes accessible without login
- ✅ Protected routes redirect to /login if not authenticated
- ✅ Role-based routes enforce correct role
- ✅ All routes work correctly
- ✅ No console errors

---

## Implementation Phase 3: User Features (1 Component)

### 3.1 Update UserProfile.jsx ✓

**Prompt Location:** `docs/COPILOT_PROMPTS.md#3-update-userprofile-component`

**Checklist:**
- [ ] Open `src/components/user-dashboard/UserProfile.jsx`
- [ ] Copy prompt from COPILOT_PROMPTS.md
- [ ] Send to Copilot Chat
- [ ] Review and apply changes
- [ ] Displays user information from auth state
- [ ] Has form to update profile
- [ ] Shows loading and error states
- [ ] No console errors

**Testing:**
```
1. Login to application
2. Navigate to /user/profile
3. Should see current user data:
   - Full name
   - Username
   - Email
   - Role badge
   - Registration date
4. Edit form fields:
   - Change full name
   - Change wallet addresses
5. Click "Update Profile"
6. Should show success message
7. Refresh page
8. Changes should persist
9. Test error handling:
   - Try invalid email
   - Check error message
```

**Success Criteria:**
- ✅ Displays current user data
- ✅ Form pre-fills with existing data
- ✅ Can update profile successfully
- ✅ Shows loading state during update
- ✅ Shows error messages on failure
- ✅ Changes persist after refresh
- ✅ No console errors

---

## Post-Implementation Testing

### Full Flow Test

**Test 1: New User Registration & Login**
```
1. Open http://localhost:5173/register
2. Create new account with:
   Email: newtestuser@test.com
   Username: newtestuser
   Password: SecurePass123
3. Register
4. Should be in /user/dashboard
5. Check: User data shows in NavBar
6. Logout
7. Login with same credentials
8. Should be in /user/dashboard
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 2: Session Persistence**
```
1. Login to account
2. Verify token in localStorage (auth-storage)
3. Refresh page (F5)
4. Should still be logged in
5. Navigate to /user/dashboard
6. Should work without redirecting to /login
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 3: Protected Routes**
```
1. Logout (clear token)
2. Try to access /user/dashboard
3. Should redirect to /login
4. Try to access /admin/test1
5. Should redirect to /login
6. Try to access /
7. Should work (public)
8. Try to access /login
9. Should work (public)
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 4: Auto-Logout (Optional - takes 1 hour)**
```
1. Login to account
2. Open DevTools → Application → localStorage
3. Note: auth-storage has token
4. Wait 1 hour without making any requests
5. Auto-logout should trigger
6. Try to access /user/dashboard
7. Should redirect to /login
8. localStorage should be cleared
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 5: Error Handling**
```
1. Go to /login
2. Try invalid credentials:
   - Correct email, wrong password
   - Wrong email, correct password
   - Invalid email format
3. Should show specific error messages
4. Try to register with existing email
5. Should show error: "Email already in use"
6. Try to register with existing username
7. Should show error: "Username already in use"
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 6: Profile Management**
```
1. Login to account
2. Navigate to /user/profile
3. Click "Edit Profile"
4. Change full name to "New Name"
5. Save changes
6. Should show success message
7. Refresh page
8. Full name should still be "New Name"
9. Test invalid inputs:
   - Try setting blank email
   - Should show error
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 7: NavBar Functionality**
```
1. Not logged in:
   - NavBar should show: Login, Register links
   - No logout button
2. After login:
   - NavBar should show: User name, Role badge, Logout button
   - Show relevant dashboard links
3. Click Logout:
   - Should redirect to home
   - NavBar should show login/register again
   - Token cleared from localStorage
```

Expected: ✅ PASS / ❌ FAIL

---

**Test 8: RBAC (Role-Based Access Control)**
```
1. (If available) Login with admin account
2. Should be able to access /admin/test1
3. Login with regular user account
4. Try to access /admin/test1
5. Should redirect to / with access denied message
6. Regular user CAN access /user/dashboard
7. Admin user CAN ALSO access /user/dashboard
```

Expected: ✅ PASS / ❌ FAIL

---

## Browser DevTools Verification

### Check localStorage
```javascript
// Open browser console (F12)
// Go to Application/Storage → localStorage

// Should see 'auth-storage' with contents:
{
  "state": {
    "user": {
      "id": "...",
      "fullname": "...",
      "username": "...",
      "email": "...",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isAuthenticated": true,
    "isLoading": false,
    "error": null,
    "autoLogoutTimer": null
  }
}
```

---

### Check Network Requests
```
1. Open DevTools → Network tab
2. Login
3. Look for POST request to /api/auth/login
4. Response should include:
   {
     "user": {...},
     "token": "eyJ..."
   }
5. Check subsequent requests
6. All should have:
   Authorization: Bearer eyJ...
   Header in request
```

---

### Check Console
```
1. Open DevTools → Console tab
2. Should have no errors after login
3. Should have no errors after navigation
4. Should have no warnings about deprecated code
5. Look for any custom console.logs you may have added
```

---

## Troubleshooting During Testing

| Issue | Solution |
|-------|----------|
| Login doesn't work | Check backend running, verify credentials valid in DB |
| Token not in localStorage | Check Zustand persist middleware, verify login successful |
| Protected route doesn't redirect | Verify ProtectedRoute imported, requiredRole set correctly |
| Profile not loading | Check GET /api/auth/me endpoint on backend |
| Auto-logout not working | Check browser console for timer setup, wait inactive time |
| CORS errors | Ensure backend has CORS enabled, check VITE_API_URL |

---

## Final Checklist Before Production

- [ ] All 7 components updated
- [ ] All tests PASS
- [ ] No console errors
- [ ] No console warnings
- [ ] Token properly stored in localStorage
- [ ] Protected routes properly enforce authentication
- [ ] RBAC properly enforces roles
- [ ] Auto-logout timer working (if tested)
- [ ] Profile updates persist
- [ ] Error messages user-friendly
- [ ] Loading states showing
- [ ] NavBar logout working
- [ ] Backend endpoints all working

---

## Sign-Off Checklist

**When all above are complete, mark:**

- [ ] **Phase 1 (Auth)** - COMPLETE ✅
- [ ] **Phase 2 (Route Protection)** - COMPLETE ✅
- [ ] **Phase 3 (User Features)** - COMPLETE ✅
- [ ] **All Tests** - PASSING ✅
- [ ] **Documentation** - READ ✅
- [ ] **Production Ready** - YES ✅

---

## Next Steps After Implementation

1. **Backend Integration Testing**
   - Test with real backend endpoints
   - Verify all error cases handled
   - Test password reset flow

2. **Frontend Enhancements**
   - Add loading spinners in more places
   - Add toast notifications for success/errors
   - Add confirm dialogs for logout

3. **Security Enhancements**
   - Implement HTTPS only
   - Add rate limiting on login attempts
   - Add CSRF token protection
   - Add password strength meter

4. **UX Improvements**
   - Add "Remember me" checkbox
   - Add password visibility toggle
   - Add email verification step
   - Add two-factor authentication

5. **Performance**
   - Lazy load route components
   - Cache user data appropriately
   - Optimize re-renders

6. **Monitoring & Analytics**
   - Log auth events
   - Track failed login attempts
   - Monitor session duration

---

## Success Criteria Summary

✅ **All 7 Components Implemented**
✅ **All Tests Passing**
✅ **No Console Errors**
✅ **Token Management Working**
✅ **Route Protection Working**
✅ **RBAC Working**
✅ **Session Persistence Working**
✅ **Error Handling Working**
✅ **Documentation Complete**

---

**Status: Ready for Copilot Implementation 🚀**
