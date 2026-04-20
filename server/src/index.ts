import express, { type Request, type Response } from "express";
import { prisma } from "./db";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/db/health", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.count();
    res.json({ status: "ok", users });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
});

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
