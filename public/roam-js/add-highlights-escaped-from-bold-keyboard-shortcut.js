;
(function() {
    waitForLoad({
        name: 'jQuery',
        load() {
            appendFile("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js")
        },
        timeoutStep: 50,
        timeoutLimit: 1000,
        isLoaded() {
            return window.jQuery !== undefined
        },
        callback() {
            init()
        }
    })

    function init() {
        waitForLoad({
            name: 'Rangyinputs (jQuery plugin)',
            load() {
                appendFile("https://tools.eriknewhard.com/roam-js/assets/rangyinputs-jquery-src.js") // from https://github.com/timdown/rangyinputs
            },
            timeoutStep: 50,
            timeoutLimit: 2000,
            isLoaded() {
                return jQuery.fn.getSelection !== undefined
            },
            callback() {
                listenForKeydown()
            }
        })

    }

    function listenForKeydown() {
        if (window.listeningForKeyboardShortcut_AddHighlightsEscapedFromBold) return

        document.addEventListener("keydown", function(e) {
            // Ctrl/Cmd+Shift+H to add highlights escaped from bolded section
            if (e.keyCode == 72 && e.shiftKey && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault()
                e.stopImmediatePropagation()
                // check if textarea focused
                let focused_textarea = $('textarea[id^="block-input"]:focus')
                if (focused_textarea.length)
                    focused_textarea.surroundSelectedText("**^^**", "**^^**") // Rangyinputs function
            }
        }, false)

        window.listeningForKeyboardShortcut_AddHighlightsEscapedFromBold = true
    }

    function appendFile(url) {
        let s = document.createElement('script')
        s.src = url
        document.head.appendChild(s)
    }

    function waitForLoad({
        name,
        load,
        timeoutStep,
        timeoutLimit,
        isLoaded,
        callback
    }) {

        if (isLoaded()) {
            console.log(`${name}: Already loaded.`)
            callback()
            return
        }

        console.log(`${name}: Loading...`)
        load()

        if (isLoaded()) {
            console.log(`${name}: Loaded synchronously without wait.`)
            callback()
            return
        }

        let counter = 0
        wait()

        function wait() {
            if (counter * timeoutStep >= timeoutLimit) {
                console.log(`${name}: Timed-out after ${timeoutLimit} ms.`)
                alert(`Error: ${name} not loaded.`)
                // return
            } else if (isLoaded()) {
                console.log(`${name}: Loaded after ${counter * timeoutStep} ms.`)
                callback()
                // return
            } else {
                counter++
                setTimeout(wait, timeoutStep)
            }
        }
    }
})();