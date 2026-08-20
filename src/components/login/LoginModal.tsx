import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";

import { loginSchema } from "@lib/schema/loginSchema";
import { authClient } from "@lib/auth-client";

import FormInput from "@components/shared/FormInput";
import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";
import ToastMessage from "@components/shared/ToastMessage";

import "@components/login/LoginModal.css";

export default function Login() {
	// check user session
	const { data: session, isPending } = authClient.useSession();

	const dialogRef = useRef<HTMLDialogElement>(null);

	// URL PARAMS
	useEffect(() => {
		if (isPending) return;

		const params = new URLSearchParams(window.location.search);
		const isLoginParam = params.get("login") === "true";

		// Open modal if url has login=true params, and remove the url params
		if (isLoginParam) {
			dialogRef.current?.showModal();

			const url = new URL(window.location.href);
			url.searchParams.delete("login");
			window.history.replaceState({}, "", url.pathname + url.search);
		}
	}, [isPending]);

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
					if (currentPath === "/signup") {
						window.location.replace("/");
					}
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

	// return nothing and auto rediret to homepage if the user already have session
	if ((session || isPending) && !successMessage) {
		return null;
	}

	// if user didn't have session return login modal
	return (
		<dialog
			ref={dialogRef}
			id="login-modal"
			className="login__dialog"
			data-testid="login-modal">
			<ButtonClient
				type="button"
				variant="icon"
				className="login__close-button"
				title="Close modal"
				commandfor="login-modal"
				command="close">
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
						const { errors } = field.state.meta;

						return (
							<FormInput
								variant="auth"
								type="email"
								label="Email"
								inputDataTestid="login-email"
								fieldName={field.name}
								autoComplete="email"
								placeholder="Enter your email address"
								value={field.state.value}
								onFieldChange={(value) => {
									field.handleChange(value);

									// clear server error message and success message on change
									setServerErrorMessage(null);
									setSuccessMessage(null);
								}}
								errorMessage={errors[0]?.message}
							/>
						);
					}}
				</Field>

				<Field name="loginPassword">
					{(field) => {
						const { errors } = field.state.meta;

						return (
							<FormInput
								variant="auth"
								type={passwordInputType}
								label="Password"
								inputDataTestid="login-password"
								fieldName={field.name}
								placeholder="Enter your password"
								haveRevealButton
								revealButtonAriaLabel={
									passwordInputType === "password"
										? "Show password"
										: "Hide Password"
								}
								revealButtonAriaPressed={
									passwordInputType === "password" ? "false" : "true"
								}
								value={field.state.value}
								handleClick={handleClick}
								onFieldChange={(value) => {
									field.handleChange(value);

									// clear server error message and success message on change
									setServerErrorMessage(null);
									setSuccessMessage(null);
								}}
								errorMessage={errors[0]?.message}
							/>
						);
					}}
				</Field>

				{serverErrorMessage && (
					<span className="login__server-error">{serverErrorMessage}</span>
				)}

				<Subscribe selector={(state) => [state.isSubmitting]}>
					{([isSubmitting]) => (
						<ButtonClient
							variant="primary"
							type="submit"
							data-testid="login-submit-button"
							disabled={isSubmitting}>
							<Loader className="login-form__loader-icon" />
							<span>{isSubmitting ? "Logging in..." : "Login"}</span>
						</ButtonClient>
					)}
				</Subscribe>
			</form>

			<p className="login__signup-text">
				don't have an account?{" "}
				<a href="/signup" className="login__signup-link">
					Sign up
				</a>
			</p>

			<ToastMessage
				header="Login succesfully"
				message={successMessage}
				aria-hidden={showToast ? "false" : "true"}
			/>
		</dialog>
	);
}
