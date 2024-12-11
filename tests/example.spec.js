import { test, expect } from "@playwright/test";

test.describe("Profile access tests", () => {
  test("Logged-in user can access profile page", async ({ page }) => {
    await page.goto("localhost:3000/user/signin", {
      waitUntil: "domcontentloaded",
    });

    await page.fill('input[name="email"]', "barbarianborubar93@gmail.com");
    await page.fill('input[name="password"]', "has123");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:3000/");

    await page.goto("http://localhost:3000/user", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveURL("http://localhost:3000/user");
    await expect(
      page.getByRole("heading", { name: "User Profile" })
    ).toBeVisible();
  });

  test("not signed user is redirected to login from profile page", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/user", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveURL(
      "http://localhost:3000/user/signin?returnUrl=/user"
    );
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });
});

// const { test, expect } = require("@playwright/test");

// test("has link to login page", async ({ page }) => {
//   await page.goto("http://localhost:3000/");

//   await page.click("text=Sign in");

//   await expect(page).toHaveURL("http://localhost:3000/user/signin");
//   await expect(page.getByRole("button", { name: "Sign In" })).toContainText(
//     "Sign In"
//   );
// });
// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   await page.getByRole('link', { name: 'Get started' }).click();
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
