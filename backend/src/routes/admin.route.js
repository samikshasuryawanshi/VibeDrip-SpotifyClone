import { Router} from "express";
import  {createSong}  from "../controller/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/",protectRoute,requireAdmin, createSong);


export default router;