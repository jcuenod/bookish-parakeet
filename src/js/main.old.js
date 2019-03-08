let entity_store
const $ = (x) => {return document.querySelector(x)}

const entityDivContent = (e) => {
	const eDiv = e.map(a => {
		return `<div><span>${a._entity}</span><span>${a.value}</span></div>`
	}).join("")
	return eDiv
}

const entitiesDiv = (ee) => {
	const keys = Object.keys(ee)
	const terms = keys.filter(k => {return k.startsWith("term")})
	const entityDivs = terms.map((e,i) => {
		return `<div class='oneentity'><h1>Search Term ${i + 1}</h1>${entityDivContent(ee[e])}</div>`
	})
	$("#entitiesContainer").innerHTML = entityDivs.join("")
}

const url = (queryString) => {return `https://api.wit.ai/message?v=20170307&verbose=true&q=${queryString}`}

const clickEvent = () => {
	const queryString = $("#query").value
	fetch(url(queryString), {
		headers: new Headers({
			'Authorization': 'Bearer 6HH7NDQMBQQD2CBU5PUV6WR3QMIAAPNG',
			'Content-Type': 'application/json'
		})
	}).then((response) => {
		return response.json()
	}).then((response) => {
		entitiesDiv(response.entities)
		entity_store = response.entities

		const corpusLimit = response.entities.corpus_filter ? response.entities.corpus_filter[0].value : "anywhere"
		const syntaxLimit = response.entities.syntax_range ? response.entities.syntax_range[0].value : "clause"
		const rangeLimitText = `searching <b>${syntaxLimit}s</b> in <b>${corpusLimit}</b> for:`
		$("#rangeLimit").innerHTML = rangeLimitText
		searchTimeout(true)
	})
}

$("#go").onclick = clickEvent
$("#query").addEventListener("keydown", (e) => {
	const event = e ? e : window.event
	if (e.keyCode == 13 /*enter*/) { clickEvent() }
}, false);

let increment = 0
const searchTimeout = (start) => {
	if (start) {
		increment = 3
	}
	else if (increment === 0) {
		return doSearch()
	}
	$("#results").innerHTML = `Searching in ${increment--}`
	window.setTimeout(() => {
		searchTimeout()
	}, 1000)
}

const doSearch = () => {
	const query = prepareQuery()
	$("#results").innerHTML = `Fetching results...`
	fetch("https://parabible.com/api/term-search", {
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
const knownCorpora = {
	"torah": ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
	"former prophets": ["Joshua", "Judges", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings"],
	"historical books": ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"],
	"wisdom literature": ["Job", "Proverbs", "Ecclesiastes"],
	"prophets": ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habbakuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
	"minor prophets": ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habbakuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
	"Old Testament": []
}
const conversions = {
	"part_of_speech": "sp",
	"search_term": "tricons",
	"stem": "vs",
	"tense": "vt",
	"nu": "nu",
	"gender": "gn",
	"masc": "m",
	"fem": "f",
	"person": "ps",
	"3": "p3",
	"2": "p2",
	"1": "p1",
	"p": "pl",
	"s": "sg"
}
const knownCorporaList = Object.keys(knownCorpora)
const conversionList = Object.keys(conversions)
const prepareQuery = () => {
	const syntaxLimit = entity_store.syntax_range ? entity_store.syntax_range[0].value : "clause"
	let corpusLimit = []
	if (entity_store.corpus_filter) {
		const corpusLimitVariable = entity_store.corpus_filter[0].value
		if (knownCorporaList.includes(corpusLimitVariable)) {
			corpusLimit = knownCorpora[corpusLimitVariable]
		}
		else {
			corpusLimit = [corpusLimitVariable]
		}
	}

	const apiTemplate = {
		"query": [],
		"search_range": syntaxLimit,
		"search_filter": corpusLimit,
		"texts": [ "wlc", "net" ]
	}
	const entity_keys = Object.keys(entity_store)
	entity_keys.filter(k => {return k.startsWith("term")}).map((term, i) => {
		apiTemplate.query.push(prepareTerm(entity_store[term], i))
	})
	return apiTemplate
}
const prepareTerm = (term, id) => {
	const searchTermTemplate = {
		"uid": ""+id,
		"inverted": false,
		"data": {}
	}
	term.forEach(t => {
		if (t._entity === "composite_pgn") {
			searchTermTemplate.data["ps"] = conversions[ t.value[0] ]
			searchTermTemplate.data["gn"] = t.value[1]
			searchTermTemplate.data["nu"] = conversions[ t.value[2] ]
		}
		else {
			let value = ""
			if (t._entity === "search_term")
			{
				let searchTerm = t.value.replace(/[ךםףןץ]/g, function (m) {
					return {
						"ך": "כ",
						"ם": "מ",
						"ף": "פ",
						"ן": "נ",
						"ץ": "צ",
					}[m];
				})
				value = searchTerm.normalize()
			}
			else if (conversionList.includes(""+t.value)) {
				value = conversions[""+t.value]
			}
			else {
				value = ""+t.value
			}

			searchTermTemplate.data[conversions[""+t._entity]] = value
		}
	})
	return searchTermTemplate
}


const englishCell = (verses, content) => {
	return verses.map((v, i) => {
		return `<span class="verseNumber">${v%1000}</span><span class="verseText">${content[i]}</span>`
	})
}
const hebrewCell = (verses, content) => {
	return verses.map((v, i) => {
		return `<span class="verseNumber">${v%1000}</span><span class="verseText">${hebrewContent(content[i])}</span>`
	})
}
const hebrewContent = (text) => {
	return text.map(accentUnit => {
		return accentUnit.map(wbit => {
			if (wbit.hasOwnProperty("temperature")) {
				return `<span class="temp${wbit.temperature}">${wbit.word}${wbit.trailer}</span>`
			}
			else {
				return wbit.word + wbit.trailer
			}
		}).join("")
	}).join("")
}

const resultOutput = (results) => {
	const surroundWithFrame = (content) => {return `<div class="resultTable">${content}</div>`}
	const resultRow = (row) => {
		return `<div class="resultRow">
			<div class="wlc">${hebrewCell(row.verses, row.verses.map(v => row.text[v].wlc))}</div>
			<div class="net">${englishCell(row.verses, row.verses.map(v => row.text[v].net))}</div>
		</div>`
	}
	const resultTable = results.map(r => {
		return resultRow(r)
	}).join("")
	return surroundWithFrame(resultTable)
}