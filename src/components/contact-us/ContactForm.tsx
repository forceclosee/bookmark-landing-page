import { actions } from "astro:actions";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import FormInput from "@components/shared/FormInput";

import { contactUsSchema } from "@lib/schema/contactUsSchema";

import "@components/contact-us/ContactForm.css";

export default function ContactForm() {
	// state error from server
	const [serverError, setServerError] = useState<string | null>(null);

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: { contactUsEmail: "" },
		validators: {
			onChange: contactUsSchema,
			onSubmit: contactUsSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await actions.contactUs(value);

			if (error) {
				setServerError(error.message); /* show server error message */
			} else {
				setServerError(null); /* clear erver error when no error */
				formApi.reset();
				// tambahkan toast message (data.message)
			}
		},
		onSubmitInvalid() {
			const InvalidInput = document.querySelector(
				"input:invalid",
			) as HTMLInputElement;

			InvalidInput?.focus();
		},
	});

	return (
		<form
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			className="contact-form">
			<Field name="contactUsEmail">
				{(field) => {
					const { errors } = field.state.meta;

					return (
						<FormInput
							type="email"
							fieldName={field.name}
							autoComplete="email"
							placeholder="Enter your email address"
							value={field.state.value}
							onFieldChange={(value) => {
								field.handleChange(value);
								/* clear server error on input change */
								if (serverError) setServerError(null);
							}}
							errorMessage={
								(typeof errors[0] === "string"
									? errors[0]
									: (errors[0] as { message?: string })?.message) ||
								serverError ||
								""
							}
						/>
					);
				}}
			</Field>

			<Subscribe selector={(state) => [state.isSubmitting]}>
				{([isSubmitting]) => (
					<button
						type="submit"
						disabled={isSubmitting}
						className="contact-form__submit-button">
						<span
							className="contact-form__loader-icon"
							aria-hidden="true"></span>
						<span>{isSubmitting ? "Submitting..." : "Contact Us"}</span>
					</button>
				)}
			</Subscribe>
		</form>
	);
}
