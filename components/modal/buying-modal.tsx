"use client";
import Modal from "../ui/modal";
import IconButton from "../ui/icon-button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useBuyingModal from "@/hooks/use-buying-modal/use-buying-modal";
import Image from "next/image";
const BuyingModal = () => {
  const buyingModal = useBuyingModal();
  const router = useRouter();
  const onPaypalPage = () => {
    const data = {
      spec: "spec",
      amount: 1,
      payInfo: "123",
    };
    // paypalModal.onOpen(data);
  };
  return (
    <Modal open={buyingModal.isOpen} onClose={buyingModal.onClose}>
      <div className="">
        支付方式
        <Button
          className="uppercase mt-10 font-sans flex gap-2 border border-solid border-white"
          onClick={() => onPaypalPage()}
        >
          <div className="mr-4 text-lg">pay with</div>
          <Image
            src={
              "/img/PayPal_Logo_Horizontal_One_Color_Transparent_RGB_White.png"
            }
            priority={true}
            width={0}
            height={0}
            sizes="100vw"
            alt={"paypal logo"}
            style={{ width: "auto", height: "24px" }}
          />
        </Button>
      </div>
    </Modal>
  );
};

export default BuyingModal;
