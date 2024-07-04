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
  const items2 = [
    { text: "西寧廠商電話：09-3968-6810" },
    { text: "西寧平台維護電話：09-3973-8669" },
    {
      text: "客服信箱：samko0927@gmail.cpm",
    },
    {
      text: "地址：西寧市場B1處120號攤位",
    },
  ];

  return (
    <div className="p-4 rounded-lg shadow-lg max-w-lg lg:max-w-6xl mx-auto border border-gray-800 bg-black font-extralight">
      <div className="grid grid-cols-2 gap-16">
        <h2>聯絡金流方</h2>
        <h2>聯絡商店方</h2>
      </div>
      <hr className="my-4 border-t-1 border-gray-700" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        <div className="flex items-center gap-4 px-4">
          <Image
            src={"/img/logo.png"}
            alt="西寧小丸子 Icon"
            width={120}
            height={50}
            className="w-auto h-auto rounded-xl"
          />
          <div>
            <ul className="space-y-1">
              {items2.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
