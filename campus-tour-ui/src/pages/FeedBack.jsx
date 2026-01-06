import { useState } from 'react';
import { Send, Star } from 'lucide-react';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-primary-700 text-center mb-2">
          Campus Tour Assistant Feedback
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Help us improve your campus navigation experience
        </p>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Thank you!
            </h2>
            <p className="text-gray-600">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your experience
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star size={28} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your feedback
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us what worked well or what needs improvement..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
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
