import express from 'express';
import { login } from '../controllers/authControllers.js';
const router = express.Router();

router.post('/login', login);
router.get("", (req, res) => {
    res.send("Hello from the backend");
})

export default router;