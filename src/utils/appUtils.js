const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((color) => {
      const hex = color.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener("touchmove", preventDefault, wheelOpt);
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

const objectToQueryString = (obj) => {
  const stringified = JSON.stringify(obj);
  const editedText = stringified
    .slice(1, stringified.length - 1)
    .replaceAll(/"/gi, "");
  const res = editedText.replaceAll(":", "=").replaceAll(",", "&");

  return res;
};

const firstLetterUpperCase = (text) => {
  return text.replace(text[0], text[0].toUpperCase());
};

/**
 *
 * @param {function} callbackFunc - the function you want to call after the animation
 * @param {string} animation - a string containing css animation properties
 * @returns promise
 */

const actionAfterAnimation = async (
  callbackFunc,
  { element, animation, duration }
) => {
  return new Promise((resolve) => {
    element.style.cssText += `
    ${animation}`;

    setTimeout(() => resolve("animation end"), duration - 500);
  })
    .then(() => callbackFunc())
    .catch((err) =>
      console.error("animation promise occured with an error! : " + err)
    );
};

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

class random {
  constructor(length = 5) {
    this.length = length;
  }

  static createRandomString() {
    const array = new Uint32Array(10);

    crypto.getRandomValues(array);

    return Array.from(array, dec2hex).join("");
  }

  static randomString(length = this.length) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456780";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
}

export {
  rgbToHex,
  hexToRgb,
  disableScroll,
  enableScroll,
  objectToQueryString,
  firstLetterUpperCase,
  actionAfterAnimation,
  random,
};
