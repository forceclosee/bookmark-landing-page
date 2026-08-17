import type { ComponentProps } from "react";

type Props = ComponentProps<"span">;

export default function Loader({ className }: Props) {
	return (
		<span
			className={[className, "loader"].filter(Boolean).join(" ")}
			aria-hidden="true"></span>
	);
}
