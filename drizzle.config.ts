import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("database url not found");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema/*",
	out: "./drizzle",
	dbCredentials: {
		url: databaseUrl,
	},
});
