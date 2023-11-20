import { Router } from "express";
//import { devLogger } from "../config/logger_BASE";

const router= Router();

router.get('/message', (req, res) => {
    res.render('chats', {})
})

router.get('/', (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});

router.get("/api/carts/purchase", (req, res) => {
    res.render('purchase')
});


export default router;