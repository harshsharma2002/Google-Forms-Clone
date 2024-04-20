import { Prisma, PrismaClient } from "@prisma/client";
import { FormData } from "../types/form.types";

export const CreateForm = async (data: FormData) => {
  const prisma = new PrismaClient();
  try {
    const dbResponse = await prisma.form.create({
      data: {
        created_by: data.user_id,
        form_data: {
          type: data.form_data.type,
          title: data.form_data.title,
          description: data.form_data.description,
          question_data: data.form_data.question_data as unknown as Prisma.InputJsonValue,
        },
      },
    });
    return dbResponse;
  } catch (err) {
    console.error("Error creating new user:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const GetOneForm = async (data: string) => {
  const prisma = new PrismaClient();
  try {
    const dbResponse = await prisma.form.findUnique({
      where: {
        id: data,
      },
    });
    return dbResponse;
  } catch (err) {
    console.error("Error Getting Form:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export const GetAllForm = async (data: string) => {
  const prisma = new PrismaClient();
  try {
    const dbResponse = await prisma.form.findMany({
      where: {
        created_by: data,
      },
    });
    return dbResponse;
  } catch (err) {
    console.error("Error Getting Form:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
