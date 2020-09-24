var vm = new Vue({
    data: {
        name: '', // text input
        code: '', // textarea
    },

    computed: {
        url() {
            return 'javascript:' + encodeURIComponent(this.createIIFE(this.code))
        },
        html() {
            return `<a class="bookmarklet" href="${this.url}">${this.name}</a>`
        },
    },

    methods: {
        createIIFE(code) { // https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
            code = this.trimLines(code)
            return `;(()=>{${code}})();`
        },
        trimLines(text) {
            return text
                .split(/\r?\n/)
                .map(line => line.trim())
                .join('\n')
        },
    },
})