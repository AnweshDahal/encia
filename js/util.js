/**
 * Gets an element from the document based on if
 * @param {String} id
 * @returns {Element}
 */
export const getElement = (id) => {
	const element = document.getElementById(id);
	return element;
};
