import { Router} from "express";
const router = Router();

router.get("/", (req, res) => {
    res.send("Auth Route Working");
});


export default router;