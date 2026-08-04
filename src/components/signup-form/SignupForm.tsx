import { useForm } from "@tanstack/react-form";

import FormInput from "@components/shared/FormInput";
import SubmitButton from "@components/shared/SubmitButton";

import { signupSchema } from "@lib/schema/signupSchema";

import "@components/signup-form/SignupForm.css";

export default function Signup() {
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
							type="password"
							label="Password"
							fieldName={field.name}
							placeholder="Create a password"
							value={field.state.value}
							onFieldChange={(value) => {
								field.handleChange(value);
							}}
							errorMessage={errors[0]?.message}
						/>
					);
				}}
			</Field>

			<Field name="signupConfirmPassword">
				{(field) => {
					const { errors } = field.state.meta;

					return (
						<FormInput
							variant="auth"
							type="password"
							label="Confirm Password"
							fieldName={field.name}
							placeholder="Enter your password again"
							value={field.state.value}
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
					<SubmitButton disabled={isSubmitting}>
						<span
							className="signup-form__loader-icon"
							aria-hidden="true"></span>
						<span>{isSubmitting ? "Signing up..." : "Sign up"}</span>
					</SubmitButton>
				)}
			</Subscribe>
		</form>
	);
}
