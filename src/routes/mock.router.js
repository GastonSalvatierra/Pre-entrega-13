import { Router } from "express";
import { getProductsLimit10 } from "../controllers/mock.controller.js";
const router = Router();


router.get('/', getProductsLimit10);


export default router;