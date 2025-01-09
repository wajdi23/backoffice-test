import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { prisma } from "../prisma";

export class AuthService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const validPassword = await this.verifyPassword(user.password, password);
    if (!validPassword) return null;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }

  async welcomeUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const resetLink = `http://localhost:3001/login`;
    const message = `Dear ${firstName} ${lastName}, good news for you, you have been added to our new App, please click the link
    below to test it. Note: you'll be able to change your password soon :)`;

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      subject: "Welcome aboard",
      html: `
        <p>${message}</p>
        <p>Your username: <strong>${email}</strong></p>
        <p>Your password: <strong>${password}</strong></p>
        <a href="${resetLink}">Go</a>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send welcome email");
    }
  }
}
