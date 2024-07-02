import { ProductHelper } from "@/helpers/product-helper";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[36rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ProductVerticalCard = ({ item }: { item: Product }) => {
  const productHelper = new ProductHelper();
  const salePercentage = productHelper.calculateSalePercentage(
    item.price,
    item.salePrice
  );

  // const productHelper = ProductHelper.calculateSalePercentage();
  return (
    <div
      className={`rounded-2xl shadow-2xl overflow-hidden bg-black bg-opacity-50 `}
      // onClick={handleProductClick}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-full">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-2xl w-full object-cover "
          />
          {salePercentage && (
            <div className="absolute bottom-3 right-3 bg-orange-700 font-thin text-sm rounded-md px-2 py-1 text-white">
              {salePercentage}
            </div>
          )}
          <button className="absolute top-3 right-3">
            <IconHeart stroke={1} />
          </button>
        </div>
        <div className="mt-2 w-full p-2 px-4 relative">
          <h3 className="text-sm font-light">{item.title}</h3>
          <p className="text-xs text-gray-500 font-extralight">
            {item.brandId}
          </p>
          {item.salePrice > 0 ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-light">NT {item.salePrice}</span>
              <span className="text-xs font-extralight line-through text-gray-500">
                {item.price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold">{item.price}</span>
          )}
          <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-tl-2xl text-white">
            <IconShoppingCart stroke={1} />
          </button>
        </div>
      </div>
    </div>
  );
};
