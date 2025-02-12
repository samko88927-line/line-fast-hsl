"use client";
import React from "react";
import Footer from "@/components/common/footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden grid justify-center bg-[url('/texture/noise-light.png')]">
      <div className="max-w-screen-xl">
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
