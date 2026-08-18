import { useTransition } from "react";

import { authClient } from "@lib/auth-client";

import ButtonClient from "@components/shared/ButtonClient";
import Loader from "@components/shared/Loader";

import "@components/header/LoginButton.css";

type Props = {
	isMobile?: boolean;
};

export default function LoginButton({ isMobile }: Props) {
	const { data: session } = authClient.useSession();

	const [isLoggingOut, startTransition] = useTransition();

	const Buttontext = () => {
		if (session) {
			if (isLoggingOut) {
				return (
					<>
						<Loader className="login-button__loader" />
						<span>Logging out...</span>
					</>
				);
			}
			return "Log out";
		} else {
			return "Login";
		}
	};

	const handleClick = () => {
		if (session) {
			startTransition(async () => {
				await authClient.signOut();
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
			disabled={isLoggingOut}
			onClick={handleClick}>
			{Buttontext()}
		</ButtonClient>
	);
}
