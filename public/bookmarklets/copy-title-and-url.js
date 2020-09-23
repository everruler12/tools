(function() {
    function getURL() {
        return document.URL
    }

    function getTitle(url) {
        if (url.indexOf('mail.google.com') !== -1) {
            return document.title.replace(/ - .*?@gmail\.com - Gmail$/, '')
        } else {
            return document.title
        }
    }

    const url = getURL()
    const title = getTitle(url)
    copyLink(url, title)

    function copyLink(url, title) {
        // append link
        const containerId = "_hiddenCopyTextarea_"
        var container = document.createElement('div')
        container.style.position = "fixed"
        container.style.left = "-9999px"
        container.style.top = "0"
        container.id = containerId
        document.body.appendChild(container)
        var target = document.createElement('a')
        target.href = url
        target.textContent = title
        container.appendChild(target)

        // get link data; https://stackoverflow.com/questions/53003980/how-to-copy-a-hypertext-link-into-clipboard-with-javascript-and-preserve-its-lin
        const range = document.createRange()
        range.selectNode(target)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        // copy
        try {
            document.execCommand("copy")
            console.log("Copied: \n", {
                title,
                url
            })
            document.getElementById(containerId).remove() // shorten to target?
        } catch (e) {
            console.log("Copy failed.")
        }
    }
})()