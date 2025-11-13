"use client";
import { useState, FormEvent } from "react";
import axiosClient from "@/lib/axiosClient";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card>
      <form
        onSubmit={handleLogin}
        className="p-8 w-96"
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
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="text-center text-sm mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline cursor-pointer">
                Register
            </a>
        </p>
      </form>
      </Card>
    </div>
  );
}
