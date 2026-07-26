import { useForm } from "@tanstack/react-form";

import FormInput from "@components/shared/FormInput";
import { contactUsSchema } from "@lib/schema/contactUsSchema";

import "@components/contact-us/ContactForm.css";

export default function ContactForm() {
	const { Field, handleSubmit } = useForm({
		defaultValues: { email: "" },
		onSubmit: async ({ value }) => {
			// kirim ke astro action, revalidate, dan kirim ke neon
		},
		validators: {
			onChange: contactUsSchema,
			onSubmit: contactUsSchema,
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
			<Field name="email">
				{(field) => {
					const { errors } = field.state.meta;
					return (
						<FormInput
							type="email"
							required
							placeholder="Enter your email address"
							value={field.state.value}
							onFieldChange={field.handleChange}
							errorMessage={errors[0]?.message}
						/>
					);
				}}
			</Field>

			<button type="submit" className="contact-form__submit-button">
				Contact Us
			</button>
		</form>
	);
}
