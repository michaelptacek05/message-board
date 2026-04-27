require("dotenv/config");

module.exports = {
  schema: "prisma/schema.prisma",
  datasourceUrl: process.env.DATABASE_URL,
};