import { getAllAlbum, getAlbumById } from "../controller/albumController.js";
import { Router} from "express";
const router = Router();


router.get("/", getAllAlbum);
router.get("/:id", getAlbumById);




export default router;