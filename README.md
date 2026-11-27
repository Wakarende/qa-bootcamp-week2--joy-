# Toolshop Test Suite

Automated UI and API tests for Toolshop, a practice e-commerce site (https://practicesoftwaretesting.com) and its REST API (https://api.practicesoftwaretesting.com). It also includes capstone tests for Demoblaze (https://www.demoblaze.com) and its API (https://api.demoblaze.com). The tests are written in TypeScript with Playwright.

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS version)
- [Git](https://git-scm.com/)

## Quick start

From the project folder:

1. Install the dependencies and the Chromium browser:

   ```bash
   npm install
   npx playwright install chromium
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   `.env` contains the Toolshop website URL (`TOOLSHOP_URL`) and API URL (`TOOLSHOP_API_URL`).

3. Run the suite:

   ```bash
   npm test
   ```

   Expected result: 9 passed.

> **Warning:** never commit `.env`. It holds local settings and secrets. It is listed in `.gitignore`, so do not remove it from there.

## Tests

| File | Type | What it checks |
|------|------|----------------|
| `tests/toolshop.spec.ts` | UI | The home page title is "Practice Software Testing - Toolshop - v5.0" |
| `tests/toolshop.spec.ts` | UI | Searching "pliers" shows only products with "pliers" in the name |
| `tests/toolshop.spec.ts` | UI | An invalid login shows "Invalid email or password" |
| `tests/search.spec.ts` | UI, page object | Searching "hammer" shows only products with "hammer" in the name |
| `tests/productapi.spec.ts` | API | GET /products returns 200 and the first product is "Combination Pliers" |
| `tests/cartsapi.spec.ts` | API | Creating a cart and adding a product returns 200 and "item added or updated". The cart is deleted afterwards, even if a check fails |
| `tests/cartsapi.spec.ts` | API | GET /carts/{id} with an id that doesn't exist returns 404 |
| `tests/jk25-order.ui.spec.ts` | UI, page object | JK-25 Place an order with valid details (Demoblaze): the popup shows "Thank you for your purchase!", "Amount: 360 USD" and "Name: Test Shopper", and the Cart is empty afterwards |
| `tests/jk19-cart.api.spec.ts` | API | JK-19 Add two products and check cart prices (Demoblaze): the cart has exactly Samsung galaxy s6 and Nokia lumia 1520, at 360 and 820. The cart rows are deleted afterwards, even if a check fails |

### Conventions
- UI tests use role-based and user-facing locators, `expect` for every check, and no fixed waits.
- Toolshop uses the `data-test` attribute, so `playwright.config.ts` sets `testIdAttribute: 'data-test'` for `getByTestId`.
- Any test that creates data deletes it in a `finally` block, so no test depends on another test's data.
- API tests use the full API address, because the config's base URL points at the website.
- Demoblaze API tests find products by title, not by a hardcoded id, and use a new random shopper id each run, so every run starts with an empty cart.

## Project structure

| Folder | Contents |
|--------|----------|
| `tests/` | Playwright UI and API tests |
| `pages/` | Page objects. `SearchPage.ts` holds the search page's locators and actions |
| `tests/pages/` | Page objects. `DemoblazePage.ts` holds the Demoblaze order flow's locators and actions (addProduct, openCart, placeOrder, fillOrderForm, purchase, confirm) |
| `scripts/` | Helper scripts. `check.ts` checks the setup |
| `src/` | TypeScript practice files |

## Scripts

- `npm test`: runs every Playwright test in `tests/`.
- `npm run check`: checks `.env` and that the Toolshop API can be reached. It prints the Node version, status 200, the number of products and `PASS`.

## TypeScript practice files

### src/ts-basics/
- index.ts: a variable with a type annotation
- tuples.ts: a fixed-length array where each element has its own type
- functions.ts: a function with typed parameters, a default value and a return type
- objects.ts: an object type with optional and readonly properties
- type-aliases.ts: a custom type defined with a type alias
- union-types.ts: a parameter that accepts a number or a string, using narrowing
- optional-chaining.ts: safe access to values that may be null or undefined with ?.

### src/profile-validator.ts
Defines a User type (id, username, optional settings with optional notifications) and a function isNotified(user). It returns the notifications value, or false when settings or notifications is missing, without runtime errors. It prints expected and actual results for three test users.

To check it:
- Types: `npx -p typescript tsc --noEmit --strict src/profile-validator.ts` (no output means no type errors)
- Run: `npx tsx src/profile-validator.ts` (each line's actual should match its expected)