// Pruebas de navegador de Propinas. Apuntan a BASE_URL: rendimiento la
// pone (la dirección de la versión en vivo, o la de la copia de una
// solicitud); en su computadora, http://localhost:3000 con `npm start`.
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "pruebas",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: { baseURL: process.env.BASE_URL || "http://localhost:3000", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
