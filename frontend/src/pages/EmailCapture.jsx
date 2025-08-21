import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmailCapture({ darkMode }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: Send email to backend
    setSubmitted(true);
  };

  return (
    <div className={`max-w-md mx-auto p-6 mt-12 rounded-lg shadow-lg ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
    }`}>
      <h1 className="text-2xl font-bold mb-4">Join our waitlist</h1>
      <p className="mb-4 opacity-80">
        Want early access to new features like voice output and content ideas?
      </p>

      {submitted ? (
        <div className="p-4 bg-green-700 rounded">
          <p>Thanks for signing up! We'll keep you posted.</p>
          <Link to="/" className="text-blue-300 hover:underline mt-3 block">
            Back to home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-md border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"
            }`}
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-semibold"
          >
            Join the Waitlist
          </button>
        </form>
      )}
    </div>
  );
}
