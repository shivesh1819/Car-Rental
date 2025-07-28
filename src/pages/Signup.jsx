// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // ✅ Import close icon

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((u) => u.email === form.email);
    if (exists) {
      toast.error("Email already exists");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-white to-purple-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* ❌ Close icon */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "password"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.6 }}
            >
              <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${field}`}
                required
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
