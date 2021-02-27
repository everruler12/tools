init()

async function init() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Starting: Scrape Circle Space Member Profiles (SCSMP)')

            await jQuerify()
            if (!window.Papa) $.getScript('https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js')

            const spaceHref = getSpaceHref()
            const memberTotal = getmemberTotal()

            log(`Loading members in ${spaceHref}`)

            const pagesData = await fetchMembersPages(spaceHref, 1)
            let membersList = getMembersList(pagesData)

            if (membersList.length != memberTotal)
                log(`Error: member count mismatch\n`, { memberTotal, fetchedCount: membersList.length })

            await Promise.all(membersList.map(async member => await fetchMemberProfile(member))).then(result => membersList = result)

            log(membersList)

            downloadList(membersList)

            resolve()

        } catch (err) {
            log(err)
            reject()
        }
    })
}

function jQuerify() {
    return new Promise(async (resolve, reject) => {

        if (!window.jQuery) {

            let s = document.createElement('script')
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
            document.head.appendChild(s)

            let counter = 0
            const timeoutLength = 5
            const timeoutLimit = 1000

            waitForLoad()

            function waitForLoad() {
                if (counter * timeoutLength >= timeoutLimit) {
                    log(`jQuerify: Timed-out after ${timeoutLimit} ms`)
                    alert('Error: jQuery not loaded.')
                    reject()

                } else if (window.jQuery) {
                    log(`jQuerify: Loaded after ${counter * timeoutLength} ms`)
                    resolve()

                } else {
                    counter++
                    setTimeout(waitForLoad, timeoutLength)
                }
            }

        } else {
            log(`jQuerify: Already loaded`)
            resolve()
        }

    })
}

async function fetchMembersPages(spaceHref, page) {
    try {
        const url = `${spaceHref}/members_pagination?page=${page}`

        log(`Fetching ${url}`)
        const res = await fetch(url) // https://write-of-passage.circle.so/c/course-directory_6/members_pagination?page=1
        const data = await res.json()
        let pages = [data]

        if (data.hasNextPage == true)
            pages = pages.concat(await fetchMembersPages(spaceHref, page + 1))

        return pages

    } catch (err) {
        return log(err)
    }
}

