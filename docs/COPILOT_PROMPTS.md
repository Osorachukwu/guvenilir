# Copilot Implementation Prompts

Use these prompts with GitHub Copilot to implement various features. Each prompt is tailored to the specific component or feature.

## 1. Update Login Component

**File:** `src/pages/Login.jsx`

**Prompt for Copilot:**
```
Update Login.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Import useNavigate from react-router-dom
3. Create form submission handler that:
   - Gets email and password from form fields
   - Calls useAuth().login(email, password)
   - Navigates to /user/dashboard on success
   - Shows error message if login fails
4. Display loading state during login (disable submit button)
5. Display error messages if any (from useAuth().error)
6. Add link to register page
7. Keep existing form styling
8. Handle form validation (email, password required)
```

---

## 2. Update Register Component

**File:** `src/pages/Register.jsx`

**Prompt for Copilot:**
```
Update Register.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Import useNavigate from react-router-dom
3. Create form with fields: fullname, username, email, password, repeatPassword
4. Create form submission handler that:
   - Gets all fields from form
   - Calls useAuth().register(fullname, username, email, password, repeatPassword)
   - Navigates to /user/dashboard on success
   - Shows error message if registration fails
5. Display loading state during registration
6. Display error messages if any
7. Add link to login page
8. Show password requirements (min 8 chars, uppercase, lowercase, number)
9. Validate password matches repeatPassword
10. Keep styling consistent with existing components
```

---

## 3. Update UserProfile Component

**File:** `src/components/user-dashboard/UserProfile.jsx`

**Prompt for Copilot:**
```
Update UserProfile.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Get user data from useAuth(): { user, updateProfile, isLoading, error }
3. Display user information: fullname, username, email, registration date
4. Create update profile form with fields for:
   - Full name (read from user.fullname)
   - Username (read from user.username)
   - Email (read from user.email)
   - Bitcoin wallet address (new field)
   - Ethereum wallet address (new field)
5. Handle form submission:
   - Call updateProfile with updated data
   - Show success message
   - Update form with new values
6. Show loading state while updating
7. Display error messages if update fails
8. Show user role as badge/label
9. Keep existing form styling and layout
10. Make profile picture placeholder if no image available
```

---

## 4. Update UserLayout with Authentication Check

**File:** `src/routing/UserLayout.jsx`

**Prompt for Copilot:**
```
Update UserLayout.jsx to:
1. Import useAuth from src/hooks/useAuth
2. Import useNavigate from react-router-dom
3. Get isAuthenticated, isLoading, user from useAuth()
4. Add authentication check:
   - If not authenticated, redirect to /login
   - If loading, show loading spinner/message
5. Add role check:
   - If user.role !== 'user', redirect to /
6. Import MiniDrawer component
7. Render MiniDrawer with Outlet only if:
   - isAuthenticated is true
   - user.role is 'user'
   - loading is false
8. Show error message if user doesn't have 'user' role
9. Show loading state while checking authentication
```

---

## 5. Update AdminLayout with Authentication & Role Check

**File:** `src/routing/AdminLayout.jsx`

**Prompt for Copilot:**
```
Update AdminLayout.jsx to:
1. Import useAuth from src/hooks/useAuth
2. Import useNavigate from react-router-dom
3. Get isAuthenticated, isLoading, user from useAuth()
4. Add authentication check:
   - If not authenticated, redirect to /login
   - If loading, show loading spinner
5. Add role authorization check:
   - If user.role !== 'admin', show access denied and redirect to /
6. Render Outlet only if:
   - isAuthenticated is true
   - user.role === 'admin'
   - isLoading is false
7. Show error message "Access Denied - Admin only" if role doesn't match
8. Add optional: Admin toolbar/header with admin user name
```

---

## 6. Update AppRouter with Protected Routes

**File:** `src/routing/AppRouter.jsx`

**Prompt for Copilot:**
```
Update AppRouter.jsx to:
1. Import ProtectedRoute component from src/components/auth/ProtectedRoute
2. Wrap all /user/* routes with ProtectedRoute:
   - element={<Dashboard />}
   - requiredRole="user"
   - Keep UserLayout wrapper
3. Wrap all /admin/* routes with ProtectedRoute:
   - element={<Test1 /> or <Test2 />}
   - requiredRole="admin"
   - Keep AdminLayout wrapper
4. Keep public routes unwrapped (/, /about, /contact, /faqs, /login, /register)
5. Ensure NavBar still hides for protected routes
6. Add comment explaining RBAC setup above each protected route group
```

---

## 7. Update NavBar with Logout & User Info

**File:** `src/components/nav/NavBar.jsx`

**Prompt for Copilot:**
```
Update NavBar.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Get isAuthenticated, user, logout from useAuth()
3. Show different content based on isAuthenticated:
   - If authenticated: Show user name, role badge, logout button
   - If not authenticated: Show login and register links
4. Add logout button functionality:
   - Call logout() on click
   - Show loading state
   - Redirect to home page after logout
5. Add conditional links:
   - Show "Dashboard" link if user.role === 'user'
   - Show "Admin Panel" link if user.role === 'admin'
   - Show "Profile" link if authenticated
6. Add user avatar/profile icon
7. Show role badge (user/admin) next to user name
```

---

## 8. Create Logout/Session Expired Handler

**Prompt for Copilot if needed in future:**
```
Create a SessionExpiredModal component that:
1. Monitors auth state changes
2. Shows modal when session expires
3. Displays "Your session has expired. Please login again."
4. Has buttons: "Go to Login" (redirect to /login) and "Stay on Home" (redirect to /)
5. Prevents user from closing modal with backdrop click or escape key
6. Auto-redirect after 3 seconds if no user interaction
```

---

## Implementation Order

Follow this order for optimal implementation:

1. ✅ **Done** - Core files created (authStore, api, authService, hooks)
2. Update Login.jsx
3. Update Register.jsx
4. Update UserLayout.jsx
5. Update AdminLayout.jsx
6. Update AppRouter.jsx
7. Update UserProfile.jsx
8. Update NavBar.jsx

---

## Testing Each Feature

After implementing each component, test:

### Login
- [ ] User can login with valid credentials
- [ ] Error message shows for invalid credentials
- [ ] Token is stored in localStorage
- [ ] User redirects to dashboard

### Register
- [ ] User can register with valid data
- [ ] Email/username uniqueness is checked
- [ ] Password must match repeatPassword
- [ ] User is logged in after registration
- [ ] User redirects to dashboard

### Protected Routes
- [ ] Authenticated users can access /user/* routes
- [ ] Unauthenticated users are redirected to /login
- [ ] Non-admin users cannot access /admin/* routes
- [ ] Admin users can access /admin/* routes

### Logout
- [ ] Clicking logout clears token
- [ ] User is redirected to home/login
- [ ] User cannot access protected routes after logout

### Auto-Logout
- [ ] User stays logged in while active (making requests)
- [ ] User is logged out after 1 hour of inactivity
- [ ] Modal or message shows when session expires

---

## Environment Setup

Before starting, ensure `.env` file in client folder has:
```env
VITE_API_URL=http://localhost:5000/api
```

And backend is running on `http://localhost:5000`
