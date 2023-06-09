"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// routes
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const mongoString = process.env.DATABASE_URL || '';
mongoose_1.default.connect(mongoString);
const database = mongoose_1.default.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.listen(3009, () => {
    console.log(`Server Started at ${3009}`);
});
