export const isNumeric = (number) => {
    const re = /^[0-9\b]+$/;
    return re.test(number);
}

export const isValidAmount = (value) => {
    if (!isNaN(value)) {
        if (value.includes(".")) {
            const valuesArr = value.split(".")
            if (valuesArr.length > 1) {
                if (valuesArr[1].length > 2) {
                    return false
                }
            }
        }
        return true
    }
    return false
}