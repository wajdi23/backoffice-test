export const authSchema = {
  login: {
    schema: {
      tags: ["auth"],
      description: "User login endpoint",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "User email",
            default: "admin@admin.com",
          },
          password: {
            type: "string",
            description: "User password",
            default: "admin",
          },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                email: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
              },
            },
          },
        },
        401: {
          description: "Invalid credentials",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
};
