import Gallery from "@/components/gallery";

import Container from "@/components/ui/container";
import Info from "@/components/ui/info";
import ProductList from "@/components/ui/product-list";
import BuyingButton from "@/components/product/buying-button";
import { Product } from "@/types";
import { getProduct } from "@/actions/get-product";
import { ProductHelper } from "@/helpers/product-helper";
import ReactMarkdown from "react-markdown";
import { BadgeCheck, Zap } from "lucide-react";
import remarkGfm from "remark-gfm";
export const revalidate = 0;

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.id.split("-")[1]);
  // const suggestedProducts = await getProduct();
  if (!product) {
    return null;
  }
  const productHelper = new ProductHelper();
  const galleryData = productHelper.getAllProductImages(product);

  return (
    <div className="">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={galleryData} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <div className="mt-4 bg-black rounded-2xl p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="font-extralight"
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
              {product.description}
            </ReactMarkdown>
          </div>
          {/* <hr className="my-10" /> */}
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
          {/* <BuyingButton /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
