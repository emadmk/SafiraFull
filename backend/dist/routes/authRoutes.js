"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const validator_1 = require("../middlewares/validator");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
router.post('/register', (0, validator_1.validate)([
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('full_name').notEmpty().withMessage('Full name is required'),
]), (req, res, next) => authController_1.AuthController.register(req, res).catch(next));
router.post('/login', (0, validator_1.validate)([
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
]), (req, res, next) => authController_1.AuthController.login(req, res).catch(next));
router.use(errorHandler_1.errorHandler);
exports.default = router;
