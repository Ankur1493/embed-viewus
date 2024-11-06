export const isValidColor = (color: string): boolean => {
  if (!color) return false;
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};