import { useState } from "react";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Later: persist setting to backend or localStorage
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Later: persist language preference
  };

  const handleSaveProfile = () => {
    alert(`Saving new profile: ${displayName}, ${email}`);
    // Later: connect to backend API
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Later: call logout API
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      alert("Account deleted.");
      // Later: call delete account API
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Theme Toggle */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition"
        >
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Language Selector */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Language</h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      {/* Profile Settings */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div>
          <label className="block mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white transition"
        >
          Save Changes
        </button>
      </div>

      {/* Account Actions */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded text-white transition"
        >
          Log Out
        </button>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white transition"
        >
          Delete Account
        </button>
        <button
          onClick={() => alert("Redirecting to Upgrade Membership page...")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition"
        >
          Upgrade Membership
        </button>
      </div>
    </div>
  );
}
