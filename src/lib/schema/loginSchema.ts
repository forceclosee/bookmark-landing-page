import { z } from "astro/zod";

export const loginSchema = z.object({
	loginEmail: z.email("Please enter a valid email address"),
	loginPassword: z.string().min(1, "Password cannot empty"),
});

export type loginSchema = z.infer<typeof loginSchema>;
