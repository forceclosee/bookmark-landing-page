import "@components/MainContent/FeatureTabButton.css";

export default function FeaturesTabButton() {
	return (
		<>
			{/* Feature Tab for mobile */}
			<select
				name="feature-tab-button"
				id="feature-tab-button"
				className="tab-mobile">
				<option value="simple-bookmarking" className="tab-mobile__option">
					Simple Bookmarking
				</option>
				<option value="speedy-searching" className="tab-mobile__option">
					Speedy Searching
				</option>
				<option value="easy-sharing" className="tab-mobile__option">
					Easy Sharing
				</option>
			</select>

			{/* Feature Tab for desktop */}
			<div className="tab-desktop">
				<button type="button" className="tab-desktop__button">
					Simple Bookmarking
				</button>
				<button type="button" className="tab-desktop__button">
					Speedy Searching
				</button>
				<button type="button" className="tab-desktop__button">
					Easy Sharing
				</button>
			</div>
		</>
	);
}
