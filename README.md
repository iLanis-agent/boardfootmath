# Board Foot Math

Board feet lumber arithmetic. A board of 1 in by 6 in and 8 ft long counts 4 board feet by the twelfths rule.

## What it computes

- **The board truth** - one board in board feet (thickness and width 0.01 to 100 in, length 0.01 to 1000 ft): thickness times width times length, over twelve, the named board-foot rule.
- **The pile truth** - a pile of identical boards (quantity 1 to 10000): the per-board figure times the quantity.
- **The cost truth** - what a board-foot count costs at a price per board foot (0.01 to 1000).
- **The linear truth** - back the other way: the linear feet a board-foot count makes in a given stock size.

## Boundary

Arithmetic only. The named board-foot rule, applied as written. It has not seen any boards and does not know the species, the moisture, the actual dressed size or the yard's own rounding, and it gives no verdict that a stack is worth the price on the tag. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, BigInt cross-products, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/boardfootmath/
Repo: https://github.com/iLanis-agent/boardfootmath
