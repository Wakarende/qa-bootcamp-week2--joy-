 import { Page, Locator, expect } from '@playwright/test';

export class DemoblazePage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly placeOrderButton: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly cardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly confirmationTitle: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.nameInput = page.getByLabel('Name:', { exact: true });
    this.countryInput = page.getByLabel('Country:');
    this.cityInput = page.getByLabel('City:');
    this.cardInput = page.getByLabel('Credit card:');
    this.monthInput = page.getByLabel('Month:');
    this.yearInput = page.getByLabel('Year:');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.confirmationTitle = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    this.okButton = page.getByRole('button', { name: 'OK' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async addProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async fillOrderForm(name: string, country: string, city: string, card: string, month: string, year: string) {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.cardInput.fill(card);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async purchase() {
    await this.purchaseButton.click();
  }

  async confirm() {
    await this.okButton.click();
  }
}