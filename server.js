// rendimiento-propinas: una página para repartir la cuenta y la propina
// entre amigos, al centavo. La desplegó rendimiento.ai.
import express from "express";
import { repartir, pesos } from "./src/repartir.js";

const app = express();
const version = process.env.GIT_SHA?.slice(0, 7) || "dev";

app.get("/healthz", (_req, res) => res.send("ok"));

app.get("/api/repartir", (req, res) => {
  try {
    const r = repartir(Number(req.query.cuenta), Number(req.query.propina ?? 15), Number(req.query.personas));
    res.json({ ...r, partesEnPesos: r.partes.map(pesos), totalEnPesos: pesos(r.total) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Propinas</title>
<style>
  :root { --fondo: #fdf6e9; --texto: #2b2118; --suave: #7a6a5a; --acento: #b3261e; --tarjeta: #fffdf8; --raya: #eadcc6; }
  @media (prefers-color-scheme: dark) { :root { --fondo: #14110f; --texto: #f3ece2; --suave: #b3a597; --acento: #f2836f; --tarjeta: #1f1a16; --raya: #3a302a; } }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; font-family: system-ui, sans-serif;
         background: var(--fondo); color: var(--texto); }
  main { width: 100%; max-width: 440px; background: var(--tarjeta); border: 1px solid var(--raya); border-radius: 16px; padding: 24px; }
  h1 { margin: 0 0 4px; font-size: 1.8rem; }
  p { color: var(--suave); margin: 0 0 16px; }
  form { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  label { display: flex; flex-direction: column; gap: 4px; font-size: .85rem; color: var(--suave); }
  input { font: inherit; padding: 8px; border-radius: 8px; border: 1px solid var(--raya); background: var(--fondo); color: var(--texto); min-width: 0; }
  ol { margin: 16px 0 0; padding-left: 20px; font-variant-numeric: tabular-nums; }
  .total { margin-top: 12px; font-weight: 700; color: var(--acento); }
  footer { margin-top: 16px; font-size: .8rem; color: var(--suave); }
</style></head>
<body><main>
  <h1>Propinas</h1>
  <p>Cuánto le toca a cada quien, al centavo.</p>
  <form id="f">
    <label>Cuenta ($)<input id="cuenta" type="number" min="0" step="0.01" value="100"></label>
    <label>Propina (%)<input id="propina" type="number" min="0" step="0.5" value="15"></label>
    <label>Personas<input id="personas" type="number" min="1" step="1" value="3"></label>
  </form>
  <ol id="partes"></ol>
  <div class="total" id="total"></div>
  <footer>Desplegada por rendimiento · versión ${version}</footer>
</main>
<script>
  const calc = async () => {
    const q = new URLSearchParams({ cuenta: cuenta.value, propina: propina.value, personas: personas.value });
    const r = await (await fetch("/api/repartir?" + q)).json();
    partes.innerHTML = r.error ? "" : r.partesEnPesos.map((p) => "<li>" + p + "</li>").join("");
    total.textContent = r.error ? r.error : "Total con propina: " + r.totalEnPesos;
  };
  document.getElementById("f").addEventListener("input", calc);
  calc();
</script>
</body></html>`);
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`rendimiento-propinas ${version} en :${port}`));
