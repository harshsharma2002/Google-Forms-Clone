import { authSchema } from "../validators/auth.validator";
import { responseStatus } from "../types/enums";
import { Request, Response } from "express";
import { creatNewUser, loginUser } from "../services/auth.service";

export const signIn = async (req: Request, res: Response) => {
  try {
    const parsedState = authSchema.safeParse(req.body);
    const parsedInput = authSchema.parse(req.body);
    if (parsedState.success) {
      const serviceRes = await creatNewUser(parsedInput);
      res.status(responseStatus.Created).send(serviceRes);
    } else {
      res.status(responseStatus.Unauthorized).send({
        msg: "Wrong input the email should be type email and password should be type string",
      });
    }
  } catch {
    res
      .status(responseStatus.InternalServerError)
      .send({ msg: "Error Processing Request, User already exists, Please login" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    // let token = req.headers['authorization']|| "";
    // token = token.split(" ")[1];
    // req["token"] = token;
    const parsedState = authSchema.safeParse(req.body);
    const parsedInput = authSchema.parse(req.body);
    if (parsedState.success) {
      const serviceRes = await loginUser(parsedInput);
      res.status(responseStatus.Found).send(serviceRes);
    } else {
      res
        .status(responseStatus.Unauthorized)
        .json({ msg: "Error parsing the Input, wrong data" });
    }
  } catch {
    res.status(responseStatus.Forbidden).json({
      msg: "Wrong input the email should be type email and password should be type string",
    });
  }
};
