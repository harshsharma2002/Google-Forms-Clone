import express from "express";
const router = express.Router();

import auth from "./routers/user.router";
import form from "./routers/form.router";
import response from "./routers/response.router";

router.use("/auth", auth);
router.use("/form", form);
router.use("/response", response);

export default router;
