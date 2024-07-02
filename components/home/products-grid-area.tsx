import React from "react";
import { BentoGrid, ProductVerticalCard } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Link from "next/link";
import { Product } from "@/types";
interface ProductsGridProps {
  data: Product[];
}
export function ProductsGrid({ data }: ProductsGridProps) {
  return (
    <BentoGrid className="lg:max-w-6xl mx-auto relative px-8">
      {data.map((item, i) => (
        <Link
          href={`/product/${item.title + "-" + item._id}`}
          key={i}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        >
          <ProductVerticalCard item={item} />
        </Link>
      ))}
    </BentoGrid>
  );
}
//
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br  from-neutral-900 to-neutral-800 "></div>
);
