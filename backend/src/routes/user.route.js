import {Router} from 'express';
const router = Router();

// Example route
router.get('/', (req, res) => {
    res.send('User route is working!');
});

export default router;