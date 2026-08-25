import type { ReactNode } from "react";

import "@components/features/FeatureContent.css";

type Props = {
	children: ReactNode;
	id: string;
	ariaLabelledby: string;
	image: string;
	title: string;
	href: string;
};

export default function FeatureContent({
	children,
	id,
	ariaLabelledby,
	image,
	title,
	href,
}: Props) {
	return (
		<section
			id={id}
			role="tabpanel"
			className="feature-content"
			aria-labelledby={ariaLabelledby}>
			<div className="feature-content__image-wrapper">
				<img
					src={image}
					alt=""
					className="feature-content__image"
					loading="lazy"
				/>
			</div>
			<div className="feature-content__details flow">
				<h2 className="feature-content__title">{title}</h2>
				<p className="feature-content__text">{children}</p>
				<a href={href} className="button-link button-link--primary">
					More Info
				</a>
			</div>
		</section>
	);
}
