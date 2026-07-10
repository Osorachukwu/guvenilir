My Recommendation
Option B (each tab fetches its own data) with a few exceptions:

Overview tab still gets data from AdminLayout (since it's fetched on mount anyway)

Each action tab (users, deposits, withdrawals, balances) manages its own state

Use a simple callback pattern: onAction() → refreshParent() for cross-tab updates

This keeps things decoupled while still allowing the overview to reflect changes.