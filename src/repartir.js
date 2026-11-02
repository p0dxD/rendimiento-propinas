// Reparte una cuenta con su propina entre varias personas, al centavo:
// todo se cuenta en centavos enteros, y los centavos que no se dividen
// parejo los pagan las primeras personas, uno cada una. Así la suma de lo
// que paga cada quien es siempre exactamente el total.

/**
 * @param {number} cuenta    lo que marca la cuenta, en pesos (p. ej. 100.5)
 * @param {number} propina   el porcentaje de propina (p. ej. 15)
 * @param {number} personas  entre cuántas personas
 * @returns {{cuenta: number, propina: number, total: number, partes: number[]}} todo en centavos
 */
export function repartir(cuenta, propina, personas) {
  if (!Number.isInteger(personas) || personas < 1) {
    throw new RangeError("personas debe ser un entero de 1 o más");
  }
  if (!(cuenta >= 0) || !(propina >= 0)) {
    throw new RangeError("la cuenta y la propina no pueden ser negativas");
  }
  const centavos = Math.round(cuenta * 100);
  const deLaPropina = Math.round((centavos * propina) / 100);
  const total = centavos + deLaPropina;
  const base = Math.floor(total / personas);
  const sobran = total - base * personas;
  const partes = Array.from({ length: personas }, (_, i) => base + (i < sobran ? 1 : 0));
  return { cuenta: centavos, propina: deLaPropina, total, partes };
}

/** Centavos como pesos: 3834 → "$38.34". */
export function pesos(centavos) {
  return `$${(centavos / 100).toFixed(2)}`;
}
