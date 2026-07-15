import type { ReactNode } from "react";

import { features } from "@data/data-features";

import "@components/MainContent/FeatureContent.css";

type Props = {
	children: ReactNode;
};

export default function FeatureContent({ children }: Props) {
	return (
		<div className="feature-content">
			<div className="feature-content__image-wrapper">
				<img
					src={features[0].image.src}
					alt=""
					className="feature-content__image"
					loading="lazy"
				/>
			</div>
			<div className="feature-content__details flow">
				<h2 className="feature-content__title">{features[0].title}</h2>
				<p className="feature-content__text">{features[0].content}</p>
				{children}
			</div>
		</div>
	);
}
