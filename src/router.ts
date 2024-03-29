import express from "express"
const router = express.Router()

import auth from "./routers/auth.router"

router.use('/auth', auth);

export default router;