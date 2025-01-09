import fastify, { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import { swaggerOptions } from "./config/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./routes/user.routes";
import cors from "@fastify/cors";
import { connectDB } from "./prisma";
import { authRoutes } from "./routes/auth.routes";
import { authPlugin } from "./plugins/auth";

const app: FastifyInstance = fastify({
  logger: false,
});

app.register(cors, {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
});

app.register(swagger, swaggerOptions);
app.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
  uiConfig: {
    docExpansion: "none",
    deepLinking: true,
  },
});

app.register(authPlugin);
app.register(userRoutes, { prefix: "/api/users" });
app.register(authRoutes, { prefix: "/api/auth" });

const start = async () => {
  try {
    await connectDB();
    const port = Number(process.env.PORT) || 3000;
    await app.listen({
      port: port,
      host: "0.0.0.0",
    });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
