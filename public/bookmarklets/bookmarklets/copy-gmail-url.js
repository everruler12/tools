// 2022-02-10

(function () {

    init()

    function init() {
        if (checkIfGmail()) {
            copyGmail()
        } else {
            alert('Gmail not detected')
        }
    }

    function getEmailAddress() {
        const title = document.title
        const email = title.replace(/^.* - (.*?@gmail\.com) - Gmail$/, '$1')
        return email
    }

    function getEmailId() {
        const hash = location.hash

        if (hash === '') {
            alert("Gmail hash not detected")
            return
        }

        const id = hash.split('/').at(-1)

        if (id[0] === '#') {
            alert("Gmail id not detected")
            return
        }

        return id
    }

    function checkIfGmail() {
        const url = document.URL
        return !!url.match('mail.google.com')
    }

    function copyGmail() {
        const email = getEmailAddress()
        const id = getEmailId()
        const gmail_url = `https://mail.google.com/mail/u/${email}/#all/${id}`
        copy(gmail_url)
    }

    function copy(data) {
        function listener(e) {
            e.clipboardData.setData("text/plain", data)
            e.preventDefault()
        }

        document.addEventListener("copy", listener)

        try {
            document.execCommand("copy")
            console.log("Copied: \n", data)
        } catch (e) {
            console.log("Copy failed.", e)
        } finally {
            document.removeEventListener("copy", listener)
        }
    }
})()