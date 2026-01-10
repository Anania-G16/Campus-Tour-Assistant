import axios from "axios";
import { useContext, useState } from "react";
import { storeContext } from "../context/storeContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function AdminLogin() {
  const { adminLogin } = useContext(storeContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const updateData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    adminLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8">
        {/* Logo */}
        <div className="text-center items-center mb-6">
          <div className="flex"></div>
          <div className="flex items-center justify-center gap-12 text-2xl font-bold text-slate-800">
            <Link to="/" className="cursor-pointer text-indigo-500">
              <ArrowLeft />
            </Link>
            <span>Campus Tour Assistant</span>
          </div>
          <p className="text-slate-500 text-sm mt-2">Your Best Assistant</p>
        </div>

        {/* Login Form */}
        <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Welcome Back
        </h2>

        <form onSubmit={submitLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={updateData}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={updateData}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              required
            />
          </div>

          <button className="w-full py-3 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition">
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
  );
}

export default AdminLogin;