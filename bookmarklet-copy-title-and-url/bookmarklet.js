(function() {
    const url = document.URL
    const title = document.title
    copyLink(url, title)

    function copyLink(url, title) {
        // append link
        const targetId = "_hiddenCopyTextarea_"
        var target = document.createElement('a')
        target.style.position = "absolute"
        target.style.left = "-9999px"
        target.style.top = "0"
        target.id = targetId
        target.href = url
        target.textContent = title
        document.body.appendChild(target)

        // get link data; https://stackoverflow.com/questions/53003980/how-to-copy-a-hypertext-link-into-clipboard-with-javascript-and-preserve-its-lin
        const link = document.getElementById(targetId) // shorten to target? needs appended?
        const range = document.createRange()
        range.selectNode(link)
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
            document.getElementById(targetId).remove() // shorten to target?
        } catch (e) {
            console.log("Copy failed.")
        }
    }
})()
