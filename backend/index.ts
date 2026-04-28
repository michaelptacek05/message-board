import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Server } from "socket.io";

import { createMessageRoutes } from "./routes/messages.ts";
import { setupWebSocketHandlers } from "./websocket/handlers.ts";
import { MessageService } from "./services/messageService.ts";
import { globalErrorHandler } from "./middleware/errorHandler.ts";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: CORS_ORIGIN },
});

const messageService = new MessageService(prisma);

app.use(cors());
app.use(express.json());

app.use(createMessageRoutes(messageService));

setupWebSocketHandlers(io, messageService);

app.use(globalErrorHandler);

server.listen(PORT, () => {
    console.log(`backend bezi na https://localhost:${PORT}`);
});