import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// routes
import routes from './routes/routes'

dotenv.config();

const mongoString = process.env.DATABASE_URL || '';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error: any) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());


app.use("/", routes);

app.listen(3009, () => {
  console.log(`Server Started at ${3009}`);
});
