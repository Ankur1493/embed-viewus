export const isValidColor = (color: string): boolean => {
  if (!color) return false;

  const hexRegex = /^#([0-9A-Fa-f]{6})$/;
  if (hexRegex.test(color)) return true;

  if (/^[0-9A-Fa-f]{6}$/.test(color)) return true;

  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};
