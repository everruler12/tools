function jquerify() {
    if (window.jQuery) {
        console.log(`jQuerify: Already loaded`)
        init()
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
            init()
        } else {
            counter++
            setTimeout(waitForLoad, timeoutLength)
        }
    }
}



init()
function init() {

    // check that page is on lu.ma and ends it /edit
    if (location.hostname != "lu.ma" || location.pathname.split('?')[0].split('/').pop() != "edit")
        return


    let new_zoomMeetingUrl = prompt("New Zoom Meeting URL")

    if (!new_zoomMeetingUrl)
        return

    new_zoomMeetingUrl = new_zoomMeetingUrl.trim()

    let new_zoomMeetingPassword = prompt("New Zoom Meeting Password")
    new_zoomMeetingPassword = new_zoomMeetingPassword.trim()

    var listOfFutureSessions = $('.session-list > .session-wrapper:not(:has(.passed))')

    listOfFutureSessions.toArray().map(el => {
        const zoomMeetingUrl = $(el).find('input')[0]
        reactSet(zoomMeetingUrl, new_zoomMeetingUrl)
        const zoomMeetingPassword = $(el).find('input')[2]
        // console.log(zoomMeetingPassword.value)
        reactSet(zoomMeetingPassword, new_zoomMeetingPassword)
    })

    function reactSet(el, newValue) {
        // https://stackoverflow.com/a/62111884
        const valueSetter = Object.getOwnPropertyDescriptor(el, 'value').set
        const prototype = Object.getPrototypeOf(el)
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(el, newValue)
        } else {
            valueSetter.call(el, newValue)
        }
        el.dispatchEvent(new Event('input', { bubbles: true }))
    }
}