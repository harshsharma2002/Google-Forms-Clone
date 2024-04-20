import { Request, Response } from "express";
import {
  CreateResponse,
  FindOneResponse,
  FindAllResponse,
} from "../services/response.service";
import { responseStatus } from "../types/enums";
import { idSchema, responseSchema } from "../validators/response.validator";

export const createResponse = async (req: Request, res: Response) => {
  try {
    const { success }  = responseSchema.safeParse(req.body);
    if (success) {
      const serviceRes = await CreateResponse(req.body);
      res.status(responseStatus.Created).send(serviceRes);
    }
  } catch (err) {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error, Try again later", err: err });
  }
};

export const findOneResponse = async (req: Request, res: Response) => {
  try {
    const { success } = idSchema.safeParse(req.params.id);
    if (success) {
      const serviceRes: any = await FindOneResponse(req.params.id);
      res.status(responseStatus.Found).send(serviceRes);
    }
  } catch (err) {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error, Try again later", err: err });
  }
};

export const findAllResponse = async (req: Request, res: Response) => {
  try {
    const { success } = idSchema.safeParse(req.body.user_id);
    if (success) {
      const serviceRes = await FindAllResponse(req.body.user_id);
      res.status(responseStatus.Found).send(serviceRes);
    }
  } catch (err) {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error, Try again later", err: err });
  }
};
