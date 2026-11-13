// Lo que una persona hace en Propinas: abrir la página, ver cuánto le toca a
// cada quien y cambiar los números.
import { test, expect } from "@playwright/test";

test("abre con la cuenta de ejemplo repartida al centavo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Propinas" })).toBeVisible();
  // $100 con 15 % entre 3: $115.00, y el centavo que sobra lo paga la primera.
  await expect(page.locator("#partes li")).toHaveText(["$38.34", "$38.33", "$38.33"]);
  await expect(page.locator("#total")).toHaveText("Total con propina: $115.00");
});

test("al cambiar las personas, cambian las partes", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Personas").fill("4");
  await expect(page.locator("#partes li")).toHaveCount(4);
  await expect(page.locator("#partes li")).toHaveText(["$28.75", "$28.75", "$28.75", "$28.75"]);
});

test("con cero personas dice qué está mal", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Personas").fill("0");
  await expect(page.locator("#partes li")).toHaveCount(0);
  await expect(page.locator("#total")).toContainText("personas debe ser un entero de 1 o más");
});

test("la página responde su revisión de salud", async ({ request }) => {
  const r = await request.get("/healthz");
  expect(r.ok()).toBeTruthy();
});
