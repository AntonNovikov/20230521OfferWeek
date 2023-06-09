// Вариант 1. Больше секунды 	Превышен лимит времени (TLE)
// module.exports = function (n, k) {
//   let result = [];

//   for (let i = Math.pow(10, k - 1); i < Math.pow(10, k); i++) {
//     const digits = i.toString().split("");

//     if (isNonDescending(digits) && sum(digits) === n) {
//       result.push(i);
//     }
//   }

//   if (result.length > 0) {
//     result = [
//       result.length,

//       result[0].toString(),

//       result[result.length - 1].toString(),
//     ];
//   } else {
//     result = [0];
//   }

//   return result;
// };

// function isNonDescending(digits) {
//   for (let i = 0; i < digits.length - 1; i++) {
//     if (+digits[i] > +digits[i + 1]) {
//       return false;
//     }
//   }

//   return true;
// }

// function sum(digits) {
//   let total = 0;

//   for (let i = 0; i < digits.length; i++) {
//     total += +digits[i];
//   }

//   return total;
// }

// function findAll(n, k) {
//   let result = [0];
//   const digits = [];

//   function helper(start) {
//     let sum = 0;
//     console.log("helper :", digits);
//     for (let i = 0; i < digits.length; i++) {
//       console.log("I: ", i, "digits", digits[i]);
//       sum += digits[i];
//       console.log(sum);
//       if (sum > n)
//         return [result[0], result[1].toString(), result[2].toString()];
//     }
//     if (digits.length === k && sum === n) {
//       result[0]++;
//       if (result[0] === 1) {
//         result[1] = digits.join("");
//       }
//       result[2] = digits.join("");
//       return;
//     }
//     if (digits.length === k) {
//       return;
//     }
//     for (let i = start; i <= 9; i++) {
//       digits.push(i);
//       helper(i);
//       digits.pop();
//     }
//   }

//   helper(1);

//   if (result[0] === 0) {
//     return [0];
//   }
//   return [result[0], result[1].toString(), result[2].toString()];
// }

module.exports = function (n, k) {
  let result = [0];
  const digits = [];

  function helper(start) {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i];
    }
    if (digits.length === k && sum === n) {
      result[0]++;
      if (result[0] === 1) {
        result[1] = digits.join("");
      }
      result[2] = digits.join("");
      return;
    }
    if (digits.length === k) {
      return;
    }
    for (let i = start; i <= 9; i++) {
      digits.push(i);
      helper(i);
      digits.pop();
    }
  }

  helper(1);

  if (result[0] === 0) {
    return [0];
  }
  return [result[0], result[1].toString(), result[2].toString()];
};

// console.log(findAll(10, 3)); // [8, 118, 334]
// // console.log(findAll(27, 3)); // [1, 999, 999]
// // console.log(findAll(28, 3)); // [0]
