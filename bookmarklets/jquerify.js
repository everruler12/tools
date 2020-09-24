
    if (window.jQuery) {
        console.log(`jQuerify: Already loaded`)
        return
    }

    let s = document.createElement('script')
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
    document.head.appendChild(s)

    let counter = 0
    let timeoutLength = 5
    let timeoutLimit = 1000

    waitForLoad()

    function waitForLoad() {
        if (counter * timeoutLength >= timeoutLimit) {
            console.log(`jQuerify: Timed-out after ${timeoutLimit} ms`)
            alert('Error: jQuery not loaded.')
            return
        } else if (window.jQuery) {
            console.log(`jQuerify: Loaded after ${counter * timeoutLength} ms`)
        } else {
            counter++
            setTimeout(waitForLoad, timeoutLength)
        }
    }