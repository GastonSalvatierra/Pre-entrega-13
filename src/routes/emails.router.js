import { Router } from "express";
import { sendEmail, sendEmailWithAttachments } from '../controllers/mailing.controller.js';

const router = Router();

router.get("/", sendEmail);
router.get("/attachments", sendEmailWithAttachments);

export default router;