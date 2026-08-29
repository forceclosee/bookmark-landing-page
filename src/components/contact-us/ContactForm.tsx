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
	const [serverErrorMessage, setServerErrorMessage] = useState<
		string | undefined
	>(undefined);

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
				setServerErrorMessage(error.message); /* show server error message */
			} else {
				setServerErrorMessage(
					undefined,
				); /* clear server error message on success */
				setSuccessMessage(
					`${data.message} ${value.contactUsEmail}`,
				); /* show succes message */
				formApi.reset();
			}
		},
		onSubmitInvalid() {
			const InvalidInput = document.querySelector(
				"[aria-invalid='true']",
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
				<Subscribe selector={(state) => state.submissionAttempts}>
					{(submissionAttempts) => (
						<Field name="contactUsEmail">
							{(field) => {
								const { errors, isBlurred, isValid, isDirty } =
									field.state.meta;

								return (
									<FormInput
										variant="subscribe"
										type="email"
										label="Newsletter Email"
										placeholder="Enter your email address"
										autoComplete="email"
										value={field.state.value}
										fieldName={field.name}
										errorMessage={
											isBlurred || submissionAttempts > 0
												? errors[0]?.message || serverErrorMessage
												: undefined
										}
										data-isvalid={isValid && isDirty && !serverErrorMessage}
										onBlur={field.handleBlur}
										onChange={(e) => {
											field.handleChange(e.target.value);

											// clear server error message and success message on change
											setServerErrorMessage(undefined);
											setSuccessMessage(null);
										}}
									/>
								);
							}}
						</Field>
					)}
				</Subscribe>

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
				showToast={showToast}
				header="Subscribe Succesfully"
				message={succesMessage}
			/>
		</>
	);
}
