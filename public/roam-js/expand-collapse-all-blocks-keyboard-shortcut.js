/*
Keyboard shortcuts to expand/collapse all blocks on page.
By Erik Newhard
*/

if (!window.jQuery) {
    let s = document.createElement('script')
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
    document.head.appendChild(s)
    setTimeout(listenForKeydown, 500)
} else {
    listenForKeydown()
}

function listenForKeydown() {
    if (window.listeningForKeydown) return

    document.addEventListener("keydown", function(e) {
        // Ctrl/Cmd+Shift+Down to expand all blocks
        if (e.keyCode == 40 && e.shiftKey && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault()
            $('.page-title').find('button').click() // 3-dot menu next to page title
            $('.bp3-portal').find('.bp3-menu').find('div:contains(Expand all)').click()
        }

        // Ctrl/Cmd+Shift+Up to collapse all blocks
        if (e.keyCode == 38 && e.shiftKey && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault()
            $('.page-title').find('button').click() // 3-dot menu next to page title
            $('.bp3-portal').find('.bp3-menu').find('div:contains(Collapse all)').click()
        }
    }, false)

    window.listeningForKeydown = true
}