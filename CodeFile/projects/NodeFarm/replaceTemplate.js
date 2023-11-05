module.exports =  (temp, product) => {
    let output = temp.replace(/{%IMAGE%}/g, product.image);
    //   => /{%IMAGE%}/g this is the way of writing regular exprssion and the g flag means global. Therefore it will replace all the occurrences of it.
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output //output is in form of array of html cards for different products
}