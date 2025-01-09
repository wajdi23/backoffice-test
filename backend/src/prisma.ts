import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await connectDB();
  }
};

export default prisma;
