import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      setDisplayName(profile?.display_name || "");
      setLoading(false);
    })();
  }, []);

  const saveDisplayName = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: displayName });
    if (error) alert(error.message);
    else alert("Display name saved.");
  };

  const changeEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) alert(error.message);
    else alert("Check your inbox to confirm the new email.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-2">
            <label className="block text-sm opacity-80">Display Name</label>
            <input
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button onClick={saveDisplayName} className="px-4 py-2 bg-cyan-500 text-black rounded">
              Save
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm opacity-80">Email</label>
            <input
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={changeEmail} className="px-4 py-2 bg-cyan-500 text-black rounded">
              Change Email
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <button onClick={logout} className="px-4 py-2 bg-gray-700 rounded">Log Out</button>
            {/* Delete account needs a server-side function (admin privileges) — add later */}
            <button disabled className="px-4 py-2 bg-gray-600 rounded opacity-60 cursor-not-allowed">
              Delete Account (coming soon)
            </button>
          </div>
        </>
      )}
    </div>
  );
}



