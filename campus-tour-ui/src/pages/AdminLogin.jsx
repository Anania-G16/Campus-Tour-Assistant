import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
            <i className="fas fa-wallet text-indigo-500"></i>
            <span>Campus Tour Assistant</span>
          </div>
          <p className="text-slate-500 text-sm mt-2">
            Your Best Assistant
          </p>
        </div>

        {/* Login Form */}
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
            Welcome Back
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#E5E7EB] focus:outline-none focus:bg-[#FFFFFF] dark:focus:bg-[#1E293B] focus:ring-2 focus:ring-[#1E40AF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#E5E7EB] focus:outline-none focus:bg-[#FFFFFF] dark:focus:bg-[#1E293B] focus:ring-2 focus:ring-[#1E40AF]"
                required
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                // Simple authentication check (replace with real API call)
                if (email === 'admin@example.com' && password === 'password') {
                  setIsAuthenticated(true);
                  navigate('/admin');
                } else {
                  alert('Invalid credentials');
                }
              }}
              className="w-full py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-4">
            New Admin?{" "}
            <span className="text-indigo-500 font-medium cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
