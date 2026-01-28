# Role-Based Access Control (RBAC) Implementation Guide

## Overview

RBAC allows you to restrict access to routes and features based on user roles. The system supports multiple roles:

- **admin** - Full access to admin dashboard and all features
- **user** - Standard user with access to user dashboard

## User Model Roles

From the backend, users have a `role` field:

```javascript
// User.js model structure
{
  _id: ObjectId,
  fullname: String,
  username: String,
  email: String,
  password: String (hashed),
  role: String, // 'user' or 'admin'
  createdAt: Date,
  updatedAt: Date
}
```

## Protected Routes Setup

### 1. ProtectedRoute Component

Already created at `src/components/auth/ProtectedRoute.jsx`

```jsx
<ProtectedRoute
  element={<Dashboard />}
  requiredRole="user"           // Optional - restrict by role
  redirectTo="/login"           // Where to redirect if not authorized
/>
```

### 2. Protecting User Routes

In [AppRouter.jsx](../src/routing/AppRouter.jsx), update routes:

**Copilot Prompt to use:**
```
Update the /user/* routes in AppRouter.jsx to use ProtectedRoute component with requiredRole="user". 
Keep the UserLayout wrapper. Make sure each route is protected individually inside the Outlet.
```

Example structure:
```jsx
<Route element={<UserLayout />}>
  <Route 
    path='/user/dashboard' 
    element={
      <ProtectedRoute 
        element={<Dashboard />} 
        requiredRole="user"
      />
    } 
  />
  {/* Other user routes... */}
</Route>
```

### 3. Protecting Admin Routes

In [AppRouter.jsx](../src/routing/AppRouter.jsx), update admin routes:

**Copilot Prompt to use:**
```
Update the /admin/* routes in AppRouter.jsx to use ProtectedRoute component with requiredRole="admin".
Keep the AdminLayout wrapper. Make sure each route is protected individually.
```

Example structure:
```jsx
<Route element={<AdminLayout />}>
  <Route 
    path='/admin/test1' 
    element={
      <ProtectedRoute 
        element={<Test1 />} 
        requiredRole="admin"
      />
    } 
  />
  {/* Other admin routes... */}
</Route>
```

### 4. Layout Protection (UserLayout.jsx)

Update [UserLayout.jsx](../src/routing/UserLayout.jsx):

**Copilot Prompt to use:**
```
Update UserLayout.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Check if user is authenticated with const { isAuthenticated, user } = useAuth()
3. Redirect to /login if not authenticated
4. Show loading state while checking auth
5. Only render MiniDrawer and Outlet if authenticated and user role is "user"
6. Display error message if user tries to access without proper role
```

Expected result: Only authenticated users can access user dashboard.

### 5. Layout Protection (AdminLayout.jsx)

Update [AdminLayout.jsx](../src/routing/UserLayout.jsx):

**Copilot Prompt to use:**
```
Update AdminLayout.jsx to:
1. Import useAuth hook from src/hooks/useAuth
2. Check if user is authenticated with const { isAuthenticated, user } = useAuth()
3. Redirect to /login if not authenticated
4. Check if user role is "admin" - redirect to / if not authorized
5. Show loading state while checking auth
6. Display error message if user is not admin
7. Only render Outlet if authenticated and user.role === 'admin'
```

Expected result: Only admin users can access admin dashboard.

## Accessing User Role in Components

### Check if Admin

```jsx
import { useAuth } from '../hooks/useAuth';

export default function AdminFeature() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Access Denied - Admin only</div>;
  }

  return <div>Admin Content</div>;
}
```

### Check if User

```jsx
import { useAuth } from '../hooks/useAuth';

export default function UserFeature() {
  const { user } = useAuth();

  if (user?.role !== 'user') {
    return <div>Access Denied - Users only</div>;
  }

  return <div>User Content</div>;
}
```

### Conditional Navigation/UI

```jsx
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated && user?.role === 'admin' && (
        <Link to="/admin/test1">Admin Panel</Link>
      )}
      
      {isAuthenticated && user?.role === 'user' && (
        <Link to="/user/dashboard">Dashboard</Link>
      )}
    </nav>
  );
}
```

## Roles Middleware (Backend)

Backend uses role middleware to protect endpoints. Example from server:

```javascript
// routes/authRoutes.js
const { protect, authorize } = require('../middleware/roleMiddleware');

router.get('/admin/users', protect, authorize('admin'), getUsers);
```

## Common RBAC Scenarios

### 1. Admin Dashboard

- Restrict access to role: **admin**
- Path: `/admin/*`
- Components: AdminLayout wrapper + ProtectedRoute per route

### 2. User Dashboard

- Restrict access to role: **user**
- Path: `/user/*`
- Components: UserLayout wrapper + ProtectedRoute per route

### 3. Public Pages

- No restriction
- Paths: `/`, `/about`, `/contact`, `/faqs`, `/login`, `/register`

### 4. Profile Management

- Accessible to: **authenticated users** (both admin and user)
- Path: `/user/profile`
- Protect with: `<ProtectedRoute element={...} />`

## Testing RBAC

### Test User Registration

1. Open `/register`
2. Fill in form with user details
3. Backend assigns role: **user** by default
4. User redirects to `/user/dashboard`

### Test Admin Access

1. Admin user logs in (created via backend CREATE_ADMIN.md)
2. Admin can access `/admin/*` routes
3. Regular users get "Access Denied" when visiting admin routes

### Test Session Expiration

1. User logs in
2. Wait 1 hour
3. User is automatically logged out
4. Redirected to `/login`

### Test Token Refresh

1. User logs in
2. Make requests within 1 hour
3. Timer resets with each request
4. User stays logged in as long as active

## Backend Integration Checklist

- [ ] Register endpoint assigns default role "user"
- [ ] Login endpoint returns user role in response
- [ ] GET /api/auth/me returns full user data including role
- [ ] Role middleware protects admin endpoints
- [ ] JWT token includes user ID in payload
- [ ] Token expiry set to 1 hour in backend

See [server/docs/ROLES_FEATURE.md](../../server/docs/ROLES_FEATURE.md) for backend RBAC setup.
