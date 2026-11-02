import { test } from "node:test";
import assert from "node:assert/strict";
import { repartir, pesos } from "../src/repartir.js";

const suma = (xs) => xs.reduce((a, b) => a + b, 0);

test("tres personas, $100 con 15 %: nadie pierde un centavo", () => {
  const r = repartir(100, 15, 3);
  assert.equal(r.total, 11500);
  assert.deepEqual(r.partes, [3834, 3833, 3833]);
  assert.equal(suma(r.partes), r.total);
});

test("la suma de las partes es siempre el total", () => {
  for (const [cuenta, propina, personas] of [[87.5, 10, 7], [1234.56, 18, 6], [0.05, 15, 4], [999.99, 12.5, 9]]) {
    const r = repartir(cuenta, propina, personas);
    assert.equal(suma(r.partes), r.total, `${cuenta} con ${propina} % entre ${personas}`);
    assert.ok(Math.max(...r.partes) - Math.min(...r.partes) <= 1, "nadie paga más de un centavo de diferencia");
  }
});

test("sin propina y una sola persona", () => {
  assert.deepEqual(repartir(250, 0, 1), { cuenta: 25000, propina: 0, total: 25000, partes: [25000] });
});

test("personas inválidas", () => {
  assert.throws(() => repartir(100, 10, 0), RangeError);
  assert.throws(() => repartir(100, 10, 2.5), RangeError);
});

test("pesos", () => {
  assert.equal(pesos(3834), "$38.34");
  assert.equal(pesos(5), "$0.05");
});
