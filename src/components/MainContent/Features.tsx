import type { ReactNode } from "react";

import FeatureContent from "./FeatureContent";
import FeatureTabButton from "./FeatureTabButton";

import "@components/MainContent/Features.css";

type Props = {
	children: ReactNode;
};

export default function Features({ children }: Props) {
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
			<FeatureTabButton />
			<FeatureContent>{children}</FeatureContent>
		</section>
	);
}
