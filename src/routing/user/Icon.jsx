// components/Icon.jsx
const Icon = ({ name, className = "w-6 h-6", strokeWidth = 2 }) => {
  const icons = {
    dashboard: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
      </>
    ),
    makeDeposit: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M18 12h.01"/><path d="M19 22v-6"/><path d="m22 19-3-3-3 3"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
      </>
    ),
    yourDeposits: (
      <>
        <rect x="6" y="12" width="20" height="14" rx="2" />
        <path d="M10 12V8C10 5.5 12 4 16 4C20 4 22 5.5 22 8V12" />
        <circle cx="16" cy="18" r="2" fill="currentColor" />
        <line x1="16" y1="20" x2="16" y2="23" />
      </>
    ),
    withdrawal: (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" /><path d="m16 19 3 3 3-3" /><path d="M18 12h.01" /><path d="M19 16v6" /><path d="M6 12h.01" /><circle cx="12" cy="12" r="2" /></svg>
      </>
    ),
    account: (
      <>
        <circle cx="16" cy="12" r="5" />
        <path d="M5 28C5 23 9 18 16 18C23 18 27 23 27 28" />
      </>
    ),
    yourReferrals: (
      <>
        <circle cx="12" cy="12" r="4" />
        <circle cx="24" cy="12" r="4" />
        <path d="M2 28C2 23 6 18 12 18C16 18 18.5 20.5 19 23" />
        <path d="M28 28C28 23 24 18 18 18C16.5 18 15 18.5 14 19.5" />
        <line x1="18" y1="12" x2="20" y2="12" />
        <line x1="18" y1="8" x2="20" y2="16" />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

export default Icon;