export const toFixed = (number, decimal) => {
    return (
        parseFloat(
            parseFloat(number).toFixed(decimal)
        )
    )
}