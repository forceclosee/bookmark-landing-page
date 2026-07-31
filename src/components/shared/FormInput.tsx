import { useRef, useEffect, type ComponentProps } from "react";

import "@components/shared/FormInput.css";

type Props = ComponentProps<"input"> & {
	label: string;
	errorMessage?: string;
	fieldName: string;
	onFieldChange?: (value: string) => void;
};

export default function FormInput({
	label,
	errorMessage = "",
	fieldName,
	onFieldChange,
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
		<div className="input-group">
			<label htmlFor={fieldName} className="sr-only">
				{label}
			</label>
			<input
				ref={inputRef}
				id={fieldName}
				name={fieldName}
				{...props}
				className="input-group__input"
				onChange={(e) => {
					const newValue = e.target.value;

					onFieldChange?.(newValue);
				}}
			/>
			<span className="input-group__error-message">{errorMessage}</span>
		</div>
	);
}
