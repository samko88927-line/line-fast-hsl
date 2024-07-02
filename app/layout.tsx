import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import ModalProvider from "@/provider/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "西寧市場：西寧小丸子",
  description: "日式火鍋料、川島火鍋料、甜不辣，線上選購日式火鍋料的最佳選擇。",
  icons: [
    {
      url: "/svg/logo.svg",
      sizes: "any",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <Navbar />
          <div className="mt-16">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
