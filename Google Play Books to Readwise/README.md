# Google Play Books to Readwise

### Steps

0. Create a Bookmarklet by dragging this like to your bookmarks bar: [Play Books HTML to CSV for Readwise](javascript:(function()%7Bfunction%20downloadCSV(e%2Ct)%7Blet%20n%3D%24(%22%3Ca%3E%22%2C%7Bhref%3A%22data%3Atext%2Fcsv%3Bcharset%3Dutf-8%2C%22%2BencodeURIComponent(e)%2Cdownload%3At%2Cstyle%3A%22display%3Anone%3B%22%7D).appendTo(%22body%22)%3Bn%5B0%5D.click()%2Cn.remove()%7Dfunction%20appendScript(e)%7Blet%20t%3Ddocument.createElement(%22script%22)%3Bt.src%3De%2Cdocument.head.appendChild(t)%7Dfunction%20init()%7Bvar%20e%3D%24(%22body%22).children(%22table%22)%2Ct%3De.eq(0).find(%22td%22).eq(1).find(%22h1%22).text().trim()%2Cn%3De.eq(0).find(%22td%22).eq(1).find(%22p%22).eq(0).text().trim()%2Ci%3DArray.from(e).map((e%2Ci)%3D%3E%7Bif(el%3D%24(e).find(%22table%22)%2C0!%3Di%26%261!%3Di)%7Bvar%20a%3D%24(e).prevAll(%22h2%22).eq(0).text().trim()%2Cd%3Del.find(%22td%22).eq(1).find(%22p%22).eq(0).text().trim()%2Cr%3Del.find(%22td%22).eq(2).find(%22a%22)%2Cl%3Dr.text().trim()%3Br.attr(%22href%22)%3Breturn%7BHighlight%3Ad%2CTitle%3At%2CAuthor%3An%2CNote%3Aa%2CLocation%3Al%7D%7D%7D).filter(e%3D%3Enull!%3De)%3BdownloadCSV(Papa.unparse(i)%2C%60%24%7Bt%7D.csv%60)%7DappendScript(%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fjquery%2F3.5.1%2Fjquery.min.js%22)%2CappendScript(%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2FPapaParse%2F5.3.0%2Fpapaparse.min.js%22)%2CsetTimeout(init%2C500)%7D)())
1. [Sync notes from Play Books to Google Drive](https://www.cnet.com/how-to/sync-notes-from-play-books-to-google-drive/)
2. In the Google Doc of synced notes, File → Email → Email as attachment
3. Change PDF to HTML in the dropdown selection, then email to yourself.
4. Download the HTML file, open in browser, then click the Bookmarklet, which will download the CSV file to your computer.
5. Import that CSV file into Readwise at https://readwise.io/import_bulk
