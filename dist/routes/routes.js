"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../models/model"));
const router = express_1.default.Router();
// Post Method
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new model_1.default({
        name: req.body.name,
        age: req.body.age,
    });
    try {
        const dataToSave = yield data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: (error === null || error === void 0 ? void 0 : error.message) || "error" });
    }
}));
// Get all Method
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.default.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Get by ID Method
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.default.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Update by ID Method
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = yield model_1.default.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Delete by ID Method
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield model_1.default.findByIdAndDelete(id);
        res.send(`Document with ${data === null || data === void 0 ? void 0 : data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;
