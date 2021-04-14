var a = `put exported text from exported Moon Reader highlights and notes here`
`

b = a.split('\n\n')
    .map(x => {

        if (x.match(/^◆/))
            return x.replace(/^◆/, '###')
        else if (x.match(/^▪/)) {
            if (x.match(/\)$/)) { // ends with ) so is my note
                c = x.split('(')
                i = c.slice(-1)[0].match(/\)/g).length // count how many ending parenthesis, so doesn't cut off nested
                d = c.slice(-i, c.length).join('(').replace(/\)$/, '')
                e = c.slice(0, -i).join('(').trim()
                x = e + '\n\n    ✏ ' + d
            }

            return x.replace(/^▪/, '-')
        } else {
            return x
        }

    })
    .join('\n\n')

console.log(b)
//copy to console in browser
copy(b)