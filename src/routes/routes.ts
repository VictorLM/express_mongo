import express, { Request, Response } from 'express';
import Model from '../models/model';

const router = express.Router();

// Post Method
router.post("/", async (req: Request, res: Response) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || "error" });
  }
});

// Get all Method
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get by ID Method
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update by ID Method
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data?.name} has been deleted..`);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
