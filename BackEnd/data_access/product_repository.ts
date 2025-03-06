import Product, { IProduct } from "../models/product";

export class ProductRepository {
  //Get all products
  async findAllProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  //Get Single Product by id
  async findProductById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  //Create new prouduct
  async createNewProduct(productData: any): Promise<IProduct> {
    const new_product = new Product(productData);
    return await new_product.save();
  }

  // Update product
  async update(id: string, productData: any): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  // Delete product
  async delete(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }
}
