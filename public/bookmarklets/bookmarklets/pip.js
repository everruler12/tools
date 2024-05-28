
if (document.pictureInPictureElement) {
    document.exitPictureInPicture()
} else if (document.pictureInPictureEnabled) {
    let video = document.querySelector('video')
    if (video) {
        video.requestPictureInPicture()
    } else {
        alert('No video found')
    }
} else if (!document.pictureInPictureEnabled) {
    alert('Picture-in-Picture not enabled on this page.')
}