import { authSchema } from "../validators/auth.validator";
import { responseStatus } from "../types/enums";
import { Request, Response } from "express";
import { create } from "../services/auth.service";

export const signIn = async (req: Request, res: Response) => {
  try {
    const parsedState = authSchema.safeParse(req.body);
    const parsedInput = authSchema.parse(req.body);
    if (parsedState.success) {
      const createNewUser = await create(parsedInput);
      res.status(responseStatus.Created).send(createNewUser);
    } else {
      res.status(responseStatus.Unauthorized).send({ msg: "in else" });
    }
  } catch {
    res.status(responseStatus.Forbidden).send({ msg: "in catch" });
  }
};

export const logIn = (req: Request, res: Response) => {
  try {
    const parsedState = authSchema.safeParse(req.body);
    const parsedInput = authSchema.parse(req.body);
    if (parsedState.success) {
      res.status(responseStatus.Accepted).send(parsedInput);
    } else {
      res
        .status(responseStatus.Unauthorized)
        .json({ msg: "Error parsing the Input, wrong data" });
    }
  } catch {
    res
      .status(responseStatus.Forbidden)
      .json({ msg: "Error parsing the Input" });
  }
};
