"use client";
import ProfileTabs from "@/components/profile/tabs";
import Wallet from "@/components/profile/wallet";

import React from "react";
// import useNavigationItem from "@/components/navigation/tabs";

const page = () => {
  return (
    <div className="relative p-2 flex gap-8">
      <ProfileTabs />
      <Wallet />
    </div>
  );
};

export default page;
