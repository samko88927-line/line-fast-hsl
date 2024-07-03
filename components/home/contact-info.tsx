import React from "react";
import Image from "next/image";

const ContactInfo = () => {
  const items = [
    { text: "客服時間：週一~週日 24小時", link: "https://www.ecpay.com.tw/" },
    { text: "客服電話：02-2655-1775", link: "https://www.ecpay.com.tw/" },
    {
      text: "客服信箱：service@ecpay.com.tw",
      link: "https://www.ecpay.com.tw/",
    },
    {
      text: "地址：台北市南港區三重路19-2號D棟6樓之2",
      link: "https://www.ecpay.com.tw/",
    },
  ];

  return (
    <div className="p-4 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-800 bg-black font-extralight">
      <h2 className="mb-2">聯絡我們</h2>
      <hr className="my-4 border-t-1 border-gray-700" />
      <div className="flex items-center gap-4 px-4">
        <Image
          src={"/svg/ecpay_logo.svg"}
          alt="綠界科技 Icon"
          width={120}
          height={50}
          className="w-auto h-auto"
        />
        <div>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
