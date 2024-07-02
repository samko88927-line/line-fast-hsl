"use client";
import useLoginModal from "@/hooks/use-login-modal/use-login-modal";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BadgeCheck, MessageCircle, Star, Zap } from "lucide-react";

const popoverContent = [
  { icon: <BadgeCheck className="w-4 h-4" />, text: "會員特殊優惠" },
  { icon: <Zap className="w-4 h-4" />, text: "搜索更多西寧市場產品" },
  { icon: <Star className="w-4 h-4" />, text: "把喜歡常買商品收藏起來" },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    text: "與店家第一手交流",
  },
];
const SignInButton = () => {
  // const onOpen = useLoginModal((state) => state.onOpen);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.preventDefault();
        }}
        className="border-none outline-none font-light text-sm px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50text-white hover:opacity-75 transition"
      >
        {/* // onClick={() => router.push("/sign-in")} */}
        登入 / 註冊
      </PopoverTrigger>
      <PopoverContent
        className="bg-black border border-gray-800 p-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="font-bold mb-2 text-gray-200">馬上登錄即可</div>
        {popoverContent.map((item, index) => (
          <div
            key={index}
            className="font-extralight flex items-center mb-2 text-gray-200"
          >
            <div className="mr-2">{item.icon}</div>
            <div>{item.text}</div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default SignInButton;
