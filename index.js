const board = document.getElementById("draw");
const { width, height } = board.getBoundingClientRect();

const RADIUS = Math.max(width, height) / 4;
const MAX_LEVEL = 6;

function makeCircle(x, y, r, l = 0) {
  const shape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  shape.cx.baseVal.value = x;
  shape.cy.baseVal.value = y;
  shape.r.baseVal.value = r;
  shape.setAttribute("fill", "steelblue");
  shape.setAttribute("level", l);
  shape.onmouseenter = () => {
    if (Number(shape.getAttribute("level")) > MAX_LEVEL) return;
    board.removeChild(shape);
    makeCircle(x - r / 2, y - r / 2, r / 2, l + 1);
    makeCircle(x - r / 2, y + r / 2, r / 2, l + 1);
    makeCircle(x + r / 2, y - r / 2, r / 2, l + 1);
    makeCircle(x + r / 2, y + r / 2, r / 2, l + 1);
  };
  board.appendChild(shape);
}

makeCircle(width / 2, height / 2, RADIUS);
