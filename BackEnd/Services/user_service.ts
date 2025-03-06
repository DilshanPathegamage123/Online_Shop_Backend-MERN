import { UserRepository } from "../data_access/user_repository";
import { IUser } from "../models/user";

export class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  //Get all users
  async findAllUsers(): Promise<IUser[]> {
    try {
      return await this.repo.findAllUsers();
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  //Get single user by id
  async findUserById(id: string): Promise<IUser | null> {
    try {
      const user = await this.repo.findUserById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user by id: ${error}`);
    }
  }
}

const repository = new UserRepository();
export const user_service = new UserService(repository);
