import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly results: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search');   // search box locator
    this.results =  page.getByTestId('search-result-count');       // results area locator
    this.productNames = this.results.getByRole('heading', {level: 5 });  //  product name locator
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}