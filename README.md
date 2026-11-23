# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI testing)
- Postman (API testing)
- The Toolshop REST API

There are no tests in this repo. You will write them during the week.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup

Run these steps in order from a terminal.

1. Clone the repo and open the folder:

   ```bash
   git clone <repo-url>
   cd qa-bootcamp-week2-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install the Chromium browser for Playwright:

   ```bash
   npx playwright install chromium
   ```

4. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` already contains the Toolshop website URL (`TOOLSHOP_URL`) and the Toolshop API URL (`TOOLSHOP_API_URL`). Only change them if your trainer gives you different URLs.

5. Check that your setup works:

   ```bash
   npm run check
   ```

   This sends a GET request to the Toolshop API's `/products` endpoint (no login needed). If everything is set up correctly, it prints your Node version, the HTTP status (200), the number of products, and a last line that says `PASS`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Folders

| Folder     | What it is for |
|------------|----------------|
| `tests/`   | Your Playwright tests. It is empty for now; you will add tests during the week. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.

## Week 2 Day 6: TypeScript basics

### src/ts-basics/
Practice files from the TypeScript lessons:
- index.ts: a variable with a type annotation
- tuples.ts: a fixed-length array where each element has its own type
- functions.ts: a function with typed parameters, a default value and a return type
- objects.ts: an object type with optional and readonly properties
- type-aliases.ts: a custom type defined with a type alias
- union-types.ts: a parameter that accepts a number or a string, using narrowing
- optional-chaining.ts: safe access to values that may be null or undefined with ?.

### src/profile-validator.ts
Defines a User type (id, username, optional settings with optional notifications) and a function isNotified(user). It returns the notifications value, or false when settings or notifications is missing, without runtime errors. It prints expected and actual results for three test users: notifications on, no settings, and settings without notifications.

How to check it:
- Types: npx -p typescript tsc --noEmit --strict src/profile-validator.ts (no output means no type errors)
- Run: npx tsx src/profile-validator.ts (each line's actual should match its expected)