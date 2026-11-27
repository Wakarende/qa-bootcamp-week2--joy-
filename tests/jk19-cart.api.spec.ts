import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

const API = 'https://api.demoblaze.com';

type Product = {
  id: number;
  title: string;
  price: number;
};

type CartRow = {
  id: string;
  cookie: string;
  prod_id: number;
};

test('JK-19 Add two products and check cart prices', async ({ request }) => {
  const shopper = 'user=' + randomUUID();
  const row1 = randomUUID();
  const row2 = randomUUID();

  try {
    // Home page: get all products
    const productsResponse = await request.get(`${API}/entries`);

    //Check status
    expect(productsResponse.status()).toBe(200);

    //Save the request body
    const products = await productsResponse.json();

    //Save the title and ID of our first product. 
    const firstProduct = products.Items.find((item:Product)=> item.title === 'Samsung galaxy s6');
 
    const firstProductId = firstProduct.id;

    //Save the title and ID of our second product
    const secondProduct = products.Items.find((item:Product)=> item.title === 'Nokia lumia 1520');
    const secondProductId = secondProduct.id;

    //Product page for first product
    const firstProductPage = await request.post(`${API}/view`,{
        data:{
            id: String(firstProductId),
        }}
    );

    expect(firstProductPage.status()).toBe(200);

    const firstProductPageResponse = await firstProductPage.json();
    expect(firstProductPageResponse.price).toBe(360);

    //Add first product to cart
    const addFirstProduct = await request.post(`${API}/addtocart`,{
        data:{
            "id": row1, "cookie": shopper, "prod_id": firstProductId, "flag": false
        }
    });

    expect(addFirstProduct.status()).toBe(200);

    //Product page of second product
    const secondProductPage = await request.post(`${API}/view`,{
        data:{
            id: String(secondProductId),
        }}
    );

    expect(secondProductPage.status()).toBe(200);

    const secondProductPageResponse = await secondProductPage.json();
    expect(secondProductPageResponse.price).toBe(820);

    //Add second product to cart
    const addSecondProduct = await request.post(`${API}/addtocart`,{
        data:{
            "id": row2, "cookie": shopper, "prod_id": secondProductId, "flag": false
        }
    });

    expect(addSecondProduct.status()).toBe(200);

    //View cart
    const viewCart = await request.post(`${API}/viewcart`,{
        data:{
            cookie: shopper,
            flag: false
        }
    })

    expect(viewCart.status()).toBe(200);

    const cart = await viewCart.json();

    //Check products are in cart
    expect(cart.Items).toHaveLength(2);

    //Check that productid in cart matches product id in product page
    const firstCartRow = cart.Items.find((row: CartRow) => row.prod_id === firstProductId);
    expect(firstCartRow).toBeDefined();

    const secondCartRow = cart.Items.find((row: CartRow) => row.prod_id === secondProductId);
    expect(secondCartRow).toBeDefined();

  } finally {
    const deleteFirstProduct = await request.post(`${API}/deleteitem`, {
        data:{
            id: row1,
        }
    });
    expect(deleteFirstProduct.status()).toBe(200);

    const deleteSecondProduct = await request.post(`${API}/deleteitem`, {
        data:{
            id:row2,
        }
    });
    expect(deleteSecondProduct.status()).toBe(200);
  }
});