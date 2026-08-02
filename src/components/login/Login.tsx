import "@components/login/Login.css";

export default function Login() {
	return (
		<dialog id="login-modal">
			<form noValidate></form>
			<p>
				don't have an account? <a href="/signup">Sign up</a>
			</p>
		</dialog>
	);
}
