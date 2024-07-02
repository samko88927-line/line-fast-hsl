"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import usePaypalModal from "@/hooks/use-paypal-modal/use-paypal-modal";

interface BtnProps {
  spec: string;
  amount: number;
  payInfo: OpenModalType;
  preSaleMarketId?: string;
}
type OpenModalType = {
  amount: number;
  description: string;
  name: string;
  twPrice: number;
  usPrice: number;
  imageUrl: string;
  twdTotalPrice: number;
  usdTotalPrice: number;
  twdFee: number;
  usdFee: number;
};

const PayPalButton = ({ spec, amount, payInfo }: BtnProps) => {
  const OrderRef = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const TransactionStatus = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const handleCreateOrder = async (): Promise<any> => {
    TransactionStatus.current++;
    if (TransactionStatus.current > 1) return;
    setOnClick(true);
    try {
      // const result = await axios.request(
      //   `${process.env.NEXT_PUBLIC_API}/api/v1/paypal/orders`,
      //   "POST",
      //   {
      //     preSaleMarketId,
      //     spec,
      //     quantity: amount,
      //     price: payInfo.usPrice,
      //     currency: CurrencyEnum.USD,
      //   }
      // );
      // OrderRef.current = result.data.order.orderNo;
      // const orderData = result.data.payPalOrder;
      // if (orderData.id) {
      //   return orderData.id;
      // }
      return "123";
      setOnClick(false);
    } catch (error) {
      setOnClick(false);
      const a = error as any;
      paypalModal.onClose();
    }
  };

  const style = { layout: "vertical", shape: "rect", color: "blue" };
  const componentRef = useRef<HTMLDivElement>(null);
  const [clientToken, setClientToken] = useState(null);
  const paypalModal = usePaypalModal();
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          "https://react-paypal-js-storybook.fly.dev/api/paypal/generate-client-token",
          { method: "POST" }
        )
      ).json();
      setClientToken(response?.client_token || response?.clientToken);
    })();
  }, []);
  const handleApprove = async (data: any, actions: any): Promise<any> => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API}/api/v1/paypal/orders/${data.orderID}/capture`,
      // );

      paypalModal.onClose();
      // if (orderData.code && orderData.code == 200) {
      //   paypalModal.onClose();
      //   router.push(pathname + "?purchaseResult=true");
      // } else {
      //   paypalModal.onClose();
      //   router.push(pathname + "?purchaseResult=false");
      // }
    } catch (error: any) {
      // router.push(pathname + "?purchaseResult=false");

      paypalModal.onClose();
    }
  };
  return (
    <>
      {clientToken ? (
        <PayPalScriptProvider
          options={{
            clientId:
              "AYVBs1OhvIjAlli8g3D6vZRvSS4e-HBEsQYBZtu-Z0o_8pd6zLcMQPU4NajVk6y6IYwy8528coRXSm05",
            components: "buttons,hosted-fields,marks,funding-eligibility",
            dataClientToken: clientToken,
            intent: "capture",
            vault: false,
          }}
        >
          <div className={`overflow-y-auto w-full`} ref={componentRef}>
            <PayPalButtons
              style={{
                layout: "vertical",
                shape: "rect",
                color: "blue",
              }}
              onClick={() => setIsLoading(true)}
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
            />
          </div>
        </PayPalScriptProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default PayPalButton;
