import { getElement } from "./util.js";

export const getSearchTerm = () => {
	// get the raw search term and trim the trailing space
	const rawSearchTerm = getElement("search").value.trim();
	// regex to check consecutive white space
	const regex = /[ ]{2,}/gi;
	// replace the regex match with single space
	const searchTerm = rawSearchTerm.replaceAll(regex, " ");
	return searchTerm;
};

export const retrieveSearchResult = async (searchTerm) => {
	// get the api call link
	const wikiSearchString = getWikiSearchString(searchTerm);
	// request data from the api
	const wikiSearchResults = await requestData(wikiSearchString);
	let resultsArray = [];

	// if there is a match then the response will contain a query property
	if (wikiSearchResults.hasOwnProperty("query")) {
		// pass the required data into an array
		resultsArray = processResult(wikiSearchResults.query.pages);
	}
	return resultsArray;
};

const getWikiSearchString = (searchTerm) => {
	// max char to be called according to screen width
	const maxChars = getMaxChar();
	// the raw api call URI
	const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
	// modified api call URI
	const searchString = encodeURI(rawSearchString);
	return searchString;
};

const getMaxChar = () => {
	const width = window.innerWidth || document.body.clientWidth;
	let maxChars;
	if (width < 414) maxChars = 65;
	if (width >= 414 && width < 1400) maxChars = 100;
	if (width >= 1400) maxChars = 130;
	return maxChars;
};

const requestData = async (searchString) => {
	try {
		const response = await fetch(searchString);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const processResult = (results) => {
	const resultsArray = [];

	// Loop through the object with key
	Object.keys(results).forEach((key) => {
		// get the required data
		const id = key;
		const title = results[key].title;
		const extract = results[key].extract;
		const img = results[key].hasOwnProperty("thumbnail")
			? results[key].thumbnail.source
			: null;

		// create a new object with that data
		const item = {
			id: id,
			title: title,
			extract: extract,
			img: img,
		};

		// push the data to the array
		resultsArray.push(item);
	});
	return resultsArray;
};
