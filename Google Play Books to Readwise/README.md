# Google Play Books to Readwise

### Steps

1. [Sync notes from Play Books to Google Drive](https://www.cnet.com/how-to/sync-notes-from-play-books-to-google-drive/)
2. In the Google Doc of synced notes, File → Email → Email as attachment (or download File → Download → Web Page (.html, zipped) )
3. In the dropdown selection, change PDF to HTML, then email to yourself (or download the .zip and unzip it).
4. Download the HTML file and open it in your browser.
5. Open DevTools Console (F12) then copy/paste the code below and run it. This will download the CSV file to your computer.
```javascript
// tested with https://docs.google.com/document/d/1xooNMkC3zezRZWeRyxZoAyhdnito25NJSgSO5EtSevs/edit

appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js")
appendScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js")

setTimeout(init, 500) // to give time for jQuery to initialize

function appendScript(url) {
    let s = document.createElement('script')
    s.src = url
    document.head.appendChild(s)
}

function init() {
    var tables = $('body').children('table')

    var title = tables.eq(0).find('td').eq(1).find('h1').text().trim()
    var author = tables.eq(0).find('td').eq(1).find('p').eq(0).text().trim()

    var data = Array.from(tables).map((_el, i) => {
        el = $(_el).find('table')

        if (i === 0) { // first table is title and author
            // const td = el.find('td').eq(1)
            // title = td.find('h1').text().trim()
            // author = td.find('p').eq(0).text().trim()
            return null
        } else if (i === 1) { // second table is warning
            // This document is overwritten when you make changes in Play Books. 
            // You should make a copy of this document before you edit it.
            return null
        } else {

            var chapter = $(_el).prevAll('h2').eq(0).text().trim() // what about 'h1' and 'h3' sections of a book?
            var highlight = el.find('td').eq(1).find('p').eq(0).text().trim()
            var page = el.find('td').eq(2).find('a')
            var page_number = page.text().trim()
            var page_link = page.attr('href')

            return {
                _chapter: chapter,
                "Highlight": highlight,
                "Title": title,
                "Author": author,
                // "URL": page_link,
                "Note": "", // I don't have an example of a manual note included with a Play Book highlight
                "Location": page_number
            }
        }
    }).filter(el => el !== null) // remove first two

    // add chapters to Table of Contents
    var chapters = data.map(hl => hl._chapter)
    var unique_chapters = [...new Set(chapters)]
    var indexesOfChapterStart = unique_chapters.map((ch) => data.findIndex(hl => hl._chapter == ch))
    indexesOfChapterStart.reverse() // needed to not mess up order
    indexesOfChapterStart.forEach(i => {
        data.splice(i, 0, {
            "Highlight": chapters[i],
            "Title": title,
            "Author": author,
            // "URL": page_link,
            "Note": '.h2',
            "Location": ""
        })
    })

    data.forEach((hl) => delete hl._chapter)

    // console.log(data)
    downloadCSV(Papa.unparse(data), `${title}.csv`)

}

function downloadCSV(text, filename) {
    let a = $('<a>', {
        'href': 'data:text/csv;charset=utf-8,' + encodeURIComponent(text),
        'download': filename,
        'style': 'display:none;'
    }).appendTo('body')
    a[0].click()
    a.remove()
}
```
5. Import that CSV file into Readwise at https://readwise.io/import_bulk

    - Note: If you mess up an import, delete it, and try to import again, Readwise will show an error. I think the deleted highlights are still in the system, and the book title conflicts. If you change the book title in the .csv, it will work again.
    - Note: I don't know how to get the Table of Contents structure to keep the order of highlights under that chapter. It seems to add the chapters, and then all the highlights under the last chapter.
