import { test, expect } from "@playwright/test";

const username = process.env.SAUCEDEMO_USERNAME ?? "standard_user";
const password = process.env.SAUCEDEMO_PASSWORD ?? "secret_sauce";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-button").click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe("SauceDemo cart and checkout", () => {
  test("user can add a product to the cart", async ({ page }) => {
    await login(page);

    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

    await page.getByTestId("shopping-cart-link").click();
    await expect(page.getByTestId("cart-list")).toContainText("Sauce Labs Backpack");
  });

  test("user can complete the demo checkout", async ({ page }) => {
    await login(page);

    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("shopping-cart-link").click();
    await expect(page.getByTestId("cart-list")).toContainText("Sauce Labs Backpack");

    await page.getByTestId("checkout").click();
    await page.getByTestId("firstName").fill("Portfolio");
    await page.getByTestId("lastName").fill("Tester");
    await page.getByTestId("postalCode").fill("12345");
    await page.getByTestId("continue").click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByTestId("cart-list")).toContainText("Sauce Labs Backpack");

    await page.getByTestId("finish").click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByTestId("complete-header")).toContainText(/thank you/i);
  });

  test("checkout requires customer information", async ({ page }) => {
    await login(page);

    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("shopping-cart-link").click();
    await page.getByTestId("checkout").click();

    await page.getByTestId("firstName").fill("");
    await page.getByTestId("lastName").fill("Tester");
    await page.getByTestId("postalCode").fill("12345");
    await page.getByTestId("continue").click();

    await expect(page.getByTestId("error")).toBeVisible();
    await expect(page.getByTestId("error")).toContainText(/first name/i);
    await expect(page).not.toHaveURL(/checkout-step-two\.html/);
  });
});
