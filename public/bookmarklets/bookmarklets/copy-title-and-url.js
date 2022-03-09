(function () {

    init()

    function init() {
        let url = document.URL
        let title = document.title

        if (!!url.match('mail.google.com')) {
            url = getGmailUrl()
            title = title.replace(/(.*) - .*?@gmail\.com - Gmail$/, '$1 - Gmail')
        }

        copyLink(url, title)
    }

    function getGmailUrl() {
        const email = document.title.replace(/^.* - (.*?@gmail\.com) - Gmail$/, '$1')

        const id = location.hash.split('/').at(-1)

        if (location.hash === '' || id[0] === '#') {
            return document.URL
        } else {
            return `https://mail.google.com/mail/u/${email}/#all/${id}`
        }
    }

    function copyLink(url, title) {
        function listener(e) {
            if (!title) title = url
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