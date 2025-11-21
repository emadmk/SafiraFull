"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middlewares/auth");
const validator_1 = require("../middlewares/validator");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
// All routes require authentication and admin role
router.use(auth_1.authenticate);
router.use(auth_1.isAdmin);
// Dashboard
router.get('/dashboard', (req, res, next) => adminController_1.AdminController.getDashboard(req, res).catch(next));
// Collections
router.post('/collections', (0, validator_1.validate)([
    (0, express_validator_1.body)('name').notEmpty().withMessage('Collection name is required'),
    (0, express_validator_1.body)('price_usdt').isFloat({ min: 0 }).withMessage('Valid price is required'),
    (0, express_validator_1.body)('total_pieces').isInt({ min: 1 }).withMessage('Total pieces must be at least 1'),
]), (req, res, next) => adminController_1.AdminController.createCollection(req, res).catch(next));
router.put('/collections/:id', (req, res, next) => adminController_1.AdminController.updateCollection(req, res).catch(next));
router.delete('/collections/:id', (req, res, next) => adminController_1.AdminController.deleteCollection(req, res).catch(next));
// Users
router.get('/users', (req, res, next) => adminController_1.AdminController.getUsers(req, res).catch(next));
// Reservations
router.get('/reservations', (req, res, next) => adminController_1.AdminController.getReservations(req, res).catch(next));
router.put('/reservations/:id/status', (0, validator_1.validate)([
    (0, express_validator_1.body)('status').notEmpty().withMessage('Status is required'),
]), (req, res, next) => adminController_1.AdminController.updateReservationStatus(req, res).catch(next));
// Payments
router.get('/payments', (req, res, next) => adminController_1.AdminController.getPayments(req, res).catch(next));
// Settings
router.get('/settings', (req, res, next) => adminController_1.AdminController.getSettings(req, res).catch(next));
router.put('/settings', (0, validator_1.validate)([
    (0, express_validator_1.body)('key').notEmpty().withMessage('Setting key is required'),
    (0, express_validator_1.body)('value').notEmpty().withMessage('Setting value is required'),
]), (req, res, next) => adminController_1.AdminController.updateSetting(req, res).catch(next));
router.use(errorHandler_1.errorHandler);
exports.default = router;
