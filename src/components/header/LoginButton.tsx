import { useTransition } from "react";

import { authClient } from "@lib/auth-client";
import type { Session } from "@lib/auth";

import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";

import "@components/header/LoginButton.css";
import { navigate } from "astro:transitions/client";

type Props = {
	isMobile?: boolean;
	session: Session | null | undefined;
};

export default function LoginButton({ isMobile, session }: Props) {
	const [isLoggingOut, startTransition] = useTransition();

	const Buttontext = () => {
		if (!session) {
			return <>Login</>;
		}

		if (!isLoggingOut) {
			return <>Log out</>;
		}

		return (
			<>
				<Loader className="login-button__loader" />
				<span>Logging out...</span>
			</>
		);
	};

	const handleClick = () => {
		if (session) {
			startTransition(async () => {
				await authClient.signOut();
				navigate(window.location.pathname, { history: "replace" });
			});
		}
	};

	return (
		<ButtonClient
			type="button"
			className="login-button"
			variant={isMobile ? "basic-secondary" : "basic-primary"}
			commandfor={!session ? "login-modal" : undefined}
			command={!session ? "show-modal" : undefined}
			aria-haspopup={!session ? "dialog" : undefined}
			disabled={isLoggingOut}
			onClick={handleClick}>
			{Buttontext()}
		</ButtonClient>
	);
}
