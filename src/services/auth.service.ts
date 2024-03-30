import { PrismaClient } from "@prisma/client";
import { cmpHash, hashPassword } from "../helpers/bcrypt";
interface datatype {
  email: string;
  password: string;
}

export const creatNewUser = async (data: datatype) => {
  try {
    const prisma = new PrismaClient();
    data.password = await hashPassword(data.password) || "";
    const newUser = await prisma.users.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    return {
      msg: "user created successfully"
    }
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

export const loginUser = async (data: datatype) => {
  try{
    const prisma = new PrismaClient();
    const hashPass = await prisma.users.findFirst({
      where: {
        email: data.email
      },select:{
        password: true
      }
    }) || { password: '' }
    const passCompare = await cmpHash(data.password,hashPass.password);
    return passCompare;
  }
  catch(err){
    console.error("Error now user found", err)
    throw err;
  }
}