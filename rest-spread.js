// Rest parameter -> Untuk menciptakan fungsi yang dynamic, yang bisa accept parameter sebanyak mungkin
function sum(...nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(5, 10, 15, 30, 55, 65, 1002, 493304));

// Spread -> Shortcut untuk mempercepat reference dan penggabungan sebuah objeck / array

const base = { name: "Laptop", price: 8000000 };
const updated = {
  tags: ["laptop", "pc", "asus"],
  brand: "Asus",
  color: "White",
};

const a = [1, 2, 3];
const b = [4, 5, 6];

const combinedArray = [...b, ...a, ...b, ...a, ...a];
console.log(combinedArray);

// const combined = { ...base, ...updated };

// console.log(combined);
