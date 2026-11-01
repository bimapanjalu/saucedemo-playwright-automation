import { test, expect } from "@playwright/test";

const username = process.env.SAUCEDEMO_USERNAME ?? "standard_user";
const password = process.env.SAUCEDEMO_PASSWORD ?? "secret_sauce";

test.describe("SauceDemo authentication", () => {
  test("valid demo credentials open the product list", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-button").click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText("Products", { exact: true })).toBeVisible();
    await expect(page.getByTestId("inventory-list")).toBeVisible();
  });

  test("incorrect password is rejected", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill("incorrect-password-for-test");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("error")).toBeVisible();
    await expect(page.getByTestId("error")).toContainText(/username and password|do not match/i);
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test("locked-out demo account cannot log in", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("username").fill("locked_out_user");
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("error")).toBeVisible();
    await expect(page.getByTestId("error")).toContainText(/locked out/i);
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
