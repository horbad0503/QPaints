"use client";

import Link from "next/link";
import { X, User } from "lucide-react";

export function AuthModal({
  isOpen,
  onClose,
  mode, // "register" | "login"
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: "register" | "login";
}) {
  if (!isOpen) return null;

  const isRegister = mode === "register";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 md:p-12 shadow-2xl animate-[slideDownSearch_0.3s_ease-out_forwards]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 transition hover:text-black"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        <h2 className="mb-12 text-center font-nexa text-3xl font-bold text-black">
          {isRegister ? "Create Your Account" : "Login as"}
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Individual Card */}
          <Link
            href={isRegister ? "/register" : "/login"}
            onClick={onClose}
            className="group flex flex-1 flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#fafafa] p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white transition group-hover:bg-brand-dark">
              <User size={32} />
            </div>
            <h3 className="mb-2 font-nexa text-xl font-bold text-black">
              Individual
            </h3>
            {isRegister && (
              <p className="font-nexa text-sm text-gray-600">
                Get access to premium paints and professional services.
              </p>
            )}
          </Link>

          {/* Retailer Card */}
          <Link
            href={isRegister ? "/retailers/register" : "/retailers/login"}
            onClick={onClose}
            className="group flex flex-1 flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#fafafa] p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white transition group-hover:bg-brand-dark">
              <User size={32} />
            </div>
            <h3 className="mb-2 font-nexa text-xl font-bold text-black">
              Retailer
            </h3>
            {isRegister && (
              <p className="font-nexa text-sm text-gray-600">
                Join our network of eco-conscious retailers and access wholesale prices.
              </p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}