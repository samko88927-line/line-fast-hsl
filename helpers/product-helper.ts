import { Image, Product } from "@/types";

export class ProductHelper {
    products: Product[] = [];
    cartQuantity: number = 0;
    variationStockStatus: string = "";
    selectedAttributes: Map<string, any> = new Map();
    selectedProductImage: string = "";
    productImages: string[] = [];
    favorites: Map<string, boolean> = new Map();

    // initializeAlreadyAddedProductCount(product: ProductModel) {
    //   if (product.productVariations == null || product.productVariations.length === 0) {
    //     this.cartQuantity = CartController.instance.calculateSingleProductCartEntries(product.id, '');
    //   } else {
    //     const variationId = this.selectedVariation.id;
    //     if (variationId) {
    //       this.cartQuantity = CartController.instance.calculateSingleProductCartEntries(product.id, variationId);
    //     } else {
    //       this.cartQuantity = 0;
    //     }
    //   }
    // }
  
    updateSelectedProductImage(image: string) {
      this.selectedProductImage = image;
    }
  
    getAllProductImages(product: Product): Image[] {
      const images = new Set<Image>();
  
      this.selectedProductImage = product.image;
      
      if (product) {
          images.add({id:product._id, url:product.image });
      }
  
      if (product.productVariations) {
        product.productVariations.forEach(variation => images.add({id:variation.id, url:variation.image }));
      }
  
      return Array.from(images);
    }
  
    // getProductBrand(brandId: string | null): BrandModel {
    //   return TDummyData.brands.find(brand => brand.id === brandId)!;
    // }
  
    // getProductPrice(product: ProductModel): string {
    //   let smallestPrice = Number.MAX_VALUE;
    //   let largestPrice = 0;
  
    //   if (!product.productVariations || product.productVariations.length === 0) {
    //     return (product.salePrice ?? product.price).toString();
    //   } else {
    //     product.productVariations.forEach(variation => {
    //       const priceToConsider = variation.salePrice ?? variation.price;
  
    //       if (priceToConsider < smallestPrice) {
    //         smallestPrice = priceToConsider;
    //       }
  
    //       if (priceToConsider > largestPrice) {
    //         largestPrice = priceToConsider;
    //       }
    //     });
  
    //     if (smallestPrice === largestPrice) {
    //       return largestPrice.toString();
    //     } else {
    //       return `${smallestPrice} - ${largestPrice}`;
    //     }
    //   }
    // }
  
    calculateSalePercentage(
      originalPrice: number,
      salePrice?: number
    ): string | null {
      if (!salePrice) return null;
      if (originalPrice <= 0 || salePrice <= 0) return null;
  
      const percentage = ((originalPrice - salePrice) / originalPrice) * 100;
  
      const discount = 10 - percentage / 10; // 轉換成打幾折，例如 28% 轉換成 7.2 折
  
      // 將打折數直接轉換成中文表示，捨棄小數部分
      const chineseDiscount = this.convertToChineseDiscount(discount);
  
      return chineseDiscount;
    }
    // 將打折數轉換成中文表示，捨棄小數部分，例如 7.2 折轉換成 七折
    convertToChineseDiscount(discount: number): string {
      const integerPart = Math.floor(discount); // 取整數部分
  
      // 定義中文數字的映射
      const chineseDigits = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
  
      let chineseDiscount = "打";
  
      // 處理整數部分
      if (integerPart === 10) {
        chineseDiscount += "一"; // 十折特殊處理
      } else if (integerPart > 1) {
        chineseDiscount += chineseDigits[integerPart];
      }
  
      chineseDiscount += "折"; // 添加折字
  
      return chineseDiscount;
    }
  
    // getProductStockStatus(product: Product): string {
    //   return product.stock > 0 ? '尚有存貨' : '備貨中';
    // }
  
    // getProductVariationStockStatus() {
    //   this.variationStockStatus = this.selectedVariation.stock > 0 ? '尚有存貨' : '備貨中';
    // }
  
    // onAttributeSelected(product: ProductModel, attributeName: string, attributeValue: any) {
    //   this.selectedAttributes.set(attributeName, attributeValue);
  
    //   const selectedAttributes = Array.from(this.selectedAttributes.entries()).reduce((acc, [key, value]) => {
    //     acc[key] = value;
    //     return acc;
    //   }, {} as any);
  
    //   const selectedVariation = product.productVariations!.find(variation =>
    //     this._isSameAttributeValues(variation.attributeValues, selectedAttributes)) ?? ProductVariationModel.empty();
  
    //   if (selectedVariation.image) {
    //     this.selectedProductImage = selectedVariation.image;
    //   }
  
    //   if (selectedVariation.id) {
    //     this.cartQuantity = CartController.instance.calculateSingleProductCartEntries(product.id, selectedVariation.id);
    //   }
  
    //   this.selectedVariation = selectedVariation;
    //   this.getProductVariationStockStatus();
    // }
  
    // _isSameAttributeValues(variationAttributes: { [key: string]: any }, selectedAttributes: { [key: string]: any }): boolean {
    //   const variationKeys = Object.keys(variationAttributes);
    //   const selectedKeys = Object.keys(selectedAttributes);
  
    //   if (variationKeys.length !== selectedKeys.length) return false;
  
    //   return variationKeys.every(key => variationAttributes[key] === selectedAttributes[key]);
    // }
  
    // getAttributesAvailabilityInVariation(variations: ProductVariationModel[], attributeName: string): Set<any> {
    //   return new Set(variations
    //     .filter(variation => variation.attributeValues[attributeName] && variation.stock > 0)
    //     .map(variation => variation.attributeValues[attributeName])
    //   );
    // }
  
    // addProductToCart(product: ProductModel) {
    //   if (!product.productVariations || product.productVariations.length === 0) {
    //     CartController.instance.addMultipleItemsToCart(product, ProductVariationModel.empty(), this.cartQuantity);
    //   } else {
    //     const variation = this.selectedVariation;
    //     if (!variation.id) {
    //       alert('To add items in the cart you first have to select a Variation of this product.');
    //     } else {
    //       CartController.instance.addMultipleItemsToCart(product, variation, this.cartQuantity);
    //     }
    //   }
    // }
  
    // isFavourite(productId: string): boolean {
    //   return this.favorites.get(productId) ?? false;
    // }
  
    // toggleFavoriteProduct(productId: string) {
    //   if (!this.favorites.has(productId)) {
    //     this.favorites.set(productId, true);
    //   } else {
    //     this.favorites.set(productId, !this.favorites.get(productId)!);
    //   }
    // }
  
    // favoriteProducts(): ProductModel[] {
    //   return this.products.filter(product => this.isFavourite(product.id));
    // }
  }
  