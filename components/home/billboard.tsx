"use client";
import { BillboardType } from "@/types";
import { SparklesCore } from "../ui/sparkles";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
interface BillboardProps {
  data: BillboardType[];
}

const Billboard = ({ data }: BillboardProps) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-6xl relative"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => {
          plugin.current.play();
        }}
      >
        {data?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="w-full p-4 sm:p-6 lg:px-8 rounded-xl overflow-hidden relative">
              <div
                style={{ backgroundImage: `url(${item?.image})` }}
                className="rounded-xl relative aspect-square md:aspect-[4/1]  overflow-hidden bg-cover flex-shrink-0"
              >
                {item?.title && (
                  <div className="h-full w-full opacity-85 p-4">
                    <div className="h-full relative flex items-end justify-start  ">
                      <div className="relative font-bold text-xl sm:text-xl lg:text-xl sm:max-w-xl max-w-xs">
                        {item?.title}
                        <div className="absolute inset-x-1 bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-1 bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-10 bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-10 bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                      </div>
                    </div>

                    {/* Radial Gradient to prevent sharp edges */}
                    {/* <div className="absolute inset-0 w-full h-full bg-black lg:[mask-image:radial-gradient(200px_100px_at_top,transparent_10%,white)]"></div> */}
                  </div>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-transparent absolute left-12 text-white" />
      <CarouselNext className="bg-transparent absolute right-12  text-white" />
    </Carousel>
  );
};

export default Billboard;
