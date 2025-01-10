export const userSchema = {
  createUser: {
    schema: {
      description: "Create a user",
      tags: ["user"],
      summary: "Users endpoints",
      security: [{ bearerAuth: [] }],
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password", "dateOfBirth"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          dateOfBirth: { type: "string", format: "date-time" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            dateOfBirth: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        409: {
          description: "email already",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },

  getAllUsers: {
    schema: {
      description: "Get users",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      querystring: {
        type: "object",

        properties: {
          page: { type: "number", default: 1 },
          limit: { type: "number", default: 10 },
        },
      },

      response: {
        200: {
          description: "Successful response",
          type: "object",

          properties: {
            users: {
              type: "array",
              properties: {
                id: { type: "number" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                dateOfBirth: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },

            paginate: {
              type: "object",
              properties: {
                page: { type: "number" },
                limit: { type: "number" },
                totalPages: { type: "number" },
                totalElements: { type: "number" },
              },
            },
          },
        },
      },
    },
  },

  getUserById: {
    schema: {
      description: "Get a user by ID",
      tags: ["user"],
      summary: "Users endpoints",
      security: [{ bearerAuth: [] }],

      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },

      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            dateOfBirth: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        404: {
          description: "user not found",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },

  updateUser: {
    schema: {
      description: "Update a user",
      tags: ["user"],
      summary: "Users endpoints",
      security: [{ bearerAuth: [] }],

      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },

      body: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          dateOfBirth: { type: "string" },
        },
      },
      response: {
        202: {
          description: "updated user response",
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            dateOfBirth: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        404: {
          description: "user not found",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },

  deleteUser: {
    schema: {
      description: "Delete a user",
      tags: ["user"],
      summary: "Users endpoints",
      security: [{ bearerAuth: [] }],

      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },

      response: {
        200: {
          description: "delete user response",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },

        404: {
          description: "user not found",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
};
