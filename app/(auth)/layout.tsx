"use client";
import { store } from "@/store";
import React from "react";
import "../../i18n";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Provider store={store}>{children}
        </Provider>
    </>
  );
}
