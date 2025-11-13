import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import friendRouter from "./routes/friendRoutes.js";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*", credentials: true },
});

// store online users
export const userSocketMap = {}; // { userId: socketId }

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected : ", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected : ", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const FRONTEND_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_FRONTEND_URL
    : process.env.FRONTEND_URL;

//Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(cookieParser());

//Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/friends", friendRouter);

//Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;

if (process.env.RENDER === "true" || process.env.NODE_ENV !== "production") {
  server.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

// Export server for Vercel
export default server;
