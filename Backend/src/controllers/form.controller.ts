import { responseStatus } from "../types/enums";
import { Request, Response } from "express";
import { CreateForm, GetAllForm, GetOneForm } from "../services/form.service";
import { formData, getSchema } from "../validators/form.validator";

export const createForm = async (req: Request, res: Response) => {
  try {
    const { success } = formData.safeParse(req.body);
    if (success) {
      const serviceRes = await CreateForm(req.body);
      res.status(responseStatus.Created).send(serviceRes);
    } else {
      res
        .status(responseStatus.InternalServerError)
        .send({ msg: "Error parsing the input wront input" });
    }
  } catch {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error Processing Request" });
  }
};

export const getOneForm = async (req: Request, res: Response) => {
  try {
    const { success } = getSchema.safeParse(req.params.id);
    if (success) {
      const serviceRes = await GetOneForm(req.params.id);
      res.status(responseStatus.Found).send(serviceRes);
    }
  } catch (err) {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error Processing Request, Please Try Again" });
  }
};

export const getAllForm = async (req: Request, res: Response) => {
    console.log(req.body.user_id);
    try {
    const { success } = getSchema.safeParse(req.body.user_id);
    if (success) {
      const serviceRes = await GetAllForm(req.body.user_id);
      res.status(responseStatus.Found).send(serviceRes);
    }
  } catch (err) {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error Processing Request, Please Try Again" });
  }
};
