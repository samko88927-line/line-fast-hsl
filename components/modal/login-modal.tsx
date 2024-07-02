"use client";

import useLoginModal from "@/hooks/use-login-modal/use-login-modal";
import Modal from "../ui/modal";
import IconButton from "../ui/icon-button";
// import { MetaMask, WalletConnect, Google, Email } from "@/public/svg";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const loginModal = useLoginModal();
  // const { loginMagicWallet, } = useMagicWallet();
  const router = useRouter();
  const handleLoginClick = () => {
    // loginMagicWallet();
    router.push("/profile");
  };
  return (
    <Modal open={loginModal.isOpen} onClose={loginModal.onClose}>
      <div className="flex flex-col gap-4 text-center w-full">
        <p>歡迎來到西寧小丸子</p>
        <p>立即登入 西寧小丸子</p>
        <div>
          <form>
            <input
              type="email"
              name="email"
              className="text-black w-full px-4 py-3.5 rounded-xl"
              required
              placeholder="Enter your email"
            />
            <Button className="mt-4 flex items-center justify-center w-full border-[1px] border-border border-solid gap-1">
              {/* <IconButton className="w-[32px] h-[32px]" icon={<Email />} /> */}
              <p>使用 Email 繼續</p>
            </Button>
          </form>

          {/* <div className={cn("py-4 flex items-center", styles.hr)}>
                <p>or</p>{" "}
                <div className="ml-2 w-full  bg-white opacity-20 h-[0.1px]"></div>
              </div> */}
          {/* <WideButton
            onClick={handleLoginClick}
            isLoading={isLoading}
            isDisabled={isWebView.buttonDisable}
          > */}
          <Button
            onClick={handleLoginClick}
            className="mt-4 flex items-center justify-center w-full border-[1px] border-border border-solid"
          >
            {/* <IconButton className="w-[32px] h-[32px]" icon={<Google />} /> */}
            <p>使用 Google 繼續</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
