import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";
import { authSchema } from "../schemas/authSchema";

export const authRoutes = async (fastify: FastifyInstance) => {
  const authController = new AuthController();

  fastify.post("/login", authSchema.login, authController.login);
};
