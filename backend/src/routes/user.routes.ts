import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { userSchema } from "../schemas/user.schema";

export const userRoutes = async (fastify: FastifyInstance) => {
  const userController = new UserController();
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.post("", userSchema.createUser, userController.create);
  fastify.get("", userSchema.getAllUsers, userController.getAll);
  fastify.get("/:id", userSchema.getUserById, userController.getUserById);
  fastify.put("/:id", userSchema.updateUser, userController.updateUser);
  fastify.delete("/:id", userSchema.deleteUser, userController.deleteUser);
};
