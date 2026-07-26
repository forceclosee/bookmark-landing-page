import { useRef, useEffect, type InputHTMLAttributes } from "react";

import "@components/shared/FormInput.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	errorMessage?: string;
	onFieldChange?: (value: string) => void;
};

export default function FormInput({
	errorMessage = "",
	onFieldChange,
	...props
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	// synchronize error state to browser navite constraint validation api
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.setCustomValidity(errorMessage);
		}
	}, [errorMessage]);

	return (
		<div className="input-group">
			<input
				ref={inputRef}
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
