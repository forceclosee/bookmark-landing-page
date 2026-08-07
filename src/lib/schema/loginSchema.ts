import { z } from "astro/zod";

export const loginSchema = z.object({
	loginEmail: z.email("Please enter a valid email"),
	loginPassword: z.string().min(1, "Password must be at least 8 characters"),
});

export type loginSchema = z.infer<typeof loginSchema>;
