"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { FarmImagesCarousel } from "@/components/auth/FarmImagesCarousel";
import CurvedImageGallery from "@/components/auth/CurvedImageGallery";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 relative ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">
            Welcome Back
            <br />
            To <span className="text-primary">Farm</span><span className="text-primary-dark">Quest</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          <div className="text-right">
            <Link href="/forgot-password" className="text-gray-400 text-sm">
              forgot password?
            </Link>
          </div>

          <div className="pt-2">
            <AuthButton type="submit" text="Login" />
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            New to FarmQuest? <Link href="/signup" className="text-black font-medium">Sign up</Link>
          </p>
        </div>

        {/* Farm images carousel - now positioned properly */}
        {/* <FarmImagesCarousel /> */}
        <CurvedImageGallery/>
      </div>
    </div>
  );
}
