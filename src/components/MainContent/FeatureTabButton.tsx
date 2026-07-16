import "@components/MainContent/FeatureTabButton.css";
import type { KeyboardEvent } from "react";

type TabName = "simpleBookmarking" | "speedySearching" | "easySharing";

type Props = {
	selectedTab: TabName;
	setSelectedTab: (tab: TabName) => void;
};

export default function FeaturesTabButton({
	selectedTab,
	setSelectedTab,
}: Props) {
	const handleClick = (selectedButton: TabName) => {
		setSelectedTab(selectedButton);
	};

	const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
		const tabs = Array.from(
			e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
		);
		const currentIndex = tabs.indexOf(e.target as HTMLElement);

		let newIndex = currentIndex;

		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
			return;
		}

		// change index using arrow key
		if (e.key === "ArrowRight") {
			newIndex = currentIndex + 1;
		}
		if (e.key === "ArrowLeft") {
			newIndex = currentIndex - 1;
		}

		// make sure newIndex value between 0-3
		if (newIndex >= tabs.length) {
			newIndex = 0;
		} else if (newIndex < 0) {
			newIndex = tabs.length - 1;
		}

		tabs[newIndex].focus();
	};

	return (
		<div
			role="tablist"
			onKeyDown={handleKeydown}
			className="tab-desktop"
			aria-label="Select features you want to see">
			<button
				type="button"
				id="tab-simple-bookmarking"
				role="tab"
				className="tab-desktop__button"
				onClick={() => handleClick("simpleBookmarking")}
				tabIndex={selectedTab === "simpleBookmarking" ? 0 : -1}
				aria-selected={selectedTab === "simpleBookmarking"}
				aria-controls="simple-bookmarking">
				Simple Bookmarking
			</button>
			<button
				type="button"
				id="tab-speedy-searching"
				role="tab"
				className="tab-desktop__button"
				onClick={() => handleClick("speedySearching")}
				tabIndex={selectedTab === "speedySearching" ? 0 : -1}
				aria-selected={selectedTab === "speedySearching"}
				aria-controls="speedy-searching">
				Speedy Searching
			</button>
			<button
				type="button"
				id="tab-easy-sharing"
				role="tab"
				className="tab-desktop__button"
				onClick={() => handleClick("easySharing")}
				tabIndex={selectedTab === "easySharing" ? 0 : -1}
				aria-selected={selectedTab === "easySharing"}
				aria-controls="easy-sharing">
				Easy Sharing
			</button>
		</div>
	);
}
