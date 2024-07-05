import { getBillboardJson } from "@/actions/get-billboard";
import { ProductsGrid } from "@/components/home/products-grid-area";
import Billboard from "@/components/home/billboard";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "./data.js";
import VideoComponent from "@/components/home/video";
import getVideo from "@/actions/get-video";
import { getProducts } from "@/actions/get-product";
import ContactInfo from "@/components/home/contact-info";

export default async function Home() {
  // const billboard = await getBillboard(); //Billboard Id
  // const reponse = await getProducts(); //Billboard Id
  const videoId = "49";
  const video = await getVideo(videoId); //Billboard Id
  return (
    <>
      {/* <Billboard data={getBillboardJson} />
      <ProductsGrid data={reponse.products} />
      <ContactInfo /> */}
      {/* <Banner /> */}
      <VideoComponent data={video} />
      {/* <div className="h-auto w-full bg-background bg-grid-small-white/[0.2] relative flex justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="h-[30rem] rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        />
        </div> 
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
      </div> */}
    </>
  );
}
