const body = document.getElementsByTagName("body")[0];
const board = document.getElementById("draw");
let { width, height } = body.getBoundingClientRect();
const min = Math.min(width, height);
board.setAttribute("width", min);
board.setAttribute("height", min);
board.setAttribute(
  "style",
  `margin-left: ${(width - min) / 2}px; margin-top: ${(height - min) / 2}px;`
);
width = min;
height = min;

const RADIUS = Math.max(width, height) / 4;
const MAX_LEVEL = 6;

const handle = prompt("Enter your github handle", "meain");

function map(s, a1, a2, b1, b2) {
  return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
}

const image = document.getElementById("im");
image.onload = () => {
  document.getElementById("masker").style.display = "none";
};

function fakeRenderImage(x, y) {
  image.src = `https://avatars.githubusercontent.com/${handle}`;
  const canvas = document.getElementById("can");
  const context = canvas.getContext("2d");

  x = Math.round(map(x, 0, width, 0, 250));
  y = Math.round(map(y, 0, height, 0, 250));

  const { width: w, height: h } = image.getBoundingClientRect();
  context.drawImage(image, 0, 0, w, h, 0, 0, 250, 250);
  const data = context.getImageData(x, y, 1, 1).data;
  return `rgb(${data[0]}, ${data[1]},${data[2]})`;
}
window.onload = () => {
  fakeRenderImage(20, 30);
};

function makeCircle(x, y, r, color = "steelblue", l = 0) {
  const shape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  shape.cx.baseVal.value = x;
  shape.cy.baseVal.value = y;
  shape.r.baseVal.value = r;
  shape.setAttribute("fill", color);
  shape.setAttribute("level", l);
  shape.onmouseenter = () => {
    if (Number(shape.getAttribute("level")) > MAX_LEVEL) return;
    board.removeChild(shape);
    makeCircle(
      x - r / 2,
      y - r / 2,
      r / 2,
      fakeRenderImage(x - r / 2, y - r / 2),
      l + 1
    );
    makeCircle(
      x - r / 2,
      y + r / 2,
      r / 2,
      fakeRenderImage(x - r / 2, y + r / 2),
      l + 1
    );
    makeCircle(
      x + r / 2,
      y - r / 2,
      r / 2,
      fakeRenderImage(x + r / 2, y - r / 2),
      l + 1
    );
    makeCircle(
      x + r / 2,
      y + r / 2,
      r / 2,
      fakeRenderImage(x + r / 2, y + r / 2),
      l + 1
    );
  };
  board.appendChild(shape);
}

makeCircle(width / 2, height / 2, RADIUS);
