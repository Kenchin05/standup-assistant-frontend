"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      setAuth(res.data, res.data.token);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 flex flex-col items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded text-black"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded text-black"
        >
          Login
        </button>
        <p className="text-center text-sm mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline cursor-pointer">
                Register
            </a>
        </p>
      </form>
    </div>
  );
}
