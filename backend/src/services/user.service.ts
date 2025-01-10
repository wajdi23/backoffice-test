import jwt from "jsonwebtoken";
import { ICreateUser, IUpdateUser, IUser } from "../types/user";
import { prisma } from "../prisma";
import { PaginationParams } from "../types/pagination";
import { PrismaClient, User, Prisma } from "@prisma/client";
import { AuthService } from "./auth.service";

export class UserService {
  private users: IUser[] = [];
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async create(data: ICreateUser): Promise<User | null> {
    try {
      const hashedPassword = await this.authService.hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      // ici, si jveux donner un token pour que le user reset son password a la premier connexion
      // const token = jwt.sign(
      //   { userId: user.id },
      //   process.env.JWT_SECRET as string,
      //   { expiresIn: "24h" }
      // );

      await this.authService.welcomeUser(
        user.firstName,
        user.lastName,
        user.email,
        data.password
      );

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return null;
        }
      }
      throw error;
    }
  }

  async findAll(params: PaginationParams) {
    const { page = 1, limit = 5 } = params;

    const skip = (page - 1) * limit;

    const [users, totalElements] = await prisma.$transaction([
      prisma.user.findMany({
        skip: skip,
        take: limit,
      }),

      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalElements / limit);
    console.log(totalPages, "totalPages");

    return {
      users,
      paginate: {
        page,
        limit,
        totalPages,
        totalElements,
      },
    };
  }

  async findById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) return null;

      const decryptedUser = {
        ...user,
        password: user.password,
      };

      return decryptedUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, newData: IUpdateUser) {
    if (newData.password) {
      const hashedPassword = await this.authService.hashPassword(
        newData.password
      );
      newData.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...newData,
      },
    });
    return user;
  }

  async delete(id: number): Promise<User | null> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null;
      }
      throw error;
    }
  }
}
