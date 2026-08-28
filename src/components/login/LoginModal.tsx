import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";

import { loginSchema } from "@lib/schema/loginSchema";
import { authClient } from "@lib/auth-client";

import FormInput from "@components/shared/FormInput";
import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";
import ToastMessage from "@components/shared/ToastMessage";

import "@components/login/LoginModal.css";
import { navigate } from "astro:transitions/client";

export default function Login() {
	const dialogRef = useRef<HTMLDialogElement>(null);

	// error message from server
	const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
		null,
	);

	// toast message visibility
	const [showToast, setShowToast] = useState<boolean>(false);

	// succes message
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	//  password input type
	const [passwordInputType, setPasswordInputType] = useState<
		"password" | "text"
	>("password");

	// handle toast message visibility
	useEffect(() => {
		if (successMessage !== null) {
			setShowToast(true);

			const toastTimer = setTimeout(() => {
				setShowToast(false);
				setSuccessMessage(null);
			}, 4000);

			return () => clearTimeout(toastTimer);
		} else {
			setShowToast(false);
		}
	}, [successMessage]);

	// change input type on click
	const handleClick = () => {
		setPasswordInputType((prev) => (prev === "password" ? "text" : "password"));
	};

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {
			loginEmail: "",
			loginPassword: "",
		},
		validators: {
			onChange: loginSchema,
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			const { data, error } = await authClient.signIn.email({
				email: value.loginEmail,
				password: value.loginPassword,
			});

			if (error) {
				setSuccessMessage(null); /* clear success message */
				setServerErrorMessage(
					error.message || "Something went wrong",
				); /* set server error message */
			} else {
				setServerErrorMessage(null); /* clear server error message */
				setSuccessMessage(
					`Welcome back ${data.user.name}`,
				); /* set success message */
				formApi.reset();
				setTimeout(() => {
					dialogRef.current?.close(); /* close modal */

					/* redirect to homepage if user at signup page */
					const currentPath = window.location.pathname.replace(/\/$/, "");
					const destination =
						currentPath === "/signup" ? "/" : window.location.pathname;

					navigate(destination, { history: "replace" });
				}, 2000);
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
		<dialog
			ref={dialogRef}
			id="login-modal"
			className="login__dialog"
			suppressHydrationWarning={true}>
			<ButtonClient
				type="button"
				variant="icon"
				className="login__close-button"
				title="Close modal"
				commandfor="login-modal"
				command="close"
				aria-label="Close modal">
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor">
					<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
				</svg>
			</ButtonClient>
			<h2 className="login__title">Login</h2>
			<form
				noValidate
				className="login-form"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				<Field name="loginEmail">
					{(field) => {
						const { errors, isBlurred, isValid, isDirty } = field.state.meta;

						return (
							<FormInput
								variant="auth"
								type="email"
								label="Email"
								placeholder="Enter your email address"
								autoComplete="email"
								value={field.state.value}
								fieldName={field.name}
								errorMessage={errors[0]?.message}
								aria-invalid={!!errors.length && isBlurred}
								data-isvalid={isValid && isDirty}
								onBlur={field.handleBlur}
								onChange={(e) => {
									field.handleChange(e.target.value);

									// clear server error message and success message on change
									setServerErrorMessage(null);
									setSuccessMessage(null);
								}}
							/>
						);
					}}
				</Field>

				<Field name="loginPassword">
					{(field) => {
						const { errors, isBlurred, isValid, isDirty } = field.state.meta;

						return (
							<FormInput
								variant="auth"
								type={passwordInputType}
								label="Password"
								placeholder="Enter your password"
								value={field.state.value}
								fieldName={field.name}
								errorMessage={errors[0]?.message}
								aria-invalid={!!errors.length && isBlurred}
								data-isvalid={isValid && isDirty}
								onBlur={field.handleBlur}
								haveRevealButton
								revealButtonAriaLabel={
									passwordInputType === "password"
										? "Show password"
										: "Hide Password"
								}
								handleClick={handleClick}
								onChange={(e) => {
									field.handleChange(e.target.value);

									// clear server error message and success message on change
									setServerErrorMessage(null);
									setSuccessMessage(null);
								}}
							/>
						);
					}}
				</Field>

				{serverErrorMessage && (
					<span role="alert" className="login__server-error">
						{serverErrorMessage}
					</span>
				)}

				<Subscribe selector={(state) => [state.isSubmitting]}>
					{([isSubmitting]) => (
						<ButtonClient
							variant="primary"
							type="submit"
							disabled={isSubmitting}>
							<Loader className="login-form__loader-icon" />
							<span>{isSubmitting ? "Logging in..." : "Login"}</span>
						</ButtonClient>
					)}
				</Subscribe>
			</form>

			<p className="login__signup-text">
				don't have an account?{" "}
				<a href="/signup" className="hover-underline login__signup-link">
					Sign up
				</a>
			</p>

			<ToastMessage
				header="Login succesfully"
				message={successMessage}
				hidden={!showToast}
			/>
		</dialog>
	);
}
