import { useState, type ReactNode } from "react";

import FeatureContent from "./FeatureContent";
import FeatureTabButton from "./FeatureTabButton";

import { features } from "@data/data-features";

import "@components/MainContent/Features.css";

type Props = {
	children: ReactNode;
};

export default function Features({ children }: Props) {
	const [selectedTab, setSelectedTab] = useState<keyof typeof features>(
		Object.keys(features)[0] as keyof typeof features,
	);

	return (
		<section className="features">
			<header className="features__header flow">
				<h2 className="features__title">Features</h2>
				<p className="features__description">
					Our aim is to make it quick and easy for you to access your favourite
					websites. Your bookmarks sync between your devices so you can access
					them on the go.
				</p>
			</header>
			<FeatureTabButton
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
			<FeatureContent
				id={features[selectedTab].id}
				ariaLabelledby={features[selectedTab].ariaLabelledby}
				image={features[selectedTab].image.src}
				title={features[selectedTab].title}
				text={features[selectedTab].content}>
				{children}
			</FeatureContent>
		</section>
	);
}
