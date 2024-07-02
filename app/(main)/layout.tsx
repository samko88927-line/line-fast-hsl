"use client";
// import { store } from "@/store";
import React from "react";
import "../../i18n";
import Footer from "@/components/common/footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden grid justify-center bg-[url('/texture/noise-light.png')]">
      <div className="max-w-screen-xl">
        {children}
        <Footer />
      </div>
    </div>
  );
}
