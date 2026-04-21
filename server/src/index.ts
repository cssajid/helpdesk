import express, { type Request, type Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { prisma } from "./db";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/db/health", async (_req: Request, res: Response) => {
  try {
    const rows = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
    res.json({ status: "ok", now: rows[0]?.now });
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
