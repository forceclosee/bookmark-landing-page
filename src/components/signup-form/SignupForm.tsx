import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import FormInput from "@components/shared/FormInput";
import ButtonClient from "@components/shared/ButtonClient";

import { passwordRules, signupSchema } from "@lib/schema/signupSchema";

import "@components/signup-form/SignupForm.css";

export default function Signup() {
	//  password input type
	const [passwordInputType, setPasswordInputType] = useState<
		"password" | "text"
	>("password");

	// confirm password input type
	const [confirmInputType, setConfirmInputType] = useState<"password" | "text">(
		"password",
	);

	// change input type on click
	const handleClick = (target: "password" | "confirm") => {
		if (target === "password") {
			setPasswordInputType((prev) =>
				prev === "password" ? "text" : "password",
			);
		}
		if (target === "confirm") {
			setConfirmInputType((prev) =>
				prev === "password" ? "text" : "password",
			);
		}
	};

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {
			signupEmail: "",
			signupPassword: "",
			signupConfirmPassword: "",
		},
		validators: {
			onChange: signupSchema,
			onSubmit: signupSchema,
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
		<form
			noValidate
			className="signup-form"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}>
			<Field name="signupEmail">
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

			<Field name="signupPassword">
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
							handleClick={() => handleClick("password")}
							onFieldChange={(value) => {
								field.handleChange(value);
							}}
							errorMessage={errors[0]?.message}>
							{/* Password rules */}
							<div className="password__rules">
								<span className="password__rules-title">Password rules:</span>
								<ul className="password-rules__list">
									{passwordRules.map((rule) => {
										const isPassed = rule.test(field.state.value || "");

										return (
											<li
												key={rule.id}
												data-passed={isPassed ? "true" : "false"}
												className="password-rules__rule">
												<div className="password-rules__icon-wrapper">
													<svg
														className="password-rules__icon password-rules__check-icon"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 640 640"
														fill="currentColor">
														<path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
													</svg>

													<svg
														className="password-rules__icon password-rules__xmark-icon"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 640 640"
														fill="currentColor">
														<path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
													</svg>
												</div>

												<span className="password-rules__label">
													{rule.label}
												</span>
											</li>
										);
									})}
								</ul>
							</div>
						</FormInput>
					);
				}}
			</Field>

			<Field name="signupConfirmPassword">
				{(field) => {
					const { errors } = field.state.meta;

					return (
						<FormInput
							variant="auth"
							type={confirmInputType}
							label="Confirm Password"
							fieldName={field.name}
							placeholder="Enter your password again"
							haveRevealButton
							revealButtonAriaLabel={
								confirmInputType === "password"
									? "Show password"
									: "Hide Password"
							}
							revealButtonAriaPressed={
								confirmInputType === "password" ? "false" : "true"
							}
							value={field.state.value}
							handleClick={() => handleClick("confirm")}
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
					<ButtonClient variant="primary" type="submit" disabled={isSubmitting}>
						<span
							className="signup-form__loader-icon"
							aria-hidden="true"></span>
						<span>{isSubmitting ? "Signing up..." : "Sign up"}</span>
					</ButtonClient>
				)}
			</Subscribe>
		</form>
	);
}
