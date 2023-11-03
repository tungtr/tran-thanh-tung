var sum_to_n_a = function(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) sum += i;

  return sum;
};

var sum_to_n_b = function(n) {
  let add = function(sum, i) {
    let a = 0;
    if (i === n) a = i;
    else if (i < n) a = add(sum + 1, i + 1);

    return sum + a;
  };

  return add(0, 1);
};

var sum_to_n_c = function(n) {
  const isOdd = n % 2 === 1;
  let m = n + (isOdd ? 0 : 1);
  return m * Math.ceil(m / 2) - (isOdd ? 0 : m);
};