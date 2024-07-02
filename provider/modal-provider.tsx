"use client";

import BuyingModal from "@/components/modal/buying-modal";
import LoginModal from "@/components/modal/login-modal";
import PaypalModal from "@/components/modal/paypal-modal";
import { useEffect, useState } from "react";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <BuyingModal />
      <PaypalModal />
    </>
  );
};

export default ModalProvider;
