# How to Use Copilot for Implementation

This guide shows you how to effectively use GitHub Copilot to implement the authentication features.

## Opening Copilot Chat

In VS Code:
- Windows: `Ctrl + Shift + I` (opens Copilot Chat panel)
- Or click Copilot icon in activity bar

## Using the Ready-Made Prompts

Each prompt in [COPILOT_PROMPTS.md](COPILOT_PROMPTS.md) is designed to work with Copilot Chat:

1. Open the file you want to update
2. Open Copilot Chat (`Ctrl + Shift + I`)
3. Copy the prompt from COPILOT_PROMPTS.md
4. Paste into Copilot Chat
5. Review Copilot's suggestion
6. Apply the changes

## Example: Update Login Component

### Step 1: Open the File
Open `src/pages/Login.jsx` in VS Code

### Step 2: Copy the Prompt
From [COPILOT_PROMPTS.md](COPILOT_PROMPTS.md#1-update-login-component):

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

### Step 3: Send to Copilot

1. Open Copilot Chat: `Ctrl + Shift + I`
2. Paste the prompt
3. Send with `Enter`

### Step 4: Review & Apply

Copilot will show you the updated code. You can:
- Click "Accept" to apply all changes
- Click specific suggestions to apply individual changes
- Edit manually if needed

### Step 5: Test

Run your app:
```bash
npm run dev
```

Test the login form with:
- Valid credentials
- Invalid credentials
- Check localStorage for token
- Check if redirect to dashboard works

---

## Example: Update UserLayout with Auth Check

### Copy This Prompt:

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

### Expected Output

Copilot will suggest code like:

```jsx
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import MiniDrawer from './components/MiniDrawer' // adjust path

export default function UserLayout() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  if (user?.role !== 'user') {
    navigate('/')
    return null
  }

  return (
    <div className="flex gap-4">
      <MiniDrawer />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
```

---

## Useful Copilot Tips & Tricks

### 1. Add Context by Referencing Files

When asking Copilot about implementation, reference the files:

```
Looking at src/hooks/useAuth.js, update Login.jsx to use the login method.
Make sure to handle the error state and loading state from useAuth.
```

### 2. Ask for Specific Code Patterns

```
Update the component to use React hooks best practices:
1. Use useEffect for side effects
2. Properly handle cleanup
3. Avoid unnecessary re-renders
```

### 3. Break Down Complex Tasks

Instead of one big prompt, split it:

**Prompt 1:**
```
Update AppRouter.jsx:
1. Import ProtectedRoute component
2. Import admin and user components
3. Wrap /user/dashboard route with ProtectedRoute
```

**Prompt 2:**
```
In AppRouter.jsx:
1. Wrap /user/deposit route with ProtectedRoute requiring 'user' role
2. Wrap /user/withdraw route similarly
3. Do the same for all other /user/* routes
```

### 4. Ask for Type Safety (if using TypeScript)

```
Create AuthProvider.tsx with TypeScript:
1. Define AuthContextType interface
2. Use proper generic types for reducer
3. Export useAuthContext custom hook
```

### 5. Request Testing Code

```
Create test cases for the Login component:
1. Test successful login
2. Test failed login
3. Test loading state
4. Test error message display
```

---

## Copilot Chat Commands

Inside Copilot Chat, you can use special references:

### Reference Files

```
@src/hooks/useAuth.js - Show me the useAuth hook structure
How do I use this in a component?
```

### Reference Symbols

```
@useAuth - How does the useAuth hook work?
What methods are available?
```

### Generate from Context

```
Looking at the existing Login.jsx form, add authentication.
Keep the same styling and structure.
```

---

## Step-by-Step Implementation Guide

### Phase 1: Authentication (2-3 prompts)
1. Update Login.jsx
2. Update Register.jsx
3. Update NavBar.jsx with logout

### Phase 2: Route Protection (2-3 prompts)
4. Update UserLayout.jsx
5. Update AdminLayout.jsx
6. Update AppRouter.jsx

### Phase 3: User Features (1-2 prompts)
7. Update UserProfile.jsx
8. (Optional) Create additional user dashboard components

### Phase 4: Testing (1 prompt)
```
Create integration tests for:
1. Login flow
2. Protected route access
3. Role-based access
4. Auto-logout after 1 hour
```

---

## Common Copilot Responses

### Response 1: Copilot shows correct implementation
✅ Accept it by clicking "Accept"

### Response 2: Copilot shows close but not exact
✅ Click the suggestion and manually edit to match your needs

### Response 3: Copilot asks clarifying questions
✅ Answer the questions to get a more tailored response

### Response 4: Copilot suggests wrong approach
❌ You can:
- Ask it to "use a different approach"
- Provide more context: "@src/hooks/useAuth.js for reference"
- Rephrase the prompt more specifically

---

## Best Practices for Prompts

### DO:
✅ Be specific about imports and dependencies
✅ Reference existing files and patterns
✅ Break down complex tasks into steps
✅ Mention styling frameworks (Tailwind, DaisyUI)
✅ Include error handling requirements
✅ Specify loading states and UX behavior

### DON'T:
❌ Don't ask for multiple unrelated features in one prompt
❌ Don't reference files without their full paths
❌ Don't ask vague questions like "make it better"
❌ Don't forget to mention error handling
❌ Don't skip testing instructions

---

## Example Prompt Template

Use this template for consistent results:

```
Update [FILENAME] to:
1. Import [required imports]
2. Get [state/data] from [hook/context]
3. Create [function/handler] that:
   - Does [step 1]
   - Does [step 2]
   - Handles [error cases]
4. Display [UI elements]
5. Keep [existing styling/patterns]
6. Handle [edge cases]
```

---

## Real Example: Full Update Prompts

### For Login.jsx:
```
Update src/pages/Login.jsx to integrate authentication:
1. Import useAuth hook from ../hooks/useAuth
2. Import useNavigate from react-router-dom
3. Extract email and password from form inputs
4. Create handleSubmit that:
   - Gets email/password from form
   - Calls const { login, isLoading, error } = useAuth()
   - Calls login(email, password) inside try-catch
   - Navigates to '/user/dashboard' on success
   - Sets error message on failure
5. Display error from useAuth().error if present
6. Disable submit button and show "Logging in..." during isLoading
7. Add link to /register page with text "Don't have account? Register"
8. Keep existing form styling with DaisyUI classes
9. Keep password input validation (minLength="8")
```

### For UserProfile.jsx:
```
Update src/components/user-dashboard/UserProfile.jsx to:
1. Import useAuth hook from ../../hooks/useAuth
2. Get { user, updateProfile, isLoading, error } from useAuth()
3. Display user information:
   - user.fullname in profile header
   - user.username below name
   - user.email in info section
   - user.role as a badge
4. Create form to update profile with fields:
   - Full Name (initially user.fullname)
   - Username (initially user.username)
   - Email (initially user.email)
   - Bitcoin Wallet (initially user.bitcoinWallet)
   - Ethereum Wallet (initially user.ethereumWallet)
5. Handle form submit:
   - Call updateProfile with form data
   - Show success message
   - Update form values on success
6. Show loading state (disable button, "Updating..." text)
7. Display error message if updateProfile fails
8. Keep existing Tailwind/DaisyUI styling
9. Use existing avatar styling with profile picture
```

---

## Verification Checklist After Each Update

After Copilot implements a feature, verify:

- [ ] All required imports are present
- [ ] No console errors on page load
- [ ] Form submission works
- [ ] Error messages display correctly
- [ ] Loading states show properly
- [ ] Navigation happens on success
- [ ] Token appears in localStorage
- [ ] Styling looks correct
- [ ] No TypeScript/ESLint errors

---

## Getting Help from Copilot

If implementation isn't working:

```
The Login component is updated but it's not working. 
Here's what happens: [describe the issue]

Looking at:
- @src/hooks/useAuth.js
- @src/pages/Login.jsx

Why isn't the token being saved? What's wrong?
```

---

## Pro Tips

1. **Use Copilot for refactoring existing code:**
```
Refactor this component to use useAuth hook instead of manual fetch calls
```

2. **Ask for type hints (helpful for VS Code autocomplete):**
```
Add JSDoc comments to the useAuth hook for better IDE support
```

3. **Ask for error handling:**
```
Add try-catch and error handling to handle network failures
```

4. **Ask for debugging help:**
```
Add console.log statements to debug the authentication flow
```

5. **Ask for optimization:**
```
Optimize the useAuth hook to prevent unnecessary re-renders
```

---

## When to Use Copilot vs Manual Coding

### Use Copilot for:
✅ Form components
✅ API integration boilerplate
✅ Route protection logic
✅ State management setup
✅ Error handling patterns

### Manual coding for:
❌ Complex business logic
❌ Critical security code
❌ Performance optimizations
❌ Custom styling tweaks

---

**Next:** Copy the first prompt from [COPILOT_PROMPTS.md](COPILOT_PROMPTS.md#1-update-login-component) and start implementing!
