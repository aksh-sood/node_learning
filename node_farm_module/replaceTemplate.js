module.export=(temp,product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%ID%}/g,product.id);
    output=output.replace(/{%PRODUCTCOST%}/g,product.price);
    output=output.replace(/{%PRODUCTNUTRI%}/g,product.nutrients);
    output=output.replace(/{%PRODUCTQUANTITY%}/g,product.quantity);
    output=output.replace(/{%PRODUCTCOUNTRY%}/g,product.from);
    output=output.replace(/{%DESCRIPTION%}/g,product.description);
    if(!product.organic){
        output=output.replace(/{%NOT_ORGANIC%}/g,"not-organic");   
    }
    return output;
}
// module.export={
//     replaceTemplate : replaceTemplate,
// }