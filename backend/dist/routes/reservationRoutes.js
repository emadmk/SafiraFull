"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const reservationController_1 = require("../controllers/reservationController");
const auth_1 = require("../middlewares/auth");
const validator_1 = require("../middlewares/validator");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticate);
router.post('/', (0, validator_1.validate)([
    (0, express_validator_1.body)('collection_id').isInt().withMessage('Valid collection ID is required'),
    (0, express_validator_1.body)('piece_number').isInt().withMessage('Valid piece number is required'),
]), (req, res, next) => reservationController_1.ReservationController.create(req, res).catch(next));
router.get('/:id', (req, res, next) => reservationController_1.ReservationController.getById(req, res).catch(next));
router.use(errorHandler_1.errorHandler);
exports.default = router;
