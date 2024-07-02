import { infos } from "@/components/info/data";
import { InfoList } from "@/components/info/info-list";
import { Separator } from "@/components/ui/separator";
import React from "react";

const InfoPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center px-8 pt-4 pb-2">
        <h1 className="text-xl font-bold">網站最新消息</h1>
      </div>
      <div className="py-2">
        <InfoList items={infos} />
      </div>
    </div>
  );
};

export default InfoPage;
