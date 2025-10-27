import { Router} from "express";
const router = Router();

router.get("/", (req, res) => {
    res.send("static Route Working");
});




export default router;