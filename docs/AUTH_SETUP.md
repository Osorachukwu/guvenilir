# Authentication & Authorization Setup Guide

## Overview

This guide covers the authentication and authorization system for the Crypto-Invest platform. The system uses:

- **JWT (JSON Web Tokens)** for stateless authentication
- **Zustand** for client-side state management
- **Axios** for HTTP requests with interceptors
- **RBAC (Role-Based Access Control)** for authorization
- **Auto-logout** after 1 hour of inactivity

## Project Structure

```
client/
├── src/
│   ├── store/
│   │   └── authStore.js          # Zustand auth store with persist
│   ├── services/
│   │   ├── api.js                # Axios instance with interceptors
│   │   └── authService.js        # Auth API calls
│   ├── hooks/
│   │   └── useAuth.js            # useAuth hook for components
│   ├── components/
│   │   └── auth/
│   │       └── ProtectedRoute.jsx # Protected route wrapper
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ...
│   └── routing/
│       ├── UserLayout.jsx        # User dashboard layout (protected)
│       └── AdminLayout.jsx       # Admin dashboard layout (protected)
└── docs/
    ├── AUTH_SETUP.md             # This file
    └── RBAC_GUIDE.md             # RBAC implementation guide
```

## Installation

Dependencies are already installed:

```bash
npm install axios zustand
```

## Configuration

### Environment Variables

Create `.env` file in the client folder:

```env
VITE_API_URL=http://localhost:5000/api
```

## Authentication Flow

### 1. User Registration

**Backend Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "repeatPassword": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "fullname": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### 2. User Login

**Backend Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** Same as registration response

### 3. Token Management

- Token is stored in **localStorage** via Zustand persist middleware
- Token is automatically added to all requests via **axios interceptor**
- Token expires after **1 hour** on the server
- Client-side auto-logout occurs after **1 hour** (3600000ms)
- Token is refreshed on every successful request

### 4. User Logout

Token is cleared from localStorage and Zustand state.

## Using the Auth Hook

### In Login Component

```jsx
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = Object.fromEntries(new FormData(e.target));
      await login(email, password);
      navigate('/user/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="error">{error}</p>}
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
```

### In Registration Component

```jsx
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.target));
      await register(data.fullname, data.username, data.email, data.password, data.repeatPassword);
      navigate('/user/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p className="error">{error}</p>}
      <input type="text" name="fullname" required />
      <input type="text" name="username" required />
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <input type="password" name="repeatPassword" required />
      <button disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}
```

### In User Profile Component

```jsx
import { useAuth } from '../hooks/useAuth';

export default function UserProfile() {
  const { user, updateProfile, isLoading, error } = useAuth();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.target));
      await updateProfile(data);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.fullname}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      
      <form onSubmit={handleProfileUpdate}>
        {error && <p className="error">{error}</p>}
        {/* Add form fields here */}
        <button disabled={isLoading}>Update Profile</button>
      </form>
    </div>
  );
}
```

### In Logout/NavBar Component

```jsx
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.fullname}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}
```

## Auto-Logout Implementation

The system automatically logs out users after **1 hour** of inactivity:

1. Timer starts when user logs in (`startAutoLogout`)
2. Timer resets on every successful API request (`refreshSession`)
3. When timer expires, `setLogout` is called automatically
4. User is redirected to login page

This means:
- Active users won't be logged out (timer keeps resetting)
- Inactive users will be logged out after 1 hour
- Session is extended with each user action

## Next Steps

1. **Update Login.jsx** - Implement login form with useAuth hook
2. **Update Register.jsx** - Implement registration form
3. **Update UserProfile.jsx** - Implement profile view and update
4. **Update AppRouter.jsx** - Add protected routes
5. **Update UserLayout.jsx** - Add route protection
6. **Update AdminLayout.jsx** - Add RBAC route protection
7. **Update NavBar.jsx** - Add logout functionality

See **RBAC_GUIDE.md** for role-based access control setup.
