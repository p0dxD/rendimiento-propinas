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
  let deLaPropina = (cuenta * propina) / 100;
  if (redondear) {
    deLaPropina = Math.ceil(cuenta + deLaPropina) - cuenta;
  }
  const total = cuenta + deLaPropina;
  const parte = Math.round((total / personas) * 100) / 100;
  return {
    cuenta: Math.round(cuenta * 100),
    propina: Math.round(deLaPropina * 100),
    total: Math.round(total * 100),
    partes: Array(personas).fill(Math.round(parte * 100)),
  };
}

/** Centavos como pesos: 3834 → "$38.34". */
export function pesos(centavos) {
  return `$${(centavos / 100).toFixed(2)}`;
}
