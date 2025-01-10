import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { ICreateUser, IUpdateUser } from "../types/user";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public create = async (
    req: FastifyRequest<{ Body: ICreateUser }>,
    res: FastifyReply
  ) => {
    try {
      const userData = req.body;
      const user = await this.userService.create(userData);

      if (!user) {
        return res.code(409).send({
          message: "Email already taken",
        });
      }

      return res.code(201).send(user);
    } catch (error) {
      return res.code(500).send({
        message: "Internal server error",
      });
    }
  };

  public getAll = async (
    req: FastifyRequest<{
      Querystring: {
        page?: number;
        limit?: number;
      };
    }>,
    res: FastifyReply
  ) => {
    try {
      const { page, limit } = req.query;
      const usersPaginated = await this.userService.findAll({ page, limit });
      return res.code(200).send(usersPaginated);
    } catch (error) {}
  };

  public getUserById = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    res: FastifyReply
  ) => {
    try {
      const id = req.params.id;
      const user = await this.userService.findById(id);

      if (!user) {
        return res.code(404).send({
          message: `User with id ${id} not found!`,
        });
      }
      return res.code(200).send(user);
    } catch (error) {
      return res.code(500).send({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateUser = async (
    req: FastifyRequest<{
      Params: { id: number };
      Body: IUpdateUser;
    }>,
    res: FastifyReply
  ) => {
    try {
      const id = req.params.id;
      const updateForm = req.body;

      const updatedUser = await this.userService.update(id, updateForm);

      if (!updatedUser)
        return res.code(404).send(`user with id ${id} not found !`);

      return res.code(200).send({
        message: `User ${id} has been updated successfully`,
        user: updatedUser,
      });
    } catch (error) {
      return res.code(500).send("internal server error");
    }
  };

  public deleteUser = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    res: FastifyReply
  ) => {
    try {
      const id = req.params.id;
      const deletedUser = await this.userService.delete(id);

      if (!deletedUser) {
        return res.code(404).send({
          message: `User with id ${id} not found!`,
        });
      }

      return res.code(200).send({
        message: `User ${id} has been deleted successfully`,
        user: deletedUser,
      });
    } catch (error) {
      return res.code(500).send({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
