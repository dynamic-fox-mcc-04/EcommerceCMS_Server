function notMinus(price) {
    if(price < 0) {
        return {
            msg: `Price must not minus value`
        }
    } else {
        return price
    }
}

module.exports = notMinus;