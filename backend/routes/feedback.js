import express from "express";
import { verifyUser, verifyAdmin } from "../middleware/auth.js";
import { 
  createFeedback, 
  getAllFeedbacks, 
  updateFeedbackStatus, 
  getFeedbackById 
} from "../controllers/FeedbackControllers.js";
const router = express.Router();

router.post('/', verifyUser, createFeedback);
router.get('/', verifyAdmin, getAllFeedbacks);
router.get('/:id', verifyAdmin, getFeedbackById);
router.put('/:id', verifyAdmin, updateFeedbackStatus);


export default router;
