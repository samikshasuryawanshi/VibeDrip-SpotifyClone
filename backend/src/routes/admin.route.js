import { Router} from "express";
import  {getAdmin}  from "../controller/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/",protectRoute,requireAdmin, getAdmin);


export default router;