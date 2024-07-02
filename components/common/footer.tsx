import React from "react";
import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";

const footerLinks = [
  {
    category: "primary",
    items: [
      { content: "最新消息", link: "/info" },
      { content: "探索", link: "/" },
      { content: "定價", link: "#" },
      { content: "購物流程", link: "#" },
    ],
  },
  {
    category: "secondary",
    items: [
      {
        content: "條款",
        link: "https://drive.google.com/file/d/111eYGDKbKN4jdm8PwFf9Fn2Xt7rBW1ma/view",
      },
      {
        content: "隱私權",
        link: "https://drive.google.com/file/d/111eYGDKbKN4jdm8PwFf9Fn2Xt7rBW1ma/view",
      },
      {
        content: "安全性",
        link: "https://drive.google.com/file/d/111eYGDKbKN4jdm8PwFf9Fn2Xt7rBW1ma/view",
      },
      { content: "客服專區", link: "https://www.ecpay.com.tw/" },
    ],
  },
  // , 蝦皮 Line APP
  // {
  //   category: "social",
  //   items: [
  //     { content: <IconBrandFacebook />, link: "#" },
  //     { content: <IconBrandFacebook />, link: "#" },
  //     { content: <IconBrandFacebook />, link: "#" },
  //     { content: <IconBrandFacebookFilled />, link: "#" },
  //   ],
  // },
];
const Footer = () => {
  const renderLinks = (category: any) =>
    footerLinks
      .find((section) => section.category === category)
      ?.items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="font-light text-gray-200 hover:text-gray-300"
        >
          {item.content}
        </a>
      ));
  return (
    <footer className="p-8 ">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="flex space-x-4 items-center mb-4 md:mb-0">
          <div className="font-bold text-lg">西寧小丸子官方網站</div>
          {renderLinks("primary")}
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          {renderLinks("secondary")}
        </div>
        {/* <div className="flex space-x-4">{renderLinks("social")}</div> */}
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";

// const Footer = () => {
//   const footerData = [
//     {
//       title: "購物說明",
//       items: [
//         { text: "購物流程及會員說明", link: "#" },
//         { text: "產品常見問題", link: "#" },
//         { text: "退換貨&退款說明", link: "#" },
//         { text: "隱私權聲明條款與細則", link: "#" },
//       ],
//     },
//     {
//       title: "會員服務",
//       items: [
//         { text: "會員登入", link: "#" },
//         { text: "註冊會員", link: "#" },
//         { text: "忘記密碼", link: "#" },
//         // { text: 'LINE客服: @peibo.tw', link: '#' },
//       ],
//     },
//     {
//       title: "聯絡我們",
//       items: [
//         {
//           text: "客服時間：週一~週日 24小時",
//           link: "https://www.ecpay.com.tw/",
//         },
//         { text: "客服電話：02-2655-1775", link: "https://www.ecpay.com.tw/" },
//         {
//           text: "客服信箱：service@ecpay.com.tw",
//           link: "https://www.ecpay.com.tw/",
//         },
//         {
//           text: "地址：台北市南港區三重路19-2號D棟6樓之2",
//           link: "https://www.ecpay.com.tw/",
//         },
//       ],
//     },
//   ];
//   return (
//     <footer className="p-8">
//       <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {footerData.map((section, index) => (
//           <div key={index}>
//             <h2 className="mb-4">{section.title}</h2>
//             <ul>
//               {section.items.map((item, idx) => (
//                 <li key={idx} className="mb-2 text-xs font-extralight">
//                   {item?.link ? (
//                     <a href={item?.link}>{item.text}</a>
//                   ) : (
//                     item.text
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </footer>
//   );
// };

// export default Footer;
