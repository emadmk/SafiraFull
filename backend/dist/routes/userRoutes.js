"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const validator_1 = require("../middlewares/validator");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
router.get('/profile', (req, res, next) => userController_1.UserController.getProfile(req, res).catch(next));
router.put('/profile', (0, validator_1.validate)([
    (0, express_validator_1.body)('full_name').optional().notEmpty().withMessage('Full name cannot be empty'),
]), (req, res, next) => userController_1.UserController.updateProfile(req, res).catch(next));
router.get('/reservations', (req, res, next) => userController_1.UserController.getReservations(req, res).catch(next));
router.get('/payments', (req, res, next) => userController_1.UserController.getPayments(req, res).catch(next));
router.put('/reservations/:id/address', (0, validator_1.validate)([
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
]), (req, res, next) => userController_1.UserController.updateReservationAddress(req, res).catch(next));
router.use(errorHandler_1.errorHandler);
exports.default = router;
