import { substraction } from "./../math";
describe("Probando la resta", () => {
  test("Probando el happy path de la resta", () => {
    const result = substraction(1, 4);
    expect(result).toBe(-3);
  });

  test("Probando el edge case de la resta", () => {
    const result = substraction(1 - 4);
    expect(result).toBe(null);
  });

  test("Probando resultados negativos", () => {
    const result = substraction(1, 4);
    expect(result).toBeLessThan(0);
  });
});
