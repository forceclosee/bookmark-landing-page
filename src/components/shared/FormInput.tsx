import { useRef, useEffect, type ComponentProps } from "react";

import "@components/shared/FormInput.css";

type Props = ComponentProps<"input"> & {
	label: string;
	errorMessage?: string;
	fieldName: string;
	onFieldChange?: (value: string) => void;
	variant: "subscribe" | "auth";
};

export default function FormInput({
	label,
	errorMessage = "",
	fieldName,
	onFieldChange,
	variant,
	...props
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	// synchronize error state to browser native constraint validation api
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.setCustomValidity(errorMessage);
		}
	}, [errorMessage]);

	return (
		<div className="field">
			<label
				htmlFor={fieldName}
				className={[
					variant === "subscribe" ? "sr-only" : null,
					variant === "auth" ? "field__label" : null,
				]
					.filter(Boolean)
					.join(" ")}>
				{label}
			</label>
			<div className="field__input-group">
				<input
					ref={inputRef}
					id={fieldName}
					name={fieldName}
					{...props}
					className={[
						"field__input",
						variant === "auth" ? "field__input--auth" : null,
					]
						.filter(Boolean)
						.join(" ")}
					onChange={(e) => {
						const newValue = e.target.value;

						onFieldChange?.(newValue);
					}}
				/>
				{/* error icon */}
				<svg
					className="field__error-icon"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20">
					<g fill="none" fillRule="evenodd">
						<circle cx="10" cy="10" r="10" fill="#FA5959" />
						<g fill="#FFF" transform="translate(9 5)">
							<rect width="2" height="7" rx="1" />
							<rect width="2" height="2" y="8" rx="1" />
						</g>
					</g>
				</svg>
				<span className="field__error-message">{errorMessage}</span>
			</div>
		</div>
	);
}
