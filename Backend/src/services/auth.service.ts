import { PrismaClient } from "@prisma/client";
import { cmpHash, hashPassword } from "../helpers/bcrypt";
import { createJWT } from "../helpers/jwt";

interface datatype {
  email: string;
  password: string;
}

export const checkUser = async (data: string) => {
  const prisma = new PrismaClient();
  try {
    const check = await prisma.user.findUnique({
      where: {
        id: data,
      },
      select: {
        id: true,
      },
    });
    return check;
  } catch (err) {
    return { msg: "Error processing request: ", err };
  } finally {
    await prisma.$disconnect();
  }
};

export const creatNewUser = async (data: datatype) => {
  try {
    const prisma = new PrismaClient();
    data.password = await hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    const tokenize = {
      id: newUser.id,
    };
    const token = createJWT(tokenize);
    return token;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

export const loginUser = async (data: datatype) => {
  try {
    const prisma = new PrismaClient();
    const userDetails = (await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        password: true,
      },
    })) || { id: "", password: "" };
    const passCompare = await cmpHash(data.password, userDetails.password);
    if (passCompare) {
      const tokenize = {
        id: userDetails.id,
      };
      const token = createJWT(tokenize);
      return token;
    }
    return { msg: "Error, Try again" };
  } catch (err) {
    console.error("Error no user found", err);
    throw err;
  }
};
