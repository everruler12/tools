# Google Play Books to Readwise

### Steps

1. [Sync notes from Play Books to Google Drive](https://www.cnet.com/how-to/sync-notes-from-play-books-to-google-drive/)
2. In the Google Doc of synced notes, File → Email → Email as attachment (or download File → Download → Web Page (.html, zipped) )
3. In the dropdown selection, change PDF to HTML, then email to yourself (or download the .zip and unzip it).
4. Download the HTML file and open it in your browser.
5. Open DevTools Console (F12) then copy/paste the code below and run it. This will download the CSV file to your computer.
```javascript
function downloadCSV(text, filename) {
    let a = $('<a>', {
        'href': 'data:text/csv;charset=utf-8,' + encodeURIComponent(text),
        'download': filename,
        'style': 'display:none;'
    }).appendTo('body')
    a[0].click()
    a.remove()
}

function appendScript(url) {
    let s = document.createElement('script')
    s.src = url
    document.head.appendChild(s)
}

appendScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js")
appendScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js")

setTimeout(init, 500)

function init() {
    var tables = $('body').children('table')

    var title = tables.eq(0).find('td').eq(1).find('h1').text().trim()
    var author = tables.eq(0).find('td').eq(1).find('p').eq(0).text().trim()

    var data = Array.from(tables).map((_el, i) => {
        el = $(_el).find('table')

        if (i === 0) {
            // const td = el.find('td').eq(1)
            // title = td.find('h1').text().trim()
            // author = td.find('p').eq(0).text().trim()
            return
        } else if (i === 1) {
            // This document is overwritten when you make changes in Play Books. 
            // You should make a copy of this document before you edit it.
            return
        } else {

            var chapter = $(_el).prevAll('h2').eq(0).text().trim()
            var highlight = el.find('td').eq(1).find('p').eq(0).text().trim()
            var page = el.find('td').eq(2).find('a')
            var page_number = page.text().trim()
            var page_link = page.attr('href')

            return {
                "Highlight": highlight,
                "Title": title,
                "Author": author,
                // "URL": page_link, // this will cause each highlight to be treated as a different article, so not included
                "Note": chapter,
                "Location": page_number
            }
        }
    }).filter(el => el !== undefined) // remove first two

    downloadCSV(Papa.unparse(data), `${title}.csv`)
}
```
5. Import that CSV file into Readwise at https://readwise.io/import_bulk