async function fetchMemberProfile(member) {
    const res = await fetch(member.link) // https://write-of-passage.circle.so/u/38804995
    const data = await res.text()
    log(`Fetched ${member.link} (${member.name})`)
    const mp = $(data).find('.member__profile')
    return {
        "Name": getName(), // 'Erik Newhard'
        "Tagline": getTagline(), // `Forum moderator for Nat's Roam course`
        "Bio": getBio(), // `Hello! I'm a forum moderator in Effortless Output with Roam, and a student in BASB Cohort 10 & 11 and WoP Cohort 5 & 6. I'm also a teacher's assistant in a habit building course. I use Roam and Notion.`
        "Location": getLocation(), // 'Denver, CO'
        "Email": getEmail(), // 'erik.newhard@gmail.com'
        "Website": getWebsite(), // 'eriknewhard.com'
        "Linkedin": getLinkedin(), // 'https://www.linkedin.com/in/erik-newhard/'
        "Twitter": getTwitter(), // 'https://twitter.com/ErikNewhard'
        "Facebook": getFacebook(), // ''
        "Instagram": getInstagram(), // 'https://www.instagram.com/eriknewhard/'
        "Label": getLabel(), // ['Admin', 'Moderator']
        "Tag Label": getTagLabel(), // ['Mentor']
        "User ID": member.link.split('/').pop(), // '38804995'
        "Profile Link": member.link, // 'https://write-of-passage.circle.so/u/38804995'
        "Profile Image": getProfileImage(), // 'https://write-of-passage.circle.so/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdFlJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5ef4b48250ae14cd2c559b8373d2b149f99649a3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VY21WemFYcGxYM1J2WDJ4cGJXbDBXd2RwQWl3QmFRSXNBUT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--b2676f36f6b8dc9f722781a1b3675d7b27c18366/everruler%20dark.png'
    }

    function getName() {
        return mp.find('.member__name').text().trim()
    }

    function getEmail() {
        const href = mp.find('.user__email > a').attr('href')
        return href ? href.replace('mailto:', '') : ''
    }

    function getLocation() {
        return mp.find('.member__location').text().trim()
    }

    function getWebsite() {
        return mp.find('.member__website > a').attr('href') || ''
    }

    function getLinkedin() {
        return mp.find('.user__linkedin > a').attr('href') || ''
    }

    function getTwitter() {
        const href = mp.find('.user__twitter > a').attr('href')
        let username

        if (href) {
            if (href.split('/').length > 1)
                username = href.split('com/').pop()
                    .replace(/\/$/, '') // remove ending slash
            // https://twitter.com/ErikNewhard
            // https://twitter.com/ErikNewhard/
            // Https://twitter.com/ErikNewhard
            // Https://Twitter.com/ErikNewhard
            // HTTPS://twitter.com/ErikNewhard
            // https://www.twitter.com/ErikNewhard
            // https://mobile.twitter.com/ErikNewhard
            // http://twitter.com/ErikNewhard
            // twitter.com/ErikNewhard
            // Twitter.com/ErikNewhard

            else if (href.match(/^@/))
                username = href.replace(/^@/, '')
            // @ErikNewhard

            else
                username = href
            // ErikNewhard

            return `https://twitter.com/${username}`
        } else
            return ''
    }

    function getFacebook() {
        return mp.find('.user__facebook > a').attr('href') || ''
    }

    function getInstagram() {
        return mp.find('.user__instagram > a').attr('href') || ''
    }

    function getProfileImage() {
        const img = mp.find('.user__profile-image > img')
        const src = img.attr('src')
        return src && !src.match('https://secure.gravatar.com/') ? window.location.origin + src : ''
    }

    function getLabel() {
        return mp.find('.label-brand').text().trim() || ''
    }

    function getTagLabel() {
        return mp.find('.member-tags--label > span').text().trim() || ''
    }

    function getTagline() {
        return mp.find('.member__tagline').text().trim() || ''
    }

    function getBio() {
        return mp.find('.member__bio').text().trim() || ''
    }
}

function getSpaceHref() {
    const spaceName = window.location.pathname.split('/')[2]
    const spaceHref = window.location.origin + '/c/' + spaceName

    const href = window.location.href

    if (href.match(spaceHref)) {
        return spaceHref

    } else {
        log(`Error: unsupported space href ${href}`)
    }
}

function getmemberTotal() {
    const el = $('.header__nav > .nav-link:contains(Members) > .nav-link__count')

    if (el.length) {
        return Number(el.eq(0).text().trim())

    } else {
        log(`Error: cannot find member count`)
    }
}

function getMembersList(pagesData) {
    const membersListHtml = pagesData.map(pageData => pageData.content).join()

    return $('<div>')
        .append(membersListHtml)
        .find('.member-card__listing')
        .toArray()
        .map(getMemberNameAndLink)
}

function getMemberNameAndLink(el) {
    return {
        name: $(el).find('.user__name').text().trim(),
        link: window.location.origin + $(el).find('a').attr('href').split('?')[0]
    }
}

function log(...messages) {
    console.log('SCSMP -', ...messages)
}

function getTitle() {
    // $('.title-name').text().trim() // doesn't work when on a post page
    const date = new Date().toISOString().replace('T', ' ').replace(/:\d\d\.\d\d\dZ/, '').replace(':', '-')
    const title = document.title.replace(/(\(\d+?\) )?(.+?) \| (.+?)$/, '$3 - $2') // '(1) Course Directory | Write of Passage' -> 'Write of Passage - Course Directory'
    return `${title} ymembers (${date})`
}

function downloadList(membersList) {
    const title = getTitle()

    const csv = Papa.unparse(membersList)
    download(csv, `${title}.csv`)

    download(JSON.stringify(membersList, null, 2), `${title}.json`)
}

function download(text, filename) {
    let a = $('<a>', {
        'href': 'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
        'download': filename,
        'style': 'display:none;'
    }).appendTo('body')
    a[0].click()
    a.remove()
}