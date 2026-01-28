import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Home,
  Users,
  Notebook,
  ChartBar,
  UserCogIcon,
} from 'lucide-react';

const MiniDrawer = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Users, label: 'Team' },
    { icon: Notebook, label: 'Projects' },
    { icon: ChartBar, label: 'Reports' },
    { icon: UserCogIcon, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen">
      {/* Mini Drawer */}
      <div 
        className={`bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4`}>
          {!collapsed && <h2 className="text-xl font-bold">My App</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <item.icon className="w-6 h-6" />
              {!collapsed && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* User Profile (only shown when expanded) */}
        {!collapsed && (
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">admin@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-600 text-8xl font-bold">
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          This is a mini drawer example. Click the arrow to toggle between 
          {collapsed ? ' icon-only view' : ' expanded view'}.
        </p>
      </div>
    </div>
  );
};

export default MiniDrawer;