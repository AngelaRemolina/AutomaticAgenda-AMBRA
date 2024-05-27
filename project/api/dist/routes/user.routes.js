"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/register', _controllers_1.userController.createUser);
router.post('/login', _controllers_1.userController.getUserToken);
// methods for views
router.get('/register', (req, res) => {
    res.render('auth/register');
});
exports.default = router;
