import { useState } from "react";
import { Send, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Feedback() {
  const { darkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
   <div
  className="min-h-screen relative bg-cover bg-center flex items-center justify-center px-4 pt-10 pb-16"
  style={{ backgroundImage: "url('/gateway.jpg')" }}
>

      <div
        className={`w-full max-w-lg rounded-2xl shadow-xl p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-center mb-2 ${
            darkMode ? "text-primary-400" : "text-primary-700"
          }`}
        >
          Campus Tour Assistant Feedback
        </h1>

        <p
          className={`text-center mb-6 ${
            darkMode ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Help us improve your campus navigation experience
        </p>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Thank you!
            </h2>
            <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Rate your experience
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "text-yellow-400"
                        : darkMode
                        ? "text-slate-600"
                        : "text-gray-300"
                    }
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Your feedback
              </label>

              <textarea
                required
                rows={4}
                placeholder="Tell us what worked well or what needs improvement..."
                className={`w-full rounded-lg px-3 py-2 focus:ring-2 focus:outline-none ${
                  darkMode
                    ? "bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-primary-500"
                    : "border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-primary-500"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Email (optional)
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-lg px-3 py-2 focus:ring-2 focus:outline-none ${
                  darkMode
                    ? "bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-primary-500"
                    : "border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-primary-500"
                }`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition
    bg-primary-600 hover:bg-primary-700
    ${darkMode ? "text-white" : "text-slate-900"}
  `}
            >
              <Send size={18} />
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
