const AppState = require("../util/AppState.js")

const navigate = reference => {
	const query = {
		reference,
		"texts": AppState.display_texts
	}
	$("#results").innerHTML = `Fetching results...`
	fetch("https://parabible.com/api/chapter-text", {
		method: "POST",
		headers: {
			"content-type": "application/json; charset=utf-8"
		},
		body: JSON.stringify(query)
	}).then(response => {
		return response.json()
	}).then(response => {
		const resultCount = response.results.truncated ? response.results.truncated : response.results.length
		$("#results").innerHTML = `<h1>Found ${response.results.length} results</h1>` + resultOutput(response.results)
	})
}

module.exports = navigate