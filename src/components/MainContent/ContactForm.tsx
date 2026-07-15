import "@components/MainContent/ContactForm.css";

export default function ContactForm() {
	return (
		<form action="" className="contact-form">
			<div className="contact-form__email-group">
				<input
					type="email"
					name="email"
					id="email-input"
					aria-label="Enter your Email address"
					className="contact-form__email-input"
					placeholder="Enter your email address"
				/>
				<span className="contact-form__error-message">asd</span>
			</div>
			<button type="submit" className="contact-form__submit-button">
				Contact Us
			</button>
		</form>
	);
}

// buat email validation dengan zod dan rhf
