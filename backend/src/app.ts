import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes";
import { postRoutes } from "./routes/postRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
