import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true, // Allows browser to send cookies
  })
);
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: functions,
  })
);
app.use(clerkMiddleware()); // adds auth field to req object: req.auth()

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Api is up and running" });
});
app.use("/api/chat", chatRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`✅ Server started on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log("❌ Error starting server", error);
    process.exit(1);
  }
};

startServer();
