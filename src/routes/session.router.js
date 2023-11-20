import { Router } from 'express';
import passport from 'passport';

import {userRegister, userLogin, userSession } from '../controllers/session.controller.js'



const router = Router();

// TODO: Router GITHUB
router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });


// githubcallback
router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/api/products/pages/1");
});


router.get("/current", userSession);

router.post("/register", userRegister);

router.post("/login", userLogin);


export default router;