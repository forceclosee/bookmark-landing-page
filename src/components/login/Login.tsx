import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";

import FormInput from "@components/shared/FormInput";
import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";

import { loginSchema } from "@lib/schema/loginSchema";

import "@components/login/Login.css";

export default function Login() {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const isLoginParam = params.get("login") === "true";

		// Opem modal if url has login=true params, and remove the url params
		if (isLoginParam) {
			dialogRef.current?.showModal();

			const url = new URL(window.location.href);
			url.searchParams.delete("login");
			window.history.replaceState({}, "", url.pathname + url.search);
		}
	}, []);

	//  password input type
	const [passwordInputType, setPasswordInputType] = useState<
		"password" | "text"
	>("password");

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
		onSubmit: async () => {
			// lempar ke better auth
		},
		onSubmitInvalid() {
			const InvalidInput = document.querySelector(
				"input:invalid",
			) as HTMLInputElement;

			InvalidInput?.focus();
		},
	});

	return (
		<dialog ref={dialogRef} id="login-modal" className="login__dialog">
			<ButtonClient
				type="button"
				variant="icon"
				className="login__close-button"
				title="Close modal"
				onClick={() => dialogRef.current?.close()}>
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
								fieldName={field.name}
								autoComplete="email"
								placeholder="Enter your email address"
								value={field.state.value}
								onFieldChange={(value) => {
									field.handleChange(value);
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
								fieldName={field.name}
								placeholder="Create a password"
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
								}}
								errorMessage={errors[0]?.message}
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
							<Loader className="login-form__loader-icon" />
							<span>{isSubmitting ? "Logging in..." : "Login"}</span>
						</ButtonClient>
					)}
				</Subscribe>
			</form>

			<p className="login__signup-link">
				don't have an account? <a href="/signup">Sign up</a>
			</p>
		</dialog>
	);
}
