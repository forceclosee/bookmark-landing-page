import { z } from "astro/zod";

export const contactUsSchema = z.object({
	email: z.email("Whoops, make sure it's an email"),
});

export type contactUsSchema = z.infer<typeof contactUsSchema>;
