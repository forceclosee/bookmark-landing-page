import type { ReactNode } from "react";

import "@components/features/FeatureContent.css";

type Props = {
	children: ReactNode;
	id: string;
	rawId: string;
	ariaLabelledby: string;
	image: string;
	title: string;
	text: string;
	href: string;
};

export default function FeatureContent({
	children,
	id,
	rawId,
	ariaLabelledby,
	image,
	title,
	text,
	href,
}: Props) {
	return (
		<section
			id={id}
			role="tabpanel"
			className="feature-content"
			aria-labelledby={ariaLabelledby}>
			<div className="feature-content__image-wrapper">
				{children}
				<img
					src={image}
					alt=""
					className="feature-content__image"
					loading="lazy"
					style={{ viewTransitionName: `${rawId}-image` }}
				/>
			</div>
			<div className="feature-content__details flow">
				<h2
					className="feature-content__title"
					style={{ viewTransitionName: `${rawId}-title` }}>
					{title}
				</h2>
				<p
					className="feature-content__text"
					style={{ viewTransitionName: `${rawId}-text` }}>
					{text}
				</p>
				<a href={href} className="button-link button-link--primary">
					More Info
				</a>
			</div>
		</section>
	);
}
