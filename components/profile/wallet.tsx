"use client";
import useMetaMask from "@/hooks/use-metamask/use-meta-mask";
import { MetaMask } from "@/public/svg";
import { RootState } from "@/store";
import { PlusIcon, RotateCw } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const Wallet = () => {
  const { t } = useTranslation();
  const { walletsList } = useSelector((state: RootState) => state.walletsList);
  const { handleOpenAddWallet } = useMetaMask();
  return (
    <div className="relative p-2 bg-black border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col gap-2">
      <div className="">{t("user-wallet")}</div>
      <div className="text-[14px]">{t("user-wallet-info")}</div>
      <div className="w-full flex flex-2 flex-col gap-4 py-8 ">
        <div className="text-fuchsia-200 text-base font-medium font-['Noto Sans TC'] leading-relaxed">
          {t("wallet-balance")}
        </div>

        {walletsList[0] && (
          <button className="flex text-sm justify-center items-center gap-2">
            <RotateCw className="w-4 h-4" />
            <span>Retry for Connect to new Wallet</span>
          </button>
        )}

        <button
          onClick={handleOpenAddWallet}
          className="flex flex-1  py-2 rounded-[0.75rem] gap-1 items-center"
        >
          <PlusIcon className="w-4 h-4" />
          <MetaMask className="w-6 h-6" />
          <span className="gap-1 flex items-center justify-center uppercase">
            MetaMask
          </span>
        </button>
      </div>
    </div>
  );
};

export default Wallet;
