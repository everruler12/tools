(function () {
    const note_editor_document = document.querySelector('iframe[aria-label="Note Editor"]').contentWindow.document
    const highlights = note_editor_document.querySelectorAll('span[data-highlight]')
    copyHighlights(highlights)

    function copyHighlights(highlights) {
        if (!highlights.length) {
            alert('No Evernote highlights detected.')
            return
        }

        const text = hl_text(highlights)
        const html = hl_html(highlights)

        function listener(e) {
            e.clipboardData.setData("text/plain", text)
            e.clipboardData.setData("text/html", html)
            e.preventDefault()
        }

        document.addEventListener("copy", listener)

        try {
            document.execCommand("copy")
            console.log("Copied: \n", {
                text,
                html
            })
        } catch (e) {
            console.log("Copy failed.", e)
        } finally {
            document.removeEventListener("copy", listener)
        }
    }

    function hl_text(highlights) {
        return Array.from(highlights).map(x => x.textContent).join('\r\n\r\n')
    }

    function hl_html(highlights) {
        return Array.from(highlights).map(x => x.innerHTML).join('<br>')
    }
})()
