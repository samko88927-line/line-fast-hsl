"use client";
import useLoginModal from "@/hooks/use-login-modal/use-login-modal";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useBuyingModal from "@/hooks/use-buying-modal/use-buying-modal";
import Image from "next/image";
import usePaypalModal from "@/hooks/use-paypal-modal/use-paypal-modal";

const BuyingButton = () => {
  const onOpen = usePaypalModal((state) => state.onOpen);
  const router = useRouter();
  const onPaypalPage = () => {
    const data = {
      spec: "spec",
      amount: 1,
      payInfo: "123",
    };
    onOpen(data);
  };
  return (
    // <Button
    //   className="border-none bg-gradient-to-r from-primary-purple to-primary-blue"
    //   onClick={onOpen}
    // >
    //   前往去購買
    // </Button>
    <Button
      className="uppercase mt-10 font-sans flex gap-2 border border-solid border-white"
      onClick={() => onPaypalPage()}
    >
      <div className="mr-4 text-lg">pay with</div>
      <Image
        src={"/img/PayPal_Logo_Horizontal_One_Color_Transparent_RGB_White.png"}
        priority={true}
        width={0}
        height={0}
        sizes="100vw"
        alt={"paypal logo"}
        style={{ width: "auto", height: "24px" }}
      />
    </Button>
  );
};

export default BuyingButton;
