const board = document.getElementById("draw");
const { width, height } = board.getBoundingClientRect();

const RADIUS = 200;
let maxCid = 0;
let circles = [
  {
    x: width / 2,
    y: height / 2,
    r: RADIUS,
    id: maxCid,
    level: 0
  }
];

function splitter(circles, id) {
  let nc = [];
  for (let cc of circles) {
    if (cc.id === id && cc.level < 5) {
      nc.push({
        x: cc.x - cc.r / 2,
        y: cc.y - cc.r / 2,
        r: cc.r / 2,
        id: ++maxCid,
        level: cc.level + 1
      });
      nc.push({
        x: cc.x - cc.r / 2,
        y: cc.y + cc.r / 2,
        r: cc.r / 2,
        id: ++maxCid,
        level: cc.level + 1
      });
      nc.push({
        x: cc.x + cc.r / 2,
        y: cc.y - cc.r / 2,
        r: cc.r / 2,
        id: ++maxCid,
        level: cc.level + 1
      });
      nc.push({
        x: cc.x + cc.r / 2,
        y: cc.y + cc.r / 2,
        r: cc.r / 2,
        id: ++maxCid,
        level: cc.level + 1
      });
    } else {
      nc.push(cc);
    }
  }
  // console.log("nc:", nc.length);
  render(board, nc);
}

function makeCircle(x, y, r, id, cir) {
  const shape = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  shape.cx.baseVal.value = x;
  shape.cy.baseVal.value = y;
  shape.r.baseVal.value = r;
  shape.setAttribute("fill", "steelblue");
  shape.setAttribute("cid", id);
  shape.onmouseenter = e => {
    // shape.onclick = e => {
    // shape.setAttribute("display", "none");
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    const id = Number(e.explicitOriginalTarget.getAttribute("cid"));
    splitter(cir, id);
  };
  return shape;
}

function render(board, circles) {
  const cl = genCircles(circles, []);
  cl.forEach(c => board.appendChild(c));
}

function genCircles(circles, circlesList) {
  for (let c of circles) {
    circlesList.push(makeCircle(c.x, c.y, c.r, c.id, circles));
  }
  return circlesList;
}

render(board, circles);
