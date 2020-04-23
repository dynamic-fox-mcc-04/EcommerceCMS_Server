const words = 'haveaniceday'
let str = []
let res = []
let arr = ''
for (i in words) {
    str.push(words[i])
    if (str.length == 4) {
        res.push(str)
        str = []
    }
    if (i + 1 == undefined) {
        if (str !== []) {
            res.push(str)
        }
    }
}

let j = 0
for (let i = 0; i < res.length; i++) {
    arr += res[i][j]
    if (i == res.length - 1) {
        j += 1
        i = 0
    }
    if (j > 3) {
        i = res.length
    }
}


console.log(arr)