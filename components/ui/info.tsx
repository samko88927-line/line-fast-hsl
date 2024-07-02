"use client";

import Currency from "@/components/ui/currency";
// import Button from "@/components/ui/button-1";
import { Product, ProductVariation } from "@/types";
import { useState } from "react";
import { BadgeCheck, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { IconHeart } from "@tabler/icons-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);

  const handleVariationClick = (variation: ProductVariation) => {
    setSelectedVariation(variation);
  };
  const [expandedVariationIds, setExpandedVariationIds] = useState<string[]>(
    []
  );

  const toggleExpand = (id: string) => {
    setExpandedVariationIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((variationId) => variationId !== id)
        : [...prevIds, id]
    );
  };
  return (
    <div className="p-6 bg-black rounded-lg shadow-md">
      <div className="flex items-center justify-between px-1">
        <button
          className="text-sm font-normal flex gap-2 items-center"
          onClick={() => {
            // switchPage();
          }}
        >
          查看 - {data.brandId} 系列
          <BadgeCheck className="w-4 h-4" fill="green" />
        </button>
        <button>
          <IconHeart stroke={1} size={16} />
        </button>
      </div>
      <div className="mt-1 flex text-xl justify-between">
        <h1 className="font-bold">{data.title}</h1>
        <p className="font-extralight">
          <Currency value={data.salePrice} />
        </p>
      </div>
      <hr className="my-4 border-gray-800" />
      <div className="mt-4">
        {data?.productAttributes.map((attr) => (
          <div className="grid justify-start gap-2" key={attr._id}>
            <p className="font-extralight">{attr.name}</p>
            {attr.values.map((val, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded-lg bg-primary text-white
                  //   selectedVariation?.id === attr._id
                  //     ? "bg-primary text-white"
                  //     : "bg-gray-700 "
                  `}
                //  onClick={() => handleVariationClick(attr)}
              >
                {val}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-6">
        {/* <div className="flex items-center gap-x-4">
          <div className="flex gap-x-2">
            {data.productVariations.map((variation) => (
              <button
                key={variation.id}
                className={`py-2 px-4 border text-black rounded ${
                  selectedVariation?.id === variation.id
                    ? "bg-red-600 text-white"
                    : "bg-white"
                }`}
                onClick={() => handleVariationClick(variation)}
              >
                {variation.description.split("\n")[1].split("：")[1]}
              </button>
            ))}
          </div>
        </div> */}
        {data?.productVariations?.map((variation, index) => (
          <div className="mt-4 font-extralight" key={index}>
            <ReactMarkdown
              className={`font-extralight ${
                expandedVariationIds.includes(variation.id)
                  ? ""
                  : "line-clamp-3"
              }`}
              components={{
                hr: ({ node, ...props }) => (
                  <hr className="my-4 border-t-1 border-gray-700" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="my-2 font-normal" {...props} />
                ),
                p: ({ node, ...props }) => <p className="my-2" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside ml-4" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              }}
            >
              {variation.description}
            </ReactMarkdown>
            <button
              className="text-blue-500 mt-2 w-full flex justify-end text-sm"
              onClick={() => toggleExpand(variation.id)}
            >
              {expandedVariationIds.includes(variation.id)
                ? "收回"
                : "查看更多"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
