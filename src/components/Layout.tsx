import React from "react";
import {
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "../assets/the-hub-group-high-resolution-logo-transparent.png";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children }: LayoutProps) {
  const { state, logout } = useApp();
  const { user } = state.auth;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-3">
                <img src={Logo} alt="Logo" className="h-8 w-auto" />
              </div>
              {user && (
                <div className="hidden md:flex items-center space-x-2 ml-8 px-3 py-1 bg-blue-50 rounded-lg">
                  <span className="capitalize text-blue-700 font-medium text-sm md:text-base">
                    {user.storeType}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Desktop user info and logout */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
              <div className="px-4 py-3 space-y-3">
                {user && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                    <span className="capitalize text-blue-700 font-medium">
                      {user.storeType}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {user?.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
}
