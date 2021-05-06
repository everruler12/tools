const highlights = Array.from(document.querySelectorAll('.rm-highlight')).map(h => h.textContent).join('\n\n')

copy(highlights)

function copy(text_to_copy) {
    function listener(e) {
        e.clipboardData.setData("text/plain", text_to_copy)
        e.preventDefault()
    }

    document.addEventListener("copy", listener)

    try {
        document.execCommand("copy")
        console.log({ "Copied": text_to_copy })
    } catch (e) {
        console.log("Copy failed.", e)
    } finally {
        document.removeEventListener("copy", listener)
    }
}