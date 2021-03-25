const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

function selectItem(e) {
	removeHighlight();
	removeShow();
	// Highlight the tab item
	this.classList.add("tab-border", "text-bright");

	// Grab content item from DOM
	const tabContent = document.querySelector(`#${this.id}-content`);
	// Add show class
	tabContent.classList.add("show");
}

function removeHighlight() {
	tabItems.forEach((item) =>
		item.classList.remove("tab-border", "text-bright")
	);
}

function removeShow() {
	tabContentItems.forEach((contentItem) =>
		contentItem.classList.remove("show")
	);
}

// Check for listen
tabItems.forEach((tabItem) => tabItem.addEventListener("click", selectItem));
