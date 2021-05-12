function getExtensionFromFilename(fileName) {
    const extensionMatch = fileName.match(/\.(\w+)$/)
    return extensionMatch ? extensionMatch[0] : ''
}

const chatTypes = [
    // Filetype Id: msc
    // Filename: "meeting_saved_chat.txt"
    // Description: May be automatically saved at end of session if host has that option turned on. May be manually saved from chat options during session (host or not).

    // Filetype Id: chat
    // Filename: "chat.txt"
    // Description: Automatically saved when video recorded on computer, only for the recorded portion of video.

    // Filetype Id: cloud
    // Filename: "GMT<YYYYMMDD>-<hhmmss>_<Meeting name>.txt"
    // Description: Automatically saved when video recorded in cloud, only for the recorded portion of video. (Doesn't contain DM.)
    {
        type: 'type4',
        // Filetype: msc
        // Description: Contains TO. Current.
        // Example: "type4 [2021-05-11 Writual Writing Group] meeting_saved_chat.txt", "type4 [2021-05-11 Course Club] meeting_saved_chat.txt"
        // 00:00:00 From  <name>  to  Everyone:
        //    <message 1 line 1>
        //    <message 1 line 2>
        // 00:00:00 From  <name>  to  <name>(Direct Message):
        //    <message 2>
        regex: /^(\d\d:\d\d:\d\d) From  ?(.*?)  ?to  ?(.+):$/
    }, {
        type: 'type3',
        // Filetype: chat, msc
        // Description: Contains TO. Current.
        // Example: "type3 [2021-03-15 Creative Cooperative] meeting_saved_chat.txt"
        // 00:00:00	 From  <name>  to  <name> : <message 1 line 1>
        // <message 1 line 2>
        // 00:00:00	 From  <name>  to  <name>(Direct Message) : That worked
        regex: /^(\d\d:\d\d:\d\d) From  ?(.*?)  ?to  ?(.*?) : (.+)$/
    }, {
        type: 'type1',
        // Filetype: chat, msc
        // Description: Contains TO only with (Privately) or (Direct Message). (Privately) is old. (Direct Message) is current.
        // Example: "type1 [2020-11-17 MVV Session 1] chat.txt", "type1 [2020-11-17 MVV Session 1] meeting_saved_chat.txt", "type1current [2021-05-08 Erik's Mentor Session] .txt"
        // 00:00:00	<name>:	<message>
        // 00:00:00	 From  <name>   to   <name> : <message 1 line 1>
        // <message 1 line 2>
        // 00:00:00	 From  <name>   to   <name>(Privately) : <message 2>
        regex: /^(\d\d:\d\d:\d\d)\t From  ?(.*?)(?:   ?to   ?(.*?\((?:(?:Privately)|(?:Direct Message))\)))? : (.+)$/
    }, {
        type: 'type2',
        // Filetype: cloud
        // Description: Doesn't contain DM. Current.
        // Example: "type2 [Demolition Writing Group]GMT20210318 -152312_Writing - Gr.txt", "type2 WOP6 Live Session1 Chat.txt"
        // 00:00:00	<name>:	<message 1 line 1>
        // <message 1 line 2>
        // 00:00:00	<name>:	<message 2>
        regex: /^(\d\d:\d\d:\d\d)\t(.*?):\t(.+)$/
    }


]

function determineChatType(firstLine) {
    return

    // Filename: meeting_saved_chat.txt
    // Description: Automatically saved. Does not contain To field. Current.
    // Example:
    // 12:58:22	 From  Erik Newhard : <message>
    return 'recording2'

    // Filename: meeting_saved_chat.txt
    // Description: Manually saved, partial. May contain DMs. Contains To field. Old.
    // Example:
    // 12:58:22 From  Erik Newhard  to  Everyone : <message>

    // 17:59:57	 From  Erik Newhard  to  Sayuri : Hey Sayuri!
    // Glad to see you in this course, too
    // 18:00:15	 From  Erik Newhard  to  Julia Saxena(Privately) : That worked
    return 'manual1'

    // Id: c2
    // Filename: "chat.txt"
    // Description: Automatically saved when video recorded. May contain DMs. Does not contain To field. Old.
    // Example: 
    // 00:00:00	<name>:	<message>
    return 'c1'
}

