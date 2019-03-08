// Display things
const $ = (x) => {return document.querySelector(x)}

const englishCell = (verses, content) => {
	return verses.map((v, i) => {
		return `<td class="net"><span class="verseText">${content[i]}</span></td>`
	})
}
const hebrewCell = (verses, content) => {
	return verses.map((v, i) => {
		return `<td class="wlc"><span class="verseNumber">${v%1000}</span><span class="verseText">${hebrewContent(content[i])}</span></td>`
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
	const surroundWithFrame = (content) => {return `<table class="resultTable">${content}</table>`}
	const resultRow = (row) => {
		return `

		<tr>
			${hebrewCell(row.verses, row.verses.map(v => row.text[v].wlc))}
			${englishCell(row.verses, row.verses.map(v => row.text[v].net))}
		</tr>`
	}
	const resultTable = results.map(r => {
		return resultRow(r)
	}).join("")

	$("#results").innerHTML = surroundWithFrame(resultTable)
}

module.exports = resultOutput