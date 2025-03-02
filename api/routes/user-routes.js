// filepath: /c:/Users/user/Desktop/testing/api/routes/user-routes.js

import express from 'express';
import { signup, signin } from '../controllers/user-controller.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to your frontend application
  }
);

// Facebook authentication routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to your frontend application
  }
);

export default router;