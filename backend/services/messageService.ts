import { PrismaClient } from "@prisma/client";
import type { CreateMessageInput, Message } from "../types.ts";

export class MessageService {
    constructor(private prisma: PrismaClient) {}

    async fetchAllMessages(): Promise<Message[]> {
        return this.prisma.message.findMany({
            orderBy: { added: "desc" },
        });
    }

    async createMessage(input: CreateMessageInput): Promise<Message> {
        return this.prisma.message.create({
            data: {
                text: input.text,
                user: input.user,
            },
        });
    }
}
