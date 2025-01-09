import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/auth.service";

interface LoginBody {
  email: string;
  password: string;
}

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (
    req: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply
  ) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      if (!result) {
        return reply.code(401).send({
          message: "Wrong email or passwordd",
        });
      }

      return reply.code(200).send(result);
    } catch (error) {
      return reply.code(500).send({
        message: "Internal server err",
      });
    }
  };
}
