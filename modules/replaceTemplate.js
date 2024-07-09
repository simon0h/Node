module.exports = (template, product) => { // This type of function (no method name) is called anonymous function
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }

    return output
}
