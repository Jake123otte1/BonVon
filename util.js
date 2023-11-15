const objectFetch = async (url, options) =>
{
    try{
        const response = await fetch(url,options);
        const responseText = await response.text();
        const responseObject = await JSON.parse(responseText);
        return responseObject;
    }catch(error){
        console.log(error);
        return null;
    }

}

export { objectFetch };