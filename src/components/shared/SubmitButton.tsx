import type { ComponentProps } from "react";

import "@components/shared/Button.css";

type Props = ComponentProps<"button">;

export default function SubmitButton({ children, ...props }: Props) {
	return (
		<button type="submit" className="button button--submit" {...props}>
			{children}
		</button>
	);
}
