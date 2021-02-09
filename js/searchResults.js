import { getElement } from "./util.js";
export const buildSearchResult = (resultArray) => {
	// counter for the number of element
	let sn = 1;

	// loop through the result array
	resultArray.forEach((result) => {
		// create the rsult element
		const searchResult = createSearchResult(sn++, result);

		// add the result element ot the reult container
		const resultsContainer = getElement("resultsContainer");
		resultsContainer.append(searchResult);
	});
};

// detetes the previous result
export const deleteSearchResult = () => {
	const parentElement = getElement("resultsContainer");
	let child = parentElement.lastElementChild;
	// loops untile the results container has a child
	while (child) {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}
};

export const clearStatsLine = () => {
	getElement("stats").textContent = "";
};

// creates the search result element
const createSearchResult = (sn, result) => {
	const searchResult = document.createElement("div");
	searchResult.classList.add("search-result");
	const resultContents = document.createElement("div");
	resultContents.classList.add("result-contents");
	const resultTitle = createResultTitle(sn, result);
	const resultExtract = createResultExtract(result);
	resultContents.append(resultTitle);
	resultContents.append(resultExtract);
	searchResult.append(resultContents);
	return searchResult;
};

// creates the search result title element
const createResultTitle = (sn, result) => {
	const resultTitle = document.createElement("div");
	resultTitle.classList.add("result-title");
	const link = document.createElement("a");
	link.classList.add("link");
	link.href = `https://en.wikipedia.org/?curid=${result.id}`;
	link.target = "_blank";
	const resultSN = document.createElement("span");
	resultSN.classList.add("result-sn");
	let currentSN = sn < 10 ? "0" + sn : sn;
	resultSN.textContent = currentSN + ". ";
	link.append(resultSN);
	link.append(result.title);
	resultTitle.append(link);
	return resultTitle;
};

// creates the search result extract element
const createResultExtract = (result) => {
	const resultExtract = document.createElement("div");
	resultExtract.classList.add("result-extract");
	const extract = document.createElement("p");
	extract.classList.add("extract");
	extract.textContent = result.extract;
	resultExtract.append(extract);
	if (result.img) {
		const img = createResultImage(result);
		resultExtract.append(img);
	}
	return resultExtract;
};

// creates the search result image element
const createResultImage = (result) => {
	const img = document.createElement("img");
	img.classList.add("img");
	img.src = result.img;
	img.alt = result.title;
	return img;
};

// updates the stats element
export const setStatsLine = (resultNumber) => {
	const stats = getElement("stats");
	if (resultNumber) {
		stats.textContent = `Displaying ${resultNumber} Results`;
	} else {
		stats.textContent = `Sorry! No Result Found`;
	}
};
