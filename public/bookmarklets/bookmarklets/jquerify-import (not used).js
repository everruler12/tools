if (window.jQuery) {
    console.log(`jQuerify: Already loaded`)
    //return
}

let counter = 0
let timeoutLength = 1
let timeoutLimit = 1000

import("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js").then(checkImport)

function checkImport() {
    if (counter * timeoutLength >= timeoutLimit) {
        console.log(`jQuerify: Timed-out after ${timeoutLimit} ms`)
        alert('Error: jQuery not loaded.')
        return
    } else if (window.jQuery) {
        console.log(`jQuerify: Loaded after ${counter * timeoutLength} ms`, $)
    } else {
        counter++
        setTimeout(checkImport, timeoutLength)
    }
}

// this shows 0ms, because when it can't load, it still runs then()
// will need to use performance.test to measure length




if (window.jQuery) {
    console.log(`jQuerify: Already loaded`)
    //return
}

let counter = 0
let timeoutLength = 1
let timeoutLimit = 1000

import("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js").then(checkImport)

function checkImport(a) {
    console.log(a)
    if (window.jQuery) {
        console.log(`jQuerify: Already loaded`)
        //return
    }
}

// test with importing alert to see if imports twice. NOPE, only runs once!




let imports = [
    {
        "name": "jQuery",
        "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
    }
]

importSync(imports[0])

function importSync(script) {
    if (window[script.name]) {
        console.log(`${script.name} - already loaded`)
        //return
    } else {
        import(script.src).then(module => checkImport(module, script))
    }
}

function checkImport(module, script) {
    if (module) {
        console.log(`${script.name} - loaded`)
    } else {
        console.log(`${script.name} - not loaded`)
    }
}




// by i
;
(() => {
    const imports = [
        {
            "name": "jQuery",
            "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        },
        {
            "name": "Vue",
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
        }
    ]

    let i = 0

    next()

    function next() {
        if (imports[i + 1] !== undefined) {
            i++
            importSync(imports[i])
        }
    }

    function importSync(script) {
        const script = imports[i]
        if (window[script.name]) {
            console.log(`${script.name} - already loaded`)
            next()
        } else {
            import(script.src)
                .then(module => checkImport(module, script))
                .catch(err => console.log(`${script.name} - err`, err))
        }
    }

    function checkImport(module, script) {
        if (module) {
            console.log(`${script.name} - loaded`)
            next()
        } else {
            console.log(`${script.name} - not loaded`)
        }
    }


})();

// issue with this is it stops when can't load one import. Could be good if all are needed.






// by i
;
(() => {
    const imports = [
        {
            "name": "jQuery",
            "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        },
        {
            "name": "Vue",
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
        }
    ]

    let i = 0

    importSync()

    function importSync() {
        if (i < imports.length) {
            let script = imports[i]
            if (window[script.name]) { // what if don't have a window.name? Add window.imported arr that shows already loaded? No, because import doesn't matter! It won't import twice
                console.log(`${script.name} - already loaded`)
                importSync()
            } else {
                import(script.src)
                    .then(module => {
                        console.log(`${script.name} - imported`)
                        i++
                        importSync()
                    })
                    .catch(err => console.log(`${script.name} - not imported`, err))
            }
        } else {
            init()
        }
    }

    function init() {
        console.log("All imported")
    }
})();

// issue with this is it stops when can't load one import. Could be good if all are needed.






// by i
;
(() => {
    const imports = [
        {
            "name": "jQuery",
            "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        },
        {
            "name": "Vue",
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
        }
    ]

    let i = 0

    importSync()

    function importSync() {
        if (i < imports.length) {
            let script = imports[i]
            import(script.src)
                .then(module => {
                    console.log(`${script.name} - imported`)
                    i++
                    importSync()
                })
                .catch(err => console.log(`${script.name} - not imported`, err))
        } else {
            init()
        }
    }

    function init() {
        console.log("All imported")
    }
})();

// issue with this is it stops when can't load one import. Could be good if all are needed.













// by i
;
(async () => {
    // write this in json format to [[roamjs/extensions]] as a single block ```javascript {...}```
    const imports = [
        {
            "name": "jQuery",
            "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // "settings": {} // useful for per script settings
        },
        {
            "name": "Vue",
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
        }
    ]


    for (const script of imports) {
        try {
            await import(script.src)
            console.log(window[script.name])
        } catch (err) {
            console.log(`${script.name} - import error`, err)
        }
        // console.log(`${script.name} - imported`) // don't need this. add message within the script modules
    }

    init()

    function init() {
        console.log("All imported")
    }
})();

// issue with this is it stops when can't load one import. Could be good if all are needed.







// fetch list of scripts from roamjs.com

// if ( [[roamjs/extensions]] exists ) {
//     load json from first block (if valid json)
// } else {
//     all scripts toggled off
// }

// when press "Save and reload (for settings to go in effect)"
// navigate to [[roamjs/extensions]] (create if doesn't exist)
// rewrite first block with json save
// go back to prev page
// wait for roam sync, then refresh


;
(async () => {
    // write this in json format to [[roamjs/extensions]] as a single block ```javascript {...}```
    const scripts = [
        {
            "name": "jQuery",
            "src": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // "version": 1.0, // notification when new script or new version
            // "settings": {}, // useful for per script settings
            "async": true
        },
        {
            "name": "Vue",
            "src": "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
        }
    ]


    for (const script of scripts) {
        if (script.async)
            await import(script.src)
        else
            import(script.src)
        console.log(`${script.name} - imported`, window[script.name]) // not needed. Add loaded message within each script module.
    }

    console.log("All imported")
    // init()
})();

// issue with this is it stops when can't load one import. Could be good if all are needed.
// what about CSS?

