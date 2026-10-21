// Board Foot Math engine: board feet by the twelfths rule (thickness inches times width inches times length feet, over twelve), totals over a quantity, cost at a price per board foot, and the linear feet a board-foot count comes back to. Exact integers (hundredths), BigInt for the cross-products, half-up on display only. The twelfths rule is the named board-foot rule; every number is the owner's own entry.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _D = "the thickness and width must be from 0.01 to 100 in with at most two decimal places";
var _L = "the length must be from 0.01 to 1000 ft with at most two decimal places";
var _Q = "the quantity must be from 1 to 10000 with no decimal places";
var _B = "the board feet must be from 0.01 to 1000000 with at most two decimal places";
var _PR = "the price must be from 0.01 to 1000 per board foot with at most two decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _huB(n, d) { return Number((2n * n + d) / (2n * d)); }
function _dim(t) { return _p(t, _D, 3, 2, 1, 10000); }
function _len(t) { return _p(t, _L, 4, 2, 1, 100000); }
function _qty(t) { return _i(t, _Q, 5, 1, 10000); }
function _bf(t) { return _p(t, _B, 7, 2, 1, 100000000); }
function _price(t) { return _p(t, _PR, 4, 2, 1, 100000); }
function _bf100(t100, w100, l100) {
  return _huB(BigInt(t100) * BigInt(w100) * BigInt(l100), 120000n); // BF hundredths
}

function bfTruth(thk, wid, len) {
  var t = _dim(thk), w = _dim(wid), l = _len(len);
  var b = _bf100(t, w, l);
  return "A board of " + _dec(t, 2) + " in by " + _dec(w, 2) + " in and " + _dec(l, 2) + " ft long counts " + _dec(b, 2) + " board feet by the twelfths rule.";
}
function batchTruth(thk, wid, len, qty) {
  var t = _dim(thk), w = _dim(wid), l = _len(len), q = _qty(qty);
  var b = _bf100(t, w, l), tot = _huB(BigInt(b) * BigInt(q) * 2n, 2n); // exact product of hundredths
  return "The pile of " + q + " boards at " + _dec(b, 2) + " board feet each counts " + _dec(tot, 2) + " board feet in all.";
}
function costTruth(bf, price) {
  var b = _bf(bf), p = _price(price);
  var cents = _huB(BigInt(b) * BigInt(p), 100n); // dollar hundredths
  return "The board feet of " + _dec(b, 2) + " at " + _dec(p, 2) + " per board foot cost " + _dec(cents, 2) + ".";
}
function linearTruth(bf, thk, wid) {
  var b = _bf(bf), t = _dim(thk), w = _dim(wid);
  var lf100 = _huB(120000n * BigInt(b), BigInt(t) * BigInt(w)); // linear ft hundredths
  return "The board feet of " + _dec(b, 2) + " in stock of " + _dec(t, 2) + " in by " + _dec(w, 2) + " in come back to " + _dec(lf100, 2) + " linear feet.";
}
