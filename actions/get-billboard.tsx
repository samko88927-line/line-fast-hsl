import { BillboardType } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboard/find`;
const URL = "https://img.linetv.tw/WEB/api/staging/web_banners.json";

const getBillboardJson: BillboardType[] = [
  {
    link: "https://bit.ly/3s6Y2Tj",
    image:
      "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-1.jpg",
  },
  {
    link: "/",
    image:
      "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-2.jpg",
  },
  {
    link: "/",
    image:
      "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-3.jpg",
  },

  {
    link: "/",
    image:
      "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-4.jpg",
  },
  // ,
  // {
  //   title: "FAST",
  //   link: "https://reurl.cc/OjNY3g",
  //   image:
  //     "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-3.png",
  // },
  // {
  //   title: "聖水洞之吻",
  //   link: "/drama/15834/eps/1",
  //   image:
  //     "https://res.cloudinary.com/dgr5mhnbn/image/upload/v1719123655/hot-pot-mom/index-banners/promo-banner-4.png",
  // },
];

const getBillboard = async (): Promise<BillboardType[]> => {
  const res = await fetch(`${URL}`, {
    next: { revalidate: 3600 }, //per second
  });

  return res.json();
};

export { getBillboard, getBillboardJson };
