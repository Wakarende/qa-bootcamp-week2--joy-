import { expect, test } from "@playwright/test";


test('get products', async({request})=>{
// send get request and save the response 
const response = await request.get('https://api.practicesoftwaretesting.com/products');

//check the status of the response
expect(response.status()).toBe(200);

//Read the body as json
const body = await response.json();

//Check one field
expect(body.data[0].name).toBe('Combination Pliers');
})