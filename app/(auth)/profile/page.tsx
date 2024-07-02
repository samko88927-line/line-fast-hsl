"use client";
import ProfileTabs from "@/components/profile/tabs";
import Wallet from "@/components/profile/wallet";
import Server from "@/components/server";

import React from "react";
// import useNavigationItem from "@/components/navigation/tabs";

const page = () => {
  return (
    <div className="relative p-2 flex gap-8">
      <ProfileTabs />
      <Wallet />
      {/* <Server /> */}
    </div>
  );
};

export default page;
