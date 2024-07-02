/** LINE TV **/
export interface VideoType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  scheduleType: string;
  horizontalPosterUrl: string;
  verticalPosterUrl: string;
  launchedAt: number;
  programSchedule: {
    id: number;
    startedAt: number;
    liveProgram: {
      id: number;
      liveProgramName: string;
      playbackUrl: string;
      liveSource: string;
      verticalPosterUrl: string;
      horizontalPosterUrl: string;
      adType: string;
      contentRatingId: number;
    };
  };
  nextProgramSchedule: object;
}

export interface productAttributes {
  _id: string;
  name: string;
  values: [];
}

export interface ProductVariation {
  id: string;
  image: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
}

export interface Product {
  _id: string;
  title: string;
  stock: number;
  isFeatured: boolean;
  image: string;
  description: string;
  brandId: string;
  price: number;
  salePrice: number;
  categoriesId: string;
  productAttributes: productAttributes[];
  productVariations: ProductVariation[];
  reviews: any[];
  rating: number;
  numReviews: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  products: Product[];
  page: number;
  pages: number;
}

export interface Image {
  id: string;
  url: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BillboardType {
  id?: string;
  title?: string;
  link: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: BillboardType;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
