import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { display_name: form.name },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // If email confirmations are ON, user may not be signed in immediately
    if (!data.session) {
      alert("Check your email to confirm your account, then log in.");
      setLoading(false);
      navigate("/login");
      return;
    }

    // If you get a session immediately, upsert profile row
    await supabase.from("profiles").upsert({
      id: data.user.id,
      display_name: form.name,
    });

    setLoading(false);
    navigate("/settings");
  };

  return (
    <div className="auth-container">
      <h1>Create Your Account</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
