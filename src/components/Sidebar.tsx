import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserPlus, Activity, FileText, Settings, Menu, X } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'New Admission', icon: UserPlus, path: '/new-admission' },
    { name: 'Specialties', icon: Activity, path: '/specialties' },
    { name: 'Daily Reports', icon: FileText, path: '/daily-reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-800 text-white transition-all duration-300 ease-in-out z-10 ${
          isOpen ? 'w-64' : 'w-0'
        } lg:w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-indigo-900">
            <h1 className="text-xl font-bold">Hospital Manager</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4">
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg hover:bg-indigo-700 ${
                      location.pathname === item.path ? 'bg-indigo-700' : ''
                    }`}
                  >
                    <item.icon className="mr-3" size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;