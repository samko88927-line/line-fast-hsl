"use client";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Account,
  Logout,
  Redeem,
  Language,
  Nft,
  Wallet,
  ReebokLogo,
} from "@/public/svg";
import { TabEnum } from "@/hooks/use-profile-tabs/use-profile-tabs";
import IconButton from "../ui/icon-button";
import { Meteors } from "../ui/meteors";
import { useTranslation } from "react-i18next";

export type NavigationItems = {
  id: string;
  name: string;
  icon?: (hoverActive: boolean, clickActive: boolean) => JSX.Element;
  action: () => void;
}[];

const ProfileTabs = () => {
  // const { triggerLogout } = useLogin();
  const router = useRouter();
  const { t } = useTranslation();
  const profileTabsItems = [
    {
      id: TabEnum.setting,
      name: t("user-profile-settings"),
      active: true,
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Account
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => router.push("/profile"),
    },
    {
      id: TabEnum.myWallet,
      name: t("user-profile-wallet"),
      active: false,
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Wallet
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => router.push("/profile?myWallet"),
    },
    {
      id: TabEnum.myOrder,
      name: "訂單",
      active: false,
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Nft
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => router.push("/profile?nftMarket=true"),
    },
    {
      id: TabEnum.myProduct,
      name: t("my-redemption-items"),
      active: false,
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Redeem
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => router.push("/profile?myRedeem=true"),
    },
    {
      id: TabEnum.language,
      name: t("language-settings"),
      active: false,
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Language
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => {
        console.log("open");
        // dispatch(openLanguageOptionModal());
      },
    },
    {
      id: TabEnum.logout,
      name: t("logout"),
      icon: (hoverActive: boolean, clickActive: boolean) => (
        <IconButton
          className="w-[24px] h-[24px]"
          icon={
            <Logout
              style={{
                fill: hoverActive
                  ? "#faf4fd"
                  : clickActive
                  ? "#faf4fd"
                  : "#f6e2ff",
              }}
            />
          }
        />
      ),
      action: () => {
        // await triggerLogout();
        // logOutMagicWallet();
      },
    },
  ];
  const [activeTab, setActiveTab] = useState(profileTabsItems);
  const handleChipClick = (index: number, action: any) => {
    const updatedTabsData = activeTab.map((tab, i: number) => {
      return { ...tab, active: i === index ? !tab.active : false };
    });
    setActiveTab(updatedTabsData);
    action();
  };

  return (
    <>
      <div className="w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full transform scale-[0.80] bg-red-500 rounded-full " />
        <div className="relative shadow-xl bg-black border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col gap-2">
          {activeTab?.map((item, index: number) => (
            <>
              <div
                onClick={() => handleChipClick(index, item.action)}
                key={index}
                className={`px-8 py-4 rounded-full relative flex items-center gap-2
              ${
                item.active ? "bg-slate-700" : ""
              } text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600`}
              >
                <div>{item.icon(false, item.active || false)}</div>
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-primary-purple to-transparent" />
                <span className="relative z-20">{item.name}</span>
              </div>
            </>
          ))}
          <Meteors number={20} />
        </div>
      </div>
    </>
  );
};

export default ProfileTabs;
