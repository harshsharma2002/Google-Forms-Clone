import express from "express";
const router = express.Router();
import {signIn,logIn} from "../controllers/auth.controller";

router.post("/signin", signIn);
router.post("/login", logIn);
export default router;
