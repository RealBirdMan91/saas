import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema";

const client = postgres(process.env.DATABASE_URL + "?sslmode=require", {
  max: 1,
});
const db = drizzle(client, { schema });

export default db;
