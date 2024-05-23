"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../controllers");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/feedback', auth_1.verifyToken, _controllers_1.modelController.setActivity);
router.get('/recommendations', auth_1.verifyToken, _controllers_1.modelController.getRecommendations);
exports.default = router;
