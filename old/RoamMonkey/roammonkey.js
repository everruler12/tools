console.log('RoamMonkey: loaded')

// If a module is evaluated once, then imported again, it's second evaluation is skipped and the resolved already exports are used.
import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
import "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"

var roammonkey = {}
roammonkey_init()

function roamMonkey_include(url, options) {
    const type = url.split('.').pop() // extension "js" or "css" // or go by ajax header

    if (type == "js") {

        // remove duplicates
        const els = Array.from(document.getElementsByTagName('script'))
        els.filter(el => el.src == url).forEach(el => el.remove())

        // add script
        const el = document.createElement('script')
        el.src = url
        if (options) Object.assign(el, options)
        document.getElementsByTagName('head')[0].appendChild(el)

    } else if (type == "css") {

        // remove duplicates
        const els = Array.from(document.getElementsByTagName('link'))
        els.filter(el => el.href == url).forEach(el => el.remove())

        // add css
        const el = document.createElement('link')
        el.href = url
        el.rel = 'stylesheet'
        el.type = 'text/css'
        document.getElementsByTagName('head')[0].appendChild(el)

    } else {
        alert(`Unknown type: ${type}`)
        // continue if error
    }
}

function roammonkey_init() {
    // remove duplicate button
    $('#roammonkey-app').remove()

    // add button
    const searchBar = $('.rm-find-or-create-wrapper').eq(0)
    const divider = $( /* html */ `<div style="flex: 0 0 4px"></div>`)

    const roammonkey_button = $( /* html */ `
<span id="roammonkey-app" class="bp3-popover-wrapper">
    <span class="bp3-popover-target">
        <span class="bp3-popover-target">
            <button class="bp3-button bp3-minimal bp3-icon-add-to-artifact bp3-small" tabindex="0" @click="click"></button>
        </span>
    </span>
</span>`)

    searchBar.after(roammonkey_button)
    roammonkey_button.before(divider)

    // start Vue
    roammonkey = new Vue({
        el: '#roammonkey-app',
        data: {
            packages: []
        },
        computed: {
            // tags: function () {
            //     return articles.reduce
            // }
        },
        methods: {
            click() {
                this.packages.forEach(this.parsepackage)
                alert('parsed packages')
                // problem with templating engine running multiple times, even when removed
            },
            parsepackage(pack) {
                // check enabled

                if (pack.source) {
                    if (typeof pack.source == "string") roamMonkey_include(pack.source)
                    else if (Array.isArray(pack.source)) pack.source.forEach(roamMonkey_include)
                }

                if (pack.dependencies) {
                    if (typeof pack.dependencies == "string") roamMonkey_include(pack.dependencies)
                    else if (Array.isArray(pack.dependencies)) pack.dependencies.forEach(roamMonkey_include)
                }

            }
        },
        mounted() {
            // ls

            const packages_list = window.roammonkey_packages_list.trim().split('\n')
            // error if doesn't exist

            packages_list.forEach(loadPackage)

            function loadPackage(url) {
                // fetch is built in on most popular browsers
                fetch(url)
                    .then(res => res.json())
                    .then((data) => {
                        console.log("RoamMonkey: getJSON ", data)
                        data.packages.forEach(pack => roammonkey.packages.push(pack))
                    })
            }

        }
    })


}