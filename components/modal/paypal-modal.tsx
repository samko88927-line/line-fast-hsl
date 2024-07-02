"use client";

import usePaypalModal from "@/hooks/use-paypal-modal/use-paypal-modal";
import Modal from "../ui/modal-headless-ui";
import PayPalButton from "../payment/paypal/paypal-sdk";
import Image from "next/image";

const PaypalModal = () => {
  const paypalModal = usePaypalModal();
  const PayPalBtnData = usePaypalModal((state) => state.data);

  if (!PayPalBtnData) {
    return null;
  }
  return (
    <Modal open={paypalModal.isOpen} onClose={paypalModal.onClose}>
      <div className="font-sans  gap-4 w-full bg-white text-black text-center flex items-center justify-center flex-col">
        <Image
          src={"/img/PayPal_Logo_Vertical_Full_Color_RGB.png"}
          priority={true}
          width={0}
          height={0}
          sizes="100vw"
          alt={"paypal logo"}
          style={{ width: "auto", height: "46px" }}
        />
        <div className="text-lg">Pay with PayPal in 西寧小丸子</div>
        <div className="w-2/3 text-sm">
          With a PayPal account, you &apos;re eligible for Purchase Protection
          and Rewards.
        </div>
        <PayPalButton
          spec={PayPalBtnData.spec}
          amount={PayPalBtnData.amount}
          payInfo={PayPalBtnData.payInfo}
        />
      </div>
    </Modal>
  );
};

export default PaypalModal;
