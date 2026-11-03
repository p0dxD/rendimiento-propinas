// Reparte una cuenta con su propina entre varias personas. Con redondear,
// la propina sube lo necesario para que el total cierre al peso, que es
// más fácil de pagar en efectivo.

/**
 * @param {number} cuenta    lo que marca la cuenta, en pesos (p. ej. 100.5)
 * @param {number} propina   el porcentaje de propina (p. ej. 15)
 * @param {number} personas  entre cuántas personas
 * @param {{redondear?: boolean}} opciones  redondear: el total al peso siguiente
 * @returns {{cuenta: number, propina: number, total: number, partes: number[]}} todo en centavos
 */
export function repartir(cuenta, propina, personas, { redondear = false } = {}) {
  if (!Number.isInteger(personas) || personas < 1) {
    throw new RangeError("personas debe ser un entero de 1 o más");
  }
  if (!(cuenta >= 0) || !(propina >= 0)) {
    throw new RangeError("la cuenta y la propina no pueden ser negativas");
  }
  // Todo en centavos enteros, para que las partes sumen exactamente el total.
  const cuentaC = Math.round(cuenta * 100);
  let propinaC = Math.round((cuentaC * propina) / 100);
  if (redondear) {
    propinaC = Math.ceil((cuentaC + propinaC) / 100) * 100 - cuentaC;
  }
  const total = cuentaC + propinaC;
  const base = Math.floor(total / personas);
  const sobran = total - base * personas;
  // Los centavos sobrantes se dan de uno en uno, empezando por la primera persona.
  const partes = Array.from({ length: personas }, (_, i) => base + (i < sobran ? 1 : 0));
  return { cuenta: cuentaC, propina: propinaC, total, partes };
}

/** Centavos como pesos: 3834 → "$38.34". */
export function pesos(centavos) {
  return `$${(centavos / 100).toFixed(2)}`;
}
