import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import {createForm,getOneForm,getAllForm} from "../controllers/form.controller";
import { authJWT } from "../helpers/jwt";

router.use((req: Request,res: Response,next: NextFunction) => {
    authJWT(req,res,next);
});

router.post("/create", createForm);
router.get("/:id",getOneForm);
router.post('/getforms',getAllForm)
export default router;
