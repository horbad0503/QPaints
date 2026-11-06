"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Header } from "@/components/layout/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.includes("login");
  
  const [modalOpen, setModalOpen] = useState(false);
  const modalMode = isLogin ? "login" : "register";

  const bgImage = isLogin ? "/images/Rectangle 251.png" : "/images/AdobeStock_42110093-2560x1707.jpeg.jpg";

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-white pt-14 md:pt-20">
        {/* Left Image Side */}
        <div className="relative hidden w-1/2 lg:block">
          <img src={bgImage} alt="Qualitas Paint" className="absolute inset-0 h-full w-full object-cover" />
        </div>

        {/* Right Form Side */}
        <div className="relative flex w-full flex-col justify-center px-5 py-8 lg:w-1/2 lg:px-20 xl:px-32">
          
          {/* Back Arrow Triggering Modal */}
          <button 
            onClick={() => setModalOpen(true)}
            className="absolute left-5 top-6 md:left-8 md:top-12 text-black transition hover:-translate-x-1"
          >
            <ArrowLeft size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
          </button>

          <div className="mx-auto w-full max-w-md mt-6 md:mt-10">
            {children}
          </div>
        </div>

        <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} mode={modalMode} />
      </div>
    </>
  );
}