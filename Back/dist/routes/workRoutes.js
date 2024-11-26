"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../middlewares/errorHandler");
const workController_1 = require("../controllers/workController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const workRouter = (0, express_1.Router)();
workRouter.post("/timeReport", (0, errorHandler_1.errorHandler)(workController_1.clock));
workRouter.get("/summary/:id", authMiddleware_1.authMiddleware, (0, errorHandler_1.errorHandler)(workController_1.getEmployeeSummary));
exports.default = workRouter;