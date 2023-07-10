export function getBrightness(color = "") {
  if (!color) {
    return "#000000"; // fallback color
  }
  // strip the leading # if it's there
  color = color.replace("#", "");

  // convert r, g, b to numerical values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // calculate brightness
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function getButtonColor(bgColor) {
  // calculate brightness
  const brightness = getBrightness(bgColor);

  // return black or white based on brightness
  return brightness > 155 ? "black" : "white";
}

export function darkenColor(color, percent) {
  if (!color) {
    return "#000000"; // fallback color
  }
  color = color.substr(1); // remove '#'

  const num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;

  const newColor = (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1);
  return "#" + newColor;
}
