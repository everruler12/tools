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
                listenForKeydown()
            }
        })

        function listenForKeydown() {
            let listener = window.listeningForKeyboardShortcut_expandCollapseAllBlocks

            if (listener)
                document.removeEventListener("keydown", listener)

            listener = function(e) {
                // Ctrl/Cmd+Shift+Up to collapse all blocks
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode == 38) {
                    e.preventDefault()
                    $('.page-title').find('button').click() // 3-dot menu next to page title
                    $('.bp3-portal').find('.bp3-menu').find('div:contains(Collapse all)').click()
                }

                // Ctrl/Cmd+Shift+Down to expand all blocks
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode == 40) {
                    e.preventDefault()
                    $('.page-title').find('button').click() // 3-dot menu next to page title
                    $('.bp3-portal').find('.bp3-menu').find('div:contains(Expand all)').click()
                }
            }

            document.addEventListener("keydown", listener)
            console.log('Expand/collapse all blocks on page: listening for Ctrl/Cmd+Shift+Up and Ctrl/Cmd+Shift+Down')

            window.listeningForKeyboardShortcut_expandCollapseAllBlocks = listener
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