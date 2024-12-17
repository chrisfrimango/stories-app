import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes";
import { postRoutes } from "./routes/postRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { healthCheckRoutes } from "./routes/healthCheckRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/health", healthCheckRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
