import { useState } from "react";

import FeatureContent from "@components/features/FeatureContent";
import FeatureTabButton from "@components/features/FeatureTabButton";

import { features } from "@data/data-features";

import "@components/features/Features.css";

export default function Features() {
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
				id={`panel-${features[selectedTab].id}`}
				rawId={features[selectedTab].id}
				ariaLabelledby={`tab-${features[selectedTab].id}`}
				image={features[selectedTab].image.src}
				title={features[selectedTab].title}
				href={`/features#${features[selectedTab].id}`}>
				{features[selectedTab].content}
			</FeatureContent>
		</section>
	);
}
