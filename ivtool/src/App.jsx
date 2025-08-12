import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RepurposeTool from "./components/RepurposeTool";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-indigo-400 transition">
          RepurposeIV
        </Link>
        <nav className="space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition"
          >
            Login
          </Link>
          <Link
            to="/settings"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans transition-colors duration-300">
        <Header />
        <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<RepurposeTool />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}