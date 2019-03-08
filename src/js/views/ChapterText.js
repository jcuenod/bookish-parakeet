// Display things

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

