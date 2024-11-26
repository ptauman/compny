"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const workRoutes_1 = __importDefault(require("./routes/workRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/manager", managerRoutes_1.default);
app.use("/api/work", workRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI || "", {})
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port${PORT}`));
})
    .catch((err) => console.error("Database connection error:", err));
