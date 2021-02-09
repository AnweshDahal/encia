// importing the modules
import { getElement } from "./util.js";
import {
	clearPushEvent,
	clearSearchBar,
	setSearchFocus,
	showClearButton,
} from "./searchEntry.js";
import { getSearchTerm, retrieveSearchResult } from "./dataFunction.js";
import {
	buildSearchResult,
	clearStatsLine,
	deleteSearchResult,
	setStatsLine,
} from "./searchResults.js";

// load the app when the state of the app changes to complete
document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		initApp();
	}
});

const initApp = () => {
	// setting the focus on search bar
	setSearchFocus();
	// get the clear and search element
	const clear = getElement("clear");
	const search = getElement("search");
	// Adding events
	clear.addEventListener("click", clearSearchBar);
	clear.addEventListener("keydown", clearPushEvent);
	search.addEventListener("input", showClearButton);
	// adding submit event to form
	const form = getElement("searchBar");
	form.addEventListener("submit", submitSearch);
};

const submitSearch = (event) => {
	event.preventDefault();
	deleteSearchResult();
	processSearch();
	setSearchFocus();
};

const processSearch = async () => {
	clearStatsLine();

	const searchTerm = getSearchTerm();

	// if the search term is empty the module terminates here
	if (!searchTerm.length) return;
	// fill an array with the result
	const resultArray = await retrieveSearchResult(searchTerm);
	// build the elements for the results
	if (resultArray.length) buildSearchResult(resultArray);
	// display the nunber of result in the stats
	setStatsLine(resultArray.length);
};
