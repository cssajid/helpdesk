import express, { type Request, type Response } from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
