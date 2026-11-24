import { expect, test } from "@playwright/test";


//Check homepage has title
test('has title', async({page})=>{
//navigate to url
await page.goto('https://practicesoftwaretesting.com/');

//Expect a title 'to contain' a substring
await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
});

// 2. Search for Pliers and pressing enter returns only products with pliers in the name 
test('search', async({page})=>{
  await page.goto('https://practicesoftwaretesting.com/');

  //Locate the search box and fill it with the search name
  const searchInput = page.getByPlaceholder('Search');
  
  //Fill the search input
  await searchInput.fill('pliers');
  await searchInput.press('Enter');

//Locate the search button
//   await page.getByRole('button', {name: 'Search'})

    //Wait till the search resulsts are visible
    const results = page.getByTestId('search-result-count')
    await expect(results).toBeVisible();
    
    //Product name
    const productName = page.getByRole('heading', { name: 'pliers', level: 5 });
    await expect(productName.first()).toBeVisible();

    //Of all product names, the ones without pliers in them: there should be 0
    await expect(productName.filter({hasNotText: /pliers/i})).toHaveCount(0);
});

//Invalid Login is rejected an shows the message 'Invalid email or password'
test('login', async({page})=>{
    //Navigate to the login page:
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    //Locate the inputs and submit button
    const emailInput = page.getByPlaceholder('Your email');
    const passwordInput = page.getByPlaceholder('Your password');

    //Locate submit btn
    const loginBtn = page.getByRole('button', {name:'Login'});

    //Fill inputs
    await emailInput.fill('test@gmail.com');
    await passwordInput.fill('123kdkdkd');

    //Click the login btn and submit the form
    await loginBtn.click();

    //Assert: Check if the expected text appears
    await expect(page.getByText('Invalid email or password')).toBeVisible();
});