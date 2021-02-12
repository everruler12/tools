(function () {
    function getURL() {
        return document.URL
    }

    function getTitle(url) {
        if (url.indexOf('mail.google.com') !== -1) {
            return document.title.replace(/ - .*?@gmail\.com - Gmail$/, ' - Gmail')
        } else {
            return document.title
        }
    }

    const url = getURL()
    const title = getTitle(url)

    copyLink(url, title)

    function copyLink(url, title) {
        function listener(e) {
            e.clipboardData.setData("text/plain", title + '\n' + url)
            e.clipboardData.setData("text/html", `<a href="${url}">${title}</a>`)
            e.clipboardData.setData("text/_notion-text-production", `{"editing": [["${title}",[["a","${url}"]]]],"selection": {"startIndex": 0,"endIndex": ${title.length}}}`)
            e.preventDefault()
        }

        document.addEventListener("copy", listener)

        try {
            document.execCommand("copy")
            console.log("Copied: \n", {
                title,
                url
            })
        } catch (e) {
            console.log("Copy failed.", e)
        } finally {
            document.removeEventListener("copy", listener)
        }
    }
})()