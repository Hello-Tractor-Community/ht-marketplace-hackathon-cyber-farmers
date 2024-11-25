// lib/prisma.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Create a connection pool for PostgreSQL
const connectionString = process.env.DATABASE_URL || '';  // Ensure you have the DATABASE_URL in your .env
const pool = new Pool({
    connectionString,  // Use your PostgreSQL connection string here
});

// Instantiate Prisma Client with the PostgreSQL adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
