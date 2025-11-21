"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = require("../models/User");
const jwt_1 = require("../utils/jwt");
const emailService_1 = require("../services/emailService");
const errorHandler_1 = require("../middlewares/errorHandler");
class AuthController {
    static async register(req, res) {
        try {
            const { email, password, full_name, phone } = req.body;
            // Check if user already exists
            const existingUser = await User_1.UserModel.findByEmail(email);
            if (existingUser) {
                throw new errorHandler_1.AppError('Email already registered', 400);
            }
            // Create user
            const user = await User_1.UserModel.create(email, password, full_name, phone);
            // Generate token
            const token = (0, jwt_1.generateToken)(user.id, user.email, user.role);
            // Send welcome email
            await (0, emailService_1.sendWelcomeEmail)(user.email, user.full_name, user.id);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        phone: user.phone,
                        role: user.role,
                    },
                    token,
                },
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            // Find user
            const user = await User_1.UserModel.findByEmail(email);
            if (!user) {
                throw new errorHandler_1.AppError('Invalid credentials', 401);
            }
            // Check if user is active
            if (!user.is_active) {
                throw new errorHandler_1.AppError('Account is deactivated', 403);
            }
            // Verify password
            const isPasswordValid = await User_1.UserModel.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new errorHandler_1.AppError('Invalid credentials', 401);
            }
            // Generate token
            const token = (0, jwt_1.generateToken)(user.id, user.email, user.role);
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        phone: user.phone,
                        address: user.address,
                        role: user.role,
                    },
                    token,
                },
            });
        }
        catch (error) {
            throw new errorHandler_1.AppError(error.message, error.statusCode || 500);
        }
    }
}
exports.AuthController = AuthController;
