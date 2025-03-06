import { ProductRepository } from "../data_access/product_repository";
import { IProduct } from "../models/product";

export class ProductService {
  private repo: ProductRepository;

  constructor(repo: ProductRepository) {
    this.repo = repo;
  }

  //Get all products
  async getAllProducts(): Promise<IProduct[]> {
    try {
      return await this.repo.findAllProducts();
    } catch (error: any) {
      throw new Error("Error fetching products: ${error}");
    }
  }

  //Get Single Product by id
  async getProductById(id: string): Promise<IProduct | null> {
    try {
      const product = await this.repo.findProductById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error: any) {
      throw new Error("Error fetching product by id: ${error}");
    }
  }

  //Create new prouduct
  async createProduct(productData: any): Promise<IProduct> {
    try {
      return await this.repo.createNewProduct(productData);
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  // Update product
  async updateProduct(id: string, productData: any): Promise<IProduct | null> {
    try {
      const updatedProduct = await this.repo.update(id, productData);
      if (!updatedProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<IProduct | null> {
    try {
      const deletedProduct = await this.repo.delete(id);
      if (!deletedProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}

const repository = new ProductRepository();
export const product_service = new ProductService(repository);
