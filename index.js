function convertIntegerToBinary(x) {
  let isNegative = x < 0 ? true : false;
  let bin = 0;
  let rem, i = 1;
  while (x != 0) {
    rem = x % 2;
    x = parseInt(x / 2);
    bin = bin + rem * i;
    i = i * 10;
  }
  if (isNegative) {
    return convertNegativeIntegerToBinary(bin)
  }
  return bin;
}

function convertNegativeIntegerToBinary(x) {
  const binaryString = x.toString()
  let ar = binaryString.split("")
  ar.shift()
  while (ar.length < 8) { // número de bits
    ar.unshift("0")
  }
  // console.log(ar)
  let indexes = [];
  for (let i = 0; i < ar.length; i++) {
    if (ar[i] == "1") indexes.push(i)
  }
  const lastOne = indexes.at(-1);
  // console.log(lastOne)
  for (let i = lastOne - 1; i >= 0; i--) {
    if (ar[i] === "1") ar[i] = "0";
    else ar[i] = "1";
  }
  // console.log(ar)
  const bin = ar.join("");
  return bin;
}

function convertDecimalToBinary(x) {
  const binary = [];
  while (x != 1.0) {
    binary.push(Math.floor(x));
    let resto = x % 1;
    x = resto * 2;
  }
  binary.push(1);
  binary.shift();
  return binary.join("");
}

function firstBit(number) {
  if (number >= 0.0) {
    return "0";
  } else {
    return "1";
  }
}

function exponent(integer, decimal) {
  integerStr = integer.toString();
  let text1 = integer.toString() + ",";
  let concat = text1.concat(decimal);
  let firstOccur = concat.indexOf("1");
  let comma = concat.indexOf(",");
  let exponent = comma - firstOccur;
  if (exponent >= 2) exponent--;
  let excess = exponent + 127;
  let excessBinary = convertIntegerToBinary(excess);
  let result = excessBinary.toString();
  let ar = result.split("");
  while (ar.length < 8) {
    ar.unshift("0");
  }
  let bin = ar.join("");
  // console.log(exponent, excess)
  // console.log(excessBinary)
  return bin;
}

function mantissa(integer, decimal) {
  integerStr = integer.toString();
  let text1 = integer.toString() + ",";
  let concat = text1.concat(decimal);
  let firstOccur = concat.indexOf("1");
  let comma = concat.indexOf(",");
  // console.log(concat)
  concat = concat.slice(0, comma) + concat.slice(comma + 1);
  // console.log(concat)
  concat = [concat.slice(0, firstOccur + 1), ",", concat.slice(firstOccur + 1)].join('');
  // console.log(concat)
  concat = concat.substring(firstOccur + 2);
  concat = concat.split("");
  while (concat.length < 24) {
    concat.push("0")
  }
  while (concat.length > 23) {
    concat.pop();
  }
  // console.log(concat)
  // console.log(concat.join)
  return concat.join("")
}

function standardIEEE() {
  let standard2 = {
    bit: "",
    exponent: "",
    mantissa: "",
  }
  let number = prompt("Enter a decimal number: ");
  let integerBinary = convertIntegerToBinary(Math.floor(Math.abs(number)));
  // conversão decimal
  let decimalBinary = false;
  let positiveNumber = Math.abs(number);
  if (positiveNumber % 1 > 0) {
    decimalBinary = convertDecimalToBinary(positiveNumber % 1);
  }

  // Sign
  standard2.bit = firstBit(number)
  // Exponent
  standard2.exponent = exponent(integerBinary, decimalBinary);
  // Mantissa
  standard2.mantissa = mantissa(integerBinary, decimalBinary);

  // console.log(standard2)
  // console.log(integerBinary, ",", decimalBinary);
  const res = standard2.bit + standard2.exponent + standard2.mantissa;
  console.log("Floating point: [", res, "]");
}

standardIEEE();
