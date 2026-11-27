import { test, expect } from '@playwright/test';
import { DemoblazePage } from './pages/DemoblazePage';

const PRODUCT = 'Samsung galaxy s6';
const NAME = 'Test Shopper';
const COUNTRY = 'Kenya';
const CITY = 'Nairobi';
const CARD = '4111111111111111';
const MONTH = '12';
const YEAR = '2027';

test('JK-25 Place an order with valid details', async ({ page }) => {
  const shop = new DemoblazePage(page);

  // Step 1: add the product to the cart
  await shop.goto();
  await shop.addProduct(PRODUCT);

  // Step 2: open Cart and Place Order
  await shop.openCart();
  await expect(page.getByRole('cell', { name: PRODUCT })).toBeVisible();
  await shop.placeOrder();
  await expect(shop.nameInput).toBeVisible();

  // Step 3: fill the form and purchase
  await shop.fillOrderForm(NAME, COUNTRY, CITY, CARD, MONTH, YEAR);
  await shop.purchase();
  await expect(shop.confirmationTitle).toBeVisible();
  await expect(page.getByText('Amount: 360 USD')).toBeVisible();
  await expect(page.getByText(`Name: ${NAME}`)).toBeVisible();

  // Step 4: click OK, the cart is empty
  await shop.confirm();
  await shop.goto();
  await shop.openCart();
  await expect(page.getByRole('cell', { name: PRODUCT })).toHaveCount(0);
});