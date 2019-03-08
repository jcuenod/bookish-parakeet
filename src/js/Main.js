const ViewSearchResults = require("/js/views/SearchResults.js")

const result_data = require("/js/data/search_results.json")

const $ = (x) => { return document.querySelector(x) }

const url = (queryString) => {return `https://api.wit.ai/message?v=20170307&verbose=true&q=${queryString}`}

const clickEvent = () => {
	console.log("find 3ms verbs in the piel stem with the root \u05d6\u05db\u05e8 and fem nouns in the same clause from gen 2 to isaiah 17")
	const queryString = $(".search").value
	$("#header").classList.remove("fullheight")
	//setTimeout(() => ViewSearchResults(result_data.results), 300)
	//TODO: make sure loading spinner thing is showing when header scrolls to top


	//simulate wit response:
	{
		const response = require("/js/data/wit_results.json")
		console.log(response)
	}

	return
	fetch(url(queryString), {
		headers: new Headers({
			'Authorization': 'Bearer EKHGH2LBZ744Y4QD2FIQ7VUJH45I5NUC',
			'Content-Type': 'application/json'
		})
	}).then((response) => {
		return response.json()
	}).then((response) => {
		console.log(response.entities)
		//$("#header").classList.remove("fullheight")
		//TODO: remove the loading spinner thing
	})
}

$(".search").addEventListener("keydown", (e) => {
	const event = e ? e : window.event
	if (e.keyCode == 13 /*enter*/) { clickEvent() }
}, false);
