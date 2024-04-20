import express, { NextFunction, Request, Response } from "express";
import { authJWT } from "../helpers/jwt";
import { createResponse,findOneResponse,findAllResponse } from "../controllers/response.controller";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  authJWT(req, res, next);
});

router.post("/",createResponse);
router.get("/:id",findOneResponse);
router.get("/",findAllResponse);

export default router;
