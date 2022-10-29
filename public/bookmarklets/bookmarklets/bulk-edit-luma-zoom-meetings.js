let new_zoomMeetingUrl = prompt("New Zoom Meeting URL")
let new_zoomMeetingPassword = prompt("New Zoom Meeting Password")

// var new_zoomMeetingUrl = 'https://us02web.zoom.us/j/82913214513?pwd=dy9xdWV5R0wySzlDcmNkaVRlaFRDZz09'
// var new_zoomMeetingPassword = '427804'

listOfFutureSessions.toArray().map(el => {
    const zoomMeetingUrl = $(el).find('input')[0]
    reactSet(zoomMeetingUrl, new_zoomMeetingUrl)
    const zoomMeetingPassword = $(el).find('input')[2]
    // console.log(zoomMeetingPassword.value)
    reactSet(zoomMeetingPassword, new_zoomMeetingPassword)
})

function reactSet(el, newValue) {
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