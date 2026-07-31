import { defineAction, ActionError } from "astro:actions";
import { eq } from "drizzle-orm";

import { contactUsSchema } from "@lib/schema/contactUsSchema";
import { db } from "@db/index";
import { subscribers } from "@db/schema/subscribers";

export const contactUs = defineAction({
	input: contactUsSchema,
	handler: async (input: contactUsSchema) => {
		const InputEmail = input.contactUsEmail;
		const existing = await db
			.select()
			.from(subscribers)
			.where(eq(subscribers.email, InputEmail));

		// throw error if email already exist
		if (existing.length > 0) {
			throw new ActionError({
				code: "CONFLICT",
				message: "You have already subscribed!",
			});
		}

		// insert to database
		await db.insert(subscribers).values({
			email: InputEmail,
		});

		return {
			success: true,
			message: "You have been succesfully subscribed",
		};
	},
});
