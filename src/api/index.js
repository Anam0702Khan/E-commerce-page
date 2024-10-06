export  async function ProductApi(){
    const response = await fetch('http://stageapi.monkcommerce.app/task/products/search', {
        headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
            // "access-control-allow-origin" : "*"

        }
    })
    const res = await response.json()
    console.log(res)
    return res;
}