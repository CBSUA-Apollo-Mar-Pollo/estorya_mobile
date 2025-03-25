import { PrismaClient } from "@prisma/client";

if (typeof global === "undefined") {
  var global = globalThis;
}

let cachedPrisma;

if (typeof global.cachedPrisma === "undefined") {
  global.cachedPrisma = new PrismaClient();
}

cachedPrisma = global.cachedPrisma;

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  prisma = cachedPrisma;
}

export const db = prisma;