parseChat = {
    type4(lines, regex) {
        let list = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const matches = regex.exec(line)
            if (matches) {
                list.push({
                    original: matches[0],
                    timestamp: matches[1],
                    from: matches[2],
                    to: matches[3],
                    message: ''
                })
            } else {
                const last = list.length - 1

                if (list[last].message == '')
                    list[last].message = line.trim()
                else
                    list[last].message += '\n' + line.trim()

                list[last].original += '\n' + line
            }
        }
        return list
    },
    type3(lines, regex) {
        let list = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const matches = regex.exec(line)
            if (matches) {
                list.push({
                    original: matches[0],
                    timestamp: matches[1],
                    from: matches[2],
                    to: matches[3],
                    message: matches[4]
                })
            } else {
                const last = list.length - 1
                list[last].message += '\n' + line
                list[last].original += '\n' + line
            }
        }
        return list
    },
    type1(lines, regex) {
        let list = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const matches = regex.exec(line)
            if (matches) {
                list.push({
                    original: matches[0],
                    timestamp: matches[1],
                    from: matches[2],
                    to: matches[3] ? matches[3] : '',
                    message: matches[4]
                })
            } else {
                const last = list.length - 1
                list[last].message += '\n' + line
                list[last].original += '\n' + line
            }
        }
        return list
    },
    type2(lines, regex) {
        let list = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const matches = regex.exec(line)
            if (matches) {
                list.push({
                    original: matches[0],
                    timestamp: matches[1],
                    from: matches[2],
                    to: '',
                    message: matches[3]
                })
            } else {
                const last = list.length - 1
                list[last].message += '\n' + line
                list[last].original += '\n' + line
            }
        }
        return list
    },
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

var vm = new Vue({
    el: "#vm-app",

    data: {
        file_status: '',
        file_label: 'Open file...',
        file_name: '',
        list: [],
        chatType: '',
        showFields: {
            timestamp: true,
            from: true,
            to: true,
            message: true,
        },
        showMessages: 'all', // ['all','onlyDMs','hideDMs', 'links']
        showDropzone: false,
        loadedText: '',
        chatType: {}
    },

    mounted() {
        // Dropzone code from https://stackoverflow.com/a/28226022
        var _this = this
        var lastTarget = null

        window.addEventListener("dragenter", function (e) {
            lastTarget = e.target
            _this.showDropzone = true
        })

        window.addEventListener("dragleave", function (e) {
            if (e.target === lastTarget || e.target === document) {
                _this.showDropzone = false
            }
        })
    },

    computed: {
        filteredList() {
            if (this.showMessages == 'all')
                return this.list
            else if (this.showMessages == 'hideDMs')
                return this.list.filter(x => !x.to.match('(Direct Message)') && !x.to.match('(Privately)'))
            else if (this.showMessages == 'onlyDMs')
                return this.list.filter(x => !!x.to.match('(Direct Message)') || !!x.to.match('(Privately)'))
            else if (this.showMessages == 'links')
                return this.list.filter(x => !!this.lnkfy(x.message).match('<a href'))
        },
        blankTO() {
            return !this.filteredList.filter(x => x.to != '').length
        },
        noDMs() {
            return this.chatType.type == 'type2' || this.list.filter(x => x.to != '' && x.to != 'Everyone').length == 0
        },
        noLinks() {
            return this.list.filter(x => !!this.lnkfy(x.message).match('<a href')).length == 0
        }
    },

    methods: {
        lnkfy(text) {
            return linkifyHtml(escapeHtml(text), {
                defaultProtocol: 'https',
                target: "_blank"
            })
        },

        nowrp2wrds(text) {
            const split_text = escapeHtml(text).split(' ')

            if (split_text.length > 2)
                return `${split_text[0]}&nbsp;${split_text[1]} ${split_text.slice(2).join(' ')}`
            // return `<span class="nowrap">${split_text[0]} ${split_text[1]}</span> ${split_text.slice(2).join(' ')}`
            else
                return `<span class="nowrap">${text}</span>`
        },

        nowrpDm(text) {
            return text.replace(/(\(Direct Message\)(<\/span>)?)$/, ` (Direct&nbsp;Message)`).replace(/(\(Privately\)(<\/span>)?)$/, ` (Privately)`) // to make cleaner when 'To' is a direct message
            // return text.replace(/(\(Direct Message\))$/, ` <span class="nowrap">$1</span>`) // to make cleaner when 'To' is a direct message
        },

        parseData(text) {
            lines = text.trim().replace(/\r\n|\r/g, '\n').split('\n')

            const chatType = chatTypes.find(chatType => {
                // console.log({ chatType, firstLine: lines[0], test: chatType.regex.test(lines[0]) })
                return chatType.regex.test(lines[0])
            })

            console.log(chatType)

            if (chatType) {
                this.chatType = chatType
                this.list = parseChat[chatType.type](lines, chatType.regex)
            } else
                console.log(`Error: Unknown chat type`)
        },

        addFile(e) {
            this.showDropzone = false

            let file

            if (e.dataTransfer) // dragged file
                file = e.dataTransfer.files[0]
            if (e.target && e.target.files) // opened file from dialog
                file = e.target.files[0]

            if (!file) {
                console.log('File not detected')
                return
            }

            let _this = this

            const reader = new FileReader()
            reader.onload = loadData
            reader.readAsText(file)

            function loadData(event) {
                _this.file_name = file.name

                const ext = getExtensionFromFilename(file.name)

                if (ext == '.txt') {
                    const data = event.target.result

                    _this.file_status = "is-success"
                    _this.file_label = `${ext} file loaded!`

                    _this.loadedText = data
                    _this.parseData(data)
                } else {
                    _this.file_status = "is-danger"
                    _this.file_label = `${ext} is not a supported file extension. Please try again`
                }
            }
        },

        downloadPDF() {
            var element = document.getElementById('pdf-output')
            html2pdf(element)
        },
    },
})