init()

function init() {
    copy(getAvatarName(), getAvatarId())
}


function getAvatarName() {
    const h4 = document.querySelector('.home-content').querySelector('h4').textContent.trim()

    if (h4.length) {
        return h4
    } else {
        console.log('Avatar name not detected.')
        alert('Avatar name not detected.')
    }

}

function getAvatarId() {
    const pathname = location.pathname.split('/')
    if (pathname[2] == 'avatar') {
        return pathname[3]
    } else {
        console.log('Not a VRC avatar page.')
        alert('Not a VRC avatar page.')
    }
}

function copy(avatar_name, avatar_id) {
    function listener(e) {
        // e.clipboardData.setData("text/plain", avatar_name + '\n' + avatar_id)
        e.clipboardData.setData("text/plain", avatar_id)
        e.preventDefault()
    }

    document.addEventListener("copy", listener)

    try {
        document.execCommand("copy")
        console.log('Copied:', { avatar_name, avatar_id })
        alert(`Copied:\n${avatar_name}\n${avatar_id}`)
    } catch (e) {
        console.log("Copy failed.", e)
        alert("Copy failed.", e)
    } finally {
        document.removeEventListener("copy", listener)
    }
}