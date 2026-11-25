import { test, expect, } from "@playwright/test";


test('add product to cart', async({request})=>{
    const getProducts = await request.get('https://api.practicesoftwaretesting.com/products/');

    //Get all products
    const productsBody = await getProducts.json();

    //check the status of the response
    expect(getProducts.status()).toBe(200);

    //Store one product ID
    const productId = await productsBody.data[0].id;

    //Create a cart
    const cart = await request.post('https://api.practicesoftwaretesting.com/carts');
    
    //check the status of the request
    expect(cart.status()).toBe(201);
    //Save the cart ID
    const cartBody = await cart.json();
    const cartId = await cartBody.id;

    try{
       //Add product to cart
    const addToCart = await request.post(`https://api.practicesoftwaretesting.com/carts/${cartId}`,{
        data: {
            product_id: productId,
            quantity: 1,
        }
    }); 

    //Check the status of cart
    const addToCartBody = await addToCart.json();
    expect(addToCart.status()).toBe(200);
    expect(addToCartBody.result).toBe('item added or updated');
  
    }finally{
        const deleteCart = await request.delete(`https://api.practicesoftwaretesting.com/carts/${cartId}`)
        expect(deleteCart.status()).toBe(204);
    }
});


test('invalid cart id', async({request})=>{
    //Invalid card it
    const cartID = 'invalidCardID';

    //Send a request to check a cart using ID
    const getCart = await request.get(`https://api.practicesoftwaretesting.com/carts/${cartID}`);

    expect(getCart.status()).toBe(404); 
    
})