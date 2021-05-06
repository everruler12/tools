(() => {

    const subject = document.getElementById(':1').querySelectorAll('h2')[1].textContent
    const date = document.getElementById(':1').querySelector('.adn.ads').querySelector('table').querySelector('tr').querySelectorAll('td')[2].querySelectorAll('span')[1].title
    const body = document.getElementById(':1').querySelector('.adn.ads').children[1].children[2].innerText
    const sender = document.querySelector('.adn.ads').querySelectorAll('span[data-hovercard-id]')[0].getAttribute('name')

    function parseDate(date) {
        dateParts = date.split(',')
        monthDay = dateParts[0].split(' ')
        return {
            month: monthDay[0],
            day: monthDay[1],
            year: dateParts[1].trim(),
            time: dateParts[2].trim()
        }
    }

    function dateToRoam(parsedDate) {
        return '[[' +
            monthAbbrToFull(parsedDate.month) +
            ' ' +
            dayToOrdinal(parsedDate.day) +
            ', ' +
            parsedDate.year +
            ']]'
    }

    function monthAbbrToFull(month) {
        const months = {
            "Jan": "January",
            "Feb": "February",
            "Mar": "March",
            "Apr": "April",
            "May": "May",
            "Jun": "June",
            "Jul": "July",
            "Aug": "August",
            "Sep": "September",
            "Oct": "October",
            "Nov": "November",
            "Dec": "December",
        }
        return months[month]
    }

    function dayToOrdinal(day) {
        const lastDigit = day[day.length - 1]
        if (lastDigit == '1') return day + "st"
        if (lastDigit == '2') return day + "nd"
        if (lastDigit == '3') return day + "rd"
        else return day + 'th'
    }

    const newDate = dateToRoam(parseDate(date))
    const newBody = body.split('\n\n').filter(p => p.trim() != '').map(paragraph => paragraph.split('\n').join(' '))//.join('\n\n')

    const textToCopy = `{{[[TODO]]}} ${subject} #Email from [[${sender}]] ${newDate}\n\n` + newBody.map(p => '    - ' + p).join('\n\n')

    copy(textToCopy)



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

})()
