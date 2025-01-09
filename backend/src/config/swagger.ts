import { SwaggerOptions } from "@fastify/swagger";

export const swaggerOptions: SwaggerOptions = {
  openapi: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: 'Enter your bearer token -> "Bearer {token}"',
        },
      },
    },

    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
};
