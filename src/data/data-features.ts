import featuresTab1 from "@img/illustration-features-tab-1.svg";
import featuresTab2 from "@img/illustration-features-tab-2.svg";
import featuresTab3 from "@img/illustration-features-tab-3.svg";

export const features = {
	simpleBookmarking: {
		id: "panel-simple-bookmarking",
		ariaLabelledby: "tab-simple-bookmarking",
		image: featuresTab1,
		title: "Bookmark in one click",
		content:
			"Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
	},
	speedySearching: {
		id: "panel-speedy-searching",
		ariaLabelledby: "tab-speedy-searching",
		image: featuresTab2,
		title: "Intelligent search",
		content:
			"Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
	},
	easySharing: {
		id: "panel-easy-sharing",
		ariaLabelledby: "tab-easy-sharing",
		image: featuresTab3,
		title: "Share your bookmarks",
		content:
			"Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
	},
};
