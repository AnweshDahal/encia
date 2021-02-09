import { getElement } from "./util.js";

export const setSearchFocus = () => {
	getElement("search").focus();
};

export const clearSearchBar = (event) => {
	event.preventDefault();
	getElement("search").value = "";
	const clear = getElement("clear");
	clear.classList.add("none");
	clear.classList.remove("flex");
};

export const showClearButton = (event) => {
	event.preventDefault();
	const search = getElement("search");
	const clear = getElement("clear");

	// if the length of the user input is greate than 0 then show the clear btn
	if (search.value.length) {
		clear.classList.add("flex");
		clear.classList.remove("none");
	} else {
		clear.classList.add("none");
		clear.classList.remove("flex");
	}
};

export const clearPushEvent = (event) => {
	// register enter and space as trigge for clear btn while focused
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		getElement("clear").click();
	}
};
