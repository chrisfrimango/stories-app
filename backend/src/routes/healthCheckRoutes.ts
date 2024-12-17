import { Router } from "express";

const router = Router();

// Health check route
router.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export { router as healthCheckRoutes };
