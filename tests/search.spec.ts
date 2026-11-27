import { expect, test } from "@playwright/test";
import { SearchPage } from "./pages/SearchPage";

test('search hammer only shows hammer products', async({page})=>{
    const searchPage= new SearchPage(page);
    await searchPage.goto();
    await searchPage.search('hammer');
    await expect(searchPage.results).toBeVisible();
    await expect(searchPage.productNames.filter({ hasNotText: /hammer/i })).toHaveCount(0);
})

