import json, random

def dec2(n):
    if n < 0: return "-" + dec2(-n)
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s

def hu(num, den):
    return (2*num + den) // (2*den)

def bf100(t, w, l):
    return hu(t*w*l, 120000)  # BF hundredths

def bf(t, w, l):
    b = bf100(t, w, l)
    return (f"A board of {dec2(t)} in by {dec2(w)} in and {dec2(l)} ft long counts {dec2(b)} board feet "
            f"by the twelfths rule.")
def batch(t, w, l, q):
    b = bf100(t, w, l); tot = b*q
    return f"The pile of {q} boards at {dec2(b)} board feet each counts {dec2(tot)} board feet in all."
def cost(b, p):
    cents = hu(b*p, 100)
    return f"The board feet of {dec2(b)} at {dec2(p)} per board foot cost {dec2(cents)}."
def linear(b, t, w):
    lf100 = hu(120000*b, t*w)
    return f"The board feet of {dec2(b)} in stock of {dec2(t)} in by {dec2(w)} in come back to {dec2(lf100)} linear feet."

random.seed(742)
cases = [
  dict(fn="bf", args=["1","6","8"], expect=bf(100,600,800)),
  dict(fn="batch", args=["1","6","8","10"], expect=batch(100,600,800,10)),
  dict(fn="cost", args=["40","6.5"], expect=cost(4000,650)),
  dict(fn="linear", args=["4","1","6"], expect=linear(400,100,600)),
]
for _ in range(25):
    t = random.randint(1,10000); w = random.randint(1,10000); l = random.randint(1,100000)
    cases.append(dict(fn="bf", args=[dec2(t),dec2(w),dec2(l)], expect=bf(t,w,l)))
for _ in range(25):
    t = random.randint(1,10000); w = random.randint(1,10000); l = random.randint(1,100000); q = random.randint(1,10000)
    cases.append(dict(fn="batch", args=[dec2(t),dec2(w),dec2(l),str(q)], expect=batch(t,w,l,q)))
for _ in range(20):
    b = random.randint(1,100000000); p = random.randint(1,100000)
    cases.append(dict(fn="cost", args=[dec2(b),dec2(p)], expect=cost(b,p)))
for _ in range(20):
    b = random.randint(1,100000000); t = random.randint(1,10000); w = random.randint(1,10000)
    cases.append(dict(fn="linear", args=[dec2(b),dec2(t),dec2(w)], expect=linear(b,t,w)))
errcases = [
  ["bf", ["0","6","8"]], ["bf", ["1","0","8"]], ["bf", ["1","6","0"]], ["bf", ["100.01","6","8"]],
  ["batch", ["1","6","8","0"]], ["batch", ["1","6","8","1.5"]], ["batch", ["1","6","1000.01","10"]],
  ["cost", ["0","6.5"]], ["cost", ["40","0"]], ["cost", ["40","1000.01"]],
  ["linear", ["0","1","6"]], ["linear", ["4","1","0"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
