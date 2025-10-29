import { Router} from "express";
import {protectRoute,requireAdmin} from "../middleware/authMiddleware.js"
import { getStatics } from "../controller/staticController.js";

const router = Router();

router.get("/", protectRoute,requireAdmin,getStatics);




export default router;