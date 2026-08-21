import fs from "node:fs";

const path = "src/assets/SeatsBrokers-favicon.svg";
const buf = fs.readFileSync(path);
const controls = [];
for (let i = 0; i < buf.length; i++) {
  if (buf[i] < 32 && buf[i] !== 9 && buf[i] !== 10 && buf[i] !== 13) {
    controls.push({ i, code: buf[i] });
  }
}
console.log("C0 count", controls.length, controls.slice(0, 10));

function parsePath(d) {
  const cmds = [];
  const re = /([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g;
  let m;
  while ((m = re.exec(d))) {
    const nums = m[2].trim().length
      ? m[2]
          .trim()
          .split(/[\s,]+/)
          .filter(Boolean)
          .map(Number)
      : [];
    cmds.push({ c: m[1], n: nums });
  }
  return cmds;
}

function bboxOf(d) {
  let x = 0,
    y = 0,
    sx = 0,
    sy = 0,
    minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const add = (px, py) => {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  };
  for (const { c, n } of parsePath(d)) {
    const C = c;
    if (C === "M" || C === "L") {
      for (let i = 0; i < n.length; i += 2) {
        x = n[i];
        y = n[i + 1];
        add(x, y);
        if (C === "M" && i === 0) {
          sx = x;
          sy = y;
        }
      }
    } else if (C === "m" || C === "l") {
      for (let i = 0; i < n.length; i += 2) {
        x += n[i];
        y += n[i + 1];
        add(x, y);
        if (C === "m" && i === 0) {
          sx = x;
          sy = y;
        }
      }
    } else if (C === "H") {
      for (const v of n) {
        x = v;
        add(x, y);
      }
    } else if (C === "h") {
      for (const v of n) {
        x += v;
        add(x, y);
      }
    } else if (C === "V") {
      for (const v of n) {
        y = v;
        add(x, y);
      }
    } else if (C === "v") {
      for (const v of n) {
        y += v;
        add(x, y);
      }
    } else if (C === "C") {
      for (let i = 0; i < n.length; i += 6) {
        add(n[i], n[i + 1]);
        add(n[i + 2], n[i + 3]);
        x = n[i + 4];
        y = n[i + 5];
        add(x, y);
      }
    } else if (C === "c") {
      for (let i = 0; i < n.length; i += 6) {
        add(x + n[i], y + n[i + 1]);
        add(x + n[i + 2], y + n[i + 3]);
        x += n[i + 4];
        y += n[i + 5];
        add(x, y);
      }
    } else if (C === "S") {
      for (let i = 0; i < n.length; i += 4) {
        add(n[i], n[i + 1]);
        x = n[i + 2];
        y = n[i + 3];
        add(x, y);
      }
    } else if (C === "s") {
      for (let i = 0; i < n.length; i += 4) {
        add(x + n[i], y + n[i + 1]);
        x += n[i + 2];
        y += n[i + 3];
        add(x, y);
      }
    } else if (C === "Z" || C === "z") {
      x = sx;
      y = sy;
    } else {
      console.log("unhandled", C);
    }
  }
  return { minX, minY, maxX, maxY };
}

const text = buf.toString("utf8");
const polys = [...text.matchAll(/points="([^"]+)"/g)].map((m) => m[1]);
const paths = [...text.matchAll(/ d="([^"]+)"/g)].map((m) =>
  m[1].replace(/\s+/g, " "),
);
let minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity;
for (const p of polys) {
  const nums = p
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  for (let i = 0; i < nums.length; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
}
for (const d of paths) {
  const b = bboxOf(d);
  minX = Math.min(minX, b.minX);
  maxX = Math.max(maxX, b.maxX);
  minY = Math.min(minY, b.minY);
  maxY = Math.max(maxY, b.maxY);
}
console.log({
  minX,
  minY,
  maxX,
  maxY,
  w: maxX - minX,
  h: maxY - minY,
  aspect: (maxX - minX) / (maxY - minY),
});
