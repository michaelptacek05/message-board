import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/messages", async (req: Request, res: Response) => {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { added: "desc" },
        });
        res.json(messages);
    } catch (error) {
        console.error("chyba pri nacitani zprav", error);
        res.status(500).json({ error: "zpravy se nenacetly" });
    }
});

app.post("/api/messages", async (req: Request, res: Response): Promise<any> => {
    try {
        const { text, user } = req.body;
        if (!text || !user) {
            return res
                .status(400)
                .json({ error: "text a uzivatel jsou povinne udaje" });
        }

        const newMessage = await prisma.message.create({
            data: {
                text: text,
                user: user,
            },
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("chyba ukladani zpravy: ", error);
        res.status(500).json({ error: "zprava se neulozila" });
    }
});

app.listen(PORT, () => {
    console.log(`backend bezi na https://localhost:${PORT}`);
});
