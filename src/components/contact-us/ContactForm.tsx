import { actions } from "astro:actions";
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";

import { contactUsSchema } from "@lib/schema/contactUsSchema";

import ToastMessage from "@components/shared/ToastMessage";
import FormInput from "@components/shared/FormInput";
import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";

import "@components/contact-us/ContactForm.css";

export default function ContactForm() {
	// error message from server
	const [serverError, setServerError] = useState<string | null>(null);

	// succes message from server
	const [succesMessage, setSuccessMessage] = useState<string | null>(null);

	// toast message visibility
	const [showToast, setShowToast] = useState<boolean>(false);

	// handle toast message visibility
	useEffect(() => {
		if (succesMessage !== null) {
			setShowToast(true);

			const toastTimer = setTimeout(() => {
				setShowToast(false);
				setSuccessMessage(null);
			}, 4000);

			return () => clearTimeout(toastTimer);
		} else {
			setShowToast(false);
		}
	}, [succesMessage]);

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: { contactUsEmail: "" },
		validators: {
			onChange: contactUsSchema,
			onSubmit: contactUsSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await actions.contactUs(value);

			if (error) {
				setSuccessMessage(null); /* clear success message on error */
				setServerError(error.message); /* show server error message */
			} else {
				setServerError(null); /* clear server error message on success */
				setSuccessMessage(data.message); /* show succes message */
				formApi.reset();
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
		<>
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
								variant="subscribe"
								type="email"
								label="Newsletter Email"
								fieldName={field.name}
								autoComplete="email"
								placeholder="Enter your email address"
								value={field.state.value}
								onFieldChange={(value) => {
									field.handleChange(value);

									/* clear server error message on input change */
									setServerError(null);
									/* clear success message on input change */
									setSuccessMessage(null);
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
						<ButtonClient
							variant="primary"
							type="submit"
							disabled={isSubmitting}>
							<Loader className="contact-form__loader-icon" />
							<span>{isSubmitting ? "Submitting..." : "Contact Us"}</span>
						</ButtonClient>
					)}
				</Subscribe>
			</form>

			<ToastMessage
				header="Subscribe Succesfully"
				message={succesMessage}
				hidden={!showToast}
			/>
		</>
	);
}
