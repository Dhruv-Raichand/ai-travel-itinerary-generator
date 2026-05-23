"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    localStorage.setItem("token", data.data.token);

    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-gray-700 text-white p-2 rounded">Register</button>
        <p>
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="underline cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
