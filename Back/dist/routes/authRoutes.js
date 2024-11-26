"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../middlewares/errorHandler");
const authControllerb_1 = require("../controllers/authControllerb");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", (0, errorHandler_1.errorHandler)(authControllerb_1.register));
authRouter.post("/login/", (0, errorHandler_1.errorHandler)(authControllerb_1.login));
exports.default = authRouter;
