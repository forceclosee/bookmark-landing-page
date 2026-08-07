import type { ComponentProps } from "react";

import "@components/shared/Button.css";

type Props = RequireAttributes<ComponentProps<"button">, "type"> & {
	variant: "primary" | "reveal";
};

export default function SubmitButton({
	children,
	className,
	variant,
	...props
}: Props) {
	return (
		<button
			className={[
				className,
				"button",
				variant === "primary" && "button--client-primary",
				variant === "reveal" && "button--client-reveal",
			]
				.filter(Boolean)
				.join(" ")}
			{...props}>
			{children}
		</button>
	);
}
