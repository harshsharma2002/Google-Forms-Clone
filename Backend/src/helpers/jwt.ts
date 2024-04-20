import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { responseStatus } from "../types/enums";

const _secret = process.env.SECRET || "";

interface data {
  id: string;
}

interface payload {
  id: string;
  iat: number;
}

export const createJWT = (data: data): string => {
  return JWT.sign(data, _secret);
};

export const authJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(responseStatus.Forbidden).json({ msg: "Unauthorised" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: payload = JWT.verify(token, _secret) as payload;
    if (!decoded.id) {
      return res.status(responseStatus.Forbidden).json({ msg: "Unauthorised" });
    }
    req.body["user_id"] = decoded.id;

    next();
  } catch (err) {
    res.status(responseStatus.Forbidden).send({ msg: "Not logged in, please login"})
  }
};
