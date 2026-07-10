Glassdoor Holdings - Investment Platform Documentation

Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, DaisyUI, React Router DOM v6, Axios, Lucide React, AOS

- Backend: PHP (REST API at https://invest.esbatech.org)

- Authentication: JWT tokens stored in localStorage

- State Management: React Context (Auth), useState hooks





src/
├── components/
│   ├── ui/
│   │   ├── TimedAlert.jsx        # Toast notification component
│   │   ├── SplashScreen.jsx      # Initial loading screen
│   │   ├── CopyableText.jsx      # Click-to-copy text component
│   │   ├── CurrentDate.jsx       # Live date display
│   │   ├── Logo.jsx              # Company logo
│   │   ├── Branding.jsx          # Company branding
│   │   └── ThemeSwitcher.jsx     # Light/dark toggle
│   ├── admin/
│   │   ├── AdminLayout.jsx       # Admin shell (navbar, sidebar, tabs)
│   │   ├── OverviewTab.jsx       # Admin dashboard overview
│   │   ├── UsersTab.jsx          # User management
│   │   ├── DepositsTab.jsx       # Deposit requests
│   │   ├── WithdrawalsTab.jsx    # Withdrawal requests
│   │   ├── PlansManager.jsx      # Investment plans CRUD
│   │   ├── BalancesTab.jsx       # User balance management
│   │   ├── BalanceAdjustModal.jsx # Balance adjustment form
│   │   ├── SettingsTab.jsx       # Admin password change
│   │   ├── StatusBadge.jsx       # Shared status indicator
│   │   └── TransactionActions.jsx # Approve/reject buttons
│   ├── LogoutButton.jsx          # Logout with confirmation
│   └── ProtectedRoute.jsx        # Route guards (user/admin)
├── context/
│   └── AuthContext.jsx           # Authentication context provider
├── hooks/
│   └── useInactivityLogout.js    # Auto-logout after inactivity
├── pages/
│   ├── Login.jsx                 # Login page
│   ├── Register.jsx              # Registration page
│   └── user/
│       ├── Dashboard.jsx         # User dashboard
│       ├── Deposit.jsx           # Deposit form
│       ├── ConfirmDeposit.jsx    # Deposit confirmation
│       ├── Withdraw.jsx          # Withdrawal form
│       ├── Account.jsx           # Account settings/wallets
│       ├── Referrals.jsx         # Referral statistics
│       └── Pricing.jsx           # Plans display
├── layouts/
│   └── UserLayout.jsx            # User shell (navbar, sidebar)
├── routing/
│   └── AppRouter.jsx             # Route definitions
├── utils/
│   ├── constants.js              # BASE_URL, BIZ, DOMAIN_KEY
│   └── logout.js                 # Logout utility
└── App.jsx                       # Root component (splash + router)