import { PaginatedProducts, Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`, {
    next: { revalidate: 200 }, //per second
  });
  return res.json();
};

const getProducts = async (): Promise<PaginatedProducts> => {
  const res = await fetch(URL, {
    next: { revalidate: 100 }, //per second
  });
  return res.json();
};

export { getProduct, getProducts };
