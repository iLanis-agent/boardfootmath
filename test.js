const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { bf: bfTruth, batch: batchTruth, cost: costTruth, linear: linearTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the thickness and width must be from 0.01 to 100 in with at most two decimal places",
  "the length must be from 0.01 to 1000 ft with at most two decimal places",
  "the quantity must be from 1 to 10000 with no decimal places",
  "the board feet must be from 0.01 to 1000000 with at most two decimal places",
  "the price must be from 0.01 to 1000 per board foot with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
