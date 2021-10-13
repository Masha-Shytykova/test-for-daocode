function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const dynamicColorChange = function (start, end, temp, minTemp) {
  const startRGB = hexToRgb(start);
  const endRGB = hexToRgb(end);

  const resR = startRGB.r + ((endRGB.r - startRGB.r) * (temp - minTemp)) / 20;
  const resG = startRGB.g + ((endRGB.g - startRGB.g) * (temp - minTemp)) / 20;
  const resB = startRGB.b + ((endRGB.b - startRGB.b) * (temp - minTemp)) / 20;

  const resultColor = "rgb(" + resR + "," + resG + "," + resB + ")";
  return resultColor;
};

export const makeBackgroundColor = function (temp) {
  let c = "";
  if (temp <= -10) {
    c = "#00ffff";
    return c;
  }
  if (temp > -10 && temp < 10) {
    c = dynamicColorChange("#00ffff", "#fff700", temp, -10);
    return c;
  }

  if (temp === 10) {
    c = "#fff700";
    return c;
  }
  if (temp > 10 && temp < 30) {
    c = dynamicColorChange("#fff700", "#ff8c00", temp, 10);
    return c;
  }
  if (temp >= 30) {
    c = "#ff8c00";
    return c;
  }
  return "#ffffff";
};
